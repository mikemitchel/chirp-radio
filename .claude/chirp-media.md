# CHIRP CMS Media Storage - AWS S3 Setup Guide

## Current State

The CMS is currently storing media files **locally** in the `/media` directory:

- Media collection uses `upload: { staticDir: 'media' }`
- Files stored in docker volume: `./media:/app/media`
- Works for development, not suitable for production
- No S3 or cloud storage plugin installed

## Why Move to S3?

**Production requirements:**

- **Scalability** - No storage limits
- **Performance** - CDN-ready static assets
- **Reliability** - AWS 99.99% uptime SLA (unlike CloudFront)
- **Cost** - Pay only for what you use
- **Portability** - Container-friendly (no persistent volume needed)

---

## Step 1: AWS S3 Setup

### 1.1 Create S3 Bucket

1. Go to [AWS S3 Console](https://s3.console.aws.amazon.com/s3/buckets)
2. Click **Create bucket**

**Settings:**

- **Bucket name:** `chirp-cms-media-production` (must be globally unique)
- **Region:** `us-east-1` (or your preferred region)
- **Object Ownership:** ACLs disabled (recommended)
- **Block Public Access:** **UNCHECK** all boxes
  - ⚠️ Media needs to be publicly readable
  - Don't worry - we'll use bucket policy for security
- **Bucket Versioning:** Enable (recommended for recovery)
- **Encryption:** Enable (default SSE-S3)
- **Object Lock:** Disable

3. Click **Create bucket**

### 1.2 Configure Bucket Policy

1. Go to bucket → **Permissions** → **Bucket Policy**
2. Add this policy (replace `chirp-cms-media-production` with your bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::chirp-cms-media-production/*"
    }
  ]
}
```

This allows public **read** access to objects, but only your IAM user can **write**.

### 1.3 Configure CORS

1. Go to bucket → **Permissions** → **CORS**
2. Add this configuration:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag", "x-amz-server-side-encryption", "x-amz-request-id"]
  }
]
```

---

## Step 2: IAM User Setup

### 2.1 Create IAM User

1. Go to [IAM Console](https://console.aws.amazon.com/iam/home#/users)
2. Click **Create user**
3. **User name:** `chirp-cms-s3-uploader`
4. **Access type:** Programmatic access only (no console)
5. Click **Next**

### 2.2 Create Custom Policy

1. Click **Attach policies directly** → **Create policy**
2. Switch to **JSON** tab
3. Paste this policy (replace bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListBucket",
      "Effect": "Allow",
      "Action": ["s3:ListBucket", "s3:GetBucketLocation"],
      "Resource": "arn:aws:s3:::chirp-cms-media-production"
    },
    {
      "Sid": "ManageObjects",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject", "s3:DeleteObject", "s3:PutObjectAcl"],
      "Resource": "arn:aws:s3:::chirp-cms-media-production/*"
    }
  ]
}
```

4. Name: `chirp-cms-s3-access-policy`
5. Click **Create policy**
6. Go back to user creation, refresh, and attach the new policy
7. Click **Next** → **Create user**

### 2.3 Create Access Keys

1. Go to user → **Security credentials** → **Access keys**
2. Click **Create access key**
3. Choose **Application running outside AWS**
4. Download CSV or copy:
   - **Access key ID:** `AKIAXXXXXXXXXXXXXXXX`
   - **Secret access key:** `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

⚠️ **Save these immediately** - you can't retrieve the secret again!

---

## Step 3: Install Payload S3 Plugin

### 3.1 Install Dependencies

In `chirp-cms` directory:

```bash
npm install @payloadcms/plugin-cloud-storage @payloadcms/plugin-cloud-storage-s3
```

### 3.2 Update payload.config.ts

Add to imports:

```typescript
import { s3Storage } from '@payloadcms/plugin-cloud-storage/s3'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
```

Add to plugins array:

```typescript
plugins: [
  redirectsPlugin({
    collections: ['pages', 'articles', 'events', 'podcasts'],
    overrides: {
      admin: {
        group: 'Website',
      },
    },
  }),
  cloudStorage({
    collections: {
      'media': {
        adapter: s3Storage({
          config: {
            endpoint: process.env.S3_ENDPOINT, // Optional: for S3-compatible services
            region: process.env.S3_REGION || 'us-east-1',
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
            },
          },
          bucket: process.env.S3_BUCKET || 'chirp-cms-media-production',
        }),
      },
      'player-fallback-images': {
        adapter: s3Storage({
          config: {
            endpoint: process.env.S3_ENDPOINT,
            region: process.env.S3_REGION || 'us-east-1',
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
            },
          },
          bucket: process.env.S3_BUCKET || 'chirp-cms-media-production',
        }),
      },
    },
  }),
],
```

### 3.3 Update Media Collections

**src/collections/Media.ts** - Remove `staticDir`:

```typescript
export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  admin: {
    group: 'Media',
  },
  upload: {
    // Remove: staticDir: 'media',
    imageSizes: [
      // ... keep existing image sizes
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    resizeOptions: {
      width: 2400,
      height: 2400,
      fit: 'inside',
      withoutEnlargement: true,
    },
  },
  // ... rest of config
}
```

Do the same for **src/collections/PlayerFallbackImages.ts**

---

## Step 4: Environment Variables

### 4.1 Local Development (.env)

Add to `chirp-cms/.env`:

```env
# AWS S3 Configuration
S3_BUCKET=chirp-cms-media-production
S3_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Optional: For S3-compatible services (DigitalOcean Spaces, MinIO, etc.)
# S3_ENDPOINT=https://nyc3.digitaloceanspaces.com
```

### 4.2 Docker Compose

Update `docker-compose.yml`:

```yaml
services:
  app:
    environment:
      # ... existing vars

      # AWS S3
      S3_BUCKET: ${S3_BUCKET:-chirp-cms-media-production}
      S3_REGION: ${S3_REGION:-us-east-1}
      AWS_ACCESS_KEY_ID: ${AWS_ACCESS_KEY_ID}
      AWS_SECRET_ACCESS_KEY: ${AWS_SECRET_ACCESS_KEY}
      # S3_ENDPOINT: ${S3_ENDPOINT:-}  # Optional
```

### 4.3 Production (AWS ECS/Fargate)

Add to ECS task definition environment variables or AWS Secrets Manager.

---

## Step 5: Testing

### 5.1 Local Test

```bash
cd chirp-cms
npm install
npm run dev
```

1. Go to http://localhost:3000/admin
2. Navigate to **Media** collection
3. Upload a test image
4. Check AWS S3 Console - file should appear in bucket
5. Verify image URL points to S3: `https://chirp-cms-media-production.s3.us-east-1.amazonaws.com/...`

### 5.2 Docker Test

```bash
cd chirp-cms
docker-compose down
docker-compose build
docker-compose up
```

Upload a test image and verify S3 storage.

---

## Step 6: Migrate Existing Media

### 6.1 Manual Migration

If you have existing media in `./media` directory:

1. Go to AWS S3 Console
2. Open your bucket
3. Click **Upload**
4. Drag and drop files from `./media` directory
5. Ensure folder structure matches (if needed)

### 6.2 AWS CLI Migration (Faster)

```bash
# Install AWS CLI: https://aws.amazon.com/cli/

# Configure credentials
aws configure
# Enter: Access Key ID, Secret Access Key, Region, Output format (json)

# Sync local media to S3
aws s3 sync ./media s3://chirp-cms-media-production/media --acl public-read
```

### 6.3 Update Database References

After migration, you may need to update database URLs:

```sql
-- PostgreSQL: Update media URLs to point to S3
UPDATE media
SET url = REPLACE(url, '/media/', 'https://chirp-cms-media-production.s3.us-east-1.amazonaws.com/')
WHERE url LIKE '/media/%';
```

---

## Step 7: Clean Up

### 7.1 Remove Local Media Directory

Once S3 is working:

1. Backup `./media` directory (just in case)
2. Remove volume mount from `docker-compose.yml`:

```yaml
# Remove this line:
# - ./media:/app/media
```

3. Delete local `./media` directory (after confirming S3 works)

### 7.2 Update .dockerignore

Already handled - `.dockerignore` excludes `media/*`

---

## Troubleshooting

### Issue: 403 Forbidden when uploading

**Cause:** IAM user lacks permissions

**Fix:**

1. Check IAM policy includes `s3:PutObject` and `s3:PutObjectAcl`
2. Verify bucket name matches in policy
3. Check AWS credentials are correct in `.env`

### Issue: Images not loading (404)

**Cause:** Bucket policy doesn't allow public read

**Fix:**

1. Go to bucket → Permissions → Bucket Policy
2. Add the public read policy from Step 1.2
3. Ensure Block Public Access is OFF

### Issue: CORS errors in browser

**Cause:** Missing or incorrect CORS config

**Fix:**

1. Go to bucket → Permissions → CORS
2. Add CORS config from Step 1.3
3. Ensure `AllowedOrigins` includes your CMS domain

### Issue: Wrong S3 region

**Cause:** `S3_REGION` env var doesn't match bucket region

**Fix:**

1. Check bucket region in S3 Console
2. Update `S3_REGION` in `.env` to match
3. Restart CMS

---

## Cost Estimate

**Typical usage for CHIRP:**

- **Storage:** $0.023 per GB/month (first 50 TB)
- **Requests:** $0.005 per 1,000 PUT/POST, $0.0004 per 1,000 GET
- **Data Transfer:** $0.09 per GB out (first 10 TB)

**Estimated monthly cost:**

- 10 GB storage: $0.23/month
- 10,000 uploads: $0.05/month
- 100,000 views: $0.04/month
- 50 GB transfer: $4.50/month

**Total: ~$5/month** for typical nonprofit radio station usage

---

## Additional Optimizations

### CloudFront Alternative: CloudFlare R2

If you want CDN without CloudFront (due to downtime concerns):

**Option 1: Direct S3 with Route 53**

- Use custom domain: `media.chirpradio.org`
- Point CNAME to S3 bucket website endpoint
- No CDN, but reliable

**Option 2: CloudFlare R2**

- S3-compatible storage with free egress
- Built-in CDN
- Change `S3_ENDPOINT` to R2 endpoint
- More reliable than CloudFront

### Backup Strategy

**Versioning (already enabled):**

- S3 keeps previous versions of files
- Can restore accidentally deleted files

**Cross-Region Replication:**

- Copy media to secondary region
- Disaster recovery

**Lifecycle Policies:**

- Archive old media to Glacier (cheaper)
- Delete old versions after 90 days

---

## Security Best Practices

1. **Never commit AWS credentials to Git**
   - Use `.env` files (already gitignored)
   - Use AWS Secrets Manager in production

2. **Rotate IAM access keys regularly**
   - Create new keys every 90 days
   - Delete old keys after rotation

3. **Use IAM roles in AWS environments**
   - If deploying to ECS/EC2, use IAM roles instead of access keys
   - More secure, no credentials in env vars

4. **Enable S3 access logging**
   - Track who accesses your media
   - Detect unauthorized access

5. **Set up CloudWatch alarms**
   - Alert on unusual S3 activity
   - Monitor upload failures

---

## Next Steps

After S3 is working:

1. Deploy CMS to AWS ECS/Fargate
2. Connect to RDS PostgreSQL
3. Set up Application Load Balancer
4. Configure custom domain (cms.chirpradio.org)
5. Enable HTTPS with ACM certificate

See deployment guide (coming soon) for full AWS setup.

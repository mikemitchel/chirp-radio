# Docker Setup for CHIRP Radio

This guide explains how to run the CHIRP Radio application using Docker.

## Prerequisites

- Docker Desktop installed (Mac/Windows) or Docker Engine (Linux)
- Docker Compose (included with Docker Desktop)
- CHIRP CMS Docker container (required - handles all database access)

## Quick Start

1. **Ensure chirp-cms is running:**

   ```bash
   docker ps | grep chirp-cms
   ```

2. **Copy the Docker environment file:**

   ```bash
   cp .env.docker .env
   ```

3. **Build and run the application:**

   ```bash
   docker-compose up --build
   ```

4. **Access the application:**
   - Frontend: http://localhost:8080
   - Health check: http://localhost:8080/health

## CHIRP CMS Integration

This Docker setup is configured to work with the CHIRP CMS Docker container. Both containers communicate over a shared Docker network called `chirp-network`.

### Architecture

```
┌─────────────────────────────────────────────────┐
│               chirp-network (bridge)            │
│                                                 │
│  ┌──────────────────┐      ┌──────────────────┐│
│  │  chirp-cms       │      │  chirp-radio-    ││
│  │  Container       │◄─────┤  frontend        ││
│  │  (Port 3000)     │      │  (Port 8080)     ││
│  └────────┬─────────┘      └──────────────────┘│
│           │                                     │
└───────────┼─────────────────────────────────────┘
            │
            ▼
    PostgreSQL / MongoDB (host)
    CMS handles all database access
```

### Running with CHIRP CMS

**Option 1: If chirp-cms is already running separately (recommended)**

If you already have the chirp-cms container running with its own docker-compose:

1. The chirp-cms service in docker-compose.yml is already commented out
2. Ensure your existing CMS container is connected to the `chirp-network` network
3. Run: `docker-compose up --build`

**Option 2: Run everything together**

Uncomment the chirp-cms service in docker-compose.yml and run:

```bash
docker-compose up --build
```

This will start both the CMS and frontend containers on the same network.

### How Containers Communicate

- The frontend connects to the CMS using the service name: `http://chirp-cms:3000/api`
- Docker's internal DNS resolves `chirp-cms` to the CMS container's IP
- All database access is handled by the CMS - the frontend has no direct database connection

## Configuration

### Environment Variables

Key environment variables in `.env`:

- **CMS Configuration:**
  - `VITE_USE_CMS_API`: Enable/disable CMS API (default: `true`)
  - `VITE_CMS_API_URL`: CMS API URL (default: `http://chirp-cms:3000/api` - uses container name for Docker networking)

**Note:** The frontend does not connect directly to PostgreSQL. All database access is handled through the CMS API.

## Common Commands

### Build and start services

```bash
docker-compose up --build
```

### Run in detached mode (background)

```bash
docker-compose up -d
```

### Stop services

```bash
docker-compose down
```

### View logs

```bash
docker-compose logs -f
```

### Rebuild without cache

```bash
docker-compose build --no-cache
docker-compose up
```

### Access container shell

```bash
docker-compose exec chirp-radio-frontend sh
```

## Troubleshooting

### Cannot connect to CHIRP CMS

**Symptom:** Frontend cannot connect to the CMS container.

**Solutions:**

1. **Verify CMS container is running:**

   ```bash
   docker ps | grep chirp-cms
   ```

2. **Check both containers are on the same network:**

   ```bash
   docker network inspect chirp-network
   ```

   Both `chirp-cms` and `chirp-radio-frontend` should be listed.

3. **Test connectivity from frontend container:**

   ```bash
   docker-compose exec chirp-radio-frontend wget -O- http://chirp-cms:3000/api
   ```

4. **Check CMS logs:**

   ```bash
   docker-compose logs chirp-cms
   ```

5. **Connect CMS to the network (if needed):**
   ```bash
   docker network create chirp-network
   docker network connect chirp-network chirp-cms
   ```

### Port 8080 already in use

**Solution:** Change the port mapping in `docker-compose.yml`:

```yaml
ports:
  - '3001:80' # Change 8080 to any available port
```

### Build fails

**Solution:** Clear Docker cache and rebuild:

```bash
docker-compose down
docker system prune -a
docker-compose up --build
```

## Production Deployment

For production deployment:

1. **Update environment variables** in `.env` with production values
2. **Ensure CMS is configured with proper database connections** (CMS handles all database access)
3. **Consider using Docker secrets** for sensitive data
4. **Set up proper logging and monitoring**
5. **Use a reverse proxy** (nginx, Traefik) for SSL termination

## API Routes Note

**Important:** The current Docker setup serves the frontend static build only. The serverless API functions (`api/playlist/history.ts`, etc.) are not included in this Docker container.

If you need the API routes:

- Deploy them separately as serverless functions
- Or adapt them to run in an Express.js server within Docker (requires code changes)

## Health Checks

The application includes health checks:

- **Frontend:** http://localhost:8080/health
- **Docker:** `docker-compose ps` shows health status

## Support

For issues or questions:

- Check the main [README.md](./README.md)
- Review Docker logs: `docker-compose logs`
- Open an issue on the project repository

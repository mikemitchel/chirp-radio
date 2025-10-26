# CMS Type Synchronization Analysis

**Date**: 2025-10-26
**Purpose**: Compare CMS (Payload) types with frontend TypeScript interfaces to identify mismatches and propose synchronization strategy

---

## Executive Summary

The CMS uses **Payload CMS** which auto-generates strict TypeScript types from collection schemas. The frontend uses manually-maintained, looser interfaces in `src/types/cms.ts`. There are **critical mismatches** that could cause runtime errors:

### Critical Issues:

1. **ID Type Mismatch**: CMS uses `number`, frontend expects `string | undefined`
2. **Content Structure**: CMS uses Lexical Editor JSON objects, frontend expects `string | null`
3. **Category Types**: CMS uses strict relationship references, frontend uses loose `any` types
4. **Required vs Optional**: CMS has required fields, frontend makes most fields optional
5. **Field Name Differences**: Announcement uses `bodyText` in CMS but frontend expects `message`

---

## Detailed Type Comparisons

### 1. Announcement

#### CMS Schema (`/Users/mitch/work/chirp-cms/src/collections/Announcements.ts`)

```typescript
{
  id: number
  headlineText: string (required)
  bodyText: richText (required) // Lexical Editor JSON object
  variant: 'donation' | 'motivation' (required)
  textureBackground: string (required, enum)
  showLink?: boolean
  linkText?: string
  linkUrl?: string
  buttonCount: 'none' | 'one' | 'two'
  button1Text?: string
  button1Icon?: string (enum of icon names)
  button2Text?: string
  button2Icon?: string (enum of icon names)
  currentAmount?: number
  targetAmount?: number
  createdAt: string
  updatedAt: string
}
```

#### Frontend Interface (`src/types/cms.ts`)

```typescript
{
  id?: string | null
  headlineText?: string | null
  bodyText?: string | null      // ❌ MISMATCH: expects string, CMS sends Lexical JSON
  message?: string | null        // ❌ Field doesn't exist in CMS
  variant?: string | null
  textureBackground?: string | null
  showLink?: boolean | null
  linkText?: string | null
  linkUrl?: string | null
  buttonCount?: string | null
  button1Text?: string | null
  button1Icon?: string | null
  button2Text?: string | null
  button2Icon?: string | null
  currentAmount?: number | null
  targetAmount?: number | null
  [key: string]: unknown
}
```

**Severity**: 🔴 **HIGH** - `bodyText` structure mismatch will cause rendering errors

---

### 2. Article

#### CMS Schema (`/Users/mitch/work/chirp-cms/src/collections/Articles.ts`)

```typescript
{
  id: number
  category: number | Category (required, relationship)
  title: string (required)
  slug: string (required, unique)
  author: string (required)
  featuredImage?: number | Media (relationship)
  featuredImageUrl?: string
  excerpt: string (required, max 200 chars)
  content: richText (required) // Lexical Editor JSON object
  videoTitle?: string
  youtubeVideoId?: string
  tags?: Array<{ tag: string }>
  publishedDate: string (required)
  createdAt: string
  updatedAt: string
}
```

#### Frontend Interface (`src/types/cms.ts`)

```typescript
{
  id?: string | null            // ❌ MISMATCH: CMS sends number
  title?: string | null
  slug?: string | null
  author?: string | null
  category?: any                // ⚠️ Loose type, CMS sends number or populated object
  excerpt?: string | null
  content?: string | null       // ❌ MISMATCH: expects string, CMS sends Lexical JSON
  publishedDate?: string | null
  featuredImage?: string | null
  featuredImageUrl?: string | null
  videoTitle?: string | null
  youtubeVideoId?: string | null
  tags?: Array<{ tag: string }> | null
  [key: string]: unknown
}
```

**Severity**: 🔴 **HIGH** - `content` and `id` mismatches will cause errors

---

### 3. Event

#### CMS Schema (`/Users/mitch/work/chirp-cms/src/collections/Events.ts`)

```typescript
{
  id: number
  category: number | Category (required, relationship)
  title: string (required)
  slug: string (required, unique)
  excerpt: string (required, max 200 chars)
  content?: richText // Lexical Editor JSON object
  featuredImage?: number | Media (relationship)
  featuredImageUrl?: string
  showPhotoCredit: boolean (default false)
  photographerName?: string
  venue: number | Venue (required, relationship)
  date: string (required)
  endDate?: string
  featured: boolean (default false)
  ageRestriction?: number | AgeGate (relationship)
  createdAt: string
  updatedAt: string
}
```

#### Frontend Interface (`src/types/cms.ts`)

```typescript
{
  id?: string | null            // ❌ MISMATCH: CMS sends number
  title?: string | null
  slug?: string | null
  category?: any                // ⚠️ Loose type
  excerpt?: string | null
  content?: string | null       // ❌ MISMATCH: expects string, CMS sends Lexical JSON
  date?: string | null
  endDate?: string | null
  venue?: any                   // ⚠️ Loose type, CMS sends number or populated object
  featuredImage?: string | null
  featuredImageUrl?: string | null
  showPhotoCredit?: boolean | null
  photographerName?: string | null
  featured?: boolean | null
  ageRestriction?: any          // ⚠️ Loose type
  [key: string]: unknown
}
```

**Severity**: 🔴 **HIGH** - `content` and `id` mismatches will cause errors

---

### 4. DJ

#### CMS Schema (`/Users/mitch/work/chirp-cms/src/collections/DJs.ts`)

```typescript
{
  id: number
  email: string (required, unique)
  username: string (required, unique)
  firstName: string (required)
  lastName: string (required)
  djName: string (required)
  showName?: string
  showTime?: string
  role: enum (default 'Regular DJ')
  profileImage?: number | Media (relationship)
  profileImageUrl?: string
  bio?: string
  djExcerpt?: string
  djBio?: richText // Lexical Editor JSON object
  // ... many more contact/professional fields
  createdAt: string
  updatedAt: string
}
```

#### Frontend Interface (`src/types/cms.ts`)

```typescript
{
  id?: string | null            // ❌ MISMATCH: CMS sends number
  djName?: string | null
  showName?: string | null
  showTime?: string | null
  bio?: string | null
  djExcerpt?: string | null
  djBio?: string | null         // ❌ MISMATCH: expects string, CMS sends Lexical JSON
  profileImage?: string | null
  profileImageUrl?: string | null
  location?: string | null
  role?: string | null
  [key: string]: unknown
}
```

**Severity**: 🟡 **MEDIUM** - Missing many fields, `djBio` mismatch

---

## Data Flow Analysis

### API Response Structure

The CMS API (`/Users/mitch/work/chirp-cms/src/server.ts`) uses Payload's `find()` method:

```typescript
app.get('/api/articles', async (req, res) => {
  const articles = await payload.find({
    collection: 'articles',
    limit: req.query.limit ? parseInt(req.query.limit as string) : 50,
  })
  res.json(articles) // Returns Payload's response format
})
```

Payload returns data in this format:

```typescript
{
  docs: Article[],      // Array of typed documents
  totalDocs: number,
  limit: number,
  totalPages: number,
  page: number,
  pagingCounter: number,
  hasPrevPage: boolean,
  hasNextPage: boolean,
  prevPage: number | null,
  nextPage: number | null
}
```

### Frontend Data Fetching

The frontend hooks (`src/hooks/useCMS.ts`) expect this exact format:

```typescript
const { data: articles } = useArticles() // data.docs contains the articles
```

✅ This wrapper format is **correctly aligned** between CMS and frontend.

---

## Critical Mismatch Details

### 1. ID Type Mismatch (`number` vs `string`)

**CMS**: Auto-incremented `number` IDs from SQLite
**Frontend**: Expects optional `string` IDs

**Impact**:

- Type errors when passing IDs to components
- URL routing may fail if expecting string slugs as IDs
- Comparison operations may fail

**Example**:

```typescript
// CMS returns
{ id: 123, title: "Hello" }

// Frontend expects
{ id: "123", title: "Hello" }
```

---

### 2. Content Field Type (`Lexical JSON` vs `string`)

**CMS**: Lexical Editor rich text stored as JSON:

```json
{
  "root": {
    "type": "root",
    "format": "",
    "indent": 0,
    "version": 1,
    "children": [
      {
        "type": "paragraph",
        "format": "",
        "indent": 0,
        "version": 1,
        "children": [
          {
            "mode": "normal",
            "text": "This is the article content...",
            "type": "text",
            "style": "",
            "detail": 0,
            "format": 0,
            "version": 1
          }
        ],
        "direction": "ltr"
      }
    ],
    "direction": "ltr"
  }
}
```

**Frontend**: Expects simple string or null

**Impact**:

- Direct rendering will show `[object Object]`
- Rich text formatting will be lost
- Need Lexical serializer/renderer

---

### 3. Relationship Fields (`number | Object` vs `any`)

**CMS**: Relationships can be populated or just IDs:

```typescript
// Unpopulated
{ venue: 123 }

// Populated
{
  venue: {
    id: 123,
    name: "Empty Bottle",
    address: "1035 N Western Ave"
  }
}
```

**Frontend**: Uses loose `any` type, no type safety

**Impact**:

- No autocomplete for relationship fields
- Runtime errors if accessing nested properties when unpopulated
- Difficult to know when to populate relationships

---

## Recommendations

### Option A: Shared Type Package (Recommended)

**Approach**: Create a shared npm package or workspace that generates frontend types from CMS schema

**Pros**:

- Single source of truth
- Auto-generated types stay in sync
- Type safety across the stack
- Can include runtime validators (Zod, etc.)

**Cons**:

- Requires build process changes
- Additional tooling complexity

**Implementation**:

```bash
# In CMS repo
npm run generate:types  # Generates payload-types.ts

# Transform and export for frontend
npm run export:types    # Creates @chirp/types package

# In frontend repo
npm install @chirp/types
```

---

### Option B: Runtime Type Definitions in API Response

**Approach**: Include JSON Schema or TypeScript type definitions in API responses

**Pros**:

- Frontend always has current schema
- Runtime validation possible
- No build-time coupling

**Cons**:

- Larger payload size
- Requires runtime type generation
- Complex implementation

**Example Response**:

```json
{
  "docs": [...],
  "schema": {
    "properties": {
      "id": { "type": "number" },
      "title": { "type": "string" }
    }
  }
}
```

---

### Option C: Type Transformers (Quick Fix)

**Approach**: Create transformation layer that converts CMS types to frontend expectations

**Pros**:

- Quick to implement
- Maintains backward compatibility
- No infrastructure changes

**Cons**:

- Manual maintenance required
- Types can drift over time
- Performance overhead

**Example**:

```typescript
// src/utils/cmsTransformers.ts
export function transformArticle(cmsArticle: PayloadArticle): FrontendArticle {
  return {
    id: String(cmsArticle.id),
    title: cmsArticle.title,
    content: lexicalToHtml(cmsArticle.content), // Convert Lexical to HTML
    category:
      typeof cmsArticle.category === 'number'
        ? String(cmsArticle.category)
        : cmsArticle.category.name,
    // ... other transformations
  }
}
```

---

### Option D: GraphQL Layer

**Approach**: Add GraphQL layer between CMS and frontend with schema stitching

**Pros**:

- Schema introspection built-in
- Frontend can request exact fields needed
- Strong typing with codegen

**Cons**:

- Major architecture change
- Additional service to maintain
- Learning curve

---

## Immediate Action Items

### 1. Fix Critical Mismatches (High Priority)

#### A. Add Lexical Content Serializer

Create utility to convert Lexical JSON to HTML:

```typescript
// src/utils/lexicalSerializer.ts
import { SerializedEditorState } from 'lexical'

export function lexicalToHtml(lexicalJson: SerializedEditorState | null): string {
  if (!lexicalJson) return ''

  // Implement Lexical to HTML conversion
  // Can use @lexical/html or custom serializer
}
```

Update frontend types to accept both formats:

```typescript
interface Article {
  content?: string | SerializedEditorState | null
}
```

#### B. Add ID Type Coercion

Update frontend to handle both number and string IDs:

```typescript
// src/utils/typeGuards.ts
export function normalizeId(id: number | string | null | undefined): string | null {
  if (id == null) return null
  return String(id)
}
```

#### C. Update Announcement Interface

Fix the `bodyText` vs `message` mismatch:

```typescript
interface Announcement {
  bodyText?: string | SerializedEditorState | null // Primary field from CMS
  // Remove: message?: string | null
}
```

---

### 2. Add Runtime Validation (Medium Priority)

Use Zod to validate API responses match expected types:

```typescript
// src/schemas/cms.ts
import { z } from 'zod'

export const ArticleSchema = z.object({
  id: z.number().transform(String), // Coerce number to string
  title: z.string(),
  content: z.any(), // Lexical JSON
  // ... other fields
})

// src/hooks/useCMS.ts
export function useArticles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const response = await fetch('/api/articles')
      const data = await response.json()
      return {
        ...data,
        docs: data.docs.map((doc) => ArticleSchema.parse(doc)),
      }
    },
  })
}
```

---

### 3. Update Frontend Types (Medium Priority)

Align frontend interfaces with CMS reality:

```diff
// src/types/cms.ts
export interface Article {
-  id?: string | null
+  id: number  // Match CMS type, transform at boundary if needed

-  content?: string | null
+  content: SerializedEditorState  // Use actual Lexical type

-  category?: any
+  category: number | Category  // Match CMS relationship type
}
```

---

## Recommended Approach

**Phase 1 - Immediate (1-2 days)**:

1. ✅ Add Lexical serializer utility
2. ✅ Update Announcement interface to remove `message` field
3. ✅ Add ID normalization utility
4. ✅ Test all CMS-dependent pages

**Phase 2 - Short-term (1 week)**:

1. Create shared types workspace using Payload's generated types
2. Add type transformers for backward compatibility
3. Add Zod runtime validation
4. Update all CMS hooks to use validated types

**Phase 3 - Long-term (2-4 weeks)**:

1. Implement automatic type generation pipeline
2. Add pre-commit hooks to verify type sync
3. Create developer documentation for CMS type workflow
4. Consider GraphQL layer if API complexity grows

---

## Developer Workflow

### For CMS Schema Changes:

```bash
# 1. Update collection schema in CMS
vim src/collections/Articles.ts

# 2. Generate new types
npm run generate:types

# 3. Export to frontend (if using shared package)
npm run export:types

# 4. In frontend, update imports
npm install @chirp/types@latest

# 5. Fix any type errors
npm run typecheck
```

### For Frontend Consumers:

```typescript
// Import CMS types from shared package
import { Article, Event, DJ } from '@chirp/types'

// Use with React Query hooks
const { data } = useArticles()
// data.docs is now properly typed as Article[]
```

---

## Questions to Resolve

1. **Should the frontend continue using optional fields?**
   - CMS marks many fields as required
   - Frontend makes most optional for safety
   - Decision: Use CMS requirements, handle at fetch boundary

2. **How to handle Lexical content rendering?**
   - Option A: Serialize to HTML on backend
   - Option B: Use Lexical renderer in frontend
   - Option C: Support both formats
   - Decision: ?

3. **Should IDs be numbers or strings?**
   - CMS uses number (SQLite auto-increment)
   - URLs/routing typically use strings
   - Decision: Keep as numbers internally, stringify for URLs

4. **How to handle relationship population?**
   - When should relationships be populated?
   - Add query parameter for depth?
   - Decision: ?

---

## Conclusion

The CMS and frontend types are **significantly misaligned**, particularly around:

- ID types (number vs string)
- Content structure (Lexical JSON vs string)
- Required vs optional fields

**Recommended immediate action**: Implement **Option C (Type Transformers)** as a quick fix, then migrate to **Option A (Shared Type Package)** for long-term maintainability.

This ensures type safety, prevents runtime errors, and creates a sustainable workflow for schema evolution.

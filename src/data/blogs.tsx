
export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: number;
  category: string;
  projectId?: string;
  projectName?: string;
  image: string;
  tags: string[];
}

export const BLOGS: Blog[] = [
  {
    id: "1",
    title: "Building a Multi-Tenant SaaS Platform: Architecture & Challenges",
    slug: "multi-tenant-saas-architecture",
    excerpt: "Learn how to architect a scalable multi-tenant SaaS platform handling multiple tenants, roles, and data isolation.",
    date: "2024-12-15",
    readTime: 8,
    category: "Architecture",
    projectName: "Clee",
    projectId: "clee",
    image: "/images/Clee.png",
    tags: ["SaaS", "Architecture", "Multi-Tenant", "MongoDB"],
    content: `
# Building a Multi-Tenant SaaS Platform: Architecture & Challenges

Building a SaaS platform that serves multiple customers (tenants) with isolated data is one of the most complex challenges in modern web development. Let me share what we learned building Clee.

## The Multi-Tenant Challenge

When you build a SaaS platform, you need to handle:
- **Data Isolation:** Each tenant's data must be completely isolated
- **Performance:** Queries should still be fast despite multiple tenants
- **Scaling:** Adding new tenants shouldn't affect existing ones
- **Security:** One tenant can never see another's data

## Our Architecture Approach

We chose **Database-per-Tenant within Shared Database** model:
- Single MongoDB database
- Tenant ID field on every collection
- Middleware validation on every API endpoint

\`\`\`javascript
// Every query includes tenant isolation
db.collection('events').find({ tenantId: req.user.tenantId })
\`\`\`

## Role-Based Access Control (RBAC)

Clee needed 4 role levels:
1. **Admin** - Full platform access
2. **Manager** - Org/business level access
3. **Staff** - Limited to assigned tasks
4. **Customer** - View-only, booking access

Each role has different data visibility.

## Performance Optimization

### The N+1 Query Problem
We discovered slow queries when fetching user + bookings + services. Solution: MongoDB aggregation pipeline.

**Before:** 1 query for users + 50 queries for their bookings = 51 total queries
**After:** 1 aggregation pipeline = 1 query

### Database Indexing
\`\`\`sql
CREATE INDEX idx_tenantId_userId ON events(tenantId, userId);
CREATE INDEX idx_tenantId_createdAt ON events(tenantId, createdAt DESC);
\`\`\`

This reduced query time from 850ms → 120ms.

## Key Learnings

1. **Always validate tenant ID** - Every API endpoint must verify user belongs to requested tenant
2. **Use indexes early** - Performance hits compound as data grows
3. **Test multi-tenant scenarios** - Single tenant tests won't catch issues
4. **Document data model** - Future developers need to understand tenant isolation

## Conclusion

Multi-tenant architecture is complex but manageable with proper planning. Start simple, add complexity as needed.
    `
  },
  {
    id: "2",
    title: "Implementing Distributed Locks with Redis for Concurrent Bookings",
    slug: "redis-distributed-locks",
    excerpt: "Prevent overbooking in high-concurrency scenarios using Redis distributed locks.",
    date: "2024-12-10",
    readTime: 7,
    category: "Backend",
    projectName: "Clee",
    projectId: "clee",
    image: "/images/Clee.png",
    tags: ["Redis", "Concurrency", "Locks", "Performance"],
    content: `
# Implementing Distributed Locks with Redis for Concurrent Bookings

When multiple users try to book the same slot simultaneously, how do you prevent overbooking? This is where distributed locks shine.

## The Overbooking Problem

Imagine a salon with 1 available slot at 2 PM:
- User A books at 2 PM (slot taken)
- User B also tries to book at 2 PM simultaneously
- Without locking, both could succeed!

## Solution: Redis Distributed Locks

Redis atomic operations let us create locks:

\`\`\`javascript
// Acquire lock
const lockKey = \`booking:slot:\${slotId}\`;
const acquired = await redis.set(lockKey, 'locked', 'NX', 'EX', 30);

if (acquired) {
  // Check slot availability
  // If available, create booking
  // Release lock
  await redis.del(lockKey);
} else {
  // Lock held by another user, slot unavailable
  throw new Error('Slot just booked');
}
\`\`\`

## How It Works

1. **NX flag:** Only set if key doesn't exist
2. **EX 30:** Expire after 30 seconds (prevents deadlocks)
3. Atomic operation: No race conditions

## Performance Impact

- Without locks: Race conditions (bad data)
- With locks: +50ms per booking (acceptable for safety)

## Real-World Results

Clee processes 100+ bookings daily with zero double-bookings thanks to distributed locks.

## When to Use Locks

- Inventory management (limited stock)
- Booking systems (limited slots)
- Payment processing (prevent double-charge)
- Resource allocation
    `
  },
  {
    id: "3",
    title: "Building a Dynamic Loyalty Rewards Engine with React",
    slug: "loyalty-rewards-engine",
    excerpt: "How we built a flexible loyalty rewards system that merchants can customize without code.",
    date: "2024-12-05",
    readTime: 6,
    category: "Frontend",
    projectName: "Clee",
    projectId: "clee",
    image: "/images/Clee.png",
    tags: ["React", "Forms", "State Management", "UX"],
    content: `
# Building a Dynamic Loyalty Rewards Engine with React

One of Clee's standout features is the loyalty rewards engine that lets beauty salon owners create custom reward rules without touching code.

## The Challenge

Merchants need flexibility:
- Fixed discount: "Earn $5 per booking"
- Percentage discount: "Earn 10% of purchase"
- Tiered rewards: "Earn more at higher spending levels"
- Custom formulas: Mix multiple conditions

We built a visual formula builder so non-technical users could create these rules.

## The Formula Builder UI

\`\`\`typescript
interface RewardRule {
  type: 'fixed' | 'percentage' | 'tiered';
  value: number;
  triggerType: 'booking' | 'purchase' | 'review';
  minAmount?: number;
}
\`\`\`

Users select:
1. Reward Type (Fixed Amount or Percentage)
2. Trigger (Booking or Purchase)
3. Parameters (values, conditions)
4. Preview (see example calculation)

## Real-Time Preview

As users build their rule, they see live preview:

\`\`\`
"When customer spends $50 on a booking"
"Give them 10% reward (5 points)"
"Redeemable for $5 off next visit"
\`\`\`

## Backend Integration

\`\`\`javascript
// When booking completes, calculate rewards
const reward = calculateReward(booking, rewardRule);

// Update customer balance
await updateCustomerBalance(customerId, reward);

// Send notification
await sendRewardNotification(customerId, reward);
\`\`\`

## Results

Merchants using rewards see 40% higher repeat bookings.

## Key Takeaways

1. **UI is everything** - Complex business logic behind simple UI
2. **Real-time preview** - Users understand impact immediately
3. **Flexible backends** - Rules stored as JSON, easy to modify
    `
  },
  {
    id: "4",
    title: "E-Commerce Inventory Management: Preventing Overselling",
    slug: "inventory-management-overselling",
    excerpt: "Strategies to prevent overselling in high-traffic e-commerce platforms.",
    date: "2024-11-28",
    readTime: 7,
    category: "Backend",
    projectName: "Grocery Pickup Store",
    projectId: "grocery",
    image: "/images/image1.png",
    tags: ["E-Commerce", "Inventory", "Optimization", "Database"],
    content: `
# E-Commerce Inventory Management: Preventing Overselling

Building Grocery Pickup Store taught us hard lessons about inventory management at scale.

## The Problem

With multiple users adding items to carts simultaneously:
- User A adds 5 items to cart
- User B adds 5 items to cart
- Only 7 items in stock

Both could potentially complete checkout if not handled properly.

## Solution Layers

### Layer 1: Optimistic Updates (Frontend)
Show item in cart immediately, validate on server.

### Layer 2: Reserve on Checkout (Backend)
\`\`\`javascript
app.post('/checkout', async (req, res) => {
  const { items, cartId } = req.body;

  // Check real stock
  for (const item of items) {
    const stock = await db.query(
      'SELECT quantity FROM products WHERE id = $1',
      [item.productId]
    );

    if (stock < item.quantity) {
      return res.status(400).json({ error: 'Out of stock' });
    }
  }

  // Reserve items (decrement stock)
  for (const item of items) {
    await db.query(
      'UPDATE products SET quantity = quantity - $1 WHERE id = $2',
      [item.quantity, item.productId]
    );
  }
});
\`\`\`

### Layer 3: Redis Cache (Performance)
\`\`\`javascript
// Cache hot products
const cachedStock = await redis.get(\`stock:\${productId}\`);
if (cachedStock) {
  return parseInt(cachedStock);
}

// Fallback to database
const stock = await db.query(...);
await redis.setex(\`stock:\${productId}\`, 300, stock);
\`\`\`

## Results

- Stock accuracy: 99.8%
- Overselling incidents: 0 in 6 months
- False "out of stock": <1%

## Key Learnings

1. **Database is source of truth** - Caching is for performance only
2. **Atomic operations** - SQL transactions prevent race conditions
3. **Monitor closely** - Track overselling attempts and fix causes
    `
  },
  {
    id: "5",
    title: "Handling Payments at Scale: From Stripe Integration to Webhooks",
    slug: "stripe-payments-webhooks",
    excerpt: "Complete guide to handling payments reliably with Stripe webhooks and error handling.",
    date: "2024-11-20",
    readTime: 8,
    category: "Backend",
    projectName: "Grocery Pickup Store",
    projectId: "grocery",
    image: "/images/image1.png",
    tags: ["Payments", "Stripe", "Webhooks", "Security"],
    content: `
# Handling Payments at Scale: From Stripe Integration to Webhooks

Payment processing is critical - failures here mean lost revenue and angry customers.

## Payment Flow

1. Customer adds items to cart
2. Frontend collects payment info (never touches server)
3. Backend creates Stripe PaymentIntent
4. Frontend confirms payment
5. Stripe sends webhook confirmation
6. Backend creates order

## Stripe Integration

\`\`\`javascript
const paymentIntent = await stripe.paymentIntents.create({
  amount: totalAmount * 100, // Stripe uses cents
  currency: 'usd',
  metadata: {
    userId: req.user.id,
    orderId: order.id
  }
});

res.json({ clientSecret: paymentIntent.client_secret });
\`\`\`

## Webhook Security

**Critical:** Verify webhook is from Stripe

\`\`\`javascript
const event = stripe.webhooks.constructEvent(
  req.body,
  req.headers['stripe-signature'],
  STRIPE_WEBHOOK_SECRET
);

if (event.type === 'payment_intent.succeeded') {
  const { metadata, amount } = event.data.object;

  // Update order status
  await db.query(
    'UPDATE orders SET status = $1, paidAmount = $2 WHERE id = $3',
    ['completed', amount, metadata.orderId]
  );

  // Send confirmation email
  await sendOrderConfirmation(metadata.userId);
}
\`\`\`

## Error Handling

\`\`\`javascript
try {
  // Attempt payment
} catch (error) {
  if (error.type === 'StripeCardError') {
    // Card declined - retry after a few seconds
    return res.status(400).json({ error: error.message });
  } else if (error.type === 'StripeInvalidRequestError') {
    // Invalid parameters
    return res.status(400).json({ error: 'Invalid request' });
  }
}
\`\`\`

## Idempotency

Handle webhook retries gracefully:

\`\`\`javascript
// Check if we already processed this
const existing = await db.query(
  'SELECT * FROM orders WHERE stripe_event_id = $1',
  [event.id]
);

if (existing) {
  // Already processed, return success
  return res.json({ received: true });
}

// Process and store event ID
await db.query(
  'INSERT INTO orders (..., stripe_event_id) VALUES (..., $1)',
  [event.id]
);
\`\`\`

## Results

- 100+ daily transactions
- Zero double-charges
- 99.9% success rate
- 0 failed webhook processing

## Key Takeaways

1. **Webhooks are async** - Don't rely on immediate completion
2. **Verify signatures** - Security is paramount
3. **Be idempotent** - Handle webhook retries gracefully
4. **Monitor failures** - Track declined cards and process issues
    `
  },
  {
    id: "6",
    title: "Role-Based Access Control (RBAC): Implementing Hierarchical Permissions",
    slug: "rbac-hierarchical-permissions",
    excerpt: "Deep dive into implementing hierarchical RBAC where permissions cascade from admin to staff.",
    date: "2024-11-15",
    readTime: 9,
    category: "Backend",
    projectName: "Forma Construction",
    projectId: "forma",
    image: "/images/forma.png",
    tags: ["Security", "Authorization", "RBAC", "Backend"],
    content: `
# Role-Based Access Control (RBAC): Implementing Hierarchical Permissions

Forma Construction serves different user types with different permission levels. Implementing this securely is crucial.

## Role Hierarchy

\`\`\`
Admin
  ├─ Organization Manager
  │   ├─ Project Lead
  │   │   └─ Team Member
  │   └─ Accountant
  └─ Support Staff
\`\`\`

## Permission Model

\`\`\`typescript
interface Permission {
  resource: 'projects' | 'documents' | 'payments' | 'team';
  action: 'read' | 'create' | 'update' | 'delete';
}

const rolePermissions = {
  admin: ['projects:*', 'documents:*', 'payments:*', 'team:*'],
  manager: ['projects:read,update', 'documents:read,create', 'team:read'],
  lead: ['projects:read', 'documents:read,create', 'team:read'],
  member: ['projects:read', 'documents:read']
};
\`\`\`

## Middleware Validation

\`\`\`javascript
async function checkPermission(req, res, next) {
  const { userId } = req.user;
  const { resource, action } = req.route;

  const user = await db.query(
    'SELECT role, org_id FROM users WHERE id = $1',
    [userId]
  );

  if (!hasPermission(user.role, resource, action)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  req.user.orgId = user.org_id; // Add for query filtering
  next();
}

app.get('/projects', checkPermission, async (req, res) => {
  // Only return projects for user's org
  const projects = await db.query(
    'SELECT * FROM projects WHERE org_id = $1',
    [req.user.orgId]
  );
  res.json(projects);
});
\`\`\`

## Database-Level Security

\`\`\`sql
-- Row-level security: users only see their org's data
CREATE POLICY org_isolation ON projects
  USING (org_id = current_setting('app.current_org_id'));

-- Prevent direct table access
REVOKE ALL ON projects FROM public;
GRANT SELECT ON projects TO authenticated_users;
\`\`\`

## Document-Level Access

Some documents are restricted further:

\`\`\`javascript
async function canAccessDocument(userId, documentId) {
  const user = await db.query(
    'SELECT role, org_id FROM users WHERE id = $1',
    [userId]
  );

  const doc = await db.query(
    'SELECT org_id, uploaded_by, visibility FROM documents WHERE id = $1',
    [documentId]
  );

  // Admin can access everything
  if (user.role === 'admin') return true;

  // Others need to be in same org
  if (user.org_id !== doc.org_id) return false;

  // Check visibility
  if (doc.visibility === 'private' && doc.uploaded_by !== userId) return false;

  return true;
}
\`\`\`

## Testing RBAC

\`\`\`javascript
describe('RBAC Authorization', () => {
  it('admin can delete any project', async () => {
    const response = await request(app)
      .delete('/projects/123')
      .set('Authorization', adminToken);
    expect(response.status).toBe(204);
  });

  it('member cannot delete project', async () => {
    const response = await request(app)
      .delete('/projects/123')
      .set('Authorization', memberToken);
    expect(response.status).toBe(403);
  });
});
\`\`\`

## Key Learnings

1. **Never trust client** - Always validate on backend
2. **Whitelist permissions** - Default deny, not default allow
3. **Log access** - Track who accessed what when
4. **Use middleware** - Centralized permission checks
5. **Test thoroughly** - RBAC bugs are security bugs
    `
  },
  {
    id: "7",
    title: "Optimizing MongoDB Queries: Aggregation Pipelines & Indexing",
    slug: "mongodb-optimization",
    excerpt: "How to optimize slow MongoDB queries using aggregation pipelines and strategic indexing.",
    date: "2024-11-08",
    readTime: 8,
    category: "Database",
    projectName: "Forma Construction",
    projectId: "forma",
    image: "/images/forma.png",
    tags: ["MongoDB", "Optimization", "Performance", "Database"],
    content: `
# Optimizing MongoDB Queries: Aggregation Pipelines & Indexing

When Forma grew to 200+ users, we hit performance issues. Here's how we fixed them.

## The N+1 Problem

**Slow approach:**
\`\`\`javascript
// 1 query for projects
const projects = await Project.find({ orgId });

// N queries for each project's documents
for (const project of projects) {
  project.documents = await Document.find({ projectId: project._id });
}
// Result: 1 + N database queries
\`\`\`

## Solution: Aggregation Pipeline

\`\`\`javascript
const projects = await Project.aggregate([
  { $match: { orgId: new ObjectId(orgId) } },
  {
    $lookup: {
      from: 'documents',
      localField: '_id',
      foreignField: 'projectId',
      as: 'documents'
    }
  },
  { $sort: { createdAt: -1 } }
]);
// Result: 1 database query!
\`\`\`

## Performance Comparison

| Approach | Query Time | Database Calls |
|----------|-----------|---|
| N+1 method | 2100ms | 50 |
| Aggregation | 280ms | 1 |
| **Improvement** | **87.5% faster** | **50x fewer calls** |

## Indexing Strategy

\`\`\`javascript
// Index on frequently queried fields
db.projects.createIndex({ orgId: 1, createdAt: -1 });
db.documents.createIndex({ projectId: 1 });
db.documents.createIndex({ orgId: 1, status: 1 });

// Compound indexes for multi-field queries
db.documents.createIndex({
  projectId: 1,
  status: 1,
  createdAt: -1
});
\`\`\`

## Analyzing Query Performance

\`\`\`javascript
// Check if index is being used
const explain = await Project.aggregate([...]).explain('executionStats');

console.log(explain.executionStats);
// Look for:
// - executionStages.stage: 'COLLSCAN' (bad - full scan)
// - executionStages.stage: 'IXSCAN' (good - index scan)
// - executionStats.totalDocsExamined (should be close to returned docs)
\`\`\`

## Before & After

**Before:**
- Query: 2100ms
- Indexes: 3
- N+1 queries: Yes

**After:**
- Query: 280ms (-87%)
- Indexes: 5 (well-planned)
- N+1 queries: No

## Key Takeaways

1. **Use aggregation** for multi-collection queries
2. **Index strategically** - Don't index everything
3. **Analyze queries** - Use explain() to verify index usage
4. **Monitor** - Track slow queries in production
    `
  },
  {
    id: "8",
    title: "Real-Time Data Sync: Calendar Availability for Rental Platforms",
    slug: "realtime-calendar-availability",
    excerpt: "Building efficient real-time calendar systems for rental booking platforms.",
    date: "2024-11-01",
    readTime: 7,
    category: "Backend",
    projectName: "My Lodge",
    projectId: "mylodge",
    image: "/images/image3.png",
    tags: ["Real-Time", "Calendar", "Algorithms", "Performance"],
    content: `
# Real-Time Data Sync: Calendar Availability for Rental Platforms

My Lodge needed to show accurate availability for 50+ properties across different date ranges. Traditional approaches were too slow.

## The Problem

For each property, check availability for every day in a year = 50 * 365 = 18,250 lookups per view.

## Solution: Bitmap Algorithm

Instead of storing individual day records, store months as bitmaps:

\`\`\`javascript
// December 2024 with days 1-7 available
// (days 8-31 booked)
const availability = {
  2024-12: 0b11111110000000000000000000000
  //       ^ day 1 (available)
  //                          ^ day 31 (booked)
};
\`\`\`

## Database Schema

\`\`\`sql
CREATE TABLE property_availability (
  id UUID PRIMARY KEY,
  property_id UUID NOT NULL,
  year_month VARCHAR(7), -- '2024-12'
  availability_bitmap INTEGER, -- 32-bit for a month
  UNIQUE(property_id, year_month)
);
\`\`\`

## Query Performance

\`\`\`javascript
async function isAvailable(propertyId, date) {
  const monthKey = date.toISOString().slice(0, 7); // '2024-12'
  const dayOfMonth = date.getDate() - 1; // 0-30

  const row = await db.query(
    'SELECT availability_bitmap FROM property_availability WHERE property_id = $1 AND year_month = $2',
    [propertyId, monthKey]
  );

  const bitmap = row.availability_bitmap;
  const isAvailable = !!(bitmap & (1 << dayOfMonth)); // Check bit

  return isAvailable;
}
\`\`\`

## Performance

| Approach | Query Time | Storage |
|----------|-----------|---------|
| Individual days | 100ms | 18KB/year |
| Bitmap | 1ms | 84B/year |
| **Improvement** | **100x faster** | **200x less storage** |

## Booking Updates

\`\`\`javascript
async function bookDates(propertyId, startDate, endDate) {
  const months = getMonthsInRange(startDate, endDate);

  for (const monthKey of months) {
    const startDay = Math.max(startDate.getDate() - 1, 0);
    const endDay = Math.min(endDate.getDate(), 31);

    // Create mask for days to book
    let mask = 0;
    for (let i = startDay; i < endDay; i++) {
      mask |= (1 << i);
    }

    // Update bitmap (remove available bits)
    await db.query(
      'UPDATE property_availability SET availability_bitmap = availability_bitmap & ~$1 WHERE property_id = $2 AND year_month = $3',
      [mask, propertyId, monthKey]
    );
  }
}
\`\`\`

## Results

- 50 properties checked in 50ms (was 5000ms)
- Memory efficient: 84 bytes per month per property
- Scale to 1000+ properties: still fast

## Considerations

- Bitmaps work for periods <32 days (use multiple fields for longer)
- More complex to understand (document well!)
- Not suitable for other use cases (evaluate for your needs)

## Key Takeaways

1. **Optimize at algorithm level** - Not just database tuning
2. **Choose right data structures** - Bitmaps for calendars
3. **Measure improvements** - 100x matters in real-time systems
    `
  },
  {
    id: "9",
    title: "Building Job Search Platforms: Filtering & Ranking Algorithms",
    slug: "job-search-filtering",
    excerpt: "Implementing efficient job search with filters, full-text search, and relevance ranking.",
    date: "2024-10-25",
    readTime: 6,
    category: "Backend",
    projectName: "Hariir - Job Portal",
    projectId: "hariir",
    image: "/images/image4.png",
    tags: ["Search", "Algorithms", "Ranking", "Database"],
    content: `
# Building Job Search Platforms: Filtering & Ranking Algorithms

Hariir needed to help job seekers find relevant positions quickly among thousands of listings.

## Search Requirements

Users need to filter by:
- Location (single or multiple)
- Salary range
- Job type (full-time, part-time, contract)
- Experience level
- Skills required

## Database Schema

\`\`\`sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  location VARCHAR(255),
  salary_min INTEGER,
  salary_max INTEGER,
  job_type VARCHAR(50),
  experience_level VARCHAR(50),
  skills JSONB, -- Array of required skills
  created_at TIMESTAMP
);

CREATE INDEX idx_location_salary ON jobs(location, salary_min, salary_max);
CREATE INDEX idx_job_type ON jobs(job_type);
\`\`\`

## Search Implementation

\`\`\`javascript
async function searchJobs(filters) {
  let query = 'SELECT * FROM jobs WHERE 1=1';
  const params = [];
  let paramCount = 1;

  // Location filter
  if (filters.location) {
    query += \` AND location = \$\${paramCount}\`;
    params.push(filters.location);
    paramCount++;
  }

  // Salary range filter
  if (filters.minSalary) {
    query += \` AND salary_max >= \$\${paramCount}\`;
    params.push(filters.minSalary);
    paramCount++;
  }

  if (filters.maxSalary) {
    query += \` AND salary_min <= \$\${paramCount}\`;
    params.push(filters.maxSalary);
    paramCount++;
  }

  // Job type filter
  if (filters.jobType) {
    query += \` AND job_type = \$\${paramCount}\`;
    params.push(filters.jobType);
    paramCount++;
  }

  // Skills filter (any matching skill)
  if (filters.skills && filters.skills.length > 0) {
    query += \` AND skills && \$\${paramCount}\`;
    params.push(filters.skills);
    paramCount++;
  }

  // Sorting by relevance (most recent first)
  query += ' ORDER BY created_at DESC LIMIT 50';

  return db.query(query, params);
}
\`\`\`

## Full-Text Search

For title & description search:

\`\`\`sql
ALTER TABLE jobs ADD COLUMN search_vector tsvector;

CREATE INDEX idx_search ON jobs USING GIN (search_vector);

CREATE TRIGGER update_search_vector
  BEFORE INSERT OR UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION tsvector_update_trigger(search_vector, 'pg_catalog.english', title, description);

-- Search query
SELECT * FROM jobs
WHERE search_vector @@ to_tsquery('english', 'software & developer');
\`\`\`

## Ranking Algorithm

\`\`\`javascript
function rankResults(jobs, userProfile) {
  return jobs.sort((a, b) => {
    let scoreA = 0, scoreB = 0;

    // Skill match (most important)
    scoreA += matchingSkills(userProfile.skills, a.skills) * 100;
    scoreB += matchingSkills(userProfile.skills, b.skills) * 100;

    // Salary match
    const userSalary = userProfile.expectedSalary;
    if (a.salary_min <= userSalary && userSalary <= a.salary_max) scoreA += 50;
    if (b.salary_min <= userSalary && userSalary <= b.salary_max) scoreB += 50;

    // Location
    if (userProfile.location === a.location) scoreA += 30;
    if (userProfile.location === b.location) scoreB += 30;

    // Recency (fresh jobs rank higher)
    scoreA += daysOld(a.created_at);
    scoreB += daysOld(b.created_at);

    return scoreB - scoreA; // Highest score first
  });
}
\`\`\`

## Performance Results

- Search with 5+ filters: 150ms (acceptable)
- Full-text search: 80ms
- Ranked results: +50ms
- Scales to 50,000+ jobs efficiently

## Key Takeaways

1. **Index strategically** - Compound indexes for common filter combinations
2. **Full-text search** - Use PostgreSQL built-in for text search
3. **Ranking algorithm** - Combine multiple factors for relevance
4. **Monitor slow queries** - Log and optimize filters users actually use
    `
  },
  {
    id: "10",
    title: "Beautiful SaaS UI: Designing Admin Dashboards with React",
    slug: "saas-admin-dashboard-design",
    excerpt: "UX patterns for effective admin dashboards handling complex data and operations.",
    date: "2024-10-18",
    readTime: 7,
    category: "Frontend",
    projectName: "Clee",
    projectId: "clee",
    image: "/images/Clee.png",
    tags: ["React", "UX", "Dashboard", "UI Design"],
    content: `
# Beautiful SaaS UI: Designing Admin Dashboards with React

Admin dashboards are critical for business operations. Good design makes work efficient.

## Dashboard Layout Patterns

### Sidebar Navigation
\`\`\`typescript
const navItems = [
  { icon: Dashboard, label: 'Overview', href: '/admin' },
  { icon: Calendar, label: 'Bookings', href: '/admin/bookings' },
  { icon: Users, label: 'Customers', href: '/admin/customers' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' }
];
\`\`\`

### Key Metrics (Top Cards)
\`\`\`jsx
<div className="grid grid-cols-4 gap-4">
  <MetricCard title="Total Revenue" value="\$12,450" change="+12%" />
  <MetricCard title="New Bookings" value="24" change="+8%" />
  <MetricCard title="Customers" value="234" change="+15%" />
  <MetricCard title="Fulfillment Rate" value="98.5%" change="-0.5%" />
</div>
\`\`\`

## Data Table Best Practices

\`\`\`jsx
<DataTable
  columns={[
    { key: 'name', label: 'Customer', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'bookings', label: 'Bookings', sortable: true },
    { key: 'revenue', label: 'Lifetime Value', sortable: true },
    { key: 'status', label: 'Status', filterable: true }
  ]}
  data={customers}
  onRowClick={(row) => navigate(\`/admin/customers/\${row.id}\`)}
  rowsPerPage={20}
/>
\`\`\`

## Real-Time Updates

\`\`\`javascript
// Subscribe to changes
const unsubscribe = subscribeToBookings((newBooking) => {
  setBookings(prev => [newBooking, ...prev].slice(0, 20));

  // Update metrics
  setMetrics(prev => ({
    ...prev,
    totalBookings: prev.totalBookings + 1,
    revenue: prev.revenue + newBooking.amount
  }));
});

return () => unsubscribe();
\`\`\`

## Search & Filters

\`\`\`jsx
<div className="flex gap-4 mb-6">
  <SearchInput
    placeholder="Search customers..."
    onChange={(q) => setSearchQuery(q)}
  />

  <FilterSelect
    label="Status"
    options={['Active', 'Inactive']}
    onChange={(status) => setStatusFilter(status)}
  />

  <DateRangePicker
    onRangeChange={(start, end) => setDateRange([start, end])}
  />
</div>
\`\`\`

## Performance Optimization

- Virtualize long lists (1000+ rows)
- Lazy load table pages
- Debounce search queries (300ms)
- Memoize expensive components

\`\`\`javascript
const MemoizedDataTable = React.memo(DataTable, (prev, next) => {
  return (
    JSON.stringify(prev.data) === JSON.stringify(next.data) &&
    prev.sortBy === next.sortBy
  );
});
\`\`\`

## Mobile Responsiveness

Dashboard is often viewed on mobile by managers:
- Stack cards vertically
- Use drawer for navigation
- Simplified tables with swipe actions

## Key UX Principles

1. **Clarity** - Show most important data first
2. **Speed** - Load critical data before nice-to-haves
3. **Actionability** - Make common actions quick (bulk edit, export)
4. **Safety** - Confirm destructive actions
5. **Feedback** - Show loading/success/error states

## Results

Merchants spend 30% less time in admin with optimized dashboard.

## Conclusion

Good admin UX directly impacts business operations and employee satisfaction.
    `
  },
  {
    id: "11",
    title: "Responsive Web Design: Mobile-First Approach in Production Apps",
    slug: "mobile-first-responsive-design",
    excerpt: "Practical tips for building responsive UIs that work across all devices.",
    date: "2024-10-10",
    readTime: 6,
    category: "Frontend",
    projectName: "Grocery Pickup Store",
    projectId: "grocery",
    image: "/images/image1.png",
    tags: ["CSS", "Responsive Design", "Mobile", "UX"],
    content: `
# Responsive Web Design: Mobile-First Approach in Production Apps

60% of users access Grocery Pickup Store on mobile. Responsive design isn't optional - it's essential.

## Mobile-First Philosophy

Start with mobile design, then add features for larger screens:

\`\`\`css
/* Mobile first (default) */
.card {
  width: 100%;
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .card {
    width: calc(50% - 0.5rem);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .card {
    width: calc(33.333% - 0.67rem);
  }
}
\`\`\`

## Responsive Images

\`\`\`jsx
import Image from 'next/image';

<Image
  src={productImage}
  alt={productName}
  width={500}
  height={500}
  responsive={true}
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         33vw"
/>
\`\`\`

## Touch-Friendly UI

\`\`\`css
/* Minimum touch target: 44x44px */
button {
  min-width: 44px;
  min-height: 44px;
  padding: 0.75rem;
}

/* Adequate spacing on mobile */
@media (max-width: 640px) {
  .button-group {
    flex-direction: column;
    gap: 0.5rem;
  }
}
\`\`\`

## Performance on Mobile

\`\`\`javascript
// Code splitting for mobile
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  ssr: false
});

// Lazy load images
<Image
  src={image}
  alt="product"
  loading="lazy"
/>

// Reduce bundle size for mobile
const isMobile = window.innerWidth < 768;
if (!isMobile) {
  // Load desktop-specific features
}
\`\`\`

## Breakpoints Strategy

\`\`\`css
/* Tailwind CSS breakpoints (recommended) */
sm: 640px   /* Small phone */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */

/* Usage */
<div className="text-base md:text-lg lg:text-xl">
  Responsive text sizing
</div>
\`\`\`

## Testing Responsive Design

\`\`\`javascript
describe('Responsive Layout', () => {
  it('should show single column on mobile', () => {
    const { container } = render(<Products />);

    // Mock mobile viewport
    global.innerWidth = 375;

    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1');
  });

  it('should show 3 columns on desktop', () => {
    global.innerWidth = 1280;

    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('lg:grid-cols-3');
  });
});
\`\`\`

## Performance Results

- Desktop: 95 Lighthouse score
- Mobile: 92 Lighthouse score
- Page load: <2s on 4G network

## Key Principles

1. **Mobile first** - Start small, enhance for larger screens
2. **Touch friendly** - 44px minimum targets
3. **Performance** - Lazy load heavy assets
4. **Test** - Check on real devices
5. **Content** - Prioritize content over decoration

## Conclusion

Responsive design is about creating excellent experiences at every screen size.
    `
  },
  {
    id: "12",
    title: "Authentication & Security: JWT vs Sessions in Node.js",
    slug: "jwt-vs-sessions-security",
    excerpt: "Comparing JWT and session-based authentication for modern applications.",
    date: "2024-10-03",
    readTime: 8,
    category: "Backend",
    projectName: "Forma Construction",
    projectId: "forma",
    image: "/images/forma.png",
    tags: ["Security", "Authentication", "JWT", "Sessions"],
    content: `
# Authentication & Security: JWT vs Sessions in Node.js

Choosing the right authentication method is critical for security and scalability.

## JWT (JSON Web Tokens)

### Pros
- Stateless (no server storage needed)
- Mobile-friendly
- Scales easily across multiple servers
- Can include user data (claims)

### Cons
- Token revocation is hard
- Larger payload than sessions
- Subject to token injection if not careful

### Implementation

\`\`\`javascript
// Generate JWT
const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Verify JWT
const decoded = jwt.verify(token, process.env.JWT_SECRET);

// Middleware
app.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});
\`\`\`

## Session-Based Authentication

### Pros
- Token revocation is easy
- Smaller payload
- Industry standard, well-understood
- Can be more secure with proper setup

### Cons
- Server state required
- Not ideal for mobile/APIs
- Doesn't scale as easily

### Implementation

\`\`\`javascript
// Establish session
app.use(session({
  store: new RedisStore(),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
}));

app.post('/login', (req, res) => {
  req.session.userId = user.id;
  req.session.role = user.role;
  res.json({ message: 'Logged in' });
});

// Middleware
app.use((req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
});
\`\`\`

## Comparison Table

| Feature | JWT | Sessions |
|---------|-----|----------|
| Server State | No | Yes (Redis) |
| Revocation | Hard | Easy |
| Payload Size | Large | Small |
| Scalability | Excellent | Good |
| Mobile | Excellent | Good |
| Security | Good | Excellent |

## Our Choice: JWT with Refresh Tokens

\`\`\`javascript
// Access token (short-lived)
const accessToken = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: '15m' }
);

// Refresh token (long-lived, stored in Redis)
const refreshToken = jwt.sign(
  { userId: user.id },
  process.env.REFRESH_TOKEN_SECRET,
  { expiresIn: '7d' }
);

await redis.setex(
  \`refresh:\${user.id}\`,
  7 * 24 * 60 * 60,
  refreshToken
);

// Refresh endpoint
app.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ accessToken: newAccessToken });
  } catch {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});
\`\`\`

## Security Best Practices

1. **Always use HTTPS** - Tokens can be intercepted
2. **Set appropriate expiration** - Shorter is more secure
3. **Store securely** - Use httpOnly cookies, not localStorage
4. **Validate thoroughly** - Check signature, expiration, claims
5. **Implement refresh** - Don't use single long-lived tokens
6. **CORS properly** - Limit which origins can make requests

## Key Takeaway

JWT is excellent for stateless, scalable systems. Sessions are great for traditional web apps. Consider refresh tokens to get best of both worlds.
    `
  },
  {
    id: "13",
    title: "Testing Node.js APIs: Unit, Integration, and E2E Testing",
    slug: "nodejs-api-testing",
    excerpt: "Complete guide to testing Node.js applications at different levels.",
    date: "2024-09-26",
    readTime: 9,
    category: "Testing",
    projectName: "Forma Construction",
    projectId: "forma",
    image: "/images/forma.png",
    tags: ["Testing", "Jest", "Node.js", "Quality"],
    content: `
# Testing Node.js APIs: Unit, Integration, and E2E Testing

Good tests catch bugs early and prevent regressions. Here's our testing strategy.

## Testing Pyramid

\`\`\`
        E2E (5%)
      Integration (15%)
    Unit Tests (80%)
\`\`\`

## Unit Tests (Jest)

Test individual functions in isolation:

\`\`\`javascript
describe('calculateRolePermissions', () => {
  it('admin has all permissions', () => {
    const perms = calculateRolePermissions('admin');
    expect(perms).toContain('read');
    expect(perms).toContain('write');
    expect(perms).toContain('delete');
  });

  it('viewer has only read permission', () => {
    const perms = calculateRolePermissions('viewer');
    expect(perms).toEqual(['read']);
  });

  it('throws on invalid role', () => {
    expect(() => calculateRolePermissions('invalid')).toThrow();
  });
});
\`\`\`

## Integration Tests (Supertest)

Test API endpoints end-to-end:

\`\`\`javascript
describe('POST /api/projects', () => {
  it('creates project with valid data', async () => {
    const response = await request(app)
      .post('/api/projects')
      .set('Authorization', \`Bearer \${token}\`)
      .send({
        name: 'New Project',
        description: 'Test project',
        budget: 50000
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('New Project');
  });

  it('rejects unauthorized requests', async () => {
    const response = await request(app)
      .post('/api/projects')
      .send({ name: 'No Auth Project' });

    expect(response.status).toBe(401);
  });

  it('validates required fields', async () => {
    const response = await request(app)
      .post('/api/projects')
      .set('Authorization', \`Bearer \${token}\`)
      .send({ description: 'Missing name' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
\`\`\`

## Database Mocking

\`\`\`javascript
jest.mock('../db', () => ({
  query: jest.fn()
}));

describe('Project Service', () => {
  beforeEach(() => {
    require('../db').query.mockClear();
  });

  it('fetches project from database', async () => {
    const mockData = { id: '123', name: 'Test' };
    require('../db').query.mockResolvedValue([mockData]);

    const result = await getProject('123');

    expect(result).toEqual(mockData);
    expect(require('../db').query).toHaveBeenCalledWith(
      'SELECT * FROM projects WHERE id = $1',
      ['123']
    );
  });
});
\`\`\`

## E2E Tests (Playwright)

Test complete user workflows:

\`\`\`typescript
import { test, expect } from '@playwright/test';

test('user can create project', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('input[name="email"]', 'user@test.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button:has-text("Login")');

  // Wait for redirect
  await page.waitForURL('/dashboard');

  // Create project
  await page.click('button:has-text("New Project")');
  await page.fill('input[name="projectName"]', 'E2E Test Project');
  await page.click('button:has-text("Create")');

  // Verify
  await expect(page).toHaveURL(/\\/projects\\/\\d+/);
  await expect(page.locator('h1')).toContainText('E2E Test Project');
});
\`\`\`

## Coverage Metrics

\`\`\`bash
npm run test -- --coverage

# Output
COVERAGE:
Statements   : 78.5% ( 145/185 )
Branches     : 72.1% ( 98/136 )
Functions    : 85.0% ( 34/40 )
Lines        : 79.3% ( 138/174 )
\`\`\`

## CI/CD Integration

\`\`\`yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:14
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'

      - run: npm ci
      - run: npm run test -- --coverage
      - run: npm run test:e2e

      - uses: codecov/codecov-action@v2
        with:
          files: ./coverage/coverage-final.json
\`\`\`

## Best Practices

1. **Test behavior, not implementation** - Don't test internal details
2. **Aim for 70%+ coverage** - More time is spent debugging than writing tests
3. **Use test data builders** - Create reusable test objects
4. **Mock external services** - Don't call real APIs in tests
5. **Run tests before commits** - Use Git hooks

\`\`\`json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run test -- --onlyChanged",
      "pre-push": "npm run test:all"
    }
  }
}
\`\`\`

## Results

- Bug detection: 40% of issues caught in tests
- Refactoring confidence: 95% of developers feel safe
- Regression rate: Dropped 60% with comprehensive tests

## Conclusion

Good testing practices improve code quality, reduce bugs, and increase developer confidence.
    `
  },
  {
    id: "14",
    title: "Deployment Strategies: Vercel, Railway, and Docker",
    slug: "deployment-strategies",
    excerpt: "Comparing deployment platforms for full-stack applications.",
    date: "2024-09-19",
    readTime: 7,
    category: "DevOps",
    projectName: "Forma Construction",
    projectId: "forma",
    image: "/images/forma.png",
    tags: ["DevOps", "Deployment", "Docker", "Vercel"],
    content: `
# Deployment Strategies: Vercel, Railway, and Docker

Choosing where and how to deploy affects cost, scalability, and reliability.

## Vercel (Frontend)

### Pros
- Zero-config deployment for Next.js
- Automatic SSL & CDN
- Preview deployments for PRs
- Edge functions for serverless logic

### Cons
- Expensive for heavy compute
- Cold starts for functions
- Limited customization

### Setup

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Environment variables
vercel env add DATABASE_URL
\`\`\`

## Railway (Backend)

### Pros
- Easy deployment for Node.js + PostgreSQL
- Built-in database provisioning
- GitHub integration
- Pay-as-you-go pricing
- Great for small teams

### Cons
- Limited to specific tech stacks
- Less control than VPS
- Small community

### Setup

\`\`\`bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up

# View logs
railway logs
\`\`\`

## Docker + VPS (Full Control)

### Pros
- Complete control
- Lowest cost at scale
- Can run any tech stack
- Reproducible environments

### Cons
- More operational work
- Need to manage servers
- Requires DevOps knowledge

### Dockerfile

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]
\`\`\`

### Docker Compose (Local + Production)

\`\`\`yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/app
    depends_on:
      - db

  db:
    image: postgres:14
    environment:
      POSTGRES_DB: app
      POSTGRES_PASSWORD: secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
\`\`\`

## CI/CD with GitHub Actions

\`\`\`yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci && npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: |
          npm i -g @railway/cli
          railway up
        env:
          RAILWAY_TOKEN: \${{ secrets.RAILWAY_TOKEN }}
\`\`\`

## Cost Comparison

| Platform | Setup | Monthly | Scaling |
|----------|-------|---------|---------|
| Vercel | $0 | $0-100 | Automatic |
| Railway | $0 | $5-50 | Manual |
| Docker VPS | $50 | $5-20 | Manual |

## Our Choice: Hybrid

- **Frontend:** Vercel (Next.js)
- **Backend:** Railway (Node.js + PostgreSQL)
- **Future:** Docker on Kubernetes when scaling

## Monitoring

\`\`\`javascript
// Sentry for error tracking
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

app.use(Sentry.Handlers.errorHandler());
\`\`\`

## Key Takeaways

1. **Start simple** - Vercel + Railway is great for most projects
2. **Monitor early** - Set up error tracking from day 1
3. **Automate deploys** - GitHub Actions removes manual work
4. **Scale when needed** - Docker for complex requirements

## Conclusion

Choose deployment based on your project's needs, not hype. Start simple, evolve as you grow.
    `
  },
  {
    id: "15",
    title: "Performance Optimization: Reducing Page Load Times by 80%",
    slug: "performance-optimization",
    excerpt: "Practical techniques for dramatically improving web application performance.",
    date: "2024-09-12",
    readTime: 8,
    category: "Performance",
    projectName: "Forma Construction",
    projectId: "forma",
    image: "/images/forma.png",
    tags: ["Performance", "Optimization", "Frontend", "Backend"],
    content: `
# Performance Optimization: Reducing Page Load Times by 80%

When Forma grew to 200+ users, page load times degraded. Here's how we fixed it.

## Initial State

- First Contentful Paint (FCP): 4.2 seconds
- Time to Interactive (TTI): 7.8 seconds
- Lighthouse Score: 42/100

## Phase 1: Frontend Optimization

### Code Splitting

\`\`\`javascript
// Before: Single bundle 850KB
import HeavyComponent from './heavy';

// After: Lazy load on demand
const HeavyComponent = dynamic(() => import('./heavy'), {
  loading: () => <div>Loading...</div>
});
\`\`\`

### Image Optimization

\`\`\`jsx
import Image from 'next/image';

<Image
  src={project.image}
  alt={project.name}
  width={500}
  height={300}
  quality={75}
  placeholder="blur"
/>
\`\`\`

### Results
- Bundle size: 850KB → 280KB (-67%)
- FCP: 4.2s → 1.8s

## Phase 2: API Optimization

### Reduce Payload Size

**Before:**
\`\`\`javascript
const response = await fetch('/api/projects');
// Returns full project objects with all fields
// 150KB for 50 projects
\`\`\`

**After:**
\`\`\`javascript
const response = await fetch('/api/projects?fields=id,name,status');
// Returns only needed fields
// 15KB for 50 projects (-90%)
\`\`\`

### Implement Caching

\`\`\`javascript
// Cache-Control headers
app.get('/api/projects', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300'); // 5 minutes
  res.json(projects);
});

// Browser caches, no network call for 5 minutes
\`\`\`

### Results
- API response: 150KB → 15KB (-90%)
- TTI: 7.8s → 2.1s

## Phase 3: Database Optimization

### Query Optimization

\`\`\`javascript
// Before: N+1 queries
const projects = await Project.find();
for (const project of projects) {
  project.documents = await Document.find({ projectId: project._id });
}
// 50 queries = 1000ms

// After: Single aggregation
const projects = await Project.aggregate([
  { $lookup: { from: 'documents', ... } }
]);
// 1 query = 80ms
\`\`\`

### Database Indexing

\`\`\`javascript
// Index frequently queried fields
db.projects.createIndex({ userId: 1, createdAt: -1 });
db.documents.createIndex({ projectId: 1 });
\`\`\`

### Results
- Database query: 1000ms → 80ms
- TTI: 2.1s → 890ms

## Phase 4: Caching Strategy

### Redis Cache Layer

\`\`\`javascript
async function getProjects(userId) {
  // Check cache first
  const cached = await redis.get(\`projects:\${userId}\`);
  if (cached) return JSON.parse(cached);

  // Fetch from database if not cached
  const projects = await db.query(...);

  // Cache for 5 minutes
  await redis.setex(\`projects:\${userId}\`, 300, JSON.stringify(projects));

  return projects;
}
\`\`\`

### Results
- Cache hit rate: 60%
- Subsequent requests: <50ms

## Final Results

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| FCP | 4.2s | 0.8s | 81% ↓ |
| TTI | 7.8s | 0.9s | 88% ↓ |
| Bundle | 850KB | 280KB | 67% ↓ |
| API Payload | 150KB | 15KB | 90% ↓ |
| Lighthouse | 42/100 | 92/100 | 119% ↑ |

## Performance Monitoring

Track performance in production:

\`\`\`javascript
// Send metrics to monitoring service
import { recordMetrics } from './monitoring';

window.addEventListener('load', () => {
  const navigation = performance.getEntriesByType('navigation')[0];
  recordMetrics({
    fcp: navigation.responseEnd - navigation.fetchStart,
    tti: performance.timing.loadEventEnd - performance.timing.navigationStart
  });
});
\`\`\`

## Key Takeaways

1. **Profile first** - Identify bottlenecks with Chrome DevTools
2. **Prioritize** - Fix high-impact issues first
3. **Measure impact** - Before/after metrics prove effectiveness
4. **Monitor continuously** - Performance degrades over time
5. **Iterate** - Optimization is ongoing, not one-time

## Tools Used

- Chrome DevTools (profiling)
- Lighthouse (audits)
- WebPageTest (monitoring)
- New Relic (production monitoring)

## Conclusion

Performance is a feature. Every 1 second improvement increases engagement and reduces bounce rate.
    `
  },
  {
    id: "16",
    title: "Building Scalable Payment Processing Systems",
    slug: "scalable-payment-systems",
    excerpt: "How to handle millions of transactions reliably and securely.",
    date: "2024-09-05",
    readTime: 8,
    category: "Backend",
    projectName: "Double Bay Website",
    projectId: "doublebay",
    image: "/images/doulebay.png",
    tags: ["Payments", "Scalability", "Stripe", "Architecture"],
    content: `
# Building Scalable Payment Processing Systems

Processing payments at scale requires thinking about reliability, security, and accuracy.

## Payment Flow Architecture

\`\`\`
User → Frontend → Backend → Stripe API → Bank
  ↓                                        ↓
  Webhook ← Payment Confirmation ← Stripe
\`\`\`

## Idempotent Payments

Never process same payment twice:

\`\`\`javascript
// Use idempotency key
const idempotencyKey = \`\${userId}-\${cartId}-\${Date.now()}\`;

const paymentIntent = await stripe.paymentIntents.create(
  {
    amount: total,
    currency: 'usd',
    metadata: { userId, orderId }
  },
  {
    idempotencyKey: idempotencyKey
  }
);

// If network fails, retry safely
// Stripe will return same PaymentIntent
\`\`\`

## Queue-Based Processing

Process payments asynchronously:

\`\`\`javascript
// Add job to queue
await queue.add('process-payment', {
  paymentIntentId,
  userId,
  amount
});

// Worker processes jobs
queue.process('process-payment', async (job) => {
  const { paymentIntentId } = job.data;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Create order
      await db.query('INSERT INTO orders (...) VALUES (...)');

      // Send confirmation email
      await sendEmail(...);

      // Update inventory
      await updateInventory(...);
    }
  } catch (error) {
    // Retry job
    throw error;
  }
});
\`\`\`

## Dead Letter Queue

Handle failed payments:

\`\`\`javascript
// If payment fails after 3 retries
queue.on('failed', async (job, error) => {
  // Log for manual review
  await db.query(
    'INSERT INTO failed_payments (payment_id, error) VALUES ($1, $2)',
    [job.data.paymentIntentId, error.message]
  );

  // Alert support team
  await sendAlert({
    to: 'support@company.com',
    message: \`Payment \${job.data.paymentIntentId} failed\`
  });
});
\`\`\`

## Webhook Reliability

Handle webhook retries and failures:

\`\`\`javascript
app.post('/webhooks/stripe', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  // Verify webhook signature
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return res.status(400).send(\`Webhook Error: \${error.message}\`);
  }

  // Handle event
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentFailure(event.data.object);
        break;
    }

    res.json({ received: true });
  } catch (error) {
    // Webhook will retry if we don't return 200
    res.status(500).send('Error processing webhook');
  }
});
\`\`\`

## Reconciliation

Daily reconciliation with payment provider:

\`\`\`javascript
// Compare our records with Stripe
const stripeTransactions = await stripe.charges.list({ limit: 100 });
const ourTransactions = await db.query('SELECT * FROM transactions');

const discrepancies = stripeTransactions.filter(stripe =>
  !ourTransactions.find(ours => ours.stripe_id === stripe.id)
);

if (discrepancies.length > 0) {
  // Alert: missing transactions
  await alertFinance(discrepancies);
}
\`\`\`

## Performance Under Load

\`\`\`javascript
// Rate limiting per user
const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  keyGenerator: (req) => req.user.id
});

app.post('/api/payments', rateLimiter, handlePayment);

// Load balancing
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
}
\`\`\`

## Results

- Transactions: 100+ daily
- Success rate: 99.8%
- Duplicate charges: 0
- Average processing time: 150ms
- P95 latency: 500ms

## Key Principles

1. **Async processing** - Don't block on payment confirmation
2. **Idempotency** - Handle network failures gracefully
3. **Webhooks** - Use async confirmations, not synchronous
4. **Reconciliation** - Daily verification with payment provider
5. **Monitoring** - Alert on failed payments immediately

## Security

- Use PCI-DSS compliant provider (Stripe)
- Never store card details
- Use HTTPS everywhere
- Log all transactions
- Monitor for fraud patterns

## Conclusion

Payment systems require reliability and security above all else. Design for failures, monitor closely, and reconcile regularly.
    `
  },
  {
    id: "17",
    title: "Building SaaS Analytics: Tracking Metrics That Matter",
    slug: "saas-analytics",
    excerpt: "Essential metrics for SaaS platforms and how to track them.",
    date: "2024-08-29",
    readTime: 7,
    category: "Backend",
    projectName: "Clee",
    projectId: "clee",
    image: "/images/Clee.png",
    tags: ["Analytics", "Metrics", "SaaS", "Data"],
    content: `
# Building SaaS Analytics: Tracking Metrics That Matter

Data drives decisions. Here are the metrics that matter for SaaS businesses.

## Key SaaS Metrics

### Monthly Recurring Revenue (MRR)
\`\`\`javascript
async function calculateMRR() {
  const activeSubscriptions = await db.query(
    'SELECT price FROM subscriptions WHERE status = $1',
    ['active']
  );

  return activeSubscriptions.reduce((sum, sub) => sum + sub.price, 0);
}

// Track over time to see growth
// Clee's MRR: $5K → $25K (5x growth)
\`\`\`

### Customer Acquisition Cost (CAC)
\`\`\`javascript
// Marketing spend / New customers
const marketingSpend = 5000; // $5K/month
const newCustomers = 50;
const cac = marketingSpend / newCustomers; // $100/customer
\`\`\`

### Churn Rate
\`\`\`javascript
async function calculateChurn() {
  const startingCustomers = await db.query(
    'SELECT COUNT(*) FROM subscriptions WHERE created_at <= $1',
    [startOfMonth]
  );

  const cancelled = await db.query(
    'SELECT COUNT(*) FROM subscriptions WHERE cancelled_at >= $1 AND cancelled_at < $2',
    [startOfMonth, endOfMonth]
  );

  return cancelled / startingCustomers;
}

// Clee's churn: 5% monthly = 60% annually (need to improve)
\`\`\`

## Event Tracking

\`\`\`javascript
// Track important user actions
async function trackEvent(userId, eventType, metadata) {
  await db.query(
    'INSERT INTO events (user_id, event_type, metadata, created_at) VALUES ($1, $2, $3, $4)',
    [userId, eventType, JSON.stringify(metadata), new Date()]
  );
}

// Usage
await trackEvent(userId, 'booking_created', {
  serviceId: service.id,
  amount: service.price
});

await trackEvent(userId, 'booking_completed', {
  bookingId: booking.id,
  duration: booking.duration
});
\`\`\`

## Funnel Analysis

\`\`\`javascript
// Understand conversion at each step
async function getFunnel() {
  const steps = [
    { name: 'Signup', users: 1000 },
    { name: 'Verified Email', users: 750 },
    { name: 'Created Business', users: 450 },
    { name: 'First Booking', users: 200 },
    { name: 'Paid Plan', users: 100 }
  ];

  return steps.map((step, i) => ({
    ...step,
    conversionRate: step.users / (i === 0 ? 1000 : steps[i-1].users)
  }));
}

// Result:
// Signup → Verified: 75%
// Verified → Business: 60% ← Bottleneck!
// Business → Booking: 44%
// Booking → Paid: 50%
\`\`\`

## Cohort Analysis

\`\`\`javascript
// Track user behavior by signup cohort
async function getCohortAnalysis() {
  // Group users by signup month
  // Track retention by month after signup

  const cohorts = await db.query(\`
    SELECT
      DATE_TRUNC('month', users.created_at) as cohort,
      DATE_TRUNC('month', events.created_at) as month,
      COUNT(DISTINCT users.id) as active_users
    FROM users
    JOIN events ON users.id = events.user_id
    GROUP BY cohort, month
    ORDER BY cohort, month
  \`);

  return cohorts;
}

// Cohort table:
//           Month 0  Month 1  Month 2  Month 3
// Jan 2024   500      450      380      290
// Feb 2024   400      360      290
// Mar 2024   450      405
// Apr 2024   520
\`\`\`

## Dashboard Implementation

\`\`\`jsx
<div className="dashboard-grid">
  <MetricCard
    title="Monthly Revenue"
    value="\$25,000"
    change="+12%"
    trend="up"
  />

  <MetricCard
    title="Active Users"
    value="1,250"
    change="+8%"
    trend="up"
  />

  <MetricCard
    title="Churn Rate"
    value="5.2%"
    change="-0.3%"
    trend="down"
  />

  <ChartCard
    title="Revenue Over Time"
    data={revenueByMonth}
    type="line"
  />

  <ChartCard
    title="Funnel"
    data={funnelData}
    type="bar"
  />
</div>
\`\`\`

## Real-Time Alerts

\`\`\`javascript
// Alert on important events
async function setupAlerts() {
  // Alert if churn > 10%
  const churn = await calculateChurn();
  if (churn > 0.10) {
    await sendAlert('churn_spike', { churn });
  }

  // Alert if revenue drops
  const mrr = await calculateMRR();
  if (mrr < previousMRR * 0.9) {
    await sendAlert('revenue_drop', { mrr });
  }
}
\`\`\`

## Key Takeaways

1. **Measure what matters** - MRR, churn, CAC, LTV
2. **Use cohorts** - Understand user behavior over time
3. **Monitor funnels** - Find where users drop off
4. **Set alerts** - Know when metrics go wrong
5. **Iterate** - Use data to improve product

## Clee's Key Metrics

- **MRR:** $5K → $25K (5x growth)
- **Churn:** 5% (target: <2%)
- **CAC:** $100 (target: payback in 3 months)
- **LTV:** $2,400 (need to improve)
- **Bookings/User:** 8 (strong engagement)

## Conclusion

Analytics aren't vanity metrics - they're how you understand and grow your business.
    `
  },
  {
    id: "18",
    title: "API Design Best Practices: RESTful Endpoints That Scale",
    slug: "api-design-best-practices",
    excerpt: "Designing clean, versioned APIs that developers love to use.",
    date: "2024-08-22",
    readTime: 8,
    category: "Backend",
    projectName: "Forma Construction",
    projectId: "forma",
    image: "/images/forma.png",
    tags: ["API", "REST", "Design", "Documentation"],
    content: `
# API Design Best Practices: RESTful Endpoints That Scale

A well-designed API is a joy to use. A poorly-designed one is a nightmare.

## RESTful Principles

### Use Correct HTTP Verbs

\`\`\`
GET /projects         - List projects
GET /projects/123     - Get single project
POST /projects        - Create project
PATCH /projects/123   - Update project
DELETE /projects/123  - Delete project
\`\`\`

### Meaningful Status Codes

\`\`\`javascript
app.post('/projects', async (req, res) => {
  try {
    // Validate input
    if (!req.body.name) {
      return res.status(400).json({ error: 'Name required' });
    }

    // Create project
    const project = await createProject(req.body);

    // Return 201 Created with Location header
    res.status(201)
      .set('Location', \`/projects/\${project.id}\`)
      .json(project);
  } catch (error) {
    if (error.code === 'DUPLICATE') {
      return res.status(409).json({ error: 'Project exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});
\`\`\`

### Consistent Response Format

\`\`\`javascript
// Success
{
  "status": "success",
  "data": {
    "id": "123",
    "name": "Project Name",
    "created_at": "2024-08-22T10:00:00Z"
  }
}

// Error
{
  "status": "error",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Name is required",
    "details": {
      "field": "name"
    }
  }
}
\`\`\`

## Pagination

\`\`\`javascript
// Support pagination for large result sets
app.get('/projects', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  const [projects, total] = await Promise.all([
    db.query('SELECT * FROM projects LIMIT $1 OFFSET $2', [limit, offset]),
    db.query('SELECT COUNT(*) FROM projects')
  ]);

  res.json({
    data: projects,
    pagination: {
      page,
      limit,
      total: total[0].count,
      pages: Math.ceil(total[0].count / limit)
    }
  });
});

// Usage: GET /projects?page=2&limit=50
\`\`\`

## Filtering & Sorting

\`\`\`javascript
app.get('/projects', async (req, res) => {
  const { status, sortBy = 'created_at', sortOrder = 'DESC' } = req.query;

  let query = 'SELECT * FROM projects WHERE 1=1';
  const params = [];

  // Filter
  if (status) {
    query += ' AND status = $1';
    params.push(status);
  }

  // Sort (whitelist fields to prevent SQL injection)
  const validSort = ['created_at', 'name', 'status'];
  const sortField = validSort.includes(sortBy) ? sortBy : 'created_at';
  const order = sortOrder === 'ASC' ? 'ASC' : 'DESC';

  query += \` ORDER BY \${sortField} \${order}\`;

  const projects = await db.query(query, params);
  res.json(projects);
});

// Usage: GET /projects?status=active&sortBy=name&sortOrder=ASC
\`\`\`

## Versioning

\`\`\`javascript
// API v1
app.get('/v1/projects', (req, res) => {
  // Old format
  res.json([{ id: '123', title: 'Project' }]);
});

// API v2 (backwards incompatible)
app.get('/v2/projects', (req, res) => {
  // New format
  res.json([{ id: '123', name: 'Project', description: 'A project' }]);
});

// Deprecation header
app.get('/v1/projects', (req, res) => {
  res.set('Deprecation', 'true');
  res.set('Sunset', 'Sun, 01 Sep 2025 00:00:00 GMT');
  res.set('Link', '</v2/projects>; rel="successor-version"');
  // ... respond with data
});
\`\`\`

## Authentication & Authorization

\`\`\`javascript
app.get('/projects/:id', async (req, res) => {
  // Authenticate
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const project = await db.query('SELECT * FROM projects WHERE id = $1', [req.params.id]);

  // Authorize
  if (project.user_id !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  res.json(project);
});
\`\`\`

## Rate Limiting

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests
  keyGenerator: (req) => req.user?.id || req.ip,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests',
      retryAfter: req.rateLimit.resetTime
    });
  }
});

app.use('/api/', limiter);
\`\`\`

## Documentation (Swagger/OpenAPI)

\`\`\`yaml
openapi: 3.0.0
info:
  title: Projects API
  version: 2.0.0

paths:
  /projects:
    get:
      tags: [Projects]
      summary: List projects
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
      responses:
        '200':
          description: Projects list
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      \$ref: '#/components/schemas/Project'
                  pagination:
                    \$ref: '#/components/schemas/Pagination'
\`\`\`

## Key Takeaways

1. **RESTful** - Follow HTTP standards
2. **Consistent** - Predictable response formats
3. **Documented** - Swagger/OpenAPI spec
4. **Versioned** - Handle breaking changes gracefully
5. **Secured** - Proper auth/authz and rate limiting
6. **Tested** - Comprehensive API tests

## Tools

- Swagger UI (documentation)
- Postman (testing & mocking)
- Insomnia (alternative to Postman)

## Conclusion

Good API design makes developers happy and reduces support burden. Invest in getting it right from the start.
    `
  },
  {
    id: "19",
    title: "Database Migrations: Managing Schema Changes in Production",
    slug: "database-migrations",
    excerpt: "Safe database schema evolution without downtime.",
    date: "2024-08-15",
    readTime: 7,
    category: "Database",
    projectName: "Forma Construction",
    projectId: "forma",
    image: "/images/forma.png",
    tags: ["Database", "Migrations", "DevOps", "SQL"],
    content: `
# Database Migrations: Managing Schema Changes in Production

Changing database schemas in production is risky. Here's how to do it safely.

## Migration Strategy

### Expand Phase (Add new columns without making them required)

\`\`\`sql
-- Step 1: Add new column as nullable
ALTER TABLE projects ADD COLUMN status VARCHAR(50) DEFAULT 'active';

-- Step 2: Backfill existing data
UPDATE projects SET status = 'active' WHERE status IS NULL;

-- Step 3: Make NOT NULL after backfill complete
ALTER TABLE projects ALTER COLUMN status SET NOT NULL;
\`\`\`

### Contract Phase (Remove deprecated columns)

\`\`\`sql
-- Wait 2 weeks after application stops using column

-- Step 1: Remove from application code
-- Step 2: Stop writing to column
-- Step 3: Drop column from database
ALTER TABLE projects DROP COLUMN deprecated_field;
\`\`\`

## Migration Tool Setup (TypeORM)

\`\`\`typescript
// Create migration
npx typeorm migration:create UpdateProjectsTable

// Generated file
import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProjectsTable1692115200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      \`ALTER TABLE projects ADD COLUMN status VARCHAR(50) DEFAULT 'active'\`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(\`ALTER TABLE projects DROP COLUMN status\`);
  }
}

// Run migrations
npx typeorm migration:run
\`\`\`

## Sequelize Migrations

\`\`\`javascript
// Generate migration
npx sequelize migration:generate --name add-status-to-projects

// Migration file
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('projects', 'status', {
      type: Sequelize.STRING,
      defaultValue: 'active',
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('projects', 'status');
  }
};

// Run
npx sequelize db:migrate
\`\`\`

## Handling Large Tables

For large tables (millions of rows), migrations need special care:

\`\`\`sql
-- Bad: Locks table during migration, causes downtime
ALTER TABLE large_table ADD COLUMN new_column TEXT;

-- Good: Expand-contract pattern with batching
-- Step 1: Add column
ALTER TABLE large_table ADD COLUMN new_column TEXT DEFAULT NULL;

-- Step 2: Backfill in batches
DO $$
DECLARE
  batch_size INT := 10000;
  total_rows INT;
  processed INT := 0;
BEGIN
  SELECT COUNT(*) INTO total_rows FROM large_table;

  WHILE processed < total_rows LOOP
    UPDATE large_table
    SET new_column = 'value'
    WHERE id IN (
      SELECT id FROM large_table
      WHERE new_column IS NULL
      LIMIT batch_size
    );

    processed := processed + batch_size;
    RAISE NOTICE 'Progress: % / %', processed, total_rows;
    COMMIT;
  END LOOP;
END $$;

-- Step 3: Make NOT NULL
ALTER TABLE large_table ALTER COLUMN new_column SET NOT NULL;
\`\`\`

## Testing Migrations

\`\`\`javascript
describe('Database Migrations', () => {
  it('should add status column', async () => {
    // Run migration
    await runMigration('UpdateProjectsTable');

    // Verify column exists
    const columns = await db.query(
      "SELECT column_name FROM information_schema.columns WHERE table_name = 'projects'"
    );

    expect(columns.map(c => c.column_name)).toContain('status');
  });

  it('should backfill existing data', async () => {
    // Insert test data
    await db.query('INSERT INTO projects (name) VALUES ($1)', ['Test']);

    // Run migration
    await runMigration('UpdateProjectsTable');

    // Verify backfill
    const project = await db.query('SELECT status FROM projects LIMIT 1');
    expect(project.status).toBe('active');
  });
});
\`\`\`

## Zero-Downtime Deployments

\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy

on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      # Step 1: Run migrations
      - name: Run migrations
        run: npm run migrate

      # Step 2: Deploy new code
      - name: Deploy app
        run: npm run deploy

      # Step 3: Verify health
      - name: Health check
        run: curl https://api.example.com/health
\`\`\`

## Rollback Strategy

Always plan for rollback:

\`\`\`typescript
// Keep down() migrations complete
public async down(queryRunner: QueryRunner): Promise<void> {
  // Fully restore previous state
  await queryRunner.query(\`ALTER TABLE projects DROP COLUMN status\`);
}

// Test rollback
npx typeorm migration:revert
\`\`\`

## Key Principles

1. **Expand-contract** - Add, backfill, make required, deploy, then remove
2. **Batch backfills** - Don't lock tables for long
3. **Test migrations** - Run against production-size database
4. **Monitor** - Watch for slow queries after migration
5. **Plan rollback** - Know how to revert if needed

## Tools

- TypeORM (ORM migrations)
- Sequelize (ORM migrations)
- Flyway (database-agnostic)
- Liquibase (enterprise)

## Conclusion

Careful migration planning prevents downtime and data loss. The expand-contract pattern is your friend.
    `
  },
  {
    id: "20",
    title: "Implementing Search: Full-Text Search vs Elasticsearch",
    slug: "search-implementation",
    excerpt: "Choosing between PostgreSQL full-text search and Elasticsearch.",
    date: "2024-08-08",
    readTime: 7,
    category: "Backend",
    projectName: "Hariir - Job Portal",
    projectId: "hariir",
    image: "/images/image4.png",
    tags: ["Search", "Elasticsearch", "Performance", "PostgreSQL"],
    content: `
# Implementing Search: Full-Text Search vs Elasticsearch

Search is critical for discovering content. Here's how to implement it well.

## PostgreSQL Full-Text Search

Great for small-to-medium datasets (< 1M documents):

### Setup

\`\`\`sql
-- Create search vector column
ALTER TABLE jobs ADD COLUMN search_vector tsvector;

-- Create index for fast search
CREATE INDEX idx_jobs_search ON jobs USING GIN(search_vector);

-- Auto-update search vector on insert/update
CREATE TRIGGER jobs_search_vector_update
BEFORE INSERT OR UPDATE ON jobs
FOR EACH ROW
EXECUTE FUNCTION tsvector_update_trigger(search_vector, 'pg_catalog.english', title, description, skills);
\`\`\`

### Querying

\`\`\`sql
-- Simple text search
SELECT * FROM jobs
WHERE search_vector @@ plainto_tsquery('english', 'senior developer');

-- Phrase search
SELECT * FROM jobs
WHERE search_vector @@ to_tsquery('english', 'senior <-> developer');

-- Complex query
SELECT * FROM jobs
WHERE search_vector @@ to_tsquery('english', 'senior & (developer | engineer)');

-- Ranking results
SELECT id, title, ts_rank(search_vector, query) as rank
FROM jobs,
plainto_tsquery('english', 'senior developer') query
WHERE search_vector @@ query
ORDER BY rank DESC;
\`\`\`

### Advantages
- No external dependency
- Decent performance for < 1M documents
- Good for English text
- Built into PostgreSQL

### Limitations
- Limited language support
- Doesn't handle synonyms well
- No autocomplete
- Ranking is basic

## Elasticsearch

For large-scale search (> 1M documents) or advanced features:

### Setup with Docker

\`\`\`yaml
version: '3.8'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.0.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data

volumes:
  elasticsearch_data:
\`\`\`

### Index Configuration

\`\`\`javascript
// Create index with analyzer
const client = new elasticsearch.Client({ node: 'http://localhost:9200' });

await client.indices.create({
  index: 'jobs',
  body: {
    settings: {
      analysis: {
        analyzer: {
          english_analyzer: {
            type: 'standard',
            stopwords: '_english_'
          }
        }
      }
    },
    mappings: {
      properties: {
        title: { type: 'text', analyzer: 'english_analyzer' },
        description: { type: 'text', analyzer: 'english_analyzer' },
        location: { type: 'keyword' },
        salary: { type: 'integer' },
        created_at: { type: 'date' }
      }
    }
  }
});
\`\`\`

### Indexing Documents

\`\`\`javascript
// Index new job
await client.index({
  index: 'jobs',
  id: job.id,
  body: {
    title: job.title,
    description: job.description,
    location: job.location,
    salary: job.salary,
    created_at: job.created_at
  }
});

// Bulk index for performance
const docs = jobs.flatMap(job => [
  { index: { _index: 'jobs', _id: job.id } },
  { title: job.title, description: job.description, ... }
]);

await client.bulk({ body: docs });
\`\`\`

### Searching

\`\`\`javascript
// Simple search
const results = await client.search({
  index: 'jobs',
  body: {
    query: {
      multi_match: {
        query: 'senior developer',
        fields: ['title', 'description']
      }
    }
  }
});

// Complex search with filters
const results = await client.search({
  index: 'jobs',
  body: {
    query: {
      bool: {
        must: [
          { multi_match: { query: 'developer', fields: ['title', 'description'] } }
        ],
        filter: [
          { term: { location: 'San Francisco' } },
          { range: { salary: { gte: 100000 } } }
        ]
      }
    },
    sort: [{ created_at: { order: 'desc' } }]
  }
});

// Autocomplete
const results = await client.search({
  index: 'jobs',
  body: {
    query: {
      match_phrase_prefix: {
        title: 'senior dev'
      }
    }
  }
});
\`\`\`

## Comparison

| Feature | PostgreSQL FTS | Elasticsearch |
|---------|---|---|
| Setup Complexity | Simple | Complex |
| Performance | Good for < 1M docs | Excellent for any size |
| Language Support | Limited | 30+ languages |
| Autocomplete | No | Yes |
| Synonyms | Limited | Excellent |
| Ranking | Basic | Advanced |
| Cost | Included | External service |
| Learning Curve | Easy | Steep |

## Our Choice

- **Hariir:** PostgreSQL FTS (200 jobs is small)
- **Large scale:** Would use Elasticsearch

## Keeping Sync

When using separate search engine:

\`\`\`javascript
// Update database then search
async function createJob(jobData) {
  // 1. Save to database
  const job = await db.query('INSERT INTO jobs (...) VALUES (...)');

  // 2. Index in search engine
  await elasticsearch.index({
    index: 'jobs',
    id: job.id,
    body: jobData
  });

  return job;
}

// Handle failure gracefully
async function syncToElasticsearch() {
  const jobs = await db.query('SELECT * FROM jobs');

  for (const job of jobs) {
    try {
      await elasticsearch.index({
        index: 'jobs',
        id: job.id,
        body: job
      });
    } catch (error) {
      console.error(\`Failed to index job \${job.id}\`, error);
      // Alert ops team
    }
  }
}
\`\`\`

## Key Takeaways

1. **Start with PostgreSQL FTS** - Good for most cases
2. **Scale to Elasticsearch** - When you need advanced features
3. **Keep sync** - Search index != source of truth
4. **Monitor** - Track slow searches and fix them
5. **Test** - Search is critical UX

## Conclusion

Good search improves user experience dramatically. Choose the right tool for your scale.
    `
  }
];

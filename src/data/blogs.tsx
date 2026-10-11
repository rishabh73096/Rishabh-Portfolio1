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

const RAW_BLOGS: Blog[] = [
  {
    id: "1",
    title: "Multi-Tenant SaaS with MongoDB: Data Isolation & Performance",
    slug: "multi-tenant-mongodb-saas",
    excerpt: "Building Clee SaaS platform with MongoDB - tenant isolation, indexing strategies, and real-world lessons learned.",
    date: "2026-06-10",
    readTime: 7,
    category: "Backend",
    projectName: "Clee",
    projectId: "clee",
    image: "/images/Clee.png",
    tags: ["MongoDB", "SaaS", "Node.js", "Architecture"],
    content: `# Multi-Tenant SaaS with MongoDB: Data Isolation & Performance

Building Clee taught us how to architect MongoDB for multi-tenant systems where each customer's data must be completely isolated and fast.

## MongoDB Tenant Isolation Strategy

Every collection includes a \`tenantId\` field for data separation:

\`\`\`javascript
// Queries ALWAYS filter by tenant
db.users.find({ tenantId: req.user.tenantId })
db.bookings.find({ tenantId: req.user.tenantId })
\`\`\`

## Compound Indexing for Performance

\`\`\`javascript
db.bookings.createIndex({ tenantId: 1, date: 1 });
db.users.createIndex({ tenantId: 1, email: 1 });
\`\`\`

**Result**: Query time 1200ms → 80ms (15x faster!)

## Express Middleware Validation

\`\`\`javascript
app.get('/api/bookings', (req, res) => {
  // Middleware validates tenant
  const bookings = await Booking.find({
    tenantId: req.user.tenantId
  });
  res.json(bookings);
});
\`\`\`

## Key Lessons

1. **Filter EVERY query** - Data leaks are catastrophic
2. **Index from day 1** - Performance compounds as you grow
3. **Validate at API** - Never trust frontend tenant ID
`
  },
  {
    id: "2",
    title: "Distributed Locks with Redis: Preventing Overbooking",
    slug: "redis-locks-booking",
    excerpt: "Prevent concurrent booking conflicts using Redis locks in Node.js - Clee's battle-tested solution.",
    date: "2026-06-20",
    readTime: 6,
    category: "Backend",
    projectName: "Clee",
    projectId: "clee",
    image: "/images/Clee.png",
    tags: ["Redis", "Node.js", "Concurrency"],
    content: `# Distributed Locks with Redis: Preventing Overbooking

When multiple users book the same slot simultaneously, distributed locks prevent double-booking.

## The Problem

User A and B both try to book 2 PM slot:
- A checks: available ✓ → books
- B checks: available ✓ → books TOO (BUG!)

## Redis Lock Solution

\`\`\`javascript
async function bookSlot(slotId) {
  const lockKey = \`lock:slot:\${slotId}\`;

  // Acquire lock (NX = only if doesn't exist, EX = expire in 30s)
  const acquired = await redis.set(lockKey, 'locked', 'NX', 'EX', 30);

  if (!acquired) {
    throw new Error('Slot just booked');
  }

  try {
    // Check availability & book
    const slot = await Booking.findOne({ slotId });
    if (slot.available) {
      await Booking.create({ slotId });
    }
  } finally {
    await redis.del(lockKey);
  }
}
\`\`\`

## Results from Clee

- Daily bookings: 100+
- Double-bookings: 0
- Lock wait time: <50ms average

## When to Use

✅ Booking systems
✅ Inventory management
✅ Payment processing
`
  },
  {
    id: "3",
    title: "Building a Loyalty Rewards Engine with React & Node.js",
    slug: "loyalty-rewards-engine",
    excerpt: "Clee's flexible rewards system: React formula builder + Node.js calculations.",
    date: "2026-06-30",
    readTime: 6,
    category: "Frontend",
    projectName: "Clee",
    projectId: "clee",
    image: "/images/Clee.png",
    tags: ["React", "Node.js", "State Management"],
    content: `# Building a Loyalty Rewards Engine with React & Node.js

Merchants need flexible loyalty rules without coding. React + Node.js makes it simple.

## React Formula Builder

\`\`\`javascript
const [reward, setReward] = useState({
  type: 'fixed', // or 'percentage'
  value: 100,
  triggerType: 'booking'
});

// Live preview for merchant
const preview = calculatePreview(reward, sampleData);
\`\`\`

## Node.js Calculation

\`\`\`javascript
app.post('/bookings/:id/complete', async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  const rule = await RewardRule.findOne({ tenantId: booking.tenantId });

  let reward = rule.type === 'fixed'
    ? rule.value
    : booking.amount * (rule.value / 100);

  await Customer.updateOne(
    { _id: booking.customerId },
    { $inc: { rewardBalance: reward } }
  );
});
\`\`\`

## Impact

- Merchants using rewards: 78% adoption
- Repeat bookings increase: 40%
- Customer lifetime value: +35%
`
  },
  {
    id: "4",
    title: "MongoDB Aggregation Pipelines: N+1 Queries Solved",
    slug: "mongodb-aggregation-pipelines",
    excerpt: "Transform slow N+1 queries into single aggregation pipelines - 87% faster queries.",
    date: "2024-11-05",
    readTime: 7,
    category: "Database",
    projectName: "Forma Construction",
    projectId: "forma",
    image: "/images/forma.png",
    tags: ["MongoDB", "Performance", "Optimization"],
    content: `# MongoDB Aggregation Pipelines: N+1 Queries Solved

Forma grew to 200+ users and hit the performance cliff. Aggregation pipelines saved us.

## The N+1 Problem

\`\`\`javascript
// BAD: 50 projects + 50 document queries = 51 total queries (2100ms)
const projects = await Project.find({ userId });
for (const project of projects) {
  project.documents = await Document.find({ projectId: project._id });
}
\`\`\`

## Aggregation Pipeline Solution

\`\`\`javascript
// GOOD: Single query (280ms)
const projects = await Project.aggregate([
  { $match: { userId: req.user.id } },
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
\`\`\`

**87% faster! 50x fewer database calls!**

## Compound Indexes

\`\`\`javascript
db.projects.createIndex({ userId: 1, createdAt: -1 });
db.documents.createIndex({ projectId: 1 });
\`\`\`

## When to Use Aggregation

✅ Joining multiple collections
✅ Complex calculations
✅ Grouping & counting
✅ Transforming data shapes
`
  },
  {
    id: "5",
    title: "Stripe Payments in Node.js: Integration to Webhooks",
    slug: "stripe-payments-nodejs",
    excerpt: "Complete Stripe integration in Express - payment intents, webhooks, idempotency.",
    date: "2024-09-20",
    readTime: 8,
    category: "Backend",
    projectName: "Grocery Pickup Store",
    projectId: "grocery",
    image: "/images/grocery-pickup-store.png",
    tags: ["Stripe", "Payments", "Node.js"],
    content: `# Stripe Payments in Node.js: Integration to Webhooks

Payment processing is critical. Here's our battle-tested Stripe integration.

## Create Payment Intent

\`\`\`javascript
app.post('/api/payment-intent', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount * 100, // Stripe uses cents
    currency: 'usd',
    metadata: { orderId: req.body.orderId }
  });

  res.json({ clientSecret: paymentIntent.client_secret });
});
\`\`\`

## Webhook Verification (CRITICAL!)

\`\`\`javascript
app.post('/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(
    req.body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );

  if (event.type === 'payment_intent.succeeded') {
    const { metadata, amount } = event.data.object;
    await Order.updateOne({ _id: metadata.orderId }, { status: 'paid' });
  }

  res.json({ received: true });
});
\`\`\`

## Idempotency

\`\`\`javascript
const paymentIntent = await stripe.paymentIntents.create(
  { amount, currency: 'usd' },
  { idempotencyKey: \`order-\${orderId}-\${timestamp}\` }
);
\`\`\`

## Results

- Daily transactions: 100+
- Double-charges: 0
- Success rate: 99.8%
`
  },
  {
    id: "6",
    title: "RBAC in Express.js: Hierarchical Permissions",
    slug: "rbac-express-middleware",
    excerpt: "Implementing role-based access control (Admin > Manager > Staff) in Express.",
    date: "2024-11-15",
    readTime: 7,
    category: "Backend",
    projectName: "Forma Construction",
    projectId: "forma",
    image: "/images/forma.png",
    tags: ["Express.js", "Security", "Authorization"],
    content: `# RBAC in Express.js: Hierarchical Permissions

Forma has 4 role levels with different permissions. Here's how to secure them.

## Permission Model

\`\`\`javascript
const permissions = {
  admin: ['projects:*', 'documents:*', 'team:*'],
  manager: ['projects:read,create', 'documents:read,create'],
  member: ['projects:read', 'documents:read']
};
\`\`\`

## Middleware

\`\`\`javascript
function requirePermission(resource, action) {
  return (req, res, next) => {
    const userPerms = permissions[req.user.role] || [];
    const required = \`\${resource}:\${action}\`;

    if (!userPerms.includes(required) && !userPerms.includes(\`\${resource}:*\`)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  };
}

app.delete('/projects/:id',
  requirePermission('projects', 'delete'),
  deleteProjectHandler
);
\`\`\`

## Database Query Filtering

\`\`\`javascript
app.get('/projects', async (req, res) => {
  let query = { organizationId: req.user.orgId };

  if (req.user.role === 'member') {
    query.assignedTo = req.user.id;
  }

  const projects = await Project.find(query);
  res.json(projects);
});
\`\`\`

## Security Principles

1. **Never trust client** - Always validate server-side
2. **Whitelist, don't blacklist** - Default deny
3. **Filter all queries** - Remove data at database level
4. **Test thoroughly** - RBAC bugs are security bugs
`
  },
  {
    id: "7",
    title: "Real-Time Features with Socket.io in Node.js",
    slug: "socket-io-realtime",
    excerpt: "Add real-time updates to your MERN app with Socket.io - live notifications, presence.",
    date: "2025-01-05",
    readTime: 7,
    category: "Backend",
    projectName: "My Lodge",
    projectId: "mylodge",
    image: "/images/my-lodge-rental-platform.png",
    tags: ["Socket.io", "Node.js", "Real-time"],
    content: `# Real-Time Features with Socket.io in Node.js

Socket.io adds live updates without constant polling. My Lodge uses it for real-time bookings.

## Setup Express + Socket.io

\`\`\`javascript
const io = require('socket.io')(server);

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  const user = verifyToken(token);
  if (!user) return next(new Error('Unauthorized'));
  socket.user = user;
  next();
});

io.on('connection', (socket) => {
  socket.join(\`user:\${socket.user.id}\`);
});
\`\`\`

## Real-Time Notifications

\`\`\`javascript
async function createBooking(bookingData) {
  const booking = await Booking.create(bookingData);

  // Notify owner
  io.to(\`user:\${booking.ownerId}\`).emit('booking:created', booking);

  return booking;
}
\`\`\`

## React Hook Integration

\`\`\`javascript
function useSocket() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SERVER_URL, {
      auth: { token: localStorage.getItem('token') }
    });
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  return socket;
}
\`\`\`

## Performance Tips

✅ Use rooms for broadcasting
✅ Authenticate connections
✅ Handle disconnects gracefully
❌ Don't emit large objects frequently
`
  },
  {
    id: "8",
    title: "JWT Authentication in MERN: Tokens & Refresh Strategy",
    slug: "jwt-auth-mern",
    excerpt: "Secure authentication in MERN stack - access tokens, refresh tokens, httpOnly cookies.",
    date: "2024-11-25",
    readTime: 8,
    category: "Security",
    projectName: "Forma Construction",
    projectId: "forma",
    image: "/images/forma.png",
    tags: ["JWT", "Security", "Authentication"],
    content: `# JWT Authentication in MERN: Tokens & Refresh Strategy

Secure auth is non-negotiable. Here's our two-token system.

## Two-Token Approach

\`\`\`javascript
app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  // Access token (15 min)
  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  // Refresh token (7 days)
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  });

  res.json({ accessToken });
});
\`\`\`

## Protect Routes

\`\`\`javascript
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}
\`\`\`

## Refresh Token Endpoint

\`\`\`javascript
app.post('/refresh-token', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

  const newAccessToken = jwt.sign(
    { userId: decoded.userId },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  res.json({ accessToken: newAccessToken });
});
\`\`\`

## Security Best Practices

1. **httpOnly cookies** - Prevents XSS
2. **Short expiry** - Limits damage if stolen
3. **Refresh rotation** - Long-lived but rotatable
`
  },
  {
    id: "9",
    title: "MongoDB Indexing: Speed Up Queries 10x",
    slug: "mongodb-indexing-performance",
    excerpt: "Strategic indexing in MongoDB - compound indexes, when to index, performance impact.",
    date: "2024-12-05",
    readTime: 6,
    category: "Database",
    projectName: "Forma Construction",
    projectId: "forma",
    image: "/images/forma.png",
    tags: ["MongoDB", "Indexing", "Performance"],
    content: `# MongoDB Indexing: Speed Up Queries 10x

Proper indexing is the difference between 1000ms and 50ms queries.

## Single Field Index

\`\`\`javascript
db.users.createIndex({ email: 1 });
db.projects.createIndex({ userId: 1 });
\`\`\`

## Compound Indexes (Most Powerful)

\`\`\`javascript
db.bookings.createIndex({
  tenantId: 1,      // Filter
  userId: 1,        // Filter
  createdAt: -1     // Sort
});
\`\`\`

## Performance Impact

**Without index**: 1200ms, 50,000 documents examined
**With index**: 50ms, 45 documents examined
**Improvement**: 24x faster!

## Checking Index Usage

\`\`\`javascript
db.bookings.find({ tenantId: ObjectId('...') }).explain('executionStats');

// Look for:
// executionStages.stage: "IXSCAN" = using index ✓
// executionStages.stage: "COLLSCAN" = full scan ❌
\`\`\`

## Indexing Checklist

✅ Foreign keys (tenantId, userId)
✅ Sort fields (createdAt, updatedAt)
✅ Compound on common filters
❌ Don't over-index (slower writes)
`
  },
  {
    id: "10",
    title: "Error Handling in Express: Centralized Middleware",
    slug: "express-error-handling",
    excerpt: "Centralized error handling in Express.js - consistent responses, logging.",
    date: "2024-12-15",
    readTime: 5,
    category: "Backend",
    projectName: "Forma Construction",
    projectId: "forma",
    image: "/images/forma.png",
    tags: ["Express.js", "Error Handling", "Best Practices"],
    content: `# Error Handling in Express: Centralized Middleware

Good error handling prevents silent failures and makes debugging easier.

## Custom Error Class

\`\`\`javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
\`\`\`

## Error Middleware (Place LAST)

\`\`\`javascript
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Server error';

  console.error(\`[\${new Date().toISOString()}] \${statusCode} \${message}\`);

  res.status(statusCode).json({
    error: message,
    status: statusCode
  });
});
\`\`\`

## Using It

\`\`\`javascript
app.post('/projects', async (req, res, next) => {
  try {
    if (!req.body.name) {
      throw new AppError('Name required', 400);
    }
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
});
\`\`\`

## Error Types

✅ 400 - Validation errors
✅ 401 - No auth token
✅ 403 - No permission
✅ 404 - Resource not found
✅ 500 - Server error

## Never Expose Internal Details

❌ Database connection strings
❌ Stack traces to client
✅ Generic "Server error"
✅ Specific validation messages only
`
  },
  {
    id: "11",
    title: "Testing Node.js APIs: Jest & Supertest",
    slug: "nodejs-api-testing",
    excerpt: "Jest + Supertest for testing Express APIs - unit tests, integration tests.",
    date: "2024-12-25",
    readTime: 7,
    category: "Testing",
    projectName: "Forma Construction",
    projectId: "forma",
    image: "/images/forma.png",
    tags: ["Jest", "Testing", "Node.js"],
    content: `# Testing Node.js APIs: Jest & Supertest

Tests catch bugs before production. Here's our testing strategy.

## Setup

\`\`\`bash
npm install --save-dev jest supertest
\`\`\`

## Integration Tests

\`\`\`javascript
const request = require('supertest');
const app = require('../../app');

describe('POST /api/projects', () => {
  it('creates project with valid data', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Authorization', \`Bearer \${token}\`)
      .send({ name: 'Test Project' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('rejects unauthorized requests', async () => {
    const res = await request(app)
      .post('/api/projects')
      .send({ name: 'No Auth' });

    expect(res.status).toBe(401);
  });
});
\`\`\`

## Unit Tests

\`\`\`javascript
const { validateEmail } = require('../../utils/validation');

describe('validateEmail', () => {
  it('accepts valid emails', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });

  it('rejects invalid emails', () => {
    expect(validateEmail('notanemail')).toBe(false);
  });
});
\`\`\`

## Running Tests

\`\`\`bash
npm test                  # Run all
npm test -- --coverage    # With coverage
npm test -- --watch       # Watch mode
\`\`\`

## Coverage Target

✅ 70%+ code coverage
✅ 100% for critical paths (auth, payments)
`
  },
  {
    id: "12",
    title: "Responsive Design in React: Mobile-First with Tailwind",
    slug: "responsive-react-tailwind",
    excerpt: "Mobile-first responsive design in React - Tailwind breakpoints, touch-friendly.",
    date: "2024-10-10",
    readTime: 6,
    category: "Frontend",
    projectName: "Grocery Pickup Store",
    projectId: "grocery",
    image: "/images/grocery-pickup-store.png",
    tags: ["React", "Tailwind CSS", "Responsive"],
    content: `# Responsive Design in React: Mobile-First with Tailwind

60% of users access on mobile. Responsive design is essential.

## Mobile-First Approach

\`\`\`jsx
// Stacks vertically on mobile, side-by-side on desktop
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex-1">Left</div>
  <div className="flex-1">Right</div>
</div>
\`\`\`

## Breakpoints

\`\`\`
sm: 640px   (phones)
md: 768px   (tablets)
lg: 1024px  (laptops)
xl: 1280px  (large)
\`\`\`

## Common Patterns

\`\`\`jsx
// Responsive text
<h1 className="text-2xl md:text-3xl lg:text-4xl">

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Hide/show by screen
<div className="hidden md:block">Desktop only</div>
<div className="md:hidden">Mobile only</div>
\`\`\`

## Touch-Friendly

\`\`\`jsx
// Minimum 44x44px touch target
<button className="px-4 py-3">Tap me</button>
\`\`\`

## Performance

- Initial load: <2s on 4G
- Interaction: <100ms
- Images: Optimized & lazy-loaded
`
  },
  {
    id: "13",
    title: "Caching Product Lookups with Redis: A Cache-Aside Pattern",
    slug: "redis-caching-product-lookups",
    excerpt: "Cutting stock/product lookups to sub-100ms in the Grocery Pickup Store using a Redis cache-aside layer in front of MongoDB.",
    date: "2025-07-10",
    readTime: 6,
    category: "Performance",
    projectName: "Grocery Pickup Store",
    projectId: "grocery",
    image: "/images/grocery-pickup-store.png",
    tags: ["Redis", "Node.js", "Performance"],
    content: `# Caching Product Lookups with Redis: A Cache-Aside Pattern

Grocery Pickup Store serves the same handful of popular products to hundreds of concurrent shoppers. Hitting MongoDB for every stock check doesn't scale — this is the cache-aside layer that got frequent lookups down to sub-100ms.

## The Pattern

\`\`\`javascript
async function getProductStock(productId) {
  const cached = await redis.get(\`stock:\${productId}\`);
  if (cached) return JSON.parse(cached);

  const product = await Product.findById(productId).lean();
  await redis.set(\`stock:\${productId}\`, JSON.stringify(product), "EX", 30);
  return product;
}
\`\`\`

Read from Redis first. On a miss, fall back to MongoDB and repopulate the cache with a short TTL — stock changes often enough that a long TTL would serve stale numbers.

## Invalidating on Write

\`\`\`javascript
async function updateStock(productId, quantity) {
  await Product.updateOne({ _id: productId }, { $inc: { stock: -quantity } });
  await redis.del(\`stock:\${productId}\`); // next read repopulates it
}
\`\`\`

Delete, don't update, the cache key on a write. Recomputing on the next read is simpler than keeping two stores in sync, and the TTL is the safety net if a delete is ever missed.

## Why Cache-Aside Over Write-Through

- No cache-write path to keep correct under concurrent checkout — only reads touch Redis directly.
- A Redis outage degrades to "every request hits Mongo," not a hard failure — the app still works, just slower.
- Short TTL (30s) bounds staleness without needing an event bus to invalidate perfectly.

## Result

Frequent product/stock lookups went from a MongoDB round-trip to a sub-100ms Redis read, with checkout still validating the authoritative stock count in MongoDB before confirming an order.
`
  },
  {
    id: "14",
    title: "Automating Transactional Emails with Postmark in Node.js",
    slug: "postmark-transactional-emails",
    excerpt: "Templated transactional emails and marketing automation flows for Clee's booking platform, built on Postmark's Node.js SDK.",
    date: "2026-07-25",
    readTime: 6,
    category: "Backend",
    projectName: "Clee",
    projectId: "clee",
    image: "/images/Clee.png",
    tags: ["Postmark", "Node.js", "Email"],
    content: `# Automating Transactional Emails with Postmark in Node.js

Clee needed two very different kinds of email out of the same backend: transactional (booking confirmations, receipts) that must land instantly and reliably, and marketing automation (re-engagement, promos) that can tolerate delay. Postmark's message streams map directly onto that split.

## Two Streams, One SDK

\`\`\`javascript
const postmark = require("postmark");
const client = new postmark.ServerClient(process.env.POSTMARK_TOKEN);

// Transactional — outbound stream, sent immediately
await client.sendEmailWithTemplate({
  From: "bookings@clee.co",
  To: customer.email,
  TemplateAlias: "booking-confirmation",
  TemplateModel: { name: customer.name, date, time, service },
  MessageStream: "outbound",
});

// Marketing — broadcast stream, respects unsubscribe state
await client.sendEmailWithTemplate({
  From: "hello@clee.co",
  To: customer.email,
  TemplateAlias: "promo-digest",
  TemplateModel: { name: customer.name, offers },
  MessageStream: "broadcast",
});
\`\`\`

Keeping transactional and marketing traffic on separate streams protects deliverability — a spike in promotional sends, or a complaint on one, doesn't threaten the booking confirmations customers are actively waiting for.

## Handling Bounces and Complaints

\`\`\`javascript
app.post("/webhooks/postmark", (req, res) => {
  const { RecordType, Email } = req.body;
  if (RecordType === "Bounce" || RecordType === "SpamComplaint") {
    await Customer.updateOne({ email: Email }, { emailSuppressed: true });
  }
  res.sendStatus(200);
});
\`\`\`

A suppression webhook keeps the customer record in sync — once an address bounces or complains, later sends check that flag before going out, rather than repeatedly hitting an address Postmark has already flagged.

## Idempotent Sends

Booking confirmations are triggered from the same payment-webhook handler that could, in principle, fire twice. Each send carries the booking ID as Postmark's \`Tag\`, so a duplicate trigger is easy to detect and skip against a "confirmation already sent" flag on the booking record — the same idempotency discipline used for the Stripe payment confirmation itself.

## Key Lessons

1. **Separate streams by intent** — never let marketing volume put transactional deliverability at risk.
2. **Webhook the suppression list** — don't keep mailing an address that already bounced.
3. **Tag sends for idempotency** — a webhook retry should never mean a customer gets the same email twice.
`
  },
  {
    id: "15",
    title: "Shipping a Static-Export Next.js Storefront with AR/EN Localization",
    slug: "nextjs-static-export-i18n",
    excerpt: "Building Tobaline's bilingual (Arabic/English) storefront as a statically-exported Next.js site, and what that trades off against SSR.",
    date: "2026-08-15",
    readTime: 7,
    category: "Frontend",
    projectName: "Tobaline",
    projectId: "tobaline",
    image: "/images/tobaline.png",
    tags: ["Next.js", "i18n", "Static Export"],
    content: `# Shipping a Static-Export Next.js Storefront with AR/EN Localization

Tobaline is a luxury textile brand's storefront for a Middle-East-facing audience. Two decisions shaped the build: static export (\`next export\`) for cheap, fast hosting, and an AR/EN language switch that had to be RTL-ready from day one — not bolted on after the fact.

## Why Static Export Here

\`\`\`javascript
// next.config.js
module.exports = {
  output: "export",
  images: { unoptimized: true }, // no image optimization server at request time
};
\`\`\`

Product and collection content changes infrequently, there's no per-user personalization on the storefront itself, and account/order-history routes were scoped to wire into a backend API later rather than block launch. That combination is exactly what static export is for: every page is prebuilt HTML, served from a CDN, with no server render on the request path.

## Structuring for a Language Switch

\`\`\`
/app
  /[locale]/
    layout.tsx      # sets dir="rtl" | "ltr" based on locale
    page.tsx
    /collection/
    /about/
\`\`\`

Locale lives in the route, not in cookies or headers — a static export has no request-time logic to read either of those. \`generateStaticParams\` produces both \`/en\` and \`/ar\` trees at build time, and the layout sets \`dir\` explicitly per locale rather than relying on the browser to guess:

\`\`\`jsx
export default function LocaleLayout({ children, params: { locale } }) {
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>{children}</body>
    </html>
  );
}
\`\`\`

## RTL Is a Layout Concern, Not a Translation Concern

Swapping copy is the easy 20%. The rest is making sure Tailwind's directional utilities flip with the layout instead of silently staying left-anchored:

\`\`\`jsx
// Logical properties flip automatically with dir="rtl" — physical ones don't
<div className="ms-4 pe-6 text-start"> {/* correct */}
<div className="ml-4 pr-6 text-left">  {/* breaks in RTL */}
\`\`\`

Using \`ms-\`/\`me-\`/\`ps-\`/\`pe-\` (logical) instead of \`ml-\`/\`mr-\`/\`pl-\`/\`pr-\` (physical) meant the mega-menu, product grid and cart drawer all mirrored correctly in Arabic without a second, RTL-specific set of styles to maintain.

## The Trade-off

Static export means no server-side personalization or A/B testing without adding a separate service, and any content edit needs a rebuild rather than a live CMS push. For a catalog-driven storefront with infrequent content changes, that trade bought first paint speed and hosting simplicity the project didn't have to build itself.
`
  },
  {
    id: "16",
    title: "How LeadRescue AI Works: From Lost Enquiry to Booked Job",
    slug: "how-leadrescue-ai-works",
    excerpt: "A walkthrough of LeadRescue AI, the lead follow-up SaaS for cleaning companies and small service teams: capture, pipeline, reminders and AI-drafted replies.",
    date: "2026-10-11",
    readTime: 5,
    category: "Product",
    projectName: "LeadRescue AI",
    projectId: "leadrescue",
    image: "/images/leadrescue-ai.png",
    tags: ["SaaS", "Lead Management", "AI", "Product"],
    content: `# How LeadRescue AI Works: From Lost Enquiry to Booked Job

Small service businesses rarely lose jobs because their work is bad. They lose them because an enquiry arrived while the team was busy, the reply came two days late, and the customer had already booked someone else. LeadRescue AI is built to close that gap: **rescue every enquiry before it goes cold.**

## The Core Loop

\`\`\`
Enquiry comes in -> Lead is tracked -> Reminder says "reply today" -> AI drafts the reply -> You review and send -> Lead moves through the pipeline
\`\`\`

Every step exists to answer one question for the owner: *who needs a reply from me today?*

## 1. Get Leads In

Leads can be added one by one, or brought in all at once with **Import Leads** (for example, from a spreadsheet of past enquiries). Each lead keeps its contact details, where it came from, and an estimated job value.

## 2. The Dashboard Answers "What Now?"

The dashboard opens with four numbers:

- **Open leads**: how many enquiries are still alive
- **Need attention**: leads waiting on a reply, including those due today
- **Open pipeline value**: the estimated money sitting in unfinished deals
- **Win rate**: won leads as a share of closed leads

Below that, charts show new leads over the last 14 days, how many leads sit in each stage, where leads come from, and the value in each stage. The goal is a two-minute morning check, not an analytics project.

## 3. A Simple Pipeline

Each lead moves through plain stages: **New, Contacted, Quote sent, Won, Lost**. The Pipeline view shows them as a board, so you can see at a glance where deals are stuck and which quotes have gone quiet.

## 4. Follow-ups You Cannot Forget

Set a follow-up date on any lead. The **Follow-ups** page lists what is due today and what is coming in the next 7 days, and the notification bell flags anything that needs attention. Nothing relies on someone remembering.

## 5. AI-Drafted Replies, in English and Hindi

On the **AI Replies** page, LeadRescue AI drafts a message for a lead, such as a first response, a quote follow-up or a gentle nudge, in **English or Hindi**, matching how your customers actually talk.

## You Stay in Control

This is the design decision I care most about: **LeadRescue AI only drafts and reminds. It never sends anything on its own.** You read the draft, edit it if you want, and send it yourself. For a small business, a wrong message to a real customer costs more than the minute saved, so the human stays the sender.

## Who It's For

Cleaning companies and small service teams, where the owner is often the person answering enquiries between jobs. For them, a lightweight tool that says "these four people need a reply" is worth more than a heavy CRM.

You can try it at [lead-rescue-ai-two.vercel.app](https://lead-rescue-ai-two.vercel.app/).
`
  },
  {
    id: "17",
    title: "Building LeadRescue AI: Design Decisions Behind a Follow-up SaaS",
    slug: "building-leadrescue-ai",
    excerpt: "Why LeadRescue AI is a focused tool instead of a full CRM, why AI only drafts, and how the product is structured around one daily question.",
    date: "2026-10-11",
    readTime: 5,
    category: "Product",
    projectName: "LeadRescue AI",
    projectId: "leadrescue",
    image: "/images/leadrescue-ai.png",
    tags: ["SaaS", "Product Design", "AI", "Next.js"],
    content: `# Building LeadRescue AI: Design Decisions Behind a Follow-up SaaS

After shipping multi-tenant platforms like Clee, I wanted to build something much narrower: a tool with one job and almost no learning curve. These are the decisions that shaped LeadRescue AI.

## Decision 1: Be Smaller Than a CRM

Most CRMs ask a small business to learn contacts, companies, deals, custom fields and automations before they get any value. LeadRescue AI has six sections: **Dashboard, Leads, Pipeline, Follow-ups, AI Replies, Import Leads** (plus Settings). If a feature does not help someone reply to a lead sooner, it does not belong.

## Decision 2: Organize Around One Question

The whole app is built to answer: *who needs a follow-up today?* That is why the dashboard leads with "Need attention" and "due today", and why the Follow-ups view looks only 7 days ahead. Pretty charts support that question; they do not replace it.

## Decision 3: AI Drafts, Humans Send

It would be easy to let AI auto-reply to every enquiry. I chose not to. Replies are generated as **drafts**, in English and Hindi, and the owner reviews and sends them. Reasons:

- A wrong or tone-deaf message to a real customer is expensive
- Owners know context the AI does not (a regular client, a price already discussed)
- Trust is easier to earn when the tool never surprises you

The footer on the landing page says it plainly: *drafts and reminders only; you stay in control of every message.*

## Decision 4: Bilingual From Day One

Many small service businesses talk to customers in Hindi as much as English. Supporting both in the reply drafts was a core requirement, not a later translation task.

## Decision 5: A Frontend Built to Be Scanned

The app is built with a modern React stack and deployed on Vercel. The UI choices follow the same principle as the product: large readable numbers, a sidebar with few items, charts that load fast, and a global page search so nothing is more than one step away.

## What's Next

- More reply templates for common situations (quote follow-up, missed call, no-show)
- Better import handling for messy spreadsheets
- Team assignment, so each lead has a clear owner

Try it live: [lead-rescue-ai-two.vercel.app](https://lead-rescue-ai-two.vercel.app/)
`
  }
];

export const BLOGS: Blog[] = [...RAW_BLOGS].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

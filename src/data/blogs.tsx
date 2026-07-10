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
    title: "Multi-Tenant SaaS with MongoDB: Data Isolation & Performance",
    slug: "multi-tenant-mongodb-saas",
    excerpt: "Building Clee SaaS platform with MongoDB - tenant isolation, indexing strategies, and real-world lessons learned.",
    date: "2024-12-15",
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
    date: "2024-12-10",
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
    date: "2024-12-05",
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
    date: "2024-11-28",
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
    date: "2024-11-20",
    readTime: 8,
    category: "Backend",
    projectName: "Grocery Pickup Store",
    projectId: "grocery",
    image: "/images/image1.png",
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
    date: "2024-11-08",
    readTime: 7,
    category: "Backend",
    projectName: "My Lodge",
    projectId: "mylodge",
    image: "/images/image3.png",
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
    date: "2024-11-01",
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
    date: "2024-10-25",
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
    date: "2024-10-18",
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
    date: "2024-10-10",
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
    date: "2024-09-28",
    readTime: 6,
    category: "Frontend",
    projectName: "Grocery Pickup Store",
    projectId: "grocery",
    image: "/images/image1.png",
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
  }
];

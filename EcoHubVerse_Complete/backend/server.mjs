import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Recommender System API
app.get('/api/recommendations', (req, res) => {
  const { type, userId } = req.query;
  
  // Mock recommendations based on type (products, articles, courses)
  const recommendations = {
    products: [
      { id: 1, name: 'Eco-Friendly Water Bottle', score: 0.95, category: 'reusable' },
      { id: 2, name: 'Bamboo Toothbrush Set', score: 0.92, category: 'personal-care' },
      { id: 3, name: 'Solar Power Bank', score: 0.89, category: 'electronics' }
    ],
    articles: [
      { id: 1, title: 'Climate Change Solutions', score: 0.94, category: 'environment' },
      { id: 2, title: 'Sustainable Living Tips', score: 0.91, category: 'lifestyle' },
      { id: 3, title: 'Renewable Energy Guide', score: 0.88, category: 'energy' }
    ],
    courses: [
      { id: 1, title: 'Introduction to Sustainability', score: 0.96, category: 'beginner' },
      { id: 2, title: 'Green Business Practices', score: 0.93, category: 'business' },
      { id: 3, title: 'Zero Waste Lifestyle', score: 0.90, category: 'lifestyle' }
    ]
  };
  
  res.json({
    type,
    recommendations: recommendations[type] || [],
    timestamp: new Date().toISOString()
  });
});

// EcoTokens / Green NFTs API
app.get('/api/ecotokens/balance/:userId', (req, res) => {
  const { userId } = req.params;
  
  res.json({
    userId,
    balance: 150,
    currency: 'ECO',
    level: 'Silver',
    carbonOffset: 25.5
  });
});

app.post('/api/ecotokens/transaction', (req, res) => {
  const { fromUser, toUser, amount, type } = req.body;
  
  res.json({
    transactionId: `ECO-${Date.now()}`,
    from: fromUser,
    to: toUser,
    amount,
    type,
    status: 'completed',
    carbonSaved: amount * 0.1,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/nfts/green', (req, res) => {
  res.json({
    nfts: [
      {
        id: 'NFT-001',
        name: 'Carbon Offset Certificate',
        description: 'Verified carbon offset of 10 tons',
        carbonImpact: 10,
        mintDate: '2025-01-15',
        owner: req.query.userId
      },
      {
        id: 'NFT-002',
        name: 'Reforestation Badge',
        description: 'Planted 100 trees',
        carbonImpact: 5,
        mintDate: '2025-02-20',
        owner: req.query.userId
      }
    ]
  });
});

// Gamification API
app.get('/api/gamification/profile/:userId', (req, res) => {
  const { userId } = req.params;
  
  res.json({
    userId,
    level: 5,
    points: 2450,
    nextLevelPoints: 3000,
    badges: [
      { id: 'recycler', name: 'Master Recycler', earned: '2025-01-10' },
      { id: 'green-commuter', name: 'Green Commuter', earned: '2025-02-05' },
      { id: 'energy-saver', name: 'Energy Saver', earned: '2025-03-12' }
    ],
    achievements: [
      { action: 'recycle', count: 50, points: 500 },
      { action: 'bike-commute', count: 30, points: 900 },
      { action: 'solar-usage', count: 20, points: 600 }
    ],
    rank: 'Eco Warrior',
    carbonSaved: 125.5
  });
});

app.post('/api/gamification/action', (req, res) => {
  const { userId, action, metadata } = req.body;
  
  const actionPoints = {
    'recycle': 10,
    'bike-commute': 30,
    'solar-usage': 50,
    'plant-tree': 100,
    'share-article': 5,
    'complete-course': 200
  };
  
  const points = actionPoints[action] || 5;
  
  res.json({
    userId,
    action,
    pointsEarned: points,
    totalPoints: 2450 + points,
    newBadges: points > 100 ? ['eco-champion'] : [],
    message: `Great job! You earned ${points} points for ${action}!`
  });
});

// AI Moderation API
app.post('/api/moderation/check', async (req, res) => {
  const { content, type } = req.body;
  
  // Mock AI moderation response
  const isSafe = !content.toLowerCase().includes('spam');
  const sentiment = content.length > 100 ? 'positive' : 'neutral';
  
  res.json({
    safe: isSafe,
    sentiment,
    categories: {
      ecoFriendly: content.toLowerCase().includes('eco') || content.toLowerCase().includes('green'),
      educational: content.toLowerCase().includes('learn'),
      community: true
    },
    confidence: 0.92,
    suggestions: isSafe ? [] : ['Content may need review']
  });
});

app.post('/api/moderation/summarize', async (req, res) => {
  const { discussions } = req.body;
  
  res.json({
    summary: 'Community discussions focus on renewable energy solutions and sustainable living practices.',
    keyTopics: ['Solar Energy', 'Zero Waste', 'Green Transportation'],
    sentiment: 'positive',
    actionItems: [
      'Organize community cleanup event',
      'Share resources on composting',
      'Create guide for eco-friendly shopping'
    ],
    participationStats: {
      totalMessages: discussions?.length || 0,
      uniqueUsers: 12,
      avgEngagement: 0.85
    }
  });
});

// Posts API (existing from schema)
app.get('/api/posts', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'Welcome to EcoHubVerse',
      content: 'Join our eco-friendly community!',
      author: 'Admin',
      created_at: new Date().toISOString()
    }
  ]);
});

app.get('/api/posts/:id', (req, res) => {
  res.json({
    id: parseInt(req.params.id),
    title: 'Sample Post',
    content: 'Content here',
    author: 'Admin',
    created_at: new Date().toISOString()
  });
});

app.post('/api/posts', (req, res) => {
  const { title, content, author } = req.body;
  res.status(201).json({
    id: Date.now(),
    title,
    content,
    author,
    created_at: new Date().toISOString()
  });
});

// Products API (existing from schema)
app.get('/api/products', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Eco-Friendly Water Bottle',
      price: 19.99,
      ecoScore: 95,
      carbonFootprint: 0.5,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Bamboo Toothbrush',
      price: 5.99,
      ecoScore: 98,
      carbonFootprint: 0.1,
      created_at: new Date().toISOString()
    }
  ]);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    features: {
      recommender: true,
      ecoTokens: true,
      gamification: true,
      aiModeration: true
    }
  });
});

app.listen(PORT, () => {
  console.log(`EcoHubVerse API server running on port ${PORT}`);
});

export default app;

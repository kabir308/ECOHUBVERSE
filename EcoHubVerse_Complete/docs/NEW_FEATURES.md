# EcoHubVerse - New Features Documentation

This document describes the new eco-friendly features added to EcoHubVerse platform.

## 🎯 1. AI-Powered Recommender System

### Overview
The recommender system uses AI to suggest eco-friendly products, articles, and courses based on user preferences and ecological impact.

### Features
- **Product Recommendations**: Eco-friendly products with sustainability scores
- **Article Suggestions**: Environmental topics and sustainable living guides
- **Course Recommendations**: E-learning content on sustainability

### API Endpoints
```
GET /api/recommendations?type={products|articles|courses}&userId={userId}
```

### Frontend Component
`/frontend/src/modules/Recommender.jsx`

### How It Works
1. User selects recommendation type (products, articles, or courses)
2. System analyzes user preferences and eco-consciousness level
3. AI ranks items based on:
   - Sustainability score
   - User interests
   - Carbon footprint
   - Community ratings
4. Top recommendations are displayed with match percentage

---

## 💎 2. Green NFTs & EcoTokens

### Overview
A sustainable blockchain system for carbon-neutral transactions with Green NFTs representing environmental achievements.

### Features
- **EcoTokens (ECO)**: Internal currency for eco-transactions
- **Carbon Offset Tracking**: Every transaction offsets carbon emissions
- **Green NFTs**: Collectible certificates for environmental achievements
- **Tiered Levels**: Bronze, Silver, Gold, Platinum based on eco-actions

### API Endpoints
```
GET  /api/ecotokens/balance/:userId
POST /api/ecotokens/transaction
GET  /api/nfts/green?userId={userId}
```

### Frontend Component
`/frontend/src/modules/EcoTokens.jsx`

### Token Features
- **Carbon-Neutral**: Each transaction offsets 10% of amount in CO₂
- **Low Energy**: Uses sustainable blockchain technology
- **Reward System**: Earn tokens for eco-friendly actions
- **NFT Achievements**: Mint NFTs for major environmental contributions

### Transaction Types
1. **Transfer**: Send tokens to other users
2. **Eco Donation**: Donate to environmental causes
3. **Green Purchase**: Buy eco-friendly products

---

## 🎮 3. Gamification System

### Overview
Gamification system that rewards users with points, badges, and levels for eco-friendly actions.

### Features
- **Points System**: Earn points for ecological actions
- **Level Progression**: Advance through levels (1-100)
- **Badges**: Unlock achievement badges
- **Rank System**: From "Beginner" to "Eco Warrior"
- **Carbon Tracking**: Monitor real CO₂ saved

### API Endpoints
```
GET  /api/gamification/profile/:userId
POST /api/gamification/action
```

### Frontend Component
`/frontend/src/modules/Gamification.jsx`

### Action Points
| Action | Points | Description |
|--------|--------|-------------|
| Recycle | 10 | Recycle items |
| Bike Commute | 30 | Use bike instead of car |
| Solar Usage | 50 | Use solar energy |
| Plant Tree | 100 | Plant a tree |
| Share Article | 5 | Share eco content |
| Complete Course | 200 | Finish e-learning course |

### Badges Available
- 🏅 **Master Recycler**: Recycle 50+ items
- 🚴 **Green Commuter**: 30+ bike commutes
- ⚡ **Energy Saver**: Solar usage milestone
- 🌳 **Tree Planter**: Plant 10+ trees
- 🎓 **Eco Scholar**: Complete 5+ courses

### Level System
- **Level 1-10**: Beginner (0-1000 points)
- **Level 11-25**: Intermediate (1001-3000 points)
- **Level 26-50**: Advanced (3001-7000 points)
- **Level 51+**: Expert (7000+ points)

---

## 🤖 4. AI Community Moderator

### Overview
AI-powered content moderation system that filters, organizes, and provides insights on community discussions.

### Features
- **Content Safety Check**: Real-time inappropriate content detection
- **Sentiment Analysis**: Understand community mood
- **Auto-Categorization**: Organize content by eco-topics
- **Smart Summaries**: AI-generated discussion insights
- **Trend Detection**: Identify popular topics

### API Endpoints
```
POST /api/moderation/check
POST /api/moderation/summarize
```

### Frontend Component
`/frontend/src/modules/AIModerator.jsx`

### Moderation Features

#### 1. Content Safety
- Detects spam, harassment, inappropriate language
- Provides confidence score (0-1)
- Suggests improvements for flagged content

#### 2. Sentiment Analysis
- **Positive**: Encouraging, constructive content
- **Neutral**: Informational content
- **Negative**: Concerns, complaints (not necessarily bad)

#### 3. Content Categories
- 🌱 **Eco-Friendly**: Sustainability-related
- 📚 **Educational**: Learning content
- 👥 **Community**: Engagement and discussion

#### 4. Community Insights
- **Summary**: AI-generated overview of discussions
- **Key Topics**: Trending subjects
- **Action Items**: Suggested community actions
- **Participation Stats**: Engagement metrics

### Moderation Process
1. User submits content
2. AI analyzes for safety, sentiment, categories
3. System provides instant feedback
4. Safe content is posted, flagged content is reviewed
5. Periodic summaries generated for community insights

---

## 📊 Database Schema Updates

### New Tables

#### `user_gamification`
Stores user gamification data (level, points, rank, carbon saved)

#### `badges`
Available achievement badges

#### `user_badges`
Badges earned by users

#### `user_actions`
Log of all eco-actions performed

#### `ecotoken_balances`
User token balances and carbon offsets

#### `ecotoken_transactions`
Transaction history

#### `green_nfts`
Green NFT ownership and metadata

#### `moderation_logs`
AI moderation results

#### `community_summaries`
Periodic community insights

#### `user_preferences`
User preferences for recommendations

#### `recommendation_history`
Recommendation click-through data

See `/docs/supabase_schema.sql` for complete schema.

---

## 🚀 Getting Started

### Backend Setup
```bash
cd EcoHubVerse_Complete/backend
npm install
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup
```bash
cd EcoHubVerse_Complete/frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000`

### Environment Variables
For AI features, set:
```
OPENAI_API_KEY=your_openai_api_key_here
```

---

## 🎨 Frontend Components

### New Components
1. **Recommender.jsx** - AI recommendations
2. **Gamification.jsx** - Gamification dashboard
3. **EcoTokens.jsx** - Token and NFT management
4. **AIModerator.jsx** - AI moderation interface

### Updated Components
- **Dashboard.jsx** - Integrated navigation for all features

---

## 🔧 API Documentation

### Health Check
```
GET /api/health
```
Returns system status and enabled features.

### Complete API List
- Recommendations: `/api/recommendations`
- EcoTokens: `/api/ecotokens/*`
- NFTs: `/api/nfts/green`
- Gamification: `/api/gamification/*`
- Moderation: `/api/moderation/*`
- Posts: `/api/posts/*`
- Products: `/api/products`

---

## 🌍 Environmental Impact

### Carbon Tracking
All features contribute to carbon offset calculations:
- **EcoTokens**: 10% of transaction value = kg CO₂ saved
- **Gamification**: Actions have associated carbon impact
- **NFTs**: Represent verified carbon offset certificates

### Sustainability Features
1. **Energy-Efficient**: Optimized API calls and caching
2. **Green Blockchain**: Simulated sustainable blockchain
3. **Carbon Accounting**: Track environmental impact
4. **Eco-Metrics**: Measure community ecological footprint

---

## 📱 Usage Examples

### Get Recommendations
```javascript
fetch('/api/recommendations?type=products&userId=user123')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Send EcoTokens
```javascript
fetch('/api/ecotokens/transaction', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fromUser: 'user123',
    toUser: 'user456',
    amount: 10,
    type: 'transfer'
  })
});
```

### Log Eco-Action
```javascript
fetch('/api/gamification/action', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123',
    action: 'recycle',
    metadata: { items: 5 }
  })
});
```

### Check Content Safety
```javascript
fetch('/api/moderation/check', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    content: 'Your message here',
    type: 'comment'
  })
});
```

---

## 🔐 Security & Privacy

- All transactions are logged for transparency
- User data is anonymized in analytics
- Content moderation respects privacy
- NFTs use cryptographic verification
- Carbon offset claims are verifiable

---

## 🎯 Future Enhancements

1. **Machine Learning**: Real AI model training on user data
2. **Blockchain Integration**: Actual sustainable blockchain
3. **Carbon API**: Connect to real carbon offset providers
4. **Social Features**: Eco-challenges, team competitions
5. **Mobile App**: Native mobile applications
6. **IoT Integration**: Connect smart home devices

---

## 📄 License

MIT License - See main README for details.

---

## 🤝 Contributing

We welcome contributions! Please focus on:
- Energy-efficient code
- Sustainable practices
- Environmental impact features
- Community engagement tools

---

## 📞 Support

For questions or issues:
- GitHub Issues: Submit bug reports
- Community Chat: In-app community discussions
- Documentation: This file and main README.md

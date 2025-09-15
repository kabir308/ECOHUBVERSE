import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock data for posts
let mockPosts = [
  { id: 1, title: 'Welcome to the Blog', content: 'This is the first post.', author: 'Admin', created_at: new Date().toISOString() },
  { id: 2, title: 'Second Post', content: 'This is another post.', author: 'Admin', created_at: new Date().toISOString() }
];

app.get('/', (req, res) => {
  res.send('Hello from the EcoHubVerse backend!');
});

// --- Post API Endpoints ---

// GET all posts
app.get('/api/posts', (req, res) => {
  res.json(mockPosts);
});

// GET a single post by id
app.get('/api/posts/:id', (req, res) => {
  const post = mockPosts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    res.json(post);
  } else {
    res.status(404).send('Post not found');
  }
});

// CREATE a new post
app.post('/api/posts', (req, res) => {
  const newPost = {
    id: mockPosts.length + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    created_at: new Date().toISOString()
  };
  mockPosts.push(newPost);
  res.status(201).json(newPost);
});

// UPDATE a post
app.put('/api/posts/:id', (req, res) => {
  const postIndex = mockPosts.findIndex(p => p.id === parseInt(req.params.id));
  if (postIndex !== -1) {
    mockPosts[postIndex] = { ...mockPosts[postIndex], ...req.body };
    res.json(mockPosts[postIndex]);
  } else {
    res.status(404).send('Post not found');
  }
});

// DELETE a post
app.delete('/api/posts/:id', (req, res) => {
  const postIndex = mockPosts.findIndex(p => p.id === parseInt(req.params.id));
  if (postIndex !== -1) {
    mockPosts.splice(postIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Post not found');
  }
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

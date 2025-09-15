import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import OpenAI from 'openai';

const app = express();
const port = process.env.PORT || 5000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

// --- Database Connection ---
// NOTE: The database connection is currently skipped as per the user's request.
// The application is using mock data for now.
// The following code should be replaced with a proper database connection.
let mockPosts = [
  { id: 1, title: 'Welcome to the Blog', content: 'This is the first post.', author: 'Admin', created_at: new Date().toISOString(), summary: 'This is a summary.' },
  { id: 2, title: 'Second Post', content: 'This is another post.', author: 'Admin', created_at: new Date().toISOString(), summary: 'This is another summary.' }
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
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, author } = req.body;

    let summary = 'Could not generate summary.';
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'YOUR_API_KEY_HERE') {
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: 'Summarize the following blog post in one sentence.' }, { role: 'user', content }],
        model: 'gpt-3.5-turbo',
      });
      summary = completion.choices[0].message.content;
    } else {
      console.warn("OPENAI_API_KEY not found or is a placeholder. Skipping summary generation.");
    }

    const newPost = {
      id: mockPosts.length + 1,
      title,
      content,
      author,
      created_at: new Date().toISOString(),
      summary,
    };
    mockPosts.push(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send('Error creating post');
  }
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

// --- Chat API Endpoint ---

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'YOUR_API_KEY_HERE') {
      const completion = await openai.chat.completions.create({
        messages: [
            { role: 'system', content: 'You are a helpful assistant for the EcoHubVerse platform.' },
            { role: 'user', content: message }
        ],
        model: 'gpt-3.5-turbo',
      });
      res.json({ reply: completion.choices[0].message.content });
    } else {
      console.warn("OPENAI_API_KEY not found or is a placeholder. Chatbot is not fully functional.");
      res.json({ reply: "I am not fully configured yet. An API key is needed." });
    }

  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).send('Error in chat endpoint');
  }
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

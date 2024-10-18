import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Set up LowDB
const dbFile = join(__dirname, 'db.json');
const adapter = new JSONFile(dbFile);
const defaultData = { posts: [], comments: [], likes: {}, users: [] };
const db = new Low(adapter, defaultData);

// Initialize the database with default data
async function initializeDb() {
  await db.read();
  if (db.data === null) {
    db.data = defaultData;
    await db.write();
  }
  
  // If posts are empty, populate with markdown files
  if (db.data.posts.length === 0) {
    const postsDir = join(__dirname, 'public', 'posts');
    const files = await fs.readdir(postsDir);
    for (const file of files) {
      if (file.endsWith('.md')) {
        const content = await fs.readFile(join(postsDir, file), 'utf-8');
        const slug = file.replace('.md', '');
        db.data.posts.push({ slug, content });
      }
    }
    await db.write();
  }
}

await initializeDb();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// User registration
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  
  await db.read();
  const userExists = db.data.users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), username, password: hashedPassword };
  db.data.users.push(newUser);
  await db.write();

  res.status(201).json({ message: 'User created successfully' });
});

// User login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  await db.read();
  const user = db.data.users.find(user => user.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/api/posts', async (req, res) => {
  await db.read();
  res.json(db.data.posts);
});

app.get('/api/posts/:slug', async (req, res) => {
  await db.read();
  const post = db.data.posts.find(p => p.slug === req.params.slug);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

app.post('/api/posts/:slug/comment', authenticateToken, async (req, res) => {
  const { slug } = req.params;
  const { content } = req.body;
  
  await db.read();
  const comment = { id: Date.now(), slug, author: req.user.username, content, createdAt: new Date() };
  db.data.comments.push(comment);
  await db.write();
  
  res.json(comment);
});

app.get('/api/posts/:slug/comments', async (req, res) => {
  const { slug } = req.params;
  
  await db.read();
  const comments = db.data.comments.filter(comment => comment.slug === slug);
  res.json(comments);
});

app.post('/api/posts/:slug/like', authenticateToken, async (req, res) => {
  const { slug } = req.params;
  
  await db.read();
  db.data.likes[slug] = db.data.likes[slug] || {};
  db.data.likes[slug][req.user.id] = true;
  await db.write();
  
  const likeCount = Object.keys(db.data.likes[slug]).length;
  res.json({ likes: likeCount });
});

app.get('/api/posts/:slug/likes', async (req, res) => {
  const { slug } = req.params;
  
  await db.read();
  res.json({ likes: db.data.likes[slug] || 0 });
});

app.listen(3002, () => {
  console.log('Server running on http://localhost:3002');
});

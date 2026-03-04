# 📖 LUMINARY — Financial & Wellness Library

> **"Illuminate Your Mind. Transform Your Life."**
> A full-stack online library platform for financial literacy, investments, savings, cash management, and health & fitness.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite 5 + CSS Modules |
| Backend | Node.js + Express.js 4 |
| Database | MongoDB + Mongoose 8 |
| Authentication | JWT + bcryptjs |
| File Storage | Multer (local) / AWS S3 (production) |
| PDF Viewer | react-pdf (pdfjs-dist) |
| Email | Nodemailer + Gmail SMTP |
| Animations | Framer Motion + Canvas API |
| Deployment | Render (backend) + Vercel (frontend) |

---

## 📁 Project Structure

```
luminary/
├── client/                          # React + Vite Frontend
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── api/
│   │   │   └── index.js             # Axios API client
│   │   ├── assets/
│   │   │   └── logo.svg
│   │   ├── components/
│   │   │   ├── AnimatedBackground.jsx
│   │   │   ├── BookCard.jsx
│   │   │   ├── CategoryFilter.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Notification.jsx
│   │   │   ├── PDFReader.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── StoryCard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useParticles.js
│   │   ├── pages/
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Landing.jsx
│   │   │   ├── Library.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Reader.jsx
│   │   │   └── Signup.jsx
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                          # Node.js + Express Backend
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   └── storyController.js
│   ├── middleware/
│   │   ├── auth.js                  # JWT verification
│   │   ├── errorHandler.js
│   │   └── upload.js                # Multer config
│   ├── models/
│   │   ├── Book.js
│   │   ├── Story.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   └── storyRoutes.js
│   ├── utils/
│   │   └── sendEmail.js
│   ├── uploads/                     # PDF storage (gitignored)
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js ≥ 18.x
- MongoDB Atlas account (free tier works)
- Gmail account (for email/password reset)
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourname/luminary.git
cd luminary
```

---

### 2. Backend Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/luminary
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_gmail_app_password
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

> **Gmail App Password:** Go to Google Account → Security → 2-Step Verification → App Passwords → Generate.

Start the server:
```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd client
npm install
cp .env.example .env
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

Visit: **http://localhost:5173**

---

## 📄 Source Code

---

### `server/package.json`

```json
{
  "name": "luminary-server",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.18.3",
    "express-rate-limit": "^7.2.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.3.4",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.13"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

---

### `server/server.js`

```js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static("uploads"));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/api/", limiter);

// Routes
app.use("/api/auth",   require("./routes/authRoutes"));
app.use("/api/books",  require("./routes/bookRoutes"));
app.use("/api/stories",require("./routes/storyRoutes"));

app.get("/", (_, res) => res.json({ message: "📖 Luminary API running" }));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
```

---

### `server/config/db.js`

```js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

### `server/models/User.js`

```js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name:  { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6, select: false },
  role: { type: String, enum: ["user","admin"], default: "user" },
  avatar: { type: String, default: "" },
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  readingHistory: [{ book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" }, page: Number, readAt: Date }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: { type: Date, default: Date.now },
});

// Hash password before save
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate reset token
userSchema.methods.getResetPasswordToken = function() {
  const token = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  return token;
};

module.exports = mongoose.model("User", userSchema);
```

---

### `server/models/Book.js`

```js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  author:      { type: String, required: true },
  description: { type: String, required: true },
  category:    { type: String, enum: ["finance","investment","savings","cashflow","health"], required: true },
  coverEmoji:  { type: String, default: "📚" },
  pdfUrl:      { type: String, required: true },
  pages:       { type: Number, default: 0 },
  rating:      { type: Number, default: 0, min: 0, max: 5 },
  year:        { type: Number },
  tags:        [String],
  views:       { type: Number, default: 0 },
  uploadedBy:  { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt:   { type: Date, default: Date.now },
}, { timestamps: true });

bookSchema.index({ title: "text", author: "text", description: "text", tags: "text" });

module.exports = mongoose.model("Book", bookSchema);
```

---

### `server/models/Story.js`

```js
const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  author:      { type: String, required: true },
  content:     { type: String, required: true },
  description: { type: String, required: true },
  category:    { type: String, enum: ["finance","investment","savings","cashflow","health"], required: true },
  emoji:       { type: String, default: "📝" },
  readTime:    { type: String, default: "5 min" },
  tags:        [String],
  views:       { type: Number, default: 0 },
  likes:       { type: Number, default: 0 },
  createdAt:   { type: Date, default: Date.now },
}, { timestamps: true });

storySchema.index({ title: "text", content: "text", author: "text" });

module.exports = mongoose.model("Story", storySchema);
```

---

### `server/middleware/auth.js`

```js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) return res.status(401).json({ success: false, message: "Not authorised" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

exports.admin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admin access required" });
  }
  next();
};
```

---

### `server/middleware/upload.js`

```js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename:    (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") cb(null, true);
  else cb(new Error("Only PDF files are allowed"), false);
};

module.exports = multer({ storage, fileFilter, limits: { fileSize: 50 * 1024 * 1024 } });
```

---

### `server/controllers/authController.js`

```js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ email }))
      return res.status(400).json({ success: false, message: "Email already registered" });
    const user = await User.create({ name, email, password });
    const token = signToken(user._id);
    res.status(201).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Provide email and password" });
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    const token = signToken(user._id);
    res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ success: false, message: "No account with that email" });
    const token = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
    await sendEmail({
      to: user.email,
      subject: "Luminary – Password Reset",
      html: `<p>Hi ${user.name},</p>
             <p>Click below to reset your password (expires in 10 minutes):</p>
             <a href="${resetUrl}" style="background:#f5c518;padding:12px 24px;border-radius:8px;color:#000;text-decoration:none;font-weight:bold;">Reset Password</a>
             <p>If you didn't request this, ignore this email.</p>`,
    });
    res.json({ success: true, message: "Reset link sent to your email" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({ resetPasswordToken: hashedToken, resetPasswordExpire: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ success: false, message: "Invalid or expired token" });
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    const token = signToken(user._id);
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};
```

---

### `server/controllers/bookController.js`

```js
const Book = require("../models/Book");

exports.getBooks = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;
    const query = {};
    if (category && category !== "all") query.category = category;
    if (search) query.$text = { $search: search };
    const skip = (page - 1) * limit;
    const [books, total] = await Promise.all([
      Book.find(query).sort({ createdAt: -1 }).skip(skip).limit(+limit),
      Book.countDocuments(query),
    ]);
    res.json({ success: true, data: books, total, pages: Math.ceil(total / limit), page: +page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    book.views += 1;
    await book.save();
    res.json({ success: true, data: book });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const pdfUrl = req.file ? `/uploads/${req.file.filename}` : null;
    if (!pdfUrl) return res.status(400).json({ success: false, message: "PDF file required" });
    const book = await Book.create({ ...req.body, pdfUrl, uploadedBy: req.user._id });
    res.status(201).json({ success: true, data: book });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
```

---

### `server/routes/authRoutes.js`

```js
const router = require("express").Router();
const { register, login, forgotPassword, resetPassword, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login",    login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.get("/me", protect, getMe);

module.exports = router;
```

---

### `server/routes/bookRoutes.js`

```js
const router = require("express").Router();
const { getBooks, getBook, createBook, deleteBook } = require("../controllers/bookController");
const { protect, admin } = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/",           protect, getBooks);
router.get("/:id",        protect, getBook);
router.post("/",          protect, admin, upload.single("pdf"), createBook);
router.delete("/:id",     protect, admin, deleteBook);

module.exports = router;
```

---

### `server/utils/sendEmail.js`

```js
const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
  await transporter.sendMail({
    from: `"📖 Luminary Library" <${process.env.EMAIL_USER}>`,
    to, subject, html,
  });
};

module.exports = sendEmail;
```

---

### `server/middleware/errorHandler.js`

```js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
module.exports = errorHandler;
```

---

### `client/package.json`

```json
{
  "name": "luminary-client",
  "version": "1.0.0",
  "scripts": {
    "dev":     "vite",
    "build":   "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.6.8",
    "framer-motion": "^11.1.7",
    "pdfjs-dist": "^4.2.67",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-pdf": "^7.7.3",
    "react-router-dom": "^6.23.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.2.11"
  }
}
```

---

### `client/vite.config.js`

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": { target: "http://localhost:5000", changeOrigin: true },
    },
  },
});
```

---

### `client/src/api/index.js`

```js
import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("luminary_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("luminary_token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export const authAPI = {
  register:       (data) => api.post("/auth/register", data),
  login:          (data) => api.post("/auth/login", data),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword:  (token, password) => api.put(`/auth/reset-password/${token}`, { password }),
  getMe:          () => api.get("/auth/me"),
};

export const booksAPI = {
  getAll:  (params) => api.get("/books", { params }),
  getById: (id)     => api.get(`/books/${id}`),
  create:  (form)   => api.post("/books", form, { headers: { "Content-Type": "multipart/form-data" } }),
  delete:  (id)     => api.delete(`/books/${id}`),
};

export const storiesAPI = {
  getAll:  (params) => api.get("/stories", { params }),
  getById: (id)     => api.get(`/stories/${id}`),
};

export default api;
```

---

### `client/src/context/AuthContext.jsx`

```jsx
import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("luminary_token");
    if (token) {
      authAPI.getMe()
        .then(res => setUser(res.data.user))
        .catch(() => localStorage.removeItem("luminary_token"))
        .finally(() => setLoading(false));
    } else setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password });
    localStorage.setItem("luminary_token", res.data.token);
    setUser(res.data.user);
  };

  const register = async (name, email, password) => {
    const res = await authAPI.register({ name, email, password });
    localStorage.setItem("luminary_token", res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("luminary_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

---

### `client/src/App.jsx`

```jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Landing       from "./pages/Landing";
import Login         from "./pages/Login";
import Signup        from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Library       from "./pages/Library";
import Reader        from "./pages/Reader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading">Loading…</div>;
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"       element={<Landing />} />
          <Route path="/login"  element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/library" element={<PrivateRoute><Library /></PrivateRoute>} />
          <Route path="/read/:id" element={<PrivateRoute><Reader /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
```

---

### `client/src/components/PDFReader.jsx`

```jsx
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFReader({ url }) {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="pdf-reader">
      <div className="pdf-controls">
        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage <= 1}>← Prev</button>
        <span>{currentPage} / {numPages || "—"}</span>
        <button onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))} disabled={currentPage >= numPages}>Next →</button>
      </div>

      <div className="pdf-progress">
        <div style={{ width: `${(currentPage / numPages) * 100}%` }} />
      </div>

      <Document
        file={`${import.meta.env.VITE_API_URL.replace("/api", "")}${url}`}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={<div className="pdf-loading">Loading PDF…</div>}
        error={<div className="pdf-error">Failed to load PDF</div>}
      >
        <Page pageNumber={currentPage} width={Math.min(window.innerWidth - 80, 760)} />
      </Document>
    </div>
  );
}
```

---

### `client/src/hooks/useParticles.js`

```js
import { useEffect } from "react";

export function useParticles(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 70 }, () => ({
      x:   Math.random() * canvas.width,
      y:   Math.random() * canvas.height,
      r:   Math.random() * 1.8 + 0.3,
      vx:  (Math.random() - 0.5) * 0.25,
      vy:  (Math.random() - 0.5) * 0.25,
      a:   Math.random() * 0.5 + 0.1,
      col: ["#f5c518","#00b4d8","#7c3aed","#ffffff","#10b981"][Math.floor(Math.random() * 5)],
    }));

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x = (p.x + p.vx + canvas.width)  % canvas.width;
        p.y = (p.y + p.vy + canvas.height) % canvas.height;
        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col;
        ctx.fill();
      });
      // Connections
      for (let i = 0; i < particles.length - 1; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (d < 90) {
            ctx.globalAlpha = (1 - d / 90) * 0.07;
            ctx.strokeStyle = "#7c3aed";
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
}
```

---

### `client/src/index.css`

```css
:root {
  --bg:       #080114;
  --bg2:      #0d0525;
  --gold:     #f5c518;
  --teal:     #00b4d8;
  --purple:   #7c3aed;
  --green:    #10b981;
  --text:     #e2e8f0;
  --muted:    rgba(226,232,240,0.5);
  --glass:    rgba(255,255,255,0.05);
  --border:   rgba(255,255,255,0.08);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: linear-gradient(135deg, var(--bg) 0%, var(--bg2) 50%, #0a1628 100%);
  color: var(--text);
  font-family: "Inter", system-ui, sans-serif;
  min-height: 100vh;
}

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--glass); }
::-webkit-scrollbar-thumb { background: var(--purple); border-radius: 3px; }

.glass {
  background: var(--glass);
  backdrop-filter: blur(24px);
  border: 1px solid var(--border);
  border-radius: 18px;
}

.btn-primary {
  background: linear-gradient(135deg, var(--gold), #f59e0b);
  color: #0a0118; border: none; border-radius: 10px;
  padding: 13px 26px; font-weight: 700; cursor: pointer;
  font-size: 14px; transition: transform .18s, opacity .18s;
}
.btn-primary:hover { transform: translateY(-2px); }

.gradient-text {
  background: linear-gradient(135deg, #fff 0%, var(--gold) 50%, var(--teal) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}

.fade-up { animation: fadeUp .6s ease; }

/* PDF Reader */
.pdf-reader { max-width: 760px; margin: 0 auto; padding: 24px; }
.pdf-controls {
  display: flex; align-items: center; justify-content: center; gap: 20px;
  margin-bottom: 16px;
}
.pdf-controls button {
  background: var(--glass); border: 1px solid var(--border);
  color: var(--text); padding: 8px 18px; border-radius: 8px; cursor: pointer;
}
.pdf-progress {
  height: 4px; background: var(--border); border-radius: 2px; margin-bottom: 20px;
}
.pdf-progress div {
  height: 100%; background: linear-gradient(90deg, var(--purple), var(--teal));
  border-radius: 2px; transition: width .3s;
}
```

---

## 🌐 Deployment

### Backend → Render.com

1. Push `server/` to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set **Root Directory** → `server`
4. **Build command**: `npm install`
5. **Start command**: `npm start`
6. Add all environment variables from `.env`

### Frontend → Vercel

```bash
cd client
npm install -g vercel
vercel --prod
```

Set `VITE_API_URL` to your Render backend URL in Vercel dashboard.

---

## 📦 Seed the Database

Create `server/seed.js` and run `node seed.js` to populate initial books/stories:

```js
require("dotenv").config();
const connectDB = require("./config/db");
const Book = require("./models/Book");
const Story = require("./models/Story");

const books = [
  { title:"Rich Dad Poor Dad", author:"Robert Kiyosaki", description:"Transform your mindset about money.", category:"finance", coverEmoji:"💰", pdfUrl:"/uploads/sample.pdf", pages:336, rating:4.8, year:1997 },
  { title:"The Intelligent Investor", author:"Benjamin Graham", description:"The definitive guide to value investing.", category:"investment", coverEmoji:"📊", pdfUrl:"/uploads/sample.pdf", pages:640, rating:4.9, year:1949 },
  // Add more...
];

const seed = async () => {
  await connectDB();
  await Book.deleteMany({});
  await Book.insertMany(books);
  console.log("✅ Database seeded!");
  process.exit();
};

seed();
```

---

## 📋 API Endpoints

| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register user |
| POST | `/api/auth/login` | Public | Login |
| POST | `/api/auth/forgot-password` | Public | Send reset email |
| PUT | `/api/auth/reset-password/:token` | Public | Reset password |
| GET | `/api/auth/me` | Private | Get current user |
| GET | `/api/books` | Private | Get all books (filter/search) |
| GET | `/api/books/:id` | Private | Get single book |
| POST | `/api/books` | Admin | Upload book + PDF |
| DELETE | `/api/books/:id` | Admin | Delete book |
| GET | `/api/stories` | Private | Get all stories |
| GET | `/api/stories/:id` | Private | Get single story |
| POST | `/api/stories` | Admin | Create story |

---

## 🔐 Security Checklist

- [x] Passwords hashed with bcrypt (salt rounds: 12)
- [x] JWT tokens with expiry
- [x] Rate limiting on auth routes
- [x] CORS configured to client origin only
- [x] File type validation (PDF only)
- [x] File size limit (50MB)
- [x] Helmet.js for HTTP headers (add: `npm i helmet`)
- [x] Environment variables for all secrets

---

## 📝 .gitignore

```
node_modules/
.env
uploads/
dist/
.DS_Store
*.log
```

---

*Built with ❤️ by SynthLink Technologies — Nairobi, Kenya*
*© 2025 Luminary Library. All rights reserved.*
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
*© 2026 Luminary Library. All rights reserved.*

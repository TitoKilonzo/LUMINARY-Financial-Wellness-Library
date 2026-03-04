require("dotenv").config();
const connectDB = require("./config/db");
const Book = require("./models/Book");
const Story = require("./models/Story");

const books = [
  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", description: "Transform your mindset about money.", category: "finance", coverEmoji: "💰", pdfUrl: "/uploads/sample.pdf", pages: 336, rating: 4.8, year: 1997 },
  { title: "The Intelligent Investor", author: "Benjamin Graham", description: "The definitive guide to value investing.", category: "investment", coverEmoji: "📊", pdfUrl: "/uploads/sample.pdf", pages: 640, rating: 4.9, year: 1949 },
  { title: "Atomic Habits", author: "James Clear", description: "Build good habits, break bad ones.", category: "health", coverEmoji: "🧠", pdfUrl: "/uploads/sample.pdf", pages: 320, rating: 4.9, year: 2018 },
];

const stories = [
  { title: "The Latte Factor", author: "David Bach", content: "Small amounts saved daily can change your life...", description: "A short story on small savings.", category: "savings", emoji: "☕", readTime: "3 min" },
];

const seed = async () => {
  await connectDB();
  await Book.deleteMany({});
  await Story.deleteMany({});
  await Book.insertMany(books);
  await Story.insertMany(stories);
  console.log("✅ Database seeded!");
  process.exit();
};

seed();
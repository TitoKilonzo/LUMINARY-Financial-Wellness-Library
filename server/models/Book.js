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
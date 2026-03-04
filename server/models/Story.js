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
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
const Story = require("../models/Story");

exports.getStories = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;
    const query = {};
    if (category && category !== "all") query.category = category;
    if (search) query.$text = { $search: search };
    
    const skip = (page - 1) * limit;
    const [stories, total] = await Promise.all([
      Story.find(query).sort({ createdAt: -1 }).skip(skip).limit(+limit),
      Story.countDocuments(query),
    ]);
    res.json({ success: true, data: stories, total, pages: Math.ceil(total / limit), page: +page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ success: false, message: "Story not found" });
    story.views += 1;
    await story.save();
    res.json({ success: true, data: story });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createStory = async (req, res) => {
  try {
    const story = await Story.create(req.body);
    res.status(201).json({ success: true, data: story });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
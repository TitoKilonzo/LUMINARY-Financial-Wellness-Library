import { motion } from "framer-motion";
import { getCategoryColor } from "../utils/helpers";

export default function StoryCard({ story }) {
  return (
    <motion.div
      className="story-card glass"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="story-header">
        <span className="story-emoji">{story.emoji}</span>
        <span 
          className="story-cat" 
          style={{ color: getCategoryColor(story.category) }}
        >
          {story.category}
        </span>
      </div>
      <h4 className="story-title">{story.title}</h4>
      <p className="story-meta">{story.readTime} read</p>
    </motion.div>
  );
}
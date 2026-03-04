import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedBackground from "../components/AnimatedBackground";
import Navbar from "../components/Navbar";

export default function Landing() {
  const features = [
    { icon: "📚", title: "Vast Library", desc: "Curated financial and wellness content." },
    { icon: "📱", title: "Read Anywhere", desc: "Responsive design for all devices." },
    { icon: "🔒", title: "Secure", desc: "Your data is safe with us." },
  ];

  return (
    <div className="landing-page">
      {/* Passing 'default' ensures the hook works */}
      <AnimatedBackground category="default" />
      <Navbar />
      
      <div className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            Illuminate Your Mind.<br />
            <span className="gradient-text">Transform Your Life.</span>
          </h1>
          
          <p className="hero-subtitle">
            Access a curated library of financial wisdom, investment strategies, 
            and wellness guides.
          </p>

          <div className="hero-cta">
            <Link to="/signup" className="btn-primary btn-large">
              Start Reading Free
            </Link>
            <Link to="/login" className="btn-secondary">
              I have an account
            </Link>
          </div>
        </motion.div>
      </div>

      <section className="features-section">
        {features.map((f, i) => (
          <motion.div 
            key={i}
            className="feature-card glass"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <span className="feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
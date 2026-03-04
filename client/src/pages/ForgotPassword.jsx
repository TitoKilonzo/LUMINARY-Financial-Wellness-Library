import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { authAPI } from "../api";
import AnimatedBackground from "../components/AnimatedBackground";
import Navbar from "../components/Navbar";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await authAPI.forgotPassword(email);
      setMessage("Check your inbox for the reset link.");
    } catch (err) {
      setError(err.response?.data?.message || "Error sending email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <AnimatedBackground />
      <Navbar />
      
      <motion.div 
        className="auth-container glass"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="auth-title gradient-text">Reset Password</h2>
        
        {error && <div className="error-alert">{error}</div>}
        {message && <div className="success-alert">{message}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <p className="auth-desc">Enter your email address and we'll send you a link to reset your password.</p>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="you@example.com"
            />
          </div>

          <button type="submit" className="btn-primary btn-full" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="auth-switch">
          Remember your password? <Link to="/login">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
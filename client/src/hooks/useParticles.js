import { useEffect } from "react";

export function useParticles(canvasRef, category = "default") {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Dynamic Colors based on Category
    const getColors = () => {
      switch (category) {
        case "finance": return ["#f5c518", "#ffd700", "#fff3a3"]; // Gold
        case "investment": return ["#00b4d8", "#0077b6", "#90e0ef"]; // Blue
        case "health": return ["#10b981", "#34d399", "#6ee7b7"]; // Green
        case "savings": return ["#7c3aed", "#a78bfa", "#c4b5fd"]; // Purple
        case "cashflow": return ["#f59e0b", "#fbbf24", "#fcd34d"]; // Orange
        default: return ["#f5c518", "#00b4d8", "#7c3aed", "#ffffff", "#10b981"];
      }
    };

    const colors = getColors();

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * (category === "default" ? 0.3 : 0.5), // Faster for specific categories
      vy: (Math.random() - 0.5) * (category === "default" ? 0.3 : 0.5),
      a: Math.random() * 0.5 + 0.2,
      col: colors[Math.floor(Math.random() * colors.length)],
    }));

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections first (behind particles)
      for (let i = 0; i < particles.length - 1; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (d < 100) {
            ctx.globalAlpha = (1 - d / 100) * 0.1;
            ctx.strokeStyle = particles[i].col; // Match connection to particle
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.x = (p.x + p.vx + canvas.width) % canvas.width;
        p.y = (p.y + p.vy + canvas.height) % canvas.height;
        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [category]); // Re-run effect when category changes
}
import { useRef } from "react";
import { useParticles } from "../hooks/useParticles";

export default function AnimatedBackground({ category }) {
  const canvasRef = useRef(null);
  useParticles(canvasRef, category);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}
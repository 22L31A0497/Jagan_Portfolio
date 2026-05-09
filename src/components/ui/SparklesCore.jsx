import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

export const SparklesCore = ({
  id,
  className,
  background = "transparent",
  minSize = 0.4,
  maxSize = 1.0,
  speed = 1,
  particleColor = "#FFFFFF",
  particleDensity = 100,
}) => {
  const canvasRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const count = Math.floor((rect.width * rect.height) / 10000) * (particleDensity / 100);
      const arr = [];
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          size: Math.random() * (maxSize - minSize) + minSize,
          opacity: Math.random(),
          opacityDir: Math.random() > 0.5 ? 1 : -1,
          speed: (Math.random() * 0.4 + 0.1) * speed,
        });
      }
      setParticles(arr);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [maxSize, minSize, particleDensity, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || particles.length === 0) return;
    const ctx = canvas.getContext("2d");

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.opacity += 0.01 * p.opacityDir;
        if (p.opacity >= 1) p.opacityDir = -1;
        if (p.opacity <= 0) p.opacityDir = 1;
        p.y -= p.speed * 0.3;
        if (p.y < 0) p.y = canvas.height;

        ctx.beginPath();
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(animationRef.current);
  }, [particles, particleColor]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={cn("h-full w-full", className)}
      style={{ background }}
    />
  );
};

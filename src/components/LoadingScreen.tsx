import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setFadeOut(true), 300);
      setTimeout(() => onComplete(), 1000);
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <Activity className="h-16 w-16 text-primary animate-pulse-glow" />
          <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Road<span className="text-primary">Pulse</span> Delhi
        </h1>
        <p className="text-sm text-muted-foreground tracking-widest uppercase">
          AI-Powered Road Intelligence for New Delhi
        </p>

        {/* Pulse line */}
        <div className="w-64 h-8 mt-4 overflow-hidden">
          <svg viewBox="0 0 256 32" className="w-full h-full">
            <polyline
              points="0,16 40,16 50,4 60,28 70,10 80,22 90,16 256,16"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              className="animate-pulse-line"
            />
          </svg>
        </div>
      </div>

      {/* Loading bar */}
      <div className="absolute bottom-16 w-64">
        <div className="h-1 w-full rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-100 ease-out glow-cyan"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3">
          Initializing systems…
        </p>
      </div>
    </div>
  );
}

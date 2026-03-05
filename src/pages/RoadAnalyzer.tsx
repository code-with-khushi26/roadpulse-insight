import { useState } from "react";
import { Upload, Video, Image, AlertTriangle, Gauge, Car, Activity, TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function RoadAnalyzer() {
  const [mode, setMode] = useState<"image" | "video">("image");
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<null | typeof mockResults>(null);

  const mockResults = {
    potholes: 12,
    rqi: 5.8,
    condition: "Fair",
    speedImpact: "-15 km/h",
    congestionRisk: "Medium",
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setResults(null);
    setAnalyzing(true);
    setProgress(0);

    const duration = mode === "video" ? 4000 : 2000;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          setResults(mockResults);
          return 100;
        }
        return p + 2;
      });
    }, duration / 50);
  };

  const resultItems = results
    ? [
        { label: "Potholes Detected", value: results.potholes.toString(), icon: <AlertTriangle className="h-4 w-4" /> },
        { label: "RQI Score", value: `${results.rqi}/10`, icon: <Gauge className="h-4 w-4" /> },
        { label: "Road Condition", value: results.condition, icon: <Activity className="h-4 w-4" /> },
        { label: "Speed Impact", value: results.speedImpact, icon: <Car className="h-4 w-4" /> },
        { label: "Congestion Risk", value: results.congestionRisk, icon: <TrendingDown className="h-4 w-4" /> },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Road Analyzer</h1>
        <p className="text-sm text-muted-foreground mt-1">Upload road images or video for AI-powered analysis</p>
      </div>

      {/* Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => { setMode("image"); setFile(null); setResults(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${mode === "image" ? "bg-primary/20 text-primary border-primary/40" : "bg-secondary text-muted-foreground border-glow hover:border-primary/30"}`}
        >
          <Image className="h-4 w-4" /> Image
        </button>
        <button
          onClick={() => { setMode("video"); setFile(null); setResults(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${mode === "video" ? "bg-primary/20 text-primary border-primary/40" : "bg-secondary text-muted-foreground border-glow hover:border-primary/30"}`}
        >
          <Video className="h-4 w-4" /> Video
        </button>
      </div>

      {/* Upload area */}
      <label className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-glow bg-card p-10 cursor-pointer hover:border-primary/50 transition-colors">
        <Upload className="h-10 w-10 text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">
          {file ? file.name : `Drop or click to upload ${mode === "image" ? "an image" : "a video"}`}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {mode === "image" ? "JPG, PNG up to 10MB" : "MP4, AVI up to 100MB"}
        </p>
        <input type="file" className="hidden" accept={mode === "image" ? "image/*" : "video/*"} onChange={handleUpload} />
      </label>

      {/* Progress */}
      {analyzing && (
        <div className="rounded-lg border border-glow bg-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-foreground font-medium">Processing {mode}...</p>
            <span className="text-xs text-primary">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Analysis Results</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {resultItems.map((item) => (
              <div key={item.label} className="rounded-lg border border-glow bg-card p-4 text-center">
                <div className="flex justify-center text-primary mb-2">{item.icon}</div>
                <p className="text-lg font-bold text-foreground">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

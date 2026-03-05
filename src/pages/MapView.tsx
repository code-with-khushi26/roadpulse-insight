export default function MapView() {
  const zones = [
    { name: "Central Delhi", x: 48, y: 45, color: "#06b6d4", quality: "Good" },
    { name: "South Delhi", x: 50, y: 65, color: "#22d3ee", quality: "Fair" },
    { name: "North Delhi", x: 45, y: 25, color: "#f59e0b", quality: "Poor" },
    { name: "East Delhi", x: 68, y: 42, color: "#f97316", quality: "Poor" },
    { name: "West Delhi", x: 25, y: 40, color: "#22d3ee", quality: "Fair" },
    { name: "NE Delhi", x: 65, y: 22, color: "#ef4444", quality: "Critical" },
    { name: "New Delhi", x: 42, y: 50, color: "#06b6d4", quality: "Good" },
    { name: "Dwarka", x: 15, y: 55, color: "#22d3ee", quality: "Fair" },
    { name: "Noida Border", x: 80, y: 55, color: "#f59e0b", quality: "Poor" },
  ];

  const legend = [
    { label: "Good (RQI 7-10)", color: "#06b6d4" },
    { label: "Fair (RQI 5-7)", color: "#22d3ee" },
    { label: "Poor (RQI 3-5)", color: "#f59e0b" },
    { label: "Critical (RQI <3)", color: "#ef4444" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Map View</h1>
        <p className="text-sm text-muted-foreground mt-1">Road quality visualization across New Delhi</p>
      </div>

      <div className="rounded-lg border border-glow bg-card overflow-hidden">
        <div className="relative w-full" style={{ paddingBottom: "56%" }}>
          <div className="absolute inset-0 bg-[hsl(222_50%_6%)]">
            {/* Grid lines */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {Array.from({ length: 20 }, (_, i) => (
                <line key={`v${i}`} x1={`${(i + 1) * 5}%`} y1="0" x2={`${(i + 1) * 5}%`} y2="100%" stroke="hsl(222 30% 15%)" strokeWidth="0.5" />
              ))}
              {Array.from({ length: 20 }, (_, i) => (
                <line key={`h${i}`} x1="0" y1={`${(i + 1) * 5}%`} x2="100%" y2={`${(i + 1) * 5}%`} stroke="hsl(222 30% 15%)" strokeWidth="0.5" />
              ))}
            </svg>

            {/* Zone markers */}
            {zones.map((zone) => (
              <div
                key={zone.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
              >
                <div
                  className="h-4 w-4 rounded-full animate-pulse-glow border-2"
                  style={{ backgroundColor: zone.color, borderColor: zone.color, boxShadow: `0 0 12px ${zone.color}60` }}
                />
                <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-card border border-glow rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  <p className="text-xs font-medium text-foreground">{zone.name}</p>
                  <p className="text-[10px] text-muted-foreground">{zone.quality}</p>
                </div>
              </div>
            ))}

            {/* Delhi label */}
            <div className="absolute top-4 left-4">
              <p className="text-xs text-muted-foreground tracking-widest uppercase">New Delhi NCR</p>
              <p className="text-[10px] text-muted-foreground mt-1">28.6139° N, 77.2090° E</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 p-4 border-t border-glow">
          {legend.map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: l.color }} />
              <span className="text-xs text-muted-foreground">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

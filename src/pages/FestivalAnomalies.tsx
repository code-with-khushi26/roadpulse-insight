import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, ReferenceDot,
} from "recharts";

const augustData = Array.from({ length: 31 }, (_, i) => {
  const day = i + 1;
  let congestion = 55 + Math.sin(day * 0.5) * 15 + Math.random() * 8;
  if (day === 15) congestion = 92;
  if (day === 19) congestion = 88;
  if (day === 26) congestion = 85;
  return { day: `Aug ${day}`, congestion: Math.round(congestion), date: day };
});

const festivals = [
  { day: 15, label: "Independence Day", desc: "National holiday — road closures, parades" },
  { day: 19, label: "Muharram", desc: "Religious processions impacting traffic" },
  { day: 26, label: "Janmashtami", desc: "Temple gatherings, road diversions" },
];

const tooltipStyle = { backgroundColor: "hsl(222 40% 12%)", border: "1px solid hsl(189 40% 20%)", borderRadius: 8, color: "hsl(210 40% 96%)" };

export default function FestivalAnomalies() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Festival Anomalies</h1>
        <p className="text-sm text-muted-foreground mt-1">Traffic disruptions during August festivals in New Delhi</p>
      </div>

      <div className="rounded-lg border border-glow bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Congestion Index — August 2025</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={augustData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 20%)" />
            <XAxis dataKey="day" stroke="hsl(215 20% 55%)" fontSize={10} interval={2} />
            <YAxis stroke="hsl(215 20% 55%)" fontSize={12} domain={[30, 100]} unit="%" />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="congestion" stroke="#06b6d4" strokeWidth={2} dot={false} name="Congestion %" />
            {festivals.map((f) => (
              <ReferenceLine key={f.day} x={`Aug ${f.day}`} stroke="#06b6d4" strokeDasharray="4 4" strokeOpacity={0.6} />
            ))}
            {festivals.map((f) => (
              <ReferenceDot key={f.day} x={`Aug ${f.day}`} y={augustData.find(d => d.date === f.day)?.congestion || 0} r={6} fill="#06b6d4" stroke="#0a0f1e" strokeWidth={2} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {festivals.map((f) => (
          <div key={f.day} className="rounded-lg border border-glow bg-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-3 w-3 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-sm font-semibold text-foreground">Aug {f.day}</span>
            </div>
            <h4 className="text-sm font-medium text-primary">{f.label}</h4>
            <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Peak congestion: <span className="text-foreground font-medium">{augustData.find(d => d.date === f.day)?.congestion}%</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

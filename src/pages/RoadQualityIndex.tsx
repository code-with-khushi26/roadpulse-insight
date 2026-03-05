import { StatCard } from "@/components/StatCard";
import { Gauge, AlertTriangle, TrendingUp, Shield } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  ScatterChart, Scatter, ZAxis,
} from "recharts";

const rqiData = [
  { zone: "Central", rqi: 7.2 }, { zone: "South", rqi: 6.8 }, { zone: "North", rqi: 5.4 },
  { zone: "East", rqi: 4.9 }, { zone: "West", rqi: 6.1 }, { zone: "NE", rqi: 3.8 },
];

const condData = [
  { name: "Excellent", value: 15, color: "#06b6d4" },
  { name: "Good", value: 30, color: "#22d3ee" },
  { name: "Fair", value: 28, color: "#f59e0b" },
  { name: "Poor", value: 18, color: "#f97316" },
  { name: "Critical", value: 9, color: "#ef4444" },
];

const potholeData = Array.from({ length: 40 }, (_, i) => ({
  lat: 28.5 + Math.random() * 0.2,
  lng: 77.1 + Math.random() * 0.3,
  severity: Math.round(Math.random() * 10),
}));

const tooltipStyle = { backgroundColor: "hsl(222 40% 12%)", border: "1px solid hsl(189 40% 20%)", borderRadius: 8, color: "hsl(210 40% 96%)" };

export default function RoadQualityIndex() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Road Quality Index</h1>
        <p className="text-sm text-muted-foreground mt-1">Comprehensive road surface analysis across New Delhi zones</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Overall RQI" value="6.2/10" icon={<Gauge className="h-5 w-5" />} trend="0.4 improvement" trendUp />
        <StatCard title="Potholes Found" value="3,891" icon={<AlertTriangle className="h-5 w-5" />} trend="12% decrease" trendUp />
        <StatCard title="Repair Rate" value="68%" icon={<TrendingUp className="h-5 w-5" />} subtitle="Monthly average" />
        <StatCard title="Safety Score" value="7.1/10" icon={<Shield className="h-5 w-5" />} trend="Stable" trendUp />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-lg border border-glow bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">RQI by Zone</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={rqiData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 20%)" />
              <XAxis type="number" domain={[0, 10]} stroke="hsl(215 20% 55%)" fontSize={12} />
              <YAxis type="category" dataKey="zone" stroke="hsl(215 20% 55%)" fontSize={12} width={60} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="rqi" fill="#06b6d4" radius={[0, 4, 4, 0]} name="RQI Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-glow bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Road Condition Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={condData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {condData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: "hsl(215 20% 55%)" }} />
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg border border-glow bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Pothole Distribution (Scatter)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 20%)" />
            <XAxis dataKey="lng" name="Longitude" stroke="hsl(215 20% 55%)" fontSize={11} domain={[77.05, 77.45]} />
            <YAxis dataKey="lat" name="Latitude" stroke="hsl(215 20% 55%)" fontSize={11} domain={[28.45, 28.75]} />
            <ZAxis dataKey="severity" range={[30, 200]} name="Severity" />
            <Tooltip contentStyle={tooltipStyle} />
            <Scatter data={potholeData} fill="#06b6d4" fillOpacity={0.7} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

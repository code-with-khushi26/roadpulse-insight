import { StatCard } from "@/components/StatCard";
import { Gauge, Car, AlertTriangle, Activity } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const speedData = [
  { time: "6AM", speed: 42 }, { time: "8AM", speed: 18 }, { time: "10AM", speed: 28 },
  { time: "12PM", speed: 32 }, { time: "2PM", speed: 30 }, { time: "4PM", speed: 22 },
  { time: "6PM", speed: 15 }, { time: "8PM", speed: 35 }, { time: "10PM", speed: 45 },
];

const conditionData = [
  { name: "Good", value: 35, color: "#06b6d4" },
  { name: "Fair", value: 30, color: "#22d3ee" },
  { name: "Poor", value: 25, color: "#f59e0b" },
  { name: "Critical", value: 10, color: "#ef4444" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time road intelligence for New Delhi</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Avg Speed" value="28.4 km/h" subtitle="Across monitored roads" icon={<Gauge className="h-5 w-5" />} trend="3.2% vs last week" trendUp />
        <StatCard title="Active Roads" value="1,247" subtitle="Segments monitored" icon={<Car className="h-5 w-5" />} trend="12 new segments" trendUp />
        <StatCard title="Potholes Detected" value="3,891" subtitle="AI-identified" icon={<AlertTriangle className="h-5 w-5" />} trend="156 this week" trendUp={false} />
        <StatCard title="Road Quality Index" value="6.2/10" subtitle="City-wide average" icon={<Activity className="h-5 w-5" />} trend="0.3 improvement" trendUp />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-lg border border-glow bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Average Speed Throughout Day</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={speedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 20%)" />
              <XAxis dataKey="time" stroke="hsl(215 20% 55%)" fontSize={12} />
              <YAxis stroke="hsl(215 20% 55%)" fontSize={12} unit=" km/h" />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(222 40% 12%)", border: "1px solid hsl(189 40% 20%)", borderRadius: 8, color: "hsl(210 40% 96%)" }}
              />
              <Line type="monotone" dataKey="speed" stroke="#06b6d4" strokeWidth={2} dot={{ fill: "#06b6d4", r: 4 }} activeDot={{ r: 6, fill: "#22d3ee" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-glow bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Road Conditions</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={conditionData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                {conditionData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12, color: "hsl(215 20% 55%)" }} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(222 40% 12%)", border: "1px solid hsl(189 40% 20%)", borderRadius: 8, color: "hsl(210 40% 96%)" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

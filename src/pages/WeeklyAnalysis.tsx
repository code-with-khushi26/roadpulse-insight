import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const speedData = days.map((d, i) => ({ day: d, avg: [26, 24, 28, 22, 20, 34, 36][i], peak: [42, 38, 44, 36, 32, 48, 50][i] }));
const congestionData = days.map((d, i) => ({ day: d, level: [72, 78, 68, 82, 88, 45, 40][i] }));
const travelData = days.map((d, i) => ({ day: d, minutes: [48, 52, 44, 56, 62, 32, 28][i] }));

const tooltipStyle = { backgroundColor: "hsl(222 40% 12%)", border: "1px solid hsl(189 40% 20%)", borderRadius: 8, color: "hsl(210 40% 96%)" };

export default function WeeklyAnalysis() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Weekly Analysis</h1>
        <p className="text-sm text-muted-foreground mt-1">Traffic patterns for the current week</p>
      </div>

      <Tabs defaultValue="speed" className="w-full">
        <TabsList className="bg-secondary border border-glow">
          <TabsTrigger value="speed" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Speed</TabsTrigger>
          <TabsTrigger value="congestion" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Congestion</TabsTrigger>
          <TabsTrigger value="travel" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Travel Time</TabsTrigger>
        </TabsList>

        <TabsContent value="speed" className="rounded-lg border border-glow bg-card p-5 mt-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Average & Peak Speed (km/h)</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={speedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 20%)" />
              <XAxis dataKey="day" stroke="hsl(215 20% 55%)" fontSize={12} />
              <YAxis stroke="hsl(215 20% 55%)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="avg" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Average" />
              <Bar dataKey="peak" fill="#22d3ee" opacity={0.5} radius={[4, 4, 0, 0]} name="Peak" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="congestion" className="rounded-lg border border-glow bg-card p-5 mt-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Congestion Index (%)</h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={congestionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 20%)" />
              <XAxis dataKey="day" stroke="hsl(215 20% 55%)" fontSize={12} />
              <YAxis stroke="hsl(215 20% 55%)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="level" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.15} strokeWidth={2} name="Congestion %" />
            </AreaChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="travel" className="rounded-lg border border-glow bg-card p-5 mt-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Avg Travel Time (minutes, 10km route)</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={travelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 20%)" />
              <XAxis dataKey="day" stroke="hsl(215 20% 55%)" fontSize={12} />
              <YAxis stroke="hsl(215 20% 55%)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="minutes" stroke="#06b6d4" strokeWidth={2} dot={{ fill: "#06b6d4", r: 4 }} name="Minutes" />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
}

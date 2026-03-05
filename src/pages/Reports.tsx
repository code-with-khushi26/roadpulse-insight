import { FileText, FileDown, FileVideo, Download } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const reportHistory = [
  { id: 1, name: "Weekly Report — Feb 24", date: "2026-02-24", type: "PDF", size: "2.4 MB" },
  { id: 2, name: "Monthly Analysis — Jan 2026", date: "2026-02-01", type: "Word", size: "5.1 MB" },
  { id: 3, name: "Festival Impact Report", date: "2026-01-15", type: "PDF", size: "3.2 MB" },
  { id: 4, name: "Road Quality Q4 2025", date: "2025-12-31", type: "CSV", size: "1.8 MB" },
  { id: 5, name: "Processed Video — Sector 14", date: "2025-12-20", type: "MP4", size: "48 MB" },
];

const exportButtons = [
  { label: "Export CSV", icon: <FileText className="h-4 w-4" />, desc: "Raw data export" },
  { label: "Export Word Report", icon: <FileDown className="h-4 w-4" />, desc: "Formatted report" },
  { label: "Export PDF", icon: <FileDown className="h-4 w-4" />, desc: "Print-ready report" },
  { label: "Download Processed Video", icon: <FileVideo className="h-4 w-4" />, desc: "MP4 with overlays" },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-sm text-muted-foreground mt-1">Export data and download processed reports</p>
      </div>

      {/* Export buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {exportButtons.map((btn) => (
          <button
            key={btn.label}
            className="flex items-center gap-3 rounded-lg border border-glow bg-card p-4 text-left hover:border-primary/50 hover:bg-secondary transition-colors group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors shrink-0">
              {btn.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{btn.label}</p>
              <p className="text-xs text-muted-foreground">{btn.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Report history */}
      <div className="rounded-lg border border-glow bg-card">
        <div className="p-5 border-b border-glow">
          <h3 className="text-sm font-semibold text-foreground">Report History</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-glow hover:bg-transparent">
              <TableHead className="text-muted-foreground">Report Name</TableHead>
              <TableHead className="text-muted-foreground">Date</TableHead>
              <TableHead className="text-muted-foreground">Type</TableHead>
              <TableHead className="text-muted-foreground">Size</TableHead>
              <TableHead className="text-muted-foreground text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportHistory.map((r) => (
              <TableRow key={r.id} className="border-glow hover:bg-secondary/50">
                <TableCell className="text-sm text-foreground">{r.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{r.date}</TableCell>
                <TableCell>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">{r.type}</span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{r.size}</TableCell>
                <TableCell className="text-right">
                  <button className="p-2 rounded-md hover:bg-primary/10 text-primary transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

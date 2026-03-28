"use client"
import { LoginCompareChart, ChartGrid, ReportsBarChart } from "./components/ui/Charts";
import Hero from "./components/ui/Hero";
import { Report, ReportsTable } from "./components/ui/Tables";
import { useAppSelector } from "./store/hooks";


export default function Home() {
  const filter = useAppSelector(state => state.filter.filter)

  const data: Report[] = [
    { id: 1, message: "Fake product detected", type: "Fraud" },
    { id: 2, message: "Fake product detected", type: "Fraud" },
    { id: 3, message: "User verified successfully", type: "Genuine" },
    { id: 4, message: "New complaint received", type: "New" },
    { id: 5, message: "New complaint received", type: "New" },
  ];

  return (
    <main className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 lg:mt-6">
        <Hero name="Vishal" />
      </div>
      <ChartGrid>
        <LoginCompareChart labels={
          filter === "WEEKLY" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : ["Jan", "Fed", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dev"]}
          last={filter === "WEEKLY" ? [14, 25, 24, 22, 18, 19, 55] : [14, 25, 24, 22, 18, 19, 55, 87, 87, 700, 650]}
          current={filter === "WEEKLY" ? [14, 25, 24, 32, 18, 25, 68] : [14, 25, 24, 32, 18, 25, 156]}
          compariosnType={filter === "WEEKLY" ? "Daily Logins Comapriosion per week" : "Annual Logins Comapriosion per week"} />

        <ReportsBarChart fraud={123} genuine={88} newReports={53} />
      </ChartGrid>

      <div className="p-6 bg-slate-50 min-h-screen">
        <ReportsTable data={data} />
      </div>
    </main>
  );
}
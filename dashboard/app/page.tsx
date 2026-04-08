"use client"
import { LoginCompareChart, ChartGrid, ReportsBarChart } from "./components/ui/Charts";
import Hero from "./components/ui/Hero";
import { ReportsTableSub } from "./components/ui/Tables";
import { useAppSelector } from "./store/hooks";


export default function Home() {
  const filter = useAppSelector(state => state.filter.filter);
  const reports = useAppSelector(state => state.auth.reports);

  const loginCountW = useAppSelector(state=>state.auth.analytics.loginCount).slice(0, 7).map((val, index)=> index < 7 ? val.count : 0);

  const prevLoginCountW = useAppSelector(state=>state.auth.analytics.prevLoginCount).slice(0, 7).map((val, index)=> index < 7 ? val.count : 0);

  const prevLoginCountM = useAppSelector(state=>state.auth.analytics.prevLoginCount).map((val, index)=> index < 7 ? val.count : 0);
  const loginCountM = useAppSelector(state=>state.auth.analytics.loginCount).map((val, index)=> index < 7 ? val.count : 0);

  return (
    <main className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 lg:mt-6">
        <Hero name="Vishal" />
      </div>
      <ChartGrid>
        <LoginCompareChart labels={
          filter === "WEEKLY" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"]}
          last={filter === "WEEKLY" ? [...prevLoginCountW] : prevLoginCountM}
          current={filter === "WEEKLY" ? loginCountW : loginCountM}
          compariosnType={filter === "WEEKLY" ? "Daily Logins Comapriosion per week" : "Annual Logins Comapriosion per week"} />

        <ReportsBarChart fraud={123} genuine={88} newReports={53} />
      </ChartGrid>

      <div className="p-6 bg-slate-50 min-h-screen">
        <ReportsTableSub data={reports} />
      </div>
    </main>
  );
}
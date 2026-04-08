"use client"
import React from "react";
import { Chart as ChartJS,  BarElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setFilter } from "@/app/store/functions/filters";

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);


type ChartGridProps = {
    children: React.ReactNode;
}

export const ChartGrid: React.FC<ChartGridProps> = ({ children }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{children}</div>
    );
}

type Props = {
    compariosnType: string;
    labels: string[];
    last: number[];
    current: number[];
}

export const LoginCompareChart: React.FC<Props> = ({
    last,
    current,
    labels,
    compariosnType,
}) => {
    const filters = ["WEEKLY", "MONTHS"];

    const disp = useAppDispatch();

    const filter = useAppSelector((state)=>state.filter.filter)


    const data = {
        labels: labels,
        datasets: [
            {
                label: "Last week",
                data: last,
                borderColor: "#4f46e5",
                backgroundColor: "#4f46e5",
                tension: 0.4,
            },
            {
                label: "This week",
                data: current,
                borderColor: "#ec4899",
                backgroundColor: "#ec4899",
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top" as const,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    color: "#e2e8f0",
                },
            },
        },
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md h-87.5 flex flex-col">

            <div className="flex flex-col gap-2  md:flex-row items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                    {compariosnType}
                </h2>
                <div className="flex bg-slate-100 rounded-full p-1">
                    {filters.map((item) => (
                        <button
                            key={item}
                            onClick={() => disp(setFilter({filter: item}))}
                            className={`px-3 py-1 text-sm rounded-full transition-all ${filter === item
                                    ? "bg-black text-white"
                                    : "text-slate-600 hover:text-black"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

type barProps = {
  genuine: number;
  fraud: number;
  newReports: number;
};

export const ReportsBarChart: React.FC<barProps> = ({
  genuine,
  fraud,
  newReports,
}) => {
  const data = {
    labels: ["Genuine", "Fraud", "New"],
    datasets: [
      {
        label: "Total Reports",
        data: [genuine, fraud, newReports],
        backgroundColor: [
          "#22c55e", // green (genuine)
          "#ef4444", // red (fraud)
          "#3b82f6", // blue (new)
        ],
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#e2e8f0",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-[350px] flex flex-col">
      
      {/* 🔥 Title */}
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Reports Overview
      </h2>

      {/* 📊 Chart */}
      <div className="flex-1">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};
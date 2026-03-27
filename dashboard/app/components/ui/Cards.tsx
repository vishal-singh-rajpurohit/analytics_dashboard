"use client"

import { setToggleVisit } from "@/app/store/functions/toggle";
import { useAppDispatch } from "@/app/store/hooks";
import { useState } from "react";

export const ReportVisitCard = ({ reportId }: { reportId: string; }) => {

    // useEffect(()=>{},[]) //fetch the report when opended


    const disp = useAppDispatch();

    const report = {
        reportedBy: {
            username: "vishal",
            id: "U123",
        },
        message: "This user is sending spam messages repeatedly.",
        contactId: "C456",
        type: "Fraud",
    };

    const getTypeStyle = (type: string) => {
        switch (type) {
            case "Genuine":
                return "bg-green-100 text-green-700";
            case "Fraud":
                return "bg-red-100 text-red-700";
            case "New":
                return "bg-blue-100 text-blue-700";
            default:
                return "bg-slate-100 text-slate-700";
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 max-w-xl">

            {/* 🔥 Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">
                    Report Details
                </h3>

                <span className={`px-3 py-1 text-xs rounded-full font-medium ${getTypeStyle(report.type)}`}>
                    {report.type}
                </span>
            </div>

            {/* 📄 Content */}
            <div className="space-y-4 text-sm">

                {/* Reported By */}
                <div>
                    <p className="text-slate-500">Reported By</p>
                    <p className="font-medium text-slate-800">
                        {report.reportedBy.username}{" "}
                        <span className="text-slate-500 text-xs">
                            (ID: {report.reportedBy.id})
                        </span>
                    </p>
                </div>

                {/* Message */}
                <div>
                    <p className="text-slate-500">Message</p>
                    <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border">
                        {report.message}
                    </p>
                </div>

                {/* Contact ID */}
                <div>
                    <p className="text-slate-500">Contact ID</p>
                    <p className="text-slate-800 font-medium">
                        {report.contactId}
                    </p>
                </div>

            </div>

            {/* 🔘 Actions */}
            <div className="mt-6 flex gap-3 justify-end">

                <button onClick={() => { disp(setToggleVisit({ visitTo: "CLOSE" })) }}
                    className="px-4 py-2 rounded-xl text-sm font-medium border border-red-300 text-red-600 hover:bg-red-50 transition"
                >
                    Cancel
                </button>
                <button
                    className="px-4 py-2 rounded-xl text-sm font-medium border border-red-300 text-red-600 hover:bg-red-50 transition"
                >
                    Reject
                </button>

                <button
                    className="px-4 py-2 rounded-xl text-sm font-medium bg-black text-white hover:bg-slate-800 transition"
                >
                    Take Action
                </button>

            </div>
        </div>
    );
};

type User = {
  userName: string;
  searchTag: string;
  email: string;
  avatar: string;
  status: "Online" | "Offline";
};


export const UserDetailCard = ({userId}:{userId: string}) => {
  const [message, setMessage] = useState<string>("");
  const disp = useAppDispatch();

  const [user, setUser] = useState<User>({
    avatar: "https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    email: 'vsgamer9595@gmail.com',
    searchTag: 'gamingwood',
    status: "Offline",
    userName: "Ironman"
  })

  const statusStyle =
    user.status === "Online"
      ? "bg-green-100 text-green-700"
      : "bg-slate-200 text-slate-700";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 max-w-xl">
      <div className="flex items-center gap-4 mb-5">
        <img src={user.avatar} alt="avatar" className="w-14 h-14 rounded-full object-cover" />

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">
            {user.userName}
          </h3>
          <p className="text-sm text-slate-500">
            {user.searchTag}
          </p>
        </div>

        {/* Status */}
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${statusStyle}`}
        >
          {user.status}
        </span>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <p className="text-slate-500">Email</p>
          <p className="text-slate-800 font-medium">{user.email}</p>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm text-slate-500 mb-1">Send Message</p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
          rows={3}
        />
      </div>

      <div className="mt-6 flex gap-3 justify-end flex-wrap">
        <button onClick={() => { disp(setToggleVisit({ visitTo: "CLOSE" })) }}
          className="px-4 py-2 rounded-xl text-sm font-medium border border-red-300 text-red-600 hover:bg-red-50 transition"
        >
          Close
        </button>
        <button
          className="px-4 py-2 rounded-xl text-sm font-medium border border-red-300 text-red-600 hover:bg-red-50 transition"
        >
          Suspend
        </button>

        <button
          className="px-4 py-2 rounded-xl text-sm font-medium bg-black text-white hover:bg-slate-800 transition"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};
"use client"
import { setToggleVisit, toggleLoading } from "@/app/store/functions/toggle";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { apiInstance } from "@/app/utils/axios.utils";
import { useState } from "react";

export const ReportVisitCard = () => {

  const disp = useAppDispatch();
  const report = useAppSelector(state => state.auth.fullData.report);

  async function rejectReport() {
    try {
      disp(toggleLoading({ toggle: true }))
      await apiInstance.post(`/reports/reject`, {
        id: report._id
      })

      disp(setToggleVisit({ visitTo: "CLOSE" }))
    } catch (error) {
      console.log("Error in resolve report")
    } finally {
      disp(toggleLoading({ toggle: false }))
    }
  }

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

        <span className={`px-3 py-1 text-xs rounded-full font-medium ${getTypeStyle(report.reportType)}`}>
          {report.reportType}
        </span>
      </div>

      {/* 📄 Content */}
      <div className="space-y-4 text-sm">

        {/* Reported By */}
        <div>
          <p className="text-slate-500">Reported By</p>
          <p className="font-medium text-slate-800">
            {report.reportedBy.searchTag}{" "}
            <span className="text-slate-500 text-xs">
              (ID: {report.reportedBy._id})
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
        <button onClick={rejectReport}
          className="px-4 py-2 rounded-xl text-sm font-medium border border-red-300 text-red-600 hover:bg-red-50 transition"
        >
          Reject
        </button>

        <button disabled
          className="px-4 py-2 rounded-xl text-sm font-medium bg-black disabled:bg-slate-400  text-white hover:bg-slate-800 transition"
        >
          Take Action
        </button>

      </div>
    </div>
  );
};

export const UserDetailCard = () => {
  const [message, setMessage] = useState<string>("");
  const disp = useAppDispatch();

  const user = useAppSelector(state => state.auth.fullData.user)
  const defaultAvatar = "https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  const statusStyle =
    user.online
      ? "bg-green-100 text-green-700"
      : "bg-slate-200 text-slate-700";


  async function suspend(id: string) {
    try {
      disp(toggleLoading({ toggle: true }))
      await apiInstance.post('/users/suspend', { id: id })
      disp(setToggleVisit({ visitTo: "CLOSE" }))
    } catch (error) {
      console.log('error in suspend')
    } finally {
      disp(toggleLoading({ toggle: false }))
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 max-w-xl">
      <div className="flex items-center gap-4 mb-5">
        <img src={user.avatar || defaultAvatar} alt="avatar" className="w-14 h-14 rounded-full object-cover" />

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">
            {user.username}
          </h3>
          <p className="text-sm text-slate-500">
            {user.searchTag}
          </p>
        </div>

        {/* Status */}
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${statusStyle}`}
        >
          {user.online ? "online" : "offline "}
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
        <button onClick={() => suspend(user._id)}
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

export const ComingSoon: React.FC = () => {
  const disp = useAppDispatch()
  return (
    <div className="flex items-center justify-center min-h-75">

      <div className="bg-white border border-slate-200 shadow-md rounded-2xl px-8 py-10 text-center max-w-md w-full">

        <div className="text-4xl mb-4">🚧</div>

        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Coming Soon
        </h2>

        <p className="text-slate-600 text-sm">
          This function will be available soon.
        </p>

        <div className="mt-6 ">
          <button onClick={() => { disp(setToggleVisit({ visitTo: "CLOSE" })) }}
            className="px-4 py-2 rounded-xl text-sm font-medium border border-red-300 text-red-600 hover:bg-red-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
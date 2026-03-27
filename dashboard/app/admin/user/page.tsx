import React from "react";

type Profile = {
  memberId: string;
  role: string;
  name: string;
  number: string;
  email: string;
  avatar: string;
};

export default function page(){
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 max-w-xl mx-auto">
      
      {/* 🔥 Header */}
      <div className="flex flex-col items-center text-center mb-6">
        <img
          src={"https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          alt="avatar"
          className="w-20 h-20 rounded-full object-cover mb-3"
        />
        <h2 className="text-xl font-semibold text-slate-900">
          {"Vishal Singh"}
        </h2>
        <p className="text-sm text-slate-500">{"Manager"}</p>
      </div>

      {/* 📄 Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        
        <div>
          <p className="text-slate-500">Member ID</p>
          <p className="font-medium text-slate-800">
            {"profile.memberId"}
          </p>
        </div>

        <div>
          <p className="text-slate-500">Role</p>
          <p className="font-medium text-slate-800">
            {"Admin"}
          </p>
        </div>

        <div>
          <p className="text-slate-500">Name</p>
          <p className="font-medium text-slate-800">
            {"Vishal Singh"}
          </p>
        </div>

        <div>
          <p className="text-slate-500">Phone Number</p>
          <p className="font-medium text-slate-800">
            {"9509075612"}
          </p>
        </div>

        <div className="sm:col-span-2">
          <p className="text-slate-500">Email</p>
          <p className="font-medium text-slate-800">
            {"vsgamer9595@gmail.com"}
          </p>
        </div>

      </div>

      {/* 🔘 Logout Button */}
      <div className="mt-8">
        <button
          className="w-full py-3 rounded-xl font-medium bg-black text-white hover:bg-slate-800 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
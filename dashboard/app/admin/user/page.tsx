"use client"

import { useAppSelector } from "@/app/store/hooks";

type Profile = {
  memberId: string;
  role: string;
  name: string;
  number: string;
  email: string;
  avatar: string;
};

export default function page(){
  const user = useAppSelector(state=> state.auth.admin)
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 max-w-xl mx-auto">

      <div className="flex flex-col items-center text-center mb-6">
        <img
          src={"https://wallpapercave.com/wp/wp15992880.jpg"}
          alt="avatar"
          className="w-20 h-20 rounded-full object-cover mb-3"
        />
        <h2 className="text-xl font-semibold text-slate-900">
          {user.fullName}
        </h2>
        <p className="text-sm text-slate-500">{"Manager"}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        
        <div>
          <p className="text-slate-500">Member ID</p>
          <p className="font-medium text-slate-800">
            {user.id}
          </p>
        </div>

        <div>
          <p className="text-slate-500">Role</p>
          <p className="font-medium text-slate-800">
            {user.role}
          </p>
        </div>

        <div >
          <p className="text-slate-500">Email</p>
          <p className="font-medium text-slate-800">
            {user.email}
          </p>
        </div>

        <div>
          <p className="text-slate-500">Phone Number</p>
          <p className="font-medium text-slate-800">
            {user.mobile}
          </p>
        </div>

        <div className="sm:col-span-2">
          <p className="text-slate-500">Autharized By</p>
          <p className="font-medium text-slate-800">
            {user.autharisedBy || 'Self'}
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
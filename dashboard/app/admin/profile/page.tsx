"use client"
import { ComingSoon } from "@/app/components/ui/Cards";
import { useAppSelector } from "@/app/store/hooks";
import React from "react";

type Profile = {
  name: string;
  email: string;
  mobile: string;
  role: string;
  authorizedBy: string;
  createdAt: string;
};

const trialProfile: Profile = {
    name: "Vishal Singh",
    email: "vishal@email.com",
    mobile: "+91 9876543210",
    role: "Super",
    authorizedBy: "Admin123",
    createdAt: "01 April 2026",
};

type Props = {
  profile: Profile;
};

const Profile: React.FC<Props> = ({ profile }) => {

  const admin = useAppSelector((state)=>state.auth.admin)

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 max-w-2xl">
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          User Profile
        </h2>
        <p className="text-sm text-slate-500">
          Detailed information about the user
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
        
        <div>
          <p className="text-slate-500">Name</p>
          <p className="font-medium text-slate-800">
            {admin.fullName}
          </p>
        </div>

        <div>
          <p className="text-slate-500">Email</p>
          <p className="font-medium text-slate-800">
            {admin.email}
          </p>
        </div>

        <div>
          <p className="text-slate-500">Mobile Number</p>
          <p className="font-medium text-slate-800">
            {admin.mobile}
          </p>
        </div>

        <div>
          <p className="text-slate-500">Role</p>
          <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 font-medium">
            {admin.role}
          </span>
        </div>

        <div>
          <p className="text-slate-500">Authorized By</p>
          <p className="font-medium text-slate-800">
            {profile.authorizedBy}
          </p>
        </div>

        <div>
          <p className="text-slate-500">Created Date</p>
          <p className="font-medium text-slate-800">
            {profile.createdAt}
          </p>
        </div>

      </div>
    </div>
  );
};

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Suspended";
};

type ActionsProps = {
  users: User[];
  onSuspend?: (id: number) => void;
};

const users: User[] = [
    {
      id: 1,
      name: "Vishal Singh",
      email: "vishal@email.com",
      role: "Super",
      status: "Active",
    },
    {
      id: 2,
      name: "Rahul",
      email: "rahul@email.com",
      role: "Supervisor",
      status: "Suspended",
    },
  ];

  const handleSuspend = (id: number) => {
    alert("Suspend user ID: " + id);
  };
const Actions: React.FC<ActionsProps> = ({ users, onSuspend }) => {
  const getStatusStyle = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">

      <h2 className="text-lg font-semibold text-slate-900 mb-6">
        User Actions
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          
          <thead>
            <tr className="text-sm text-slate-500 border-b">
              <th className="py-3">S. No</th>
              <th className="py-3">Name</th>
              <th className="py-3">Email</th>
              <th className="py-3">Role</th>
              <th className="py-3">Status</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="border-b hover:bg-slate-50 transition"
              >
                <td className="py-3">{index + 1}</td>

                <td className="py-3 text-slate-800 font-medium">
                  {user.name}
                </td>

                <td className="py-3 text-slate-600">
                  {user.email}
                </td>

                <td className="py-3">
                  <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
                    {user.role}
                  </span>
                </td>

                <td className="py-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusStyle(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="py-3">
                  <button
                    onClick={() => onSuspend?.(user.id)}
                    disabled={user.status === "Suspended"}
                    className={`px-4 py-1.5 text-sm rounded-lg font-medium transition ${
                      user.status === "Suspended"
                        ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default function Page() {
    return (
        <div className="p-6 bg-slate-50 min-h-screen">
        <ComingSoon />
        </div>
        // <Actions users={users} onSuspend={handleSuspend} />
    );
}
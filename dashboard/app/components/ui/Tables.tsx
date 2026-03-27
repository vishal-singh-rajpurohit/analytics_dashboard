"use client"
import Link from "next/link";
import React, { useState } from "react";
import { VisitButtons } from "./Buttons";
import { useAppDispatch } from "@/app/store/hooks";
import { setToggleVisit } from "@/app/store/functions/toggle";

export type Report = {
  id: number;
  message: string;
  type: "Genuine" | "Fraud" | "New";
};

type ReportProps = {
  data: Report[];
}

const reportFilters = ["Latest", "Older"];

// Reports Component
export const ReportsTable: React.FC<ReportProps> = ({ data }) => {
  const [activeFilter, setActiveFilter] = useState("Latest");

  const sortedData =
    activeFilter === "Latest" ? [...data].reverse() : data;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Reports Table (Only 5)
          <Link className="pl-4" href={'#'} >
            <VisitButtons title="Visit" />
          </Link>
        </h2>

        <div className="flex bg-slate-100 rounded-full p-1">
          {reportFilters.map((item) => (
            <button
              key={item}
              onClick={() => setActiveFilter(item)}
              className={`px-3 py-1 text-sm rounded-full transition ${activeFilter === item
                ? "bg-black text-white"
                : "text-slate-600 hover:text-black"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm text-slate-500 border-b">
              <th className="py-3">S. No</th>
              <th className="py-3">Message</th>
              <th className="py-3">Type</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {sortedData.map((report, index) => (
              <ReportTableBody key={index} report={report} index={index} />
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

function ReportTableBody({ report, index }: { report: Report; index: number }) {

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

  const disp = useAppDispatch();


  return (
    <tr
      key={report.id}
      className="border-b hover:bg-slate-50 transition"
    >
      <td className="py-3">{index + 1}</td>
      <td className="py-3 text-slate-700">
        {report.message}
      </td>
      <td className="py-3">
        <span className={`px-3 py-1 text-xs rounded-full font-medium ${getTypeStyle(report.type)}`}>
          {report.type}
        </span>
      </td>
      <td className="py-3">
        <span onClick={() => disp(setToggleVisit({ visitTo: "REPORT" }))}>
          <VisitButtons title="Visit" />
        </span>
      </td>
    </tr>
  )
}

// Contacts
export type Contact = {
  id: number;
  members: string;
  type: "P2P" | "Group";
};

type ContactProps = {
  data: Contact[];
};

const contactsFilters = ["All", "P2P", "Group"];

const ContactTableBody = ({ contact, index }: { contact: Contact; index: number }) => {

  const getTypeStyle = (type: string) => {
    return type === "P2P"
      ? "bg-indigo-100 text-indigo-700"
      : "bg-pink-100 text-pink-700";
  };

  return (
    <tr className="border-b hover:bg-slate-50 transition">
      <td className="py-3">{index + 1}</td>
      <td className="py-3 text-slate-700">
        {contact.members}
      </td>

      <td className="py-3">
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${getTypeStyle(
            contact.type
          )}`}
        >
          {contact.type}
        </span>
      </td>

      <td className="py-3">
        <button className="px-4 py-1.5 text-sm rounded-lg bg-black text-white hover:bg-slate-800 transition">
          Visit
        </button>
      </td>
    </tr>
  )
}
export const ContactsTable: React.FC<ContactProps> = ({ data }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredData =
    activeFilter === "All"
      ? data
      : data.filter((item) => item.type === activeFilter);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Contacts Table</h2>
        <div className="flex bg-slate-100 rounded-full p-1">
          {contactsFilters.map((item) => (
            <button
              key={item}
              onClick={() => setActiveFilter(item)}
              className={`px-3 py-1 text-sm rounded-full transition ${activeFilter === item
                ? "bg-black text-white"
                : "text-slate-600 hover:text-black"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm text-slate-500 border-b">
              <th className="py-3">S. No</th>
              <th className="py-3">Members</th>
              <th className="py-3">Type</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((contact, index) => <ContactTableBody key={index} contact={contact} index={index} />)}
          </tbody>

        </table>
      </div>
    </div>
  );
};



export type User = {
  id: number;
  searchTag: string;
  status: "Online" | "Offline";
};

type UserProps = {
  data: User[];
};

const filters = ["All", "Online", "Offline"];

export const UsersTable: React.FC<UserProps> = ({ data }) => {

  const [activeFilter, setActiveFilter] = useState("All");

  const filteredData =
    activeFilter === "All"
      ? data
      : data.filter((user) => user.status === activeFilter);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Users Table
        </h2>

        <div className="flex bg-slate-100 rounded-full p-1">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setActiveFilter(item)}
              className={`px-3 py-1 text-sm rounded-full transition ${activeFilter === item
                ? "bg-black text-white"
                : "text-slate-600 hover:text-black"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm text-slate-500 border-b">
              <th className="py-3">S. No</th>
              <th className="py-3">SearchTag</th>
              <th className="py-3">Status</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user, index) => (
              <UserTableBody user={user} index={index} key={index} />
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

const UserTableBody = ({ user, index }: { user: User; index: number }) => {

  const getStatusStyle = (status: string) => {
    return status === "Online"
      ? "bg-green-100 text-green-700"
      : "bg-slate-200 text-slate-700";
  };

  const disp = useAppDispatch();
  return (
    <tr
      key={user.id}
      className="border-b hover:bg-slate-50 transition"
    >
      <td className="py-3">{index + 1}</td>

      <td className="py-3 text-slate-700">
        {user.searchTag}
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
        <button onClick={() => disp(setToggleVisit({ visitTo: "USER" }))} className="px-4 py-1.5 text-sm rounded-lg bg-black text-white hover:bg-slate-800 transition">
          Visit
        </button>
      </td>
    </tr>
  )
}
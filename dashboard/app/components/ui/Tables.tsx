"use client"
import Link from "next/link";
import React, { useState } from "react";
import { TableNav, VisitButtons } from "./Buttons";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setToggleVisit, toggleLoading } from "@/app/store/functions/toggle";
import { reportOverviewType, contactOverviewType, userOverviewType, reportsOverview, contactsOverviewResp, usersOverviewResp, ReportFullType, UserFullType } from "@/app/types/apiTypes";
import { apiInstance } from "@/app/utils/axios.utils"
import { addContacts, addReports, addSingleReport, addSingleUser, addUsers, getNextData, getPrevData } from "@/app/store/functions/auth";
import { changeHasNext, changePage } from "@/app/store/functions/pagination";

type ReportProps = {
  data: reportOverviewType[];
}

const reportFilters = ["Latest", "Older"];

// Reports Component
export const ReportsTableSub: React.FC<ReportProps> = ({ data }) => {
  const [activeFilter, setActiveFilter] = useState("Latest");
  const sortedData = activeFilter === "Latest" ? [...data].reverse() : data;

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

export const ReportsTable: React.FC<ReportProps> = ({ data }) => {
  const [activeFilter, setActiveFilter] = useState("Latest");
  // const sortedData = activeFilter === "Latest" ? [...data].reverse() : data;
  const sortedData = data;

  const currentReports = useAppSelector(state => state.auth.reports);
  const currentPage = useAppSelector(state => state.page.reportPage);
  const contentPerPage = useAppSelector(state => state.page.contentLimit)
  const hasFurtherReports = useAppSelector(state => state.page.hasReportsFurther);

  const disp = useAppDispatch()

  async function next(limit: number = 2) {
    try {
      // console.log((currentReports.length - 1) - (currentPage * contentPerPage) != 0)
      // console.log((currentReports.length - 1) , (currentPage * contentPerPage))

      if (!hasFurtherReports) return;

      else if (currentReports.length === 0 || currentReports.length - ((currentPage - 1) * contentPerPage) === 0) {
        try {
          disp(toggleLoading({ toggle: true }))

          const resp = await apiInstance.post<reportsOverview>('/reports', {
            count: limit,
            page: currentPage + 1
          })

          if (resp.data.reports.length < contentPerPage) {
            disp(changeHasNext({ tableType: "REPORT", toggle: false }));
            if(resp.data.reports.length === 0) return;
          }

          disp(changePage({ act: "INC", tableType: "REPORT" }));
          disp(addReports({ data: resp.data.reports }));

        } catch (error) {
          console.log("Error on fetching the response: ", error)
        } finally {
          disp(toggleLoading({ toggle: false }))
        }
      }

      
      // else if (currentReports.length - (currentPage * contentPerPage) > 0) {
      else if ((currentReports.length + 1) - (currentPage * (contentPerPage - 1)) != 0) {
        disp(getNextData({ limit: contentPerPage, currentPage: currentPage, tableType: "REPORT" }))
        disp(changePage({ act: "INC", tableType: "REPORT" }));
      }
    } catch (error) {
      throw new Error('Error in getting next 10 reports')
    }
  }

  async function prev() {
    console.log("Prev")
    try {
      if (currentPage === 1) return;

      disp(toggleLoading({ toggle: true }));
      disp(getPrevData({ limit: contentPerPage, currentPage: currentPage, tableType: "REPORT" }));
      disp(changePage({ act: "DEC", tableType: "REPORT" }));
      disp(changeHasNext({tableType: "REPORT", toggle: true}))
      disp(toggleLoading({ toggle: false }));

    } catch (error) {
      throw new Error('Error in getting next 10 reports')
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Reports Table </h2>

        <div className="flex bg-slate-100 rounded-full p-1">
          {reportFilters.map((item, index) => (
            <button
              key={index}
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
        <TableNav prev={prev} prevDisabled={currentPage === 1} nextDisabled={!hasFurtherReports} next={() => next(contentPerPage)} />
      </div>
    </div>
  );
}

function ReportTableBody({ report, index }: { report: reportOverviewType; index: number }) {

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

  async function checkItem(id: string){
    try {
      disp(toggleLoading({toggle: false}))
      const resp = await apiInstance.get<{report: ReportFullType}>(`/reports/${id}`, {
        withCredentials: true
      })

      disp(setToggleVisit({ visitTo: "REPORT" }))
      disp(addSingleReport({data: resp.data.report}))
    } catch (error) {
      console.log('error in getting report item: ', error)
    }finally{
      disp(toggleLoading({toggle: false}))
    }
  }

  return (
    <tr
      key={report._id}
      className="border-b hover:bg-slate-50 transition"
    >
      <td className="py-3">{index + 1}</td>
      <td className="py-3 text-slate-700">
        {report.message}
      </td>
      <td className="py-3">
        <span className={`px-3 py-1 text-xs rounded-full font-medium ${getTypeStyle(report.reportType)}`}>
          {report.reportType}
        </span>
      </td>
      <td className="py-3">
        <span onClick={() => checkItem(report._id)}>
          <VisitButtons title="Visit" />
        </span>
      </td>
    </tr>
  )
}

// Contacts
type ContactProps = {
  data: contactOverviewType[];
};

const contactsFilters = ["All", "P2P", "Group"];

const ContactTableBody = ({ contact, index }: { contact: contactOverviewType; index: number }) => {

  const getTypeStyle = (type: string) => {
    return type === "P2P"
      ? "bg-indigo-100 text-indigo-700"
      : "bg-pink-100 text-pink-700";
  };

  const disp = useAppDispatch()

  return (
    <tr className="border-b hover:bg-slate-50 transition">
      <td className="py-3">{index + 1}</td>
      <td className="py-3 text-slate-700">
        {contact.members.length ? contact.members.map((item)=>(item + " ")) : "Group Chat"} 
      </td>

      <td className="py-3">
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${getTypeStyle(
            contact.contactType
          )}`}
        >
          {contact.contactType}
        </span>
      </td>

      <td className="py-3">
        <button onClick={()=>disp(setToggleVisit({visitTo: "CONTACT"}))}
         className="px-4 py-1.5 text-sm rounded-lg bg-black text-white hover:bg-slate-800 transition">
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
      : data.filter((item) => item.contactType === activeFilter);

  const disp = useAppDispatch();

  const currentContacts = useAppSelector(state=>state.auth.contacts);
  const currentPage = useAppSelector(state=>state.page.contactPage);
  const hasFurtherContacts = useAppSelector(state =>state.page.hasContactsFurther);
  const contentPerPage = useAppSelector(state=>state.page.contentLimit);

  async function next(limit: number = 2) {
    try {
      if (!hasFurtherContacts) return;

      else if (currentContacts.length === 0 || currentContacts.length - ((currentPage - 1) * contentPerPage) === 0) {
        try {
          disp(toggleLoading({ toggle: true }))

          const resp = await apiInstance.post<contactsOverviewResp>('/contacts', {
            count: limit,
            page: currentPage + 1
          })

          if (resp.data.contacts.length < contentPerPage) {
            disp(changeHasNext({ tableType: "CONTACT", toggle: false }));
            if(resp.data.contacts.length === 0) return;
          }

          disp(changePage({ act: "INC", tableType: "CONTACT" }));
          disp(addContacts({ data: resp.data.contacts }));

        } catch (error) {
          console.log("Error on fetching the response: ", error)
        } finally {
          disp(toggleLoading({ toggle: false }))
        }
      }

      
      // else if (currentContacts.length - (currentPage * contentPerPage) > 0) {
      else if ((currentContacts.length + 1) - (currentPage * (contentPerPage - 1)) != 0) {
        disp(getNextData({ limit: contentPerPage, currentPage: currentPage, tableType: "CONTACT" }))
        disp(changePage({ act: "INC", tableType: "CONTACT" }));
      }
    } catch (error) {
      throw new Error('Error in getting next 10 reports')
    }
  }

  async function prev() {
    try {
      if (currentPage === 1) return;
      disp(toggleLoading({ toggle: true }));
      disp(getPrevData({ limit: contentPerPage, currentPage: currentPage, tableType: "CONTACT" }));
      disp(changePage({ act: "DEC", tableType: "CONTACT" }));
      disp(changeHasNext({tableType: "CONTACT", toggle: true}))
      disp(toggleLoading({ toggle: false }));
    } catch (error) {
      throw new Error('Error in getting next 10 reports')
    }
  }

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
        <TableNav prev={prev} prevDisabled={currentPage === 1} nextDisabled={!hasFurtherContacts} next={() => next(contentPerPage)} />
      </div>
    </div>
  );
};


type UserProps = {
  data: userOverviewType[];
};

const filters = ["All", true, false];

export const UsersTable: React.FC<UserProps> = ({ data }) => {

  const [activeFilter, setActiveFilter] = useState<string | boolean>("All");

  const filteredData =
    activeFilter === "All"
      ? data
      : typeof (activeFilter) === "boolean" ? data.filter((user) => user.online === activeFilter) : data;

   const disp = useAppDispatch();

  const currentUsers = useAppSelector(state=>state.auth.users);
  const currentPage = useAppSelector(state=>state.page.userPage);
  const hasFurtherUsers = useAppSelector(state =>state.page.hasUsersFurther);
  const contentPerPage = useAppSelector(state=>state.page.contentLimit);

  async function next(limit: number = 2) {
    try {
      if (!hasFurtherUsers) return;

      else if (currentUsers.length === 0 || currentUsers.length - ((currentPage - 1) * contentPerPage) === 0) {
        try {
          disp(toggleLoading({ toggle: true }))

          const resp = await apiInstance.post<usersOverviewResp>('/users', {
            count: limit,
            page: currentPage + 1
          })

          if (resp.data.users.length < contentPerPage) {
            disp(changeHasNext({ tableType: "USER", toggle: false }));
            if(resp.data.users.length === 0) return;
          }

          disp(changePage({ act: "INC", tableType: "USER" }));
          disp(addUsers({ data: resp.data.users }));

        } catch (error) {
          console.log("Error on fetching the response: ", error)
        } finally {
          disp(toggleLoading({ toggle: false }))
        }
      }

      
      // else if (currentContacts.length - (currentPage * contentPerPage) > 0) {
      else if ((currentUsers.length + 1) - (currentPage * (contentPerPage - 1)) != 0) {
        disp(getNextData({ limit: contentPerPage, currentPage: currentPage, tableType: "USER" }))
        disp(changePage({ act: "INC", tableType: "USER" }));
      }
    } catch (error) {
      throw new Error('Error in getting next 10 reports')
    }
  }

  async function prev() {
    try {
      if (currentPage === 1) return;
      disp(toggleLoading({ toggle: true }));
      disp(getPrevData({ limit: contentPerPage, currentPage: currentPage, tableType: "USER" }));
      disp(changePage({ act: "DEC", tableType: "USER" }));
      disp(changeHasNext({tableType: "USER", toggle: true}))
      disp(toggleLoading({ toggle: false }));
    } catch (error) {
      throw new Error('Error in getting next 10 reports')
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Users Table
        </h2>

        <div className="flex bg-slate-100 rounded-full p-1">
          {filters.map((item, index) => (
            <button
              key={(index)}
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
        <TableNav prev={prev} prevDisabled={currentPage === 1} nextDisabled={!hasFurtherUsers} next={() => next(contentPerPage)} />
      </div>
    </div>
  );
};

const UserTableBody = ({ user, index }: { user: userOverviewType; index: number }) => {

  const getStatusStyle = (status: string) => {
    return status === "Online"
      ? "bg-green-100 text-green-700"
      : "bg-slate-200 text-slate-700";
  };

  const disp = useAppDispatch();

  async function checkItem(id: string){
    try {
      disp(toggleLoading({toggle: false}))
      const resp = await apiInstance.get<{user: UserFullType}>(`/users/${id}`, {
        withCredentials: true
      })

      console.log('resp: ', resp)
      disp(addSingleUser({data: resp.data.user}))
      disp(setToggleVisit({ visitTo: "USER" }))
      // disp(addSingleReport({data: resp.data.report}))
    } catch (error) {
      console.log('error in getting report item: ', error)
    }finally{
      disp(toggleLoading({toggle: false}))
    }
  }

  return (
    <tr
      key={user._id}
      className="border-b hover:bg-slate-50 transition"
    >
      <td className="py-3">{index + 1}</td>

      <td className="py-3 text-slate-700">
        {user.searchTag}
      </td>

      <td className="py-3">
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusStyle(
            String(user.online)
          )}`}
        >
          {user.online}
        </span>
      </td>

      <td className="py-3">
        <button onClick={() => checkItem(user._id)} className="px-4 py-1.5 text-sm rounded-lg bg-black text-white hover:bg-slate-800 transition">
          Visit
        </button>
      </td>
    </tr>
  )
}
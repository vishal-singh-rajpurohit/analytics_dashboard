"use client"
import { Contact, ContactsTable, Report, ReportsTable, User, UsersTable } from "@/app/components/ui/Tables";
import { useAppSelector } from "@/app/store/hooks";

const data: Report[] = [
    { id: 1, message: "Fake product detected", type: "Fraud" },
    { id: 2, message: "Fake product detected", type: "Fraud" },
    { id: 3, message: "User verified successfully", type: "Genuine" },
    { id: 4, message: "New complaint received", type: "New" },
    { id: 5, message: "New complaint received", type: "New" },
    { id: 1, message: "Fake product detected", type: "Fraud" },
    { id: 2, message: "Fake product detected", type: "Fraud" },
    { id: 3, message: "User verified successfully", type: "Genuine" },
    { id: 4, message: "New complaint received", type: "New" },
    { id: 5, message: "New complaint received", type: "New" },
];

const contacts: Contact[] = [
    { id: 1, members: "Vishal & Rahul", type: "P2P" },
    { id: 2, members: "Team Alpha", type: "Group" },
    { id: 3, members: "Aman & Suresh", type: "P2P" },
];

const users: User[] = [
    { id: 1, searchTag: "@vishal", status: "Online" },
    { id: 2, searchTag: "@rahul", status: "Offline" },
    { id: 3, searchTag: "@aman", status: "Online" },
];

export default function page() {
    const stateNav = useAppSelector((state) => state.filter.statNav);

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            {
                (() => {
                    if (stateNav === "CONTACTS") {
                        return (
                            <ContactsTable data={contacts} />
                        )
                    } else if (stateNav === "REPORTS") {
                        return <ReportsTable data={data} />
                    } else if (stateNav === "USER") {
                        return <UsersTable data={users} />
                    }
                })()
            }
        </div>
    )
}


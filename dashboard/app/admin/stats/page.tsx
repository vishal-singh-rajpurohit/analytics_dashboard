"use client"
import { ContactsTable, ReportsTable,  UsersTable } from "@/app/components/ui/Tables";
import { useAppSelector } from "@/app/store/hooks";

export default function page() {
    const reports = useAppSelector(state=>state.auth.selective.reports);
    const contacts = useAppSelector(state=>state.auth.selective.contacts);
    const users = useAppSelector(state=>state.auth.selective.users);
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
                        return <ReportsTable data={reports} />
                    } else if (stateNav === "USER") {
                        return <UsersTable data={users} />
                    }
                })()
            }
        </div>
    )
}


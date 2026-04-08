"use client"
import { LoadButton } from "@/app/components/ui/Buttons";
import { ComingSoon, ReportVisitCard, UserDetailCard } from "@/app/components/ui/Cards";
import { BlurModel } from "@/app/components/ui/Model";
import { setFilter, setStateNav } from "@/app/store/functions/filters";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useEffect, useState } from "react";

const navItems = ["Reports", "Contacts", "User"] as const;

const navs = {
    Reports: { title: 'Reports', subNav: ["All", "New", "Resolved", "Spam"] },
    Contacts: { title: 'Contacts', subNav: ["All", 'Blocked'] },
    User: { title: 'User', subNav: ["All",  '↑ A-z', '↑ Z-a'] },
}

function ReportsHead() {
    const [activeNav, setActionNav] = useState<"Reports" | "Contacts" | "User">("Reports")

    const filter = useAppSelector((state)=>state.filter.filter)

    const disp = useAppDispatch();

    return (
        <section className="flex flex-col gap-0.5">
            <section className="w-full h-12 bg-white flex items-center justify-center">
                <div className="hidden md:flex">
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <button key={item} onClick={
                                () => {
                                    setActionNav(item)
                                    disp(setStateNav({nav: item.toUpperCase()}))
                                }
                                } className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeNav === item ? "bg-black text-white" : "text-slate-600 hover:text-black"}`}>
                                {item}
                            </button>
                        ))}
                    </nav>
                </div>
            </section>
            <section className="w-full h-12 bg-white flex items-center justify-center">
                <div className="hidden md:flex">
                    <nav className="hidden md:flex items-center gap-6">
                        {navs[activeNav].subNav.map((item) => (
                            <button key={item} onClick={() => disp(setFilter({filter: item}))} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === item ? "bg-black text-white" : "text-slate-600 hover:text-black"}`}>
                                {item}
                            </button>
                        ))}
                    </nav>
                </div>
            </section>
        </section>
    )
}

function LoadMore() {
    return (
        <section className="flex flex-col gap-0.5">
            <section className="w-full h-12 bg-white flex items-center justify-center">
                <div className="hidden md:flex">
                    <LoadButton title="Load More" load={true} />
                </div>
            </section>
        </section>
    )
}

export default function StatsLayout({ children }: Readonly<{
    children: React.ReactNode
}>) {
    const visitCardsStats = useAppSelector(state=>state.toggle.visitStats)

    useEffect(()=>{console.log(visitCardsStats)}, [visitCardsStats])

    return (
        <section className="">
            <ReportsHead />
            {
                (()=>{
                    if(visitCardsStats === "REPORT"){
                            // change report id dynamicallys
                            return <BlurModel><ReportVisitCard  /></BlurModel>
                    }
                    else if(visitCardsStats === "USER"){
                        return <BlurModel ><UserDetailCard /></BlurModel>
                    } 
                    else if(visitCardsStats === "CONTACT"){
                        return(
                            <BlurModel ><ComingSoon /></BlurModel>
                        )
                    }
                })()
            }
            <section className="">
                {children}
            </section>
            <LoadMore />
        </section>
    )
}
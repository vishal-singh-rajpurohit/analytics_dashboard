"use client"
import Link from 'next/link'
import React, { useState } from 'react'


function ReportsHead() {
    const [openNav, setOpenNav] = useState<boolean>(false);
    const [nav, setNav] = useState<"LATEST" | "PENDING" | "RESOLVED" | "REJECTED">("LATEST");

    return (
        <section className="w-full h-12 flex items-center justify-center">
            <div className="hidden md:flex">
                <ul className="flex gap-6 text-md bg-amber-50 rounded-md overflow-hidden">
                    <Link href={"#"} onClick={() => setNav('LATEST')} className={`${nav === "LATEST" && 'bg-cyan-600 text-white'} pr-4 h-full pl-4 rounded-full`}>Latest</Link>
                    <Link href={"#"} onClick={() => setNav('PENDING')} className={`${nav === "PENDING" && 'bg-cyan-600 text-white'}  pr-4 h-full pl-4 rounded-full`}>Pending</Link>
                    <Link href={"#"} onClick={() => setNav('RESOLVED')} className={`${nav === "RESOLVED" && 'bg-cyan-600 text-white'} pr-4 h-full pl-4 rounded-full`}>Resolved</Link>
                    <Link href={"#"} onClick={() => setNav('REJECTED')} className={`${nav === "REJECTED" && 'bg-cyan-600 text-white'} pr-4 h-full pl-4 rounded-full`}>Rejected</Link>
                </ul>
            </div>
        </section>
    )
}

function Layout({ children }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <section className="">
            <section className="">
                {children}
            </section>
        </section>
    )
}

export default Layout
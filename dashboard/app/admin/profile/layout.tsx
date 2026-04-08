'use client'
import React from "react"


const AsideBar = () =>{
    return(
        <aside className="bg-white border-r border-slate-200 p-4">
                <h2 className="text-lg font-semibold text-slate-900 mb-6">
                    Account
                </h2>

                <ul className="space-y-2">
                    {["Profile", "Actions", "Instructions"].map((item, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-black cursor-pointer transition"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </aside>
    )
}

export default function Layout({ children }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <section className="min-h-screen bg-slate-50 grid grid-cols-1 md:grid-cols-[240px_1fr]">
            <AsideBar />
           
            <main className="p-6">
                {children}
            </main>

        </section>
    )
}
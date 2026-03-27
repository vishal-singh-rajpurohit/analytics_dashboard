import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/public/assets/icons8-amazon-web-services-48.png"
import Image from "next/image";
import Link from "next/link";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Analytics", href: "/admin/stats" },
    { name: "Reports", href: "" }
];

const Header: React.FC = () => {
    const [active, setActive] = useState("Home");
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="w-full bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <div className="flex items-center">
                        <Image src={logo} alt="Logo" className="h-8 w-auto object-contain" />
                    </div>

                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.href} >
                                <button onClick={() => setActive(item.name)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${active === item.name
                                    ? "bg-black text-white"
                                    : "text-slate-600 hover:text-black"
                                    }`}
                                >
                                    {item.name}
                                </button>
                            </Link>
                        ))}

                        <button className="ml-2 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition">
                            👤
                        </button>
                    </nav>


                    <button
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden px-4 pb-4">
                    <div className="flex flex-col gap-3 mt-2">
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.href}>
                                <button
                                    onClick={() => {
                                        setActive(item.name);
                                        setIsOpen(false);
                                    }}
                                    className={`px-4 py-2 rounded-xl text-left font-medium ${active === item.name
                                        ? "bg-black text-white"
                                        : "text-slate-600 hover:bg-slate-100"
                                        }`}
                                >
                                    {item.name}
                                </button>
                            </Link>
                        ))}

                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-100">
                            👤 <span>Account</span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
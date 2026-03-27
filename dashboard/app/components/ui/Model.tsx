"use client"

import { useEffect } from "react";

export function BlurModel({ children }: Readonly<{ children: React.ReactNode }>) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        console.log("called")
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <section className="w-full h-full fixed bg-black/50 top-0 left-0 flex justify-center items-center">
            {
                children
            }
        </section>
    )
}
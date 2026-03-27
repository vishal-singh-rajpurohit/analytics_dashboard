"use client"
import { AiOutlineLoading } from "react-icons/ai";
import { MdOutlineDownloading } from "react-icons/md";

export const VisitButtons = (props: {
    title: string;
}) => {
    return <button className="px-4 py-1.5 text-sm rounded-lg cursor-pointer bg-black text-white hover:bg-slate-800 transition">{props.title}</button>
}

export const LoadButton = (props: { title: string; load: boolean; }) => {
    return <button className="flex gap-2 items-center px-4 py-1.5 text-sm rounded-lg cursor-pointer bg-black text-white hover:bg-slate-800 transition">
        {!props.load? <><MdOutlineDownloading /> {props.title}</>: <AiOutlineLoading className="animate-spin" /> }
    </button>
}
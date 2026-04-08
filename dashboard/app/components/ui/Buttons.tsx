"use client"
import { AiOutlineLoading } from "react-icons/ai";
import { MdOutlineDownloading } from "react-icons/md";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const VisitButtons = (props: {
    title: string;
}) => {
    return <button className="px-4 py-1.5 text-sm rounded-lg cursor-pointer bg-black text-white hover:bg-slate-800 transition">{props.title}</button>
}

export const LoadButton = (props: { title: string; load: boolean; }) => {
    return <button className="flex gap-2 items-center px-4 py-1.5 text-sm rounded-lg cursor-pointer bg-black text-white hover:bg-slate-800 transition">
        {!props.load ? <><MdOutlineDownloading /> {props.title}</> : <AiOutlineLoading className="animate-spin" />}
    </button>
}


type NavProps = {
    action?: () => void;
    isDisabled: boolean;
};

const NextButton = (props: NavProps) => {
    return (
        <button
            disabled={props.isDisabled}
            onClick={props.action}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition bg-black text-white hover:bg-slate-800 cursor-pointer disabled:bg-slate-500 disabled:text-gray-300`}
        >
            <span className="text-sm font-medium">Next</span>
            <ArrowRight size={16} />
        </button>
    )
}

const PrevButton = (props: NavProps) => {
    return (
        <button 
            disabled={props.isDisabled}
            onClick={props.action}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer`}
        >
            <ArrowLeft size={16} />
            <span className="text-sm font-medium">Prev</span>
        </button>
    )
}

type NavDivProps = {
    next?: () => void;
    prev?: () => void;
    nextDisabled: boolean;
    prevDisabled: boolean;
};

export const TableNav = (props: NavDivProps) => {
    return (
        <div className="flex items-center justify-between mt-6">
            <PrevButton isDisabled={props.prevDisabled} action={props.prev} />
            <NextButton isDisabled={props.nextDisabled} action={props.next} />
        </div>
    )
}
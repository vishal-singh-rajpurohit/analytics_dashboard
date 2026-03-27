import { BiLeftArrow, BiRightArrow } from "react-icons/bi"

function ReportsTable() {
    return (
        <section className="flex flex-col gap-4">
            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default rounded-md">
                <table className="w-full text-sm text-left rtl:text-right text-body">
                    <thead className="bg-slate-500 text-gray-300 border-b border-default">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-medium">
                                id
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                message
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                time
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-700 text-gray-200">
                        <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                            <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                3284udhdsf
                            </th>
                            <td className="px-6 py-4">
                                calls are not working
                            </td>
                            <td className="px-6 py-4">
                                12:3:2026
                            </td>
                        </tr>
                        <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                            <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                3284udhdsf
                            </th>
                            <td className="px-6 py-4">
                                calls are not working
                            </td>
                            <td className="px-6 py-4">
                                12:3:2026
                            </td>
                        </tr>
                        <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                            <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                3284udhdsf
                            </th>
                            <td className="px-6 py-4">
                                calls are not working
                            </td>
                            <td className="px-6 py-4">
                                12:3:2026
                            </td>
                        </tr>
                        <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                            <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                3284udhdsf
                            </th>
                            <td className="px-6 py-4">
                                calls are not working
                            </td>
                            <td className="px-6 py-4">
                                12:3:2026
                            </td>
                        </tr>
                        <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                            <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                3284udhdsf
                            </th>
                            <td className="px-6 py-4">
                                calls are not working
                            </td>
                            <td className="px-6 py-4">
                                12:3:2026
                            </td>
                        </tr>
                        <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                            <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                3284udhdsf
                            </th>
                            <td className="px-6 py-4">
                                calls are not working
                            </td>
                            <td className="px-6 py-4">
                                12:3:2026
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <div className="flex justify-between ">
                <button className="p-4 w-28 h-12 flex gap-2 items-center rounded-md cursor-pointer text-slate-300 bg-slate-500">Prev 10<BiLeftArrow /></button>
                <button className="p-4 w-28 h-12 flex gap-2 items-center rounded-md cursor-pointer text-slate-200 bg-slate-500">Next 10<BiRightArrow /></button>
            </div>
        </section>
    )
}

function ReportsInfo() {
    return (
        <section className="bg-slate-500 p-4 text-slate-200 rounded-md max-h-[80vh] overflow-scroll pt-2">
            <section className="text-center pb-4">
                <h2 className="text-lg font-hero-san font-bold">Report Insight</h2>
            </section>
            <section className="">
                <h3 className="text-xl font-hero-san font-bold">About this Report:</h3>
                <p className="font-open-sans text-lg">
                    this user is sending some misleading information about my nation.
                    this user is sending some misleading information about my nation.
                    this user is sending some misleading information about my nation.
                </p>
            </section>
            <section className="flex flex-col gap-2 items-center mt-8">
                <button className="bg-cyan-500 w-30 rounded-md cursor-pointer">Action</button>
                <button className="bg-purple-500 w-30 rounded-md cursor-pointer">Reject</button>
                <button className="bg-blue-500 w-30 rounded-md cursor-pointer">Message</button>
            </section>
        </section>
    )
}

function page() {
    return (
        <section className="grid md:grid-cols-[2fr_1fr] md:gap-2 mt-6">
            <ReportsTable />
            <ReportsInfo />
        </section>
    )
}

export default page
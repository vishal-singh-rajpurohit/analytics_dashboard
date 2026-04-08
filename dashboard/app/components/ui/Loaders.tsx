export function Loader(){
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
            <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-slate-300 border-t-black rounded-full animate-spin" />
                <p className="text-sm text-slate-600">Loading...</p>
            </div>
        </div>
    )
}
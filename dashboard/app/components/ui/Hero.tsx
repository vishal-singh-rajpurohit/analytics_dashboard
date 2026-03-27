type HeroProps = {
  name: string;
};

export default function Hero (props: HeroProps){
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
          Welcome back, <span className="text-primary">{props.name}</span> 👋
        </h1>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <button className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition">Instructions</button>

          <button className="border border-slate-300 px-6 py-3 rounded-xl font-medium text-slate-700 hover:bg-slate-100 transition">
            Reports
          </button>
        </div>

      </div>
    </section>
  );
};
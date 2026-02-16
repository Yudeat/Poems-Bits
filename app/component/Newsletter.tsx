interface FooterProps {
  theme: "light" | "dark";
}

export default function Newsletter({ theme }: FooterProps) {
  const isLight = theme === "light";

  return (
    <>
      <section className={`relative overflow-hidden border-y px-6 py-24 md:px-12 lg:px-24 transition-colors duration-300 ${
        isLight ? "bg-white border-gray-300" : "bg-zinc-950 border-zinc-800"
      }`}>
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(${isLight ? '#000' : '#fff'} 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
            maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%)'
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center md:items-start md:text-left">
          <h2 className={`text-3xl md:text-4xl font-black tracking-tight mb-6 ${isLight ? "text-gray-900" : "text-white"}`}>
            Explore a world of worded adventures <br className="hidden md:block" />
            <span className="text-pink-600">Let’s write it up.</span>
          </h2>
          
          <div className={`text-lg md:text-xl mb-10 max-w-2xl leading-relaxed ${isLight ? "text-gray-600" : "text-zinc-400"}`}>
            <p>
              Sign up for free and start crafting your dreamed word, 
              <span className={`block md:inline font-medium ${isLight ? "text-gray-800" : "text-zinc-200"}`}> or fall back at that console if you’re thinking big.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="px-10 py-4 rounded-full text-base font-bold bg-pink-600 text-white shadow-lg shadow-pink-500/20 hover:bg-pink-700 hover:-translate-y-1 transition-all active:scale-95">
              Get Started for Free
            </button>
            <button className={`px-10 py-4 rounded-full text-base font-bold border transition-all active:scale-95 shadow-sm hover:-translate-y-1 ${
              isLight ? "bg-white text-gray-900 border-gray-200 hover:bg-gray-50" : "bg-zinc-900 text-white border-zinc-700 hover:bg-zinc-800"
            }`}>
              Contact Sales
            </button>
          </div>
        </div>
      </section>
   
      {/* 2. Newsletter Section */}
      <section className={`py-20 px-4 transition-colors duration-300 ${isLight ? "bg-white" : "bg-zinc-950"}`}>
        <div 
          className={`
            max-w-7xl mx-auto rounded-3xl p-8 md:p-12 lg:p-16
            flex flex-col lg:flex-row items-center justify-between gap-10
            ${isLight ? "bg-gray-50 border border-gray-200" : "bg-zinc-900 border border-white/5"}
          `}
        >
          <div className="max-w-lg text-center lg:text-left">
            <div className="text-sm font-bold uppercase tracking-widest text-pink-600 mb-3">Newsletter</div>
            <h3 className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-4 ${isLight ? "text-gray-900" : "text-white"}`}>
              Stay in the loop.
            </h3>
            <p className={`text-lg ${isLight ? "text-gray-600" : "text-zinc-400"}`}>
              Subscribe for the latest updates and exclusive insights delivered to your inbox.
            </p>
          </div>

          <div className="w-full max-w-md">
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className={`
                  flex-grow p-4 rounded-2xl text-sm transition-all focus:ring-2 focus:ring-pink-500 outline-none
                  ${isLight 
                    ? "bg-white border border-gray-300 text-black placeholder-gray-400" 
                    : "bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500"}
                `}
              />
              <button className="px-8 py-4 rounded-2xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all active:scale-95 shadow-lg shadow-blue-500/25">
                Subscribe
              </button>
            </form>
            <p className={`mt-4 text-xs ${isLight ? "text-gray-500" : "text-zinc-500"} text-center lg:text-left`}>
              No spam, ever. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
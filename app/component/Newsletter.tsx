interface FooterProps {
  theme: "light" | "dark";
}

export default function Newsletter({ theme }: FooterProps) {
  const isLight = theme === "light";

  return (
    <>
    {/* a section for reminding the client to sign up for free */}

    <section className="relative  overflow-hidden bg-white rounded border-y border-gray-300 px-6 py-24 md:px-12 lg:px-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center md:items-start md:text-left">
        
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 mb-6">
          Explore a world of worded adventures <br className="hidden md:block" />
          <span className="text-pink-600">Let’s write it up .</span>
        </h2>
        
        <div className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
          <p>
            Sign up for free and start crafting your dreamed word, 
            <span className="block md:inline font-medium text-gray-800"> or fall back at that console if you’re thinking big.</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button className="px-10 py-4 rounded-full text-base font-bold bg-pink-600 text-white shadow-lg shadow-purple-200 hover:bg-purple-600 hover:-translate-y-1 transition-all active:scale-95">
            Get Started for Free
          </button>
          
          <button className="px-10 py-4 rounded-full text-base font-bold bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:-translate-y-1 transition-all active:scale-95 shadow-sm">
            Contact Sales
          </button>
        </div>
        
      </div>
    </section>
  {/* newsletter section */}
    <section className="py-20 px-4">
      <div 
        className={`
          max-w-5xl lg:max-w-full mx-auto rounded-2xl p-8 md:p-12 lg:p-16
          flex flex-col lg:flex-row items-center justify-between gap-10
          ${isLight ? "bg-gray-50 border border-gray-200" : "bg-zinc-1200 border border-white/10"}
        `}
      >
        {/* Text Content */}
        <div className="max-w-lg text-center lg:text-left">
          <div className="text-4xl font-extrabold  mb-7 text-semibold ">Newsletter</div>
          <h3 className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-4 ${isLight ? "text-gray-900" : "text-white"}`}>
            Stay in the loop.
          </h3>
          <p className={`text-lg ${isLight ? "text-gray-600" : "text-zinc-400"}`}>
            Subscribe to our newsletter for the latest updates, curated news, and exclusive insights delivered to your inbox.
          </p>
        </div>

        {/* Form Elements */}
        <div className="w-full max-w-md">
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className={`
                flex-grow p-4 rounded-xl text-sm transition-all focus:ring-2 focus:ring-blue-500 outline-none
                ${isLight 
                  ? "bg-white border border-gray-300 text-black placeholder-gray-400" 
                  : "bg-white/5 border border-white/10 text-white placeholder-white/30 focus:bg-white/10"}
              `}
            />
            <button
              className="px-8 py-4 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-transform active:scale-95 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className={`mt-3 text-xs ${isLight ? "text-gray-500" : "text-zinc-500"} text-center lg:text-left`}>
            No spam, ever. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
    </>
  );
}
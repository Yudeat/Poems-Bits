interface FooterProps {
  theme: "light" | "dark";
}

export default function Newsletter({ theme }: FooterProps) {
  const isLight = theme === "light";

  return (
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
  );
}
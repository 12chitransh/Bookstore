import React from "react";

function Banner() {
  return (
    <section id="home" className="relative min-h-[86vh] overflow-hidden bg-gradient-to-br from-slate-100 via-slate-200 to-indigo-100 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 py-16">
      <div className="pointer-events-none absolute -top-28 -right-20 h-72 w-72 rounded-full bg-indigo-300/20 dark:bg-indigo-500/20" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-violet-300/20 dark:bg-violet-500/20" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100">Hello, welcome here to learn Something</h1>
              <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700">
                new Everyday
              </h2>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed">
              Discover an amazing collection of books from around the world. Dive deep into stories that inspire, educate, and transform your perspective on life.
            </p>

            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-3 rounded-full bg-white border border-slate-200 px-4 py-2 shadow-sm transition duration-300 focus-within:ring-2 focus-within:ring-indigo-500">
                <svg className="h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <input
                  type="email"
                  placeholder="Enter email address"
                  required
                  className="w-48 border-none bg-transparent text-slate-700 placeholder:text-slate-400 outline-none"
                />
              </div>
              <button className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-700 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:shadow-xl hover:-translate-y-0.5">
                Get Started
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="h-80 w-72 md:h-96 md:w-[25rem] rounded-3xl bg-gradient-to-br from-indigo-500 to-blue-600 p-4 shadow-[0_20px_45px_rgba(59,130,246,0.35)]">
              <svg viewBox="0 0 200 280" className="h-full w-full">
                <defs>
                  <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <rect x="40" y="30" width="120" height="150" rx="8" fill="url(#bookGradient)" />
                <rect x="35" y="35" width="120" height="150" rx="8" fill="#000a20" opacity="0.1" />
                <text x="100" y="105" fontSize="24" fontWeight="bold" fill="white" textAnchor="middle">📖</text>
                <circle cx="80" cy="220" r="15" fill="#3b82f6" opacity="0.25" />
                <circle cx="140" cy="240" r="20" fill="#3b82f6" opacity="0.18" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
import React from "react";

function Footer() {
  const links = ["Home", "Contact", "About Us", "Blog"];

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="bg-gray-50 dark:bg-slate-950 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Get In Touch</h2>
            <p className="text-gray-600 dark:text-slate-300 mb-8">Have questions? We'd love to hear from you.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-4">📧</div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Email Us</h3>
                <p className="text-gray-600 dark:text-slate-300">chitranshkhare012@gmail.com</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-4">📞</div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Call Us</h3>
                <p className="text-gray-600 dark:text-slate-300">7440758956</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-4">📍</div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Visit Us</h3>
                <p className="text-gray-600 dark:text-slate-300">bhopal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="about" className="relative overflow-hidden bg-slate-900 text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-slate-300/40 to-transparent" />
        <div className="pointer-events-none absolute -top-28 right-[-5rem] h-72 w-72 rounded-full bg-indigo-500/10" />

        <div className="container mx-auto px-4 py-16 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-4">
              <h3 className="text-lg font-bold uppercase tracking-wide text-white">Quick Links</h3>
              <nav className="flex flex-col gap-2">
                {links.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="relative pl-4 text-slate-300 hover:text-white transition-all duration-200 before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-0 before:-translate-y-1/2 before:bg-gradient-to-r before:from-indigo-500 before:to-purple-500 hover:before:w-3"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">📚 BookStore</h2>
              <p className="text-slate-300">Your ultimate destination for books and knowledge</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold uppercase tracking-wide text-white">Follow Us</h3>
              <div className="flex gap-3">
                <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-sky-400 transition hover:bg-white/20 hover:-translate-y-1">
                  <span className="sr-only">Twitter</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 ..."/></svg>
                </a>
                <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-red-400 transition hover:bg-white/20 hover:-translate-y-1">
                  <span className="sr-only">YouTube</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 ..."/></svg>
                </a>
                <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-blue-400 transition hover:bg-white/20 hover:-translate-y-1">
                  <span className="sr-only">Facebook</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642 ..."/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-700 dark:border-slate-600 pt-6 text-center text-slate-400 dark:text-slate-300">
            <p>Copyright © {new Date().getFullYear()} BookStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;

import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useSearch } from '../contexts/SearchContext';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getTotalItems, setIsCartOpen } = useCart();
  const { user, setIsLoginOpen, logout, toggleTheme, isDarkMode, setIsMyBooksOpen } = useAuth();
  const { searchTerm, updateSearchTerm, clearSearch } = useSearch();

  const links = [
    { label: "Home", href: "#home" },
    { label: "Books", href: "#books" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" }
  ];

  const navItem = links.map((link) => (
    <li key={link.label}>
      <a
        href={link.href}
        className="text-white font-semibold text-sm px-2 py-1 transition duration-300 hover:text-amber-300"
        onClick={(e) => {
          e.preventDefault();
          // Smooth scroll to section
          const element = document.querySelector(link.href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
          setMobileOpen(false);
        }}
      >
        {link.label}
      </a>
    </li>
  ));

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleLogout = () => {
    logout();
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const handleOrderHistory = () => {
    setIsMyBooksOpen(true);
    setIsCartOpen(false);
    setMobileOpen(false);
  };

  const handleSearchChange = (e) => {
    updateSearchTerm(e.target.value);
  };

  const handleSearchClear = () => {
    clearSearch();
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-violet-700 to-purple-800 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 text-white hover:text-amber-200 transition"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <span className="text-white text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
              📚 BookStore
            </span>
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            <ul className="flex items-center gap-6">{navItem}</ul>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <label className="flex items-center gap-2 bg-white/15 border border-white/30 text-white rounded-full px-3 py-2 transition hover:bg-white/25">
              <svg className="h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <input
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search books..."
                className="bg-transparent border-none outline-none placeholder:text-white/70 text-white w-32 md:w-44"
              />
              {searchTerm && (
                <button
                  onClick={handleSearchClear}
                  className="text-white/70 hover:text-white transition"
                  aria-label="Clear search"
                >
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </label>

            <button
              onClick={handleCartClick}
              className="relative rounded-full p-2 text-white bg-white/15 hover:bg-white/30 transition"
              aria-label="Shopping cart"
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3" />
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            <button
              onClick={handleThemeToggle}
              className="rounded-full p-2 text-white bg-white/15 hover:bg-white/30 transition"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8.485-7.485h-1M4.515 12h-1m14.142-4.243l-.707.707M6.05 17.657l-.707.707m12.02 0l-.707-.707M6.05 6.343l-.707-.707M12 7a5 5 0 110 10 5 5 0 010-10z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                  <li className="menu-title">
                    <span className="text-gray-600">Welcome, {user.name}!</span>
                  </li>
                  <li><a>Profile</a></li>
                  <li><a onClick={handleOrderHistory}>My Books</a></li>
                  <li><a>Settings</a></li>
                  <li><a onClick={handleLogout}>Logout</a></li>
                </ul>
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className="inline-block rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-2 text-sm font-semibold shadow-lg hover:shadow-xl transition hover:-translate-y-0.5"
              >
                Login
              </button>
            )}
          </div>
        </div>

        <div className={`${mobileOpen ? 'block' : 'hidden'} lg:hidden pb-4`}>
          <ul className="space-y-2 rounded-xl bg-white/10 p-3 shadow-lg backdrop-blur-sm">{navItem}</ul>
          <div className="mt-3 px-2 flex items-center justify-between">
            <div className="flex-1 md:hidden">
              <label className="flex items-center gap-2 bg-white/15 border border-white/35 text-white rounded-full px-3 py-2">
                <svg className="h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
                <input type="search" required placeholder="Search books..." className="bg-transparent border-none outline-none placeholder:text-white/70 text-white w-full" />
              </label>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCartClick}
                className="relative rounded-full p-2 text-white bg-white/15 hover:bg-white/30 transition"
                aria-label="Shopping cart"
              >
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3" />
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              {user ? (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-8 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li className="menu-title">
                      <span className="text-gray-600">Welcome, {user.name}!</span>
                    </li>
                    <li><a>Profile</a></li>
                    <li><a>Order History</a></li>
                    <li><a>Settings</a></li>
                    <li><a onClick={handleLogout}>Logout</a></li>
                  </ul>
                </div>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 text-sm font-semibold shadow-lg"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
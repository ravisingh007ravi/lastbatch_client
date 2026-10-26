import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiSun,
  FiMoon
} from "react-icons/fi";
import { useAuth } from "../context/AuthData";
import { useTheme } from "../context/DarkAndLightMode";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { user, isAuthenticated, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const MENUDATA = [
    { name: "Laptop", link: "/laptops" },
    { name: "Mobile", link: "/mobiles" },
    { name: "iPad", link: "/ipads" },
    { name: "Blogs", link: "/blogs" },
  ];

  const closeMenu = () => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = search.trim();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white text-black transition-colors duration-200 dark:bg-zinc-950 dark:text-white">
      {/* Announcement bar */}
      <div className="bg-black px-3 py-2 text-center text-[11px] font-medium text-white transition-colors duration-200 sm:text-xs dark:bg-zinc-900 dark:text-zinc-200">
        Free shipping on orders above ₹999
      </div>

      {/* Main navbar */}
      <div className="border-b border-gray-200 transition-colors duration-200 dark:border-zinc-800">
        <div className="mx-auto grid w-full max-w-[1800px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-3 py-3 sm:gap-5 sm:px-5 md:px-8 lg:gap-8 lg:px-10 2xl:px-14">

          {/* Logo */}
          <Link
            to="/"
            className="whitespace-nowrap text-lg font-black tracking-tight sm:text-xl lg:text-2xl"
          >
            TECH<span className="text-gray-400 dark:text-zinc-500">ZONE.</span>
          </Link>

          {/* Search field */}
          <form
            onSubmit={handleSearch}
            className="hidden min-w-0 items-center rounded-full border border-gray-300 bg-gray-50 px-3 py-2.5 transition focus-within:border-black sm:flex lg:px-4 dark:border-zinc-700 dark:bg-zinc-900 dark:focus-within:border-white"
          >
            <FiSearch className="shrink-0 text-gray-500 dark:text-zinc-400" size={18} />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, brands..."
              aria-label="Search products"
              className="ml-2 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400 dark:placeholder:text-zinc-500"
            />
            <button
              type="submit"
              className="ml-2 hidden rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-700 lg:block dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Search
            </button>
          </form>

          {/* Desktop actions */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-3.5 lg:gap-4">
            {/* Dark/Light Mode Toggle (Desktop) */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-700 transition hover:bg-gray-100 hover:text-black dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              {isDarkMode ? (
                <FiSun size={18} className="text-amber-400 transition-transform duration-200 hover:rotate-45" />
              ) : (
                <FiMoon size={18} className="text-gray-700 transition-transform duration-200 hover:-rotate-12 dark:text-zinc-300" />
              )}
            </button>

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="hidden text-gray-600 transition hover:text-black sm:block dark:text-zinc-400 dark:hover:text-white"
            >
              <FiHeart size={21} />
            </Link>

            <Link
              to="/cart"
              aria-label="Shopping cart"
              className="relative text-gray-700 transition hover:text-black dark:text-zinc-300 dark:hover:text-white"
            >
              <FiShoppingCart size={21} />
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] text-white dark:bg-white dark:text-black">
                0
              </span>
            </Link>

            {/* User Auth Section */}
            <div className="hidden items-center gap-3 md:flex">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 py-1 pl-1 pr-3 transition hover:bg-gray-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                  >
                    {user.profileImg?.url ? (
                      <img
                        src={user.profileImg.url}
                        alt={user.firstName || "Profile"}
                        className="h-7 w-7 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-bold text-white dark:bg-white dark:text-black">
                        {user.firstName ? user.firstName[0].toUpperCase() : "U"}
                      </div>
                    )}
                    <span className="max-w-[120px] truncate text-sm font-semibold text-gray-900 dark:text-zinc-100">
                      {user.firstName || "Account"}
                    </span>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-gray-200 bg-white py-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                      <div className="border-b border-gray-100 px-4 py-2.5 dark:border-zinc-800">
                        <p className="text-xs text-gray-400 uppercase tracking-wider dark:text-zinc-500">Signed in as</p>
                        <p className="truncate text-sm font-semibold text-gray-900 dark:text-zinc-100">{user.email}</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                      >
                        <FiLogOut size={16} />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="whitespace-nowrap text-sm font-medium text-gray-700 transition hover:text-black dark:text-zinc-300 dark:hover:text-white"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="whitespace-nowrap rounded-full bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 lg:px-5 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile/tablet menu toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              className="flex items-center justify-center rounded-lg p-1.5 transition hover:bg-gray-100 md:hidden dark:hover:bg-zinc-800"
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop category navigation */}
      <nav className="hidden border-b border-gray-100 bg-gray-50 transition-colors duration-200 md:block dark:border-zinc-800/80 dark:bg-zinc-900/60">
        <div className="mx-auto flex w-full max-w-[1800px] items-center justify-between gap-6 px-5 py-3 md:px-8 lg:px-10 2xl:px-14">
          <div className="flex min-w-0 items-center gap-5 lg:gap-8">
            {MENUDATA.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className="whitespace-nowrap text-sm font-medium text-gray-600 transition hover:text-black dark:text-zinc-400 dark:hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <Link
            to="/deals"
            className="whitespace-nowrap text-sm font-semibold text-black transition hover:text-gray-500 dark:text-zinc-100 dark:hover:text-zinc-400"
          >
            Today's Deals
          </Link>
        </div>
      </nav>

      {/* Mobile/tablet drawer */}
      {menuOpen && (
        <div className="absolute left-0 top-full max-h-[calc(100dvh-70px)] w-full overflow-y-auto border-b border-gray-200 bg-white shadow-xl md:hidden dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mx-auto w-full max-w-xl px-4 py-5 sm:px-6">
            {/* Mobile search */}
            <form
              onSubmit={handleSearch}
              className="mb-5 flex min-w-0 items-center rounded-xl border border-gray-300 bg-gray-50 px-3 py-3 dark:border-zinc-700 dark:bg-zinc-900"
            >
              <FiSearch size={19} className="shrink-0 text-gray-500 dark:text-zinc-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="ml-3 min-w-0 flex-1 bg-transparent text-sm outline-none dark:placeholder:text-zinc-500"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="ml-2 text-gray-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
              >
                <FiSearch size={19} />
              </button>
            </form>

            {/* Mobile Theme Toggle Row */}
            <div className="mb-5 flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 p-3.5 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center gap-2.5">
                {isDarkMode ? (
                  <FiSun size={19} className="text-amber-400" />
                ) : (
                  <FiMoon size={19} className="text-gray-700 dark:text-zinc-300" />
                )}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-zinc-500">Theme</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-zinc-100">
                    {isDarkMode ? "Dark Mode" : "Light Mode"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className="rounded-full border border-gray-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-800 transition hover:bg-gray-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
              >
                {isDarkMode ? "Switch to Light" : "Switch to Dark"}
              </button>
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-zinc-500">
              Shop categories
            </p>

            <nav className="flex flex-col">
              {MENUDATA.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  onClick={closeMenu}
                  className="border-b border-gray-100 py-3.5 text-sm font-medium text-gray-700 transition hover:pl-2 hover:text-black dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white"
                >
                  {item.name}
                </Link>
              ))}

              <Link
                to="/deals"
                onClick={closeMenu}
                className="border-b border-gray-100 py-3.5 text-sm font-semibold text-black dark:border-zinc-800 dark:text-zinc-100"
              >
                Today's Deals
              </Link>
            </nav>

            {isAuthenticated && user ? (
              <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-center gap-3">
                  {user.profileImg?.url ? (
                    <img
                      src={user.profileImg.url}
                      alt={user.firstName}
                      className="h-10 w-10 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white dark:bg-white dark:text-black">
                      {user.firstName ? user.firstName[0].toUpperCase() : "U"}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-gray-900 dark:text-zinc-100">{user.firstName} {user.lastName}</p>
                    <p className="truncate text-xs text-gray-500 dark:text-zinc-400">{user.email}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    closeMenu();
                    await handleLogout();
                  }}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50"
                >
                  <FiLogOut size={16} />
                  Log Out
                </button>
              </div>
            ) : (
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-800 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                >
                  <FiUser size={17} />
                  Log In
                </Link>

                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="flex items-center justify-center rounded-xl bg-black px-3 py-3 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <Link
              to="/wishlist"
              onClick={closeMenu}
              className="mt-4 flex items-center gap-3 py-3 text-sm text-gray-600 dark:text-zinc-400 dark:hover:text-white"
            >
              <FiHeart size={19} />
              My Wishlist
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

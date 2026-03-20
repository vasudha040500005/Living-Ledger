"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-cream-50/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col">
          <span
            className={`font-playfair text-xl font-semibold tracking-wide transition-colors ${
              isScrolled ? "text-walnut-800" : "text-cream-50"
            }`}
          >
            De`Sign | Premium Interior Design
          </span>
         
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-lato tracking-widest uppercase transition-colors duration-200 hover:opacity-70 ${
                isScrolled ? "text-walnut-700" : "text-cream-100"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {session ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-1 text-sm font-lato tracking-widest uppercase transition-colors duration-200 hover:opacity-70 ${
                  isScrolled ? "text-walnut-700" : "text-cream-100"
                }`}
              >
                {session.user.name?.split(" ")[0]}
                <ChevronDown size={14} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-8 bg-cream-50 shadow-xl border border-cream-200 min-w-[160px] py-2">
                  {session.user.role === "VENDOR" && (
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-walnut-700 hover:bg-cream-100 font-lato"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-walnut-700 hover:bg-cream-100 font-lato"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className={`text-sm font-lato tracking-widest uppercase border px-5 py-2 transition-all duration-300 ${
                isScrolled
                  ? "border-walnut-600 text-walnut-700 hover:bg-walnut-700 hover:text-cream-50"
                  : "border-cream-200 text-cream-100 hover:bg-cream-50/20"
              }`}
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden transition-colors ${
            isScrolled ? "text-walnut-800" : "text-cream-50"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-cream-50 border-t border-cream-200 px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-lato tracking-widest uppercase text-walnut-700 py-2 border-b border-cream-200"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {session ? (
            <>
              {session.user.role === "VENDOR" && (
                <Link
                  href="/dashboard"
                  className="block text-sm font-lato tracking-widest uppercase text-walnut-700 py-2 border-b border-cream-200"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  setMobileOpen(false);
                }}
                className="block text-sm font-lato tracking-widest uppercase text-walnut-700 py-2"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="block text-sm font-lato tracking-widest uppercase text-walnut-700 py-2"
              onClick={() => setMobileOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

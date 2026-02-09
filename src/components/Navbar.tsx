"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Heart, User, Menu, X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface NavLink {
  label: string;
  href: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ---- scroll shadow ---- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- lock body scroll when mobile menu is open ---- */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ---- helpers ---- */
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("#")) return false;
    return pathname.startsWith(href);
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <>
      {/* ============================================================ */}
      {/*  Main navbar                                                  */}
      {/* ============================================================ */}
      <nav
        className={`
          sticky top-0 z-50 w-full
          bg-[#F5F5F0] backdrop-blur-md
          border-b border-burgundy/20
          transition-shadow duration-300
          ${scrolled ? "shadow-lg shadow-charcoal/10" : ""}
        `}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* ------ Logo ------ */}
            <Link
              href="/"
              className="group flex items-center shrink-0"
              aria-label="Persian Rug Auctions — Home"
            >
              <Image
                src="/pra-logo.png"
                alt="Persian Rug Auctions"
                width={234}
                height={48}
                className="h-10 sm:h-12 w-auto object-contain"
                priority
              />
            </Link>

            {/* ------ Desktop links ------ */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`
                        relative px-4 py-2 text-sm font-medium tracking-wide
                        transition-colors duration-200 rounded-md
                        ${
                          active
                            ? "text-burgundy"
                            : "text-charcoal/75 hover:text-charcoal hover:bg-burgundy/5"
                        }
                      `}
                    >
                      {link.label}
                      {/* active indicator dot */}
                      {active && (
                        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full bg-burgundy" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* ------ Right actions ------ */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Watchlist */}
              <Link
                href="/dashboard"
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-charcoal/70 transition-colors duration-200 hover:bg-burgundy/5 hover:text-burgundy"
                aria-label="Watchlist"
              >
                <Heart className="h-5 w-5" />
              </Link>

              {/* Sign In — outlined */}
              <Link
                href="/sign-in"
                className="
                  hidden sm:inline-flex items-center gap-2
                  rounded-md border border-burgundy/60 px-4 py-2
                  text-sm font-medium text-burgundy
                  transition-all duration-200
                  hover:border-burgundy hover:bg-burgundy/10
                "
              >
                <User className="h-4 w-4" />
                <span>Sign&nbsp;In</span>
              </Link>

              {/* Register — filled */}
              <Link
                href="/register"
                className="
                  hidden sm:inline-flex items-center
                  rounded-md bg-burgundy px-5 py-2
                  text-sm font-semibold text-white
                  transition-all duration-200
                  hover:bg-burgundy-light
                "
              >
                Register
              </Link>

              {/* Hamburger */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="lg:hidden flex h-10 w-10 items-center justify-center rounded-md text-charcoal/80 transition-colors duration-200 hover:bg-burgundy/5 hover:text-burgundy"
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* subtle burgundy rule at the very bottom */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-burgundy/30 to-transparent" />
      </nav>

      {/* ============================================================ */}
      {/*  Mobile slide-out panel                                       */}
      {/* ============================================================ */}

      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-sm
          transition-opacity duration-300
          ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`
          fixed top-0 right-0 z-[70] h-full w-80 max-w-[85vw]
          bg-navy shadow-2xl shadow-black/40
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
        aria-label="Mobile navigation"
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-burgundy/15">
          <span className="font-heading text-lg font-semibold text-burgundy tracking-wide">
            Persian Rug Auctions
          </span>
          <button
            type="button"
            onClick={closeMobile}
            className="flex h-9 w-9 items-center justify-center rounded-md text-charcoal/70 transition-colors duration-200 hover:bg-burgundy/5 hover:text-burgundy"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Panel links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMobile}
                    className={`
                      flex items-center gap-3 rounded-lg px-4 py-3
                      text-[15px] font-medium tracking-wide
                      transition-colors duration-200
                      ${
                        active
                          ? "bg-gold/10 text-gold"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }
                    `}
                  >
                    {active && (
                      <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                    )}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Divider */}
          <div className="my-6 h-px bg-burgundy/10" />

          {/* Watchlist link */}
          <Link
            href="/dashboard"
            onClick={closeMobile}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-medium tracking-wide text-charcoal/70 transition-colors duration-200 hover:bg-burgundy/5 hover:text-charcoal"
          >
            <Heart className="h-4 w-4" />
            Watchlist
          </Link>
        </nav>

        {/* Panel footer — auth buttons */}
        <div className="border-t border-burgundy/15 px-6 py-6 space-y-3">
          <Link
            href="/sign-in"
            onClick={closeMobile}
            className="
              flex w-full items-center justify-center gap-2
              rounded-md border border-burgundy/60 px-4 py-2.5
              text-sm font-medium text-burgundy
              transition-all duration-200
              hover:border-burgundy hover:bg-burgundy/10
            "
          >
            <User className="h-4 w-4" />
            Sign In
          </Link>

          <Link
            href="/register"
            onClick={closeMobile}
            className="
              flex w-full items-center justify-center
              rounded-md bg-burgundy px-4 py-2.5
              text-sm font-semibold text-white
              transition-all duration-200
              hover:bg-burgundy-light
            "
          >
            Register
          </Link>
        </div>
      </aside>
    </>
  );
}

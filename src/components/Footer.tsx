"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  CreditCard,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const customerServiceLinks = [
  { label: "Register", href: "/register" },
  { label: "My Account", href: "/account" },
  { label: "FAQ", href: "/faq" },
  { label: "Shipping Info", href: "/shipping" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-navy text-white/80">
      {/* Newsletter Row */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-gold">
                Stay Updated
              </h3>
              <p className="mt-1 text-sm text-white/60">
                Subscribe to receive alerts on upcoming auctions, new arrivals,
                and exclusive offers.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-md gap-3 sm:w-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="h-12 flex-1 rounded-md border border-white/20 bg-white/5 px-4 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold sm:min-w-[280px]"
              />
              <button
                type="submit"
                className="h-12 shrink-0 rounded-md bg-gold px-6 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1 — Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-wide text-gold">
                Persian Rug
                <br />
                Auctions
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              Australia&apos;s premier online auction house for authentic
              handmade Persian and Afghan rugs. Every piece tells a story woven
              through generations.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-gold hover:text-gold"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-gold hover:text-gold"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-gold">
              Quick Links
            </h4>
            <ul className="mt-6 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Customer Service */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-gold">
              Customer Service
            </h4>
            <ul className="mt-6 space-y-3">
              {customerServiceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact Us */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-gold">
              Contact Us
            </h4>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="text-sm text-white/60">
                  Melbourne, Australia
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href="tel:0412378798"
                  className="text-sm text-white/60 transition-colors hover:text-gold"
                >
                  0412 378 798
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href="mailto:info@persianrugauctions.com.au"
                  className="text-sm text-white/60 transition-colors hover:text-gold"
                >
                  info@persianrugauctions.com.au
                </a>
              </li>
              <li className="mt-2 border-t border-white/10 pt-4">
                <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                  ABN
                </span>
                <p className="mt-1 text-sm text-white/60">46 099 052 025</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} Persian Rug Auctions. All rights
              reserved. A{" "}
              <span className="font-medium text-white/60">PCTW Company</span>.
            </p>

            <div className="flex items-center gap-4">
              <span className="text-xs text-white/40">We accept</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 rounded border border-white/20 px-2 py-1 text-xs font-medium text-white/60">
                  <CreditCard className="h-3.5 w-3.5" />
                  Visa
                </span>
                <span className="flex items-center gap-1 rounded border border-white/20 px-2 py-1 text-xs font-medium text-white/60">
                  <CreditCard className="h-3.5 w-3.5" />
                  Mastercard
                </span>
                <span className="flex items-center gap-1 rounded border border-white/20 px-2 py-1 text-xs font-medium text-white/60">
                  <CreditCard className="h-3.5 w-3.5" />
                  Amex
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CountdownTimer from "@/components/CountdownTimer";
import LotCard from "@/components/LotCard";
import { lots, testimonials } from "@/data/lots";
import Link from "next/link";
import {
  ChevronRight,
  Star,
  Shield,
  Truck,
  Award,
  Users,
  ArrowRight,
  Play,
  Quote,
  CheckCircle,
  Search,
  UserPlus,
  Gavel,
  Trophy,
  DollarSign,
  BadgeCheck,
  Gem,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const featuredLots = lots.filter((l) => l.featured).slice(0, 6);

const endingSoonLots = [...lots]
  .sort((a, b) => b.numberOfBids - a.numberOfBids)
  .slice(0, 4);

const displayedTestimonials = testimonials.slice(0, 4);

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function Home() {
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
    <>
      <Navbar />

      <main>
        {/* ============================================================ */}
        {/*  1. HERO SECTION                                             */}
        {/* ============================================================ */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600166898405-da9535204843?w=1920&q=85')",
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/95 via-navy/90 to-navy-dark/85" />
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(201,169,110,0.08)_0%,transparent_60%)]" />

          <div className="relative z-10 w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
              <div className="max-w-3xl">
                {/* Eyebrow */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="h-px w-8 bg-gold" />
                  <span className="text-gold text-sm font-medium tracking-widest uppercase">
                    Melbourne, Australia
                  </span>
                </div>

                {/* Heading */}
                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] mb-6">
                  Exceptional Persian
                  <span className="text-gold">&nbsp;&amp;&nbsp;</span>
                  Afghan Rugs at Auction
                </h1>

                {/* Subheading */}
                <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
                  Discover museum-quality handmade carpets at a fraction of retail
                  value. Bid with confidence — every piece comes with a certificate
                  of authenticity.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
                  <Link
                    href="/catalogue"
                    className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-semibold px-8 py-4 rounded-lg text-base transition-all duration-200 hover:shadow-lg hover:shadow-gold/20"
                  >
                    View Current Auction
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-lg text-base transition-all duration-200 hover:bg-white/5"
                  >
                    <Play className="w-4 h-4" />
                    How It Works
                  </Link>
                </div>

                {/* Auction info strip */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 md:p-6 inline-block">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                    <div>
                      <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-1">
                        Current Auction
                      </p>
                      <p className="text-white text-base md:text-lg font-heading">
                        Clearance Auction — Bidding Ends Sunday Feb 15 @ 4PM AEST
                      </p>
                    </div>
                    <div className="md:border-l md:border-white/15 md:pl-6">
                      <CountdownTimer
                        endTime="2026-02-15T16:00:00+11:00"
                        size="lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats bar */}
            <div className="border-t border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
                  {[
                    { icon: <Users className="w-5 h-5" />, value: "2,500+", label: "Rugs Sold" },
                    { icon: <Award className="w-5 h-5" />, value: "15+", label: "Years Experience" },
                    { icon: <Truck className="w-5 h-5" />, value: "Australia-wide", label: "Shipping" },
                    { icon: <Shield className="w-5 h-5" />, value: "Certificate of", label: "Authenticity" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-5 px-4 md:px-6"
                    >
                      <span className="text-gold">{stat.icon}</span>
                      <div>
                        <p className="text-white font-semibold text-sm md:text-base">
                          {stat.value}
                        </p>
                        <p className="text-white/50 text-xs md:text-sm">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  2. ENDING SOON STRIP                                        */}
        {/* ============================================================ */}
        <section className="bg-ivory border-y-2 border-gold/20 py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-burgundy/10">
                  <Gavel className="w-4 h-4 text-burgundy" />
                </span>
                <h2 className="font-heading text-xl md:text-2xl text-navy font-semibold">
                  Ending Soon
                </h2>
              </div>
              <Link
                href="/catalogue"
                className="text-gold hover:text-gold-dark text-sm font-semibold flex items-center gap-1 transition-colors"
              >
                View All Lots
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Scrollable row */}
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {endingSoonLots.map((lot) => (
                <Link
                  key={lot.id}
                  href={`/lot/${lot.id}`}
                  className="flex-shrink-0 flex items-center gap-4 bg-white border border-border hover:border-gold/40 rounded-xl p-3 pr-5 transition-all duration-200 hover:shadow-md group min-w-[320px]"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={lot.image}
                      alt={lot.shortTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-sm font-semibold text-navy truncate group-hover:text-gold transition-colors">
                      {lot.shortTitle}
                    </h3>
                    <p className="text-navy font-bold text-lg font-heading mt-0.5">
                      ${lot.currentBid.toLocaleString()}
                    </p>
                    <div className="mt-1">
                      <CountdownTimer endTime={lot.endTime} size="sm" showIcon={true} variant="light" />
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-xs text-warm-gray">{lot.numberOfBids} bids</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  3. HOW IT WORKS                                             */}
        {/* ============================================================ */}
        <section id="how-it-works" className="py-16 md:py-24 bg-warm-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section heading */}
            <div className="text-center mb-16">
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">
                Simple Process
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy font-semibold mt-3">
                How It Works
              </h2>
              <p className="text-warm-gray mt-4 max-w-2xl mx-auto text-base md:text-lg">
                Bidding on a beautiful handmade rug has never been easier. Follow
                these four simple steps.
              </p>
            </div>

            {/* Steps */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {/* Connecting line (desktop only) */}
              <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-gold/20 via-gold/40 to-gold/20" />

              {[
                {
                  icon: <Search className="w-7 h-7" />,
                  step: "01",
                  title: "Browse",
                  desc: "Explore our curated collection of handmade rugs from Persia and Afghanistan",
                },
                {
                  icon: <UserPlus className="w-7 h-7" />,
                  step: "02",
                  title: "Register",
                  desc: "Create your free account in under a minute to start bidding",
                },
                {
                  icon: <Gavel className="w-7 h-7" />,
                  step: "03",
                  title: "Bid",
                  desc: "Place your maximum bid and our proxy system bids on your behalf",
                },
                {
                  icon: <Trophy className="w-7 h-7" />,
                  step: "04",
                  title: "Win",
                  desc: "Receive your rug with a certificate of authenticity and valuation",
                },
              ].map((item, i) => (
                <div key={i} className="relative flex flex-col items-center text-center group">
                  {/* Icon circle */}
                  <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 border-2 border-gold/30 text-gold mb-6 transition-all duration-300 group-hover:bg-gold group-hover:text-navy group-hover:border-gold group-hover:shadow-lg group-hover:shadow-gold/20">
                    {item.icon}
                  </div>
                  {/* Step number */}
                  <span className="text-gold/40 text-xs font-bold tracking-widest uppercase mb-2">
                    Step {item.step}
                  </span>
                  {/* Title */}
                  <h3 className="font-heading text-xl md:text-2xl text-navy font-semibold mb-3">
                    {item.title}
                  </h3>
                  {/* Description */}
                  <p className="text-warm-gray text-sm leading-relaxed max-w-xs">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  4. FEATURED LOTS                                            */}
        {/* ============================================================ */}
        <section className="py-16 md:py-24 bg-ivory">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section heading */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
              <div>
                <span className="text-gold text-sm font-semibold tracking-widest uppercase">
                  Current Auction
                </span>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy font-semibold mt-3">
                  Featured Lots
                </h2>
              </div>
              <Link
                href="/catalogue"
                className="text-gold hover:text-gold-dark font-semibold flex items-center gap-1.5 transition-colors text-sm"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Lot grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredLots.map((lot) => (
                <LotCard key={lot.id} lot={lot} />
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <Link
                href="/catalogue"
                className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold px-8 py-4 rounded-lg text-base transition-all duration-200 hover:shadow-lg"
              >
                Browse Full Catalogue
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  5. ABOUT SECTION                                            */}
        {/* ============================================================ */}
        <section id="about" className="py-16 md:py-24 bg-warm-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left — text */}
              <div>
                <span className="text-gold text-sm font-semibold tracking-widest uppercase">
                  About Us
                </span>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy font-semibold mt-3 mb-6">
                  Melbourne&apos;s Trusted Rug Auction House
                </h2>
                <div className="space-y-4 text-warm-gray leading-relaxed">
                  <p>
                    Operated by PCTW Company, Persian Rug Auctions has been
                    connecting collectors with exceptional handmade carpets for
                    over 15 years. Our passion for authentic Persian and Afghan
                    textiles drives everything we do.
                  </p>
                  <p>
                    Every rug in our collection is hand-selected by our expert
                    team for its quality, craftsmanship, and provenance. We
                    believe that everyone deserves to own a genuine handmade rug,
                    and our auction format makes these extraordinary pieces
                    accessible at a fraction of retail value.
                  </p>
                  <p>
                    Based in Melbourne, we ship Australia-wide with full insurance
                    coverage. Each piece comes with a detailed certificate of
                    authenticity and independent valuation, so you can bid with
                    complete confidence.
                  </p>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                  {[
                    { icon: <Shield className="w-6 h-6" />, label: "Certified Authentic" },
                    { icon: <Truck className="w-6 h-6" />, label: "Australia-wide Delivery" },
                    { icon: <Award className="w-6 h-6" />, label: "Expert Valuations" },
                  ].map((badge, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-ivory rounded-lg p-4 border border-border-light"
                    >
                      <span className="text-gold flex-shrink-0">{badge.icon}</span>
                      <span className="text-navy font-semibold text-sm">
                        {badge.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <Link
                    href="#how-it-works"
                    className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-semibold px-7 py-3.5 rounded-lg text-sm transition-all duration-200 hover:shadow-lg hover:shadow-gold/20"
                  >
                    Learn More
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right — image */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-navy/10">
                  <img
                    src="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80"
                    alt="Close-up of a handmade Persian rug showing intricate weaving detail"
                    className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                  />
                </div>
                {/* Floating accent card */}
                <div className="absolute -bottom-6 -left-6 bg-navy text-white rounded-xl p-5 shadow-xl hidden md:block">
                  <p className="font-heading text-3xl font-bold text-gold">
                    15+
                  </p>
                  <p className="text-white/70 text-sm mt-1">
                    Years of Experience
                  </p>
                </div>
                {/* Decorative border */}
                <div className="absolute -top-4 -right-4 w-full h-full border-2 border-gold/20 rounded-2xl -z-10 hidden lg:block" />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  6. WHY BUY AT AUCTION                                       */}
        {/* ============================================================ */}
        <section className="py-16 md:py-24 bg-ivory">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section heading */}
            <div className="text-center mb-14">
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">
                The Auction Advantage
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy font-semibold mt-3">
                Why Buy at Auction
              </h2>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: <DollarSign className="w-8 h-8" />,
                  title: "Below Retail Prices",
                  desc: "Save 40-80% compared to gallery prices. Our auction format means you set the price, and genuine competition keeps costs far below retail.",
                  highlight: "Save 40-80%",
                },
                {
                  icon: <BadgeCheck className="w-8 h-8" />,
                  title: "Guaranteed Authentic",
                  desc: "Every rug comes with a certificate of authenticity and insurance valuation. We stand behind every piece we sell, no exceptions.",
                  highlight: "Certified",
                },
                {
                  icon: <Gem className="w-8 h-8" />,
                  title: "Curated Collection",
                  desc: "Hand-selected rugs of exceptional quality and craftsmanship. Our experts source only the finest pieces from trusted artisans and collections.",
                  highlight: "Hand-Selected",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-border hover:border-gold/30 p-8 md:p-10 transition-all duration-300 hover:shadow-xl hover:shadow-gold/5 group text-center"
                >
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 text-gold mb-6 transition-all duration-300 group-hover:bg-gold group-hover:text-navy group-hover:shadow-lg group-hover:shadow-gold/20">
                    {card.icon}
                  </div>
                  {/* Title */}
                  <h3 className="font-heading text-xl md:text-2xl text-navy font-semibold mb-4">
                    {card.title}
                  </h3>
                  {/* Description */}
                  <p className="text-warm-gray text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  7. TESTIMONIALS                                             */}
        {/* ============================================================ */}
        <section id="testimonials" className="py-16 md:py-24 bg-warm-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section heading */}
            <div className="text-center mb-14">
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">
                Testimonials
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy font-semibold mt-3">
                What Our Collectors Say
              </h2>
              <p className="text-warm-gray mt-4 max-w-2xl mx-auto text-base md:text-lg">
                Join thousands of satisfied collectors across Australia who have
                found their perfect rug through our auctions.
              </p>
            </div>

            {/* Testimonial grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {displayedTestimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-border p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:border-gold/20"
                >
                  {/* Quote icon */}
                  <Quote className="w-8 h-8 text-gold/30 mb-4" />

                  {/* Review text */}
                  <p className="text-charcoal leading-relaxed mb-6 text-sm md:text-base">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Star rating */}
                  <div className="flex items-center gap-0.5 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 text-gold fill-gold"
                      />
                    ))}
                  </div>

                  {/* Author info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-navy text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-warm-gray text-xs mt-0.5">
                        {testimonial.location}
                      </p>
                    </div>
                    <span className="text-warm-gray/50 text-xs">
                      {testimonial.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  8. NEWSLETTER SIGNUP                                        */}
        {/* ============================================================ */}
        <section className="relative py-16 md:py-24 bg-navy overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(201,169,110,0.08)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(201,169,110,0.05)_0%,transparent_50%)]" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              {/* Heading */}
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white font-semibold mb-4">
                Never Miss an Auction
              </h2>

              {/* Subtext */}
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8">
                Subscribe to receive notifications about upcoming auctions,
                featured lots, and exclusive previews.
              </p>

              {/* Form */}
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 h-14 rounded-lg border border-white/20 bg-white/5 px-5 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
                />
                <button
                  type="submit"
                  className="h-14 shrink-0 rounded-lg bg-gold hover:bg-gold-dark px-8 text-sm font-semibold text-navy transition-all duration-200 hover:shadow-lg hover:shadow-gold/20"
                >
                  {subscribed ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Subscribed!
                    </span>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>

              {/* Social proof */}
              <div className="flex items-center justify-center gap-2 text-white/40 text-sm">
                <Users className="w-4 h-4" />
                <span>Join 2,000+ collectors</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

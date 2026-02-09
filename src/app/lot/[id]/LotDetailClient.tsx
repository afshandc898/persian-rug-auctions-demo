"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CountdownTimer from "@/components/CountdownTimer";
import LotCard from "@/components/LotCard";
import { lots, bidHistory, Lot } from "@/data/lots";
import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Share2,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Gavel,
  Shield,
  Truck,
  Award,
  Camera,
  Clock,
  Users,
  ArrowLeft,
  Info,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Lot Detail Client Component                                        */
/* ------------------------------------------------------------------ */

interface Props {
  lot: Lot | undefined;
}

export default function LotDetailClient({ lot }: Props) {
  /* ---------------------------------------------------------------- */
  /*  Not found                                                        */
  /* ---------------------------------------------------------------- */

  if (!lot) {
    return (
      <div className="min-h-screen flex flex-col bg-ivory">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4 py-24">
            <h1 className="text-4xl text-navy mb-4">Lot Not Found</h1>
            <p className="text-warm-gray mb-8 max-w-md mx-auto">
              The lot you are looking for does not exist or may have been removed from the catalogue.
            </p>
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Catalogue
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  /* ---- image gallery state ---- */
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  /* ---- watchlist state ---- */
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  /* ---- bid input state ---- */
  const [bidAmount, setBidAmount] = useState("");
  const [bidPlaced, setBidPlaced] = useState(false);
  const [bidError, setBidError] = useState("");

  /* ---- accordion state ---- */
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    description: true,
    specifications: false,
    shipping: false,
    authenticity: false,
  });

  /* ---- bid history state ---- */
  const [showAllBids, setShowAllBids] = useState(false);

  /* ---- proxy bidding tooltip state ---- */
  const [showProxyTooltip, setShowProxyTooltip] = useState(false);

  /* ---------------------------------------------------------------- */
  /*  Derived values                                                   */
  /* ---------------------------------------------------------------- */

  const images = lot.images && lot.images.length > 0 ? lot.images : [lot.image];
  const savingsPercent = Math.round(((lot.rrp - lot.currentBid) / lot.rrp) * 100);
  const minBid = lot.currentBid + 50;
  const lotBids = bidHistory[lot.id] || [];
  const visibleBids = showAllBids ? lotBids : lotBids.slice(0, 5);

  const relatedLots = lots
    .filter(
      (l) =>
        l.id !== lot.id && (l.origin === lot.origin || l.type === lot.type)
    )
    .slice(0, 4);

  /* ---------------------------------------------------------------- */
  /*  Handlers                                                         */
  /* ---------------------------------------------------------------- */

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePlaceBid = () => {
    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount < minBid) {
      setBidError(`Minimum bid is $${minBid.toLocaleString()}`);
      return;
    }
    setBidError("");
    setBidPlaced(true);
    setTimeout(() => setBidPlaced(false), 3000);
  };

  const goToPrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const formatBidTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* ---------------------------------------------------------------- */
  /*  Accordion Section Helper                                         */
  /* ---------------------------------------------------------------- */

  const AccordionSection = ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => {
    const isOpen = openSections[id];
    return (
      <div className="border-b border-border-light last:border-b-0">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between py-4 text-left group"
        >
          <h3 className="text-lg font-semibold text-navy group-hover:text-gold transition-colors">
            {title}
          </h3>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-warm-gray" />
          ) : (
            <ChevronDown className="w-5 h-5 text-warm-gray" />
          )}
        </button>
        {isOpen && <div className="pb-5">{children}</div>}
      </div>
    );
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />

      <main className="flex-1">
        {/* ========================================================== */}
        {/*  Breadcrumb                                                 */}
        {/* ========================================================== */}
        <div className="bg-white border-b border-border-light">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-warm-gray">
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/catalogue"
                className="hover:text-gold transition-colors"
              >
                Auction Catalogue
              </Link>
              <span>/</span>
              <span className="text-navy font-medium">
                Lot {lot.lotNumber}: {lot.shortTitle}
              </span>
            </nav>
          </div>
        </div>

        {/* ========================================================== */}
        {/*  Main Content — Two Columns                                 */}
        {/* ========================================================== */}
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* ====================================================== */}
            {/*  Left Column — Image Gallery                            */}
            {/* ====================================================== */}
            <div className="space-y-4">
              {/* Main Image */}
              <div
                className="relative aspect-[4/3] rounded-xl overflow-hidden bg-ivory-dark cursor-zoom-in group"
                onClick={() => setIsLightboxOpen(true)}
              >
                <img
                  src={images[selectedImageIndex]}
                  alt={`${lot.title} — Image ${selectedImageIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Lot Number Badge */}
                <div className="absolute top-4 left-4 bg-navy/85 backdrop-blur-sm text-white text-sm font-semibold px-3 py-1.5 rounded-lg">
                  Lot {lot.lotNumber}
                </div>
                {/* Zoom Hint */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5" />
                  Click to enlarge
                </div>
                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" />
                  {selectedImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`
                        relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200
                        ${
                          idx === selectedImageIndex
                            ? "ring-2 ring-gold ring-offset-2 ring-offset-ivory"
                            : "opacity-70 hover:opacity-100 border border-border"
                        }
                      `}
                    >
                      <img
                        src={img}
                        alt={`${lot.shortTitle} — Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Request Photos Button */}
              <button className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-border rounded-lg text-warm-gray hover:text-navy hover:border-navy/30 transition-colors text-sm font-medium">
                <Camera className="w-4 h-4" />
                Request Additional Photos &amp; Video
              </button>
            </div>

            {/* ====================================================== */}
            {/*  Right Column — Details & Bidding                       */}
            {/* ====================================================== */}
            <div className="space-y-6">
              {/* ---- Title Area ---- */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-2">
                  Lot {lot.lotNumber}
                </p>
                <h1 className="text-3xl lg:text-4xl font-bold text-navy leading-tight mb-4">
                  {lot.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-navy/5 text-navy border border-navy/10">
                    {lot.origin}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gold/10 text-gold-dark border border-gold/20">
                    {lot.era}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsWatchlisted(!isWatchlisted)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${
                        isWatchlisted
                          ? "bg-burgundy/10 text-burgundy border border-burgundy/20"
                          : "bg-white text-warm-gray border border-border hover:border-burgundy/30 hover:text-burgundy"
                      }
                    `}
                  >
                    <Heart
                      className="w-4 h-4"
                      fill={isWatchlisted ? "currentColor" : "none"}
                    />
                    {isWatchlisted ? "Watching" : "Watch"}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white text-warm-gray border border-border hover:border-navy/30 hover:text-navy transition-all">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>

              {/* ---- Bidding Panel ---- */}
              <div className="bg-white rounded-xl border-2 border-gold/30 p-6 shadow-sm">
                {/* Current Bid */}
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-warm-gray mb-1 flex items-center gap-1.5">
                    <Gavel className="w-3.5 h-3.5 text-gold" />
                    Current Bid
                  </p>
                  <p className="text-4xl lg:text-5xl font-bold text-navy">
                    ${lot.currentBid.toLocaleString()}
                  </p>
                </div>

                {/* Bid Count */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center gap-1.5 text-sm text-warm-gray">
                    <Users className="w-4 h-4" />
                    {lot.numberOfBids} bid{lot.numberOfBids !== 1 ? "s" : ""}
                  </span>
                  {lotBids.length > 0 && (
                    <button
                      onClick={() => {
                        const el = document.getElementById("bid-history");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-sm text-gold hover:text-gold-dark underline underline-offset-2 transition-colors"
                    >
                      View bid history
                    </button>
                  )}
                </div>

                {/* RRP Comparison */}
                <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-lg bg-success/5 border border-success/15">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  <p className="text-sm text-success font-medium">
                    RRP ${lot.rrp.toLocaleString()} — Save {savingsPercent}%
                  </p>
                </div>

                {/* Countdown Timer */}
                <div className="mb-6 p-4 rounded-lg bg-ivory border border-border-light">
                  <p className="text-xs font-semibold uppercase tracking-widest text-warm-gray mb-3 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Auction Ends In
                  </p>
                  <CountdownTimer endTime={lot.endTime} size="lg" variant="light" />
                </div>

                {/* Bid Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-navy mb-2">
                    Your Maximum Bid
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray font-semibold">
                      $
                    </span>
                    <input
                      type="number"
                      min={minBid}
                      step={50}
                      value={bidAmount}
                      onChange={(e) => {
                        setBidAmount(e.target.value);
                        setBidError("");
                        setBidPlaced(false);
                      }}
                      placeholder={minBid.toLocaleString()}
                      className="w-full pl-9 pr-4 py-3.5 rounded-lg border border-border bg-white text-navy text-lg font-semibold focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors placeholder:text-warm-gray/50"
                    />
                  </div>
                  {bidError && (
                    <p className="mt-2 text-sm text-danger flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5" />
                      {bidError}
                    </p>
                  )}
                  {bidPlaced && (
                    <p className="mt-2 text-sm text-success flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Your bid has been placed successfully!
                    </p>
                  )}
                </div>

                {/* Place Bid Button */}
                <button
                  onClick={handlePlaceBid}
                  className="w-full flex items-center justify-center gap-2.5 bg-gold hover:bg-gold-dark text-white py-4 rounded-lg font-bold text-lg transition-all hover:shadow-lg active:scale-[0.98]"
                >
                  <Gavel className="w-5 h-5" />
                  Place Bid
                </button>

                {/* Proxy Bidding Note */}
                <div className="mt-4 flex items-start gap-2">
                  <p className="text-xs text-warm-gray leading-relaxed">
                    <span className="font-medium">Proxy bidding:</span> We
                    will bid on your behalf up to your maximum.{" "}
                    <button
                      onMouseEnter={() => setShowProxyTooltip(true)}
                      onMouseLeave={() => setShowProxyTooltip(false)}
                      onClick={() => setShowProxyTooltip(!showProxyTooltip)}
                      className="inline-flex items-center text-gold hover:text-gold-dark transition-colors"
                    >
                      <Info className="w-3.5 h-3.5 ml-0.5" />
                    </button>
                  </p>
                </div>
                {showProxyTooltip && (
                  <div className="mt-2 p-3 rounded-lg bg-navy/5 border border-navy/10 text-xs text-navy leading-relaxed">
                    <p className="font-semibold mb-1">How proxy bidding works</p>
                    <p>
                      Enter the maximum amount you are willing to pay. Our
                      system will automatically place the minimum bid needed to
                      keep you in the lead, up to your maximum. You will only
                      pay one increment above the next-highest bid. If someone
                      outbids your maximum, you will be notified immediately.
                    </p>
                  </div>
                )}

                {/* Buyer&apos;s Premium Note */}
                <p className="mt-3 text-xs text-warm-gray text-center">
                  10% buyer&apos;s premium applies
                </p>
              </div>

              {/* ---- Lot Details Accordion ---- */}
              <div className="bg-white rounded-xl border border-border p-6">
                <AccordionSection id="description" title="Description">
                  <p className="text-warm-gray leading-relaxed text-sm">
                    {lot.description}
                  </p>
                </AccordionSection>

                <AccordionSection id="specifications" title="Specifications">
                  <div className="overflow-hidden rounded-lg border border-border-light">
                    <table className="w-full text-sm">
                      <tbody>
                        {[
                          { label: "Origin", value: lot.origin },
                          { label: "Size", value: lot.size },
                          { label: "Era", value: lot.era },
                          { label: "Material", value: lot.material },
                          {
                            label: "Knot Density",
                            value: lot.knotDensity,
                          },
                          { label: "Condition", value: lot.condition },
                          { label: "Type", value: lot.type },
                        ].map((row, idx) => (
                          <tr
                            key={row.label}
                            className={
                              idx % 2 === 0 ? "bg-ivory" : "bg-white"
                            }
                          >
                            <td className="px-4 py-3 font-medium text-navy w-1/3">
                              {row.label}
                            </td>
                            <td className="px-4 py-3 text-warm-gray">
                              {row.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AccordionSection>

                <AccordionSection
                  id="shipping"
                  title="Shipping &amp; Payment"
                >
                  <ul className="space-y-3 text-sm text-warm-gray">
                    <li className="flex items-start gap-2.5">
                      <Truck className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                      <span>
                        Australia-wide shipping available. Buyer pays freight
                        costs.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                      <span>
                        Pick-up available from our Melbourne warehouse by
                        appointment.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                      <span>
                        Payment due within 72 hours of auction close.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Shield className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                      <span>
                        Accepts Visa, Mastercard, Amex, and direct bank
                        transfer.
                      </span>
                    </li>
                  </ul>
                </AccordionSection>

                <AccordionSection id="authenticity" title="Authenticity">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-gold/5 border border-gold/15">
                    <Award className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-warm-gray leading-relaxed">
                      <p className="font-semibold text-navy mb-1">
                        Guaranteed Authentic
                      </p>
                      <p>
                        A certificate of authenticity and insurance valuation
                        is included with every purchase. Our team of expert
                        valuers personally inspects and certifies each lot
                        before it is listed for auction.
                      </p>
                    </div>
                  </div>
                </AccordionSection>
              </div>

              {/* ---- Bid History Table ---- */}
              {lotBids.length > 0 && (
                <div
                  id="bid-history"
                  className="bg-white rounded-xl border border-border p-6"
                >
                  <h3 className="text-xl font-semibold text-navy mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gold" />
                    Bid History ({lot.numberOfBids} bid
                    {lot.numberOfBids !== 1 ? "s" : ""})
                  </h3>
                  <div className="overflow-hidden rounded-lg border border-border-light">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-navy/5">
                          <th className="px-4 py-3 text-left font-semibold text-navy">
                            Bidder
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-navy">
                            Amount
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-navy">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {visibleBids.map((bid, idx) => (
                          <tr
                            key={`${bid.bidder}-${bid.amount}-${idx}`}
                            className={`${
                              idx % 2 === 0 ? "bg-white" : "bg-ivory"
                            } ${idx === 0 ? "font-medium" : ""}`}
                          >
                            <td className="px-4 py-3 text-navy">
                              {bid.bidder}
                              {idx === 0 && (
                                <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-success/10 text-success uppercase tracking-wider">
                                  Leading
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-navy font-semibold">
                              ${bid.amount.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-warm-gray">
                              {formatBidTime(bid.time)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {lotBids.length > 5 && (
                    <button
                      onClick={() => setShowAllBids(!showAllBids)}
                      className="mt-3 flex items-center gap-1.5 text-sm text-gold hover:text-gold-dark transition-colors font-medium mx-auto"
                    >
                      {showAllBids ? (
                        <>
                          Show less <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Show all {lotBids.length} bids{" "}
                          <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/*  Related Lots                                                */}
        {/* ========================================================== */}
        {relatedLots.length > 0 && (
          <section className="border-t border-border-light bg-warm-white">
            <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
              <h2 className="text-3xl font-bold text-navy text-center mb-10">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedLots.map((relatedLot) => (
                  <LotCard key={relatedLot.id} lot={relatedLot} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ========================================================== */}
        {/*  Trust Strip                                                 */}
        {/* ========================================================== */}
        <section className="bg-navy">
          <div className="max-w-7xl mx-auto px-4 py-10 lg:py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gold/10">
                  <Shield className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    Certificate of Authenticity
                  </p>
                  <p className="text-white/60 text-xs mt-0.5">
                    Included with every purchase
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 justify-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gold/10">
                  <Truck className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    Australia-wide Shipping
                  </p>
                  <p className="text-white/60 text-xs mt-0.5">
                    Secure packaging &amp; delivery
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 justify-center md:justify-end">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gold/10">
                  <Award className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    Expert Valuations
                  </p>
                  <p className="text-white/60 text-xs mt-0.5">
                    Professional appraisal included
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ============================================================ */}
      {/*  Lightbox / Modal                                              */}
      {/* ============================================================ */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setIsLightboxOpen(false)}
          />

          {/* Content */}
          <div className="relative z-10 w-full max-w-5xl mx-4">
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors text-sm font-medium flex items-center gap-1.5"
            >
              Close
              <span className="text-lg leading-none">&times;</span>
            </button>

            {/* Image */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black">
              <img
                src={images[selectedImageIndex]}
                alt={`${lot.title} — Image ${selectedImageIndex + 1}`}
                className="w-full h-full object-contain"
              />

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full">
                {selectedImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevImage();
                  }}
                  className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-14 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextImage();
                  }}
                  className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-14 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Lightbox Thumbnails */}
            {images.length > 1 && (
              <div className="flex justify-center gap-3 mt-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`
                      w-16 h-16 rounded-lg overflow-hidden transition-all duration-200 flex-shrink-0
                      ${
                        idx === selectedImageIndex
                          ? "ring-2 ring-gold ring-offset-2 ring-offset-black opacity-100"
                          : "opacity-50 hover:opacity-80"
                      }
                    `}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

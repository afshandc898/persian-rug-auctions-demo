"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CountdownTimer from "@/components/CountdownTimer";
import { lots } from "@/data/lots";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Gavel,
  Heart,
  Trophy,
  Settings,
  Bell,
  Clock,
  TrendingUp,
  TrendingDown,
  Eye,
  Package,
  CreditCard,
  ChevronRight,
  User,
  Mail,
  Phone,
  MapPin,
  LogOut,
  CheckCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type TabKey =
  | "bids"
  | "watchlist"
  | "won"
  | "history"
  | "notifications"
  | "settings";

interface SidebarTab {
  key: TabKey;
  label: string;
  icon: React.ReactNode;
  count?: number;
}

interface ActiveBid {
  lot: (typeof lots)[number];
  yourBid: number;
  currentBid: number;
  status: "winning" | "outbid";
}

interface WonItem {
  title: string;
  image: string;
  origin: string;
  size: string;
  wonPrice: number;
  buyersPremium: number;
  total: number;
  paymentStatus: "paid" | "pending";
  shippingStatus: string;
  trackingNumber: string;
}

interface HistoryRow {
  date: string;
  lot: string;
  lotNumber: string;
  yourBid: number;
  result: "Won" | "Outbid" | "Lost";
}

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const activeBids: ActiveBid[] = [
  {
    lot: lots[0],
    yourBid: 4200,
    currentBid: 4200,
    status: "winning",
  },
  {
    lot: lots[2],
    yourBid: 280,
    currentBid: 320,
    status: "outbid",
  },
  {
    lot: lots[4],
    yourBid: 3100,
    currentBid: 3100,
    status: "winning",
  },
];

const watchlistLots = [lots[1], lots[3]];

const wonItem: WonItem = {
  title: lots[8].title,
  image: lots[8].image,
  origin: lots[8].origin,
  size: lots[8].size,
  wonPrice: 1600,
  buyersPremium: 160,
  total: 1760,
  paymentStatus: "paid",
  shippingStatus: "Shipped",
  trackingNumber: "AU3847291",
};

const bidHistoryRows: HistoryRow[] = [
  {
    date: "08 Feb 2026",
    lot: "Kork-Kashan Carpet",
    lotNumber: "01",
    yourBid: 4200,
    result: "Won",
  },
  {
    date: "05 Feb 2026",
    lot: "Tabriz Hunting Scene",
    lotNumber: "02",
    yourBid: 5800,
    result: "Outbid",
  },
  {
    date: "01 Feb 2026",
    lot: "Bakhtiari Garden",
    lotNumber: "09",
    yourBid: 1600,
    result: "Won",
  },
  {
    date: "28 Jan 2026",
    lot: "Turkmen Bokhara",
    lotNumber: "06",
    yourBid: 380,
    result: "Lost",
  },
  {
    date: "22 Jan 2026",
    lot: "Nain Carpet",
    lotNumber: "08",
    yourBid: 2200,
    result: "Outbid",
  },
  {
    date: "15 Jan 2026",
    lot: "Heriz Serapi Carpet",
    lotNumber: "05",
    yourBid: 3100,
    result: "Won",
  },
];

/* ------------------------------------------------------------------ */
/*  Sidebar Tabs Definition                                            */
/* ------------------------------------------------------------------ */

const sidebarTabs: SidebarTab[] = [
  {
    key: "bids",
    label: "Active Bids",
    icon: <Gavel className="h-4 w-4" />,
    count: 3,
  },
  {
    key: "watchlist",
    label: "Watchlist",
    icon: <Heart className="h-4 w-4" />,
    count: 2,
  },
  {
    key: "won",
    label: "Won Items",
    icon: <Trophy className="h-4 w-4" />,
    count: 1,
  },
  {
    key: "history",
    label: "Bid History",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    key: "notifications",
    label: "Notification Preferences",
    icon: <Bell className="h-4 w-4" />,
  },
  {
    key: "settings",
    label: "Account Settings",
    icon: <Settings className="h-4 w-4" />,
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("bids");

  /* -- Notification preferences state -- */
  const [emailOutbid, setEmailOutbid] = useState(true);
  const [emailEndingSoon, setEmailEndingSoon] = useState(true);
  const [emailNewAuctions, setEmailNewAuctions] = useState(true);
  const [emailBidConfirm, setEmailBidConfirm] = useState(true);
  const [smsOutbid, setSmsOutbid] = useState(false);
  const [smsEndingSoon, setSmsEndingSoon] = useState(false);
  const [pushOutbid, setPushOutbid] = useState(false);
  const [pushEndingSoon, setPushEndingSoon] = useState(false);
  const [smsPhone, setSmsPhone] = useState("");

  /* ---------------------------------------------------------------- */
  /*  Helpers                                                          */
  /* ---------------------------------------------------------------- */

  const formatCurrency = (n: number) =>
    n.toLocaleString("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  /* ---------------------------------------------------------------- */
  /*  Toggle Component                                                 */
  /* ---------------------------------------------------------------- */

  const Toggle = ({
    enabled,
    onChange,
  }: {
    enabled: boolean;
    onChange: (val: boolean) => void;
  }) => (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`
        relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full
        border-2 border-transparent transition-colors duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2
        ${enabled ? "bg-gold" : "bg-warm-gray/40"}
      `}
    >
      <span
        className={`
          pointer-events-none inline-block h-5 w-5 rounded-full
          bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out
          ${enabled ? "translate-x-5" : "translate-x-0"}
        `}
      />
    </button>
  );

  /* ---------------------------------------------------------------- */
  /*  Tab: Active Bids                                                 */
  /* ---------------------------------------------------------------- */

  const renderActiveBids = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-semibold text-navy">
          Active Bids
        </h2>
        <span className="text-sm text-warm-gray">
          {activeBids.length} active bid{activeBids.length !== 1 && "s"}
        </span>
      </div>

      <div className="space-y-4">
        {activeBids.map((bid) => (
          <div
            key={bid.lot.id}
            className={`
              rounded-xl border bg-white shadow-sm overflow-hidden
              transition-shadow duration-200 hover:shadow-md
              ${
                bid.status === "outbid"
                  ? "border-l-4 border-l-danger border-danger/30"
                  : "border-border-light"
              }
            `}
          >
            <div className="flex flex-col sm:flex-row">
              {/* Image */}
              <div className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0">
                <img
                  src={bid.lot.image}
                  alt={bid.lot.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-navy/80 text-white text-xs font-semibold px-2 py-1 rounded">
                  Lot {bid.lot.lotNumber}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-navy leading-tight">
                        {bid.lot.title}
                      </h3>
                      <p className="text-sm text-warm-gray mt-0.5">
                        {bid.lot.origin} &middot; {bid.lot.size}
                      </p>
                    </div>
                    {/* Status badge */}
                    {bid.status === "winning" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success shrink-0">
                        <TrendingUp className="h-3.5 w-3.5" />
                        Winning
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-danger/10 px-3 py-1 text-xs font-semibold text-danger shrink-0">
                        <TrendingDown className="h-3.5 w-3.5" />
                        Outbid
                      </span>
                    )}
                  </div>

                  {/* Bid details */}
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="rounded-lg bg-ivory p-3">
                      <p className="text-[11px] uppercase tracking-wider text-warm-gray font-medium">
                        Your Bid
                      </p>
                      <p className="text-lg font-bold text-navy mt-0.5">
                        {formatCurrency(bid.yourBid)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-ivory p-3">
                      <p className="text-[11px] uppercase tracking-wider text-warm-gray font-medium">
                        Current Bid
                      </p>
                      <p
                        className={`text-lg font-bold mt-0.5 ${
                          bid.status === "outbid" ? "text-danger" : "text-navy"
                        }`}
                      >
                        {formatCurrency(bid.currentBid)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-border-light">
                  <CountdownTimer endTime={bid.lot.endTime} size="sm" />
                  <div className="flex items-center gap-2">
                    {bid.status === "outbid" && (
                      <Link
                        href={`/catalogue/${bid.lot.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
                      >
                        <TrendingUp className="h-3.5 w-3.5" />
                        Increase Bid
                      </Link>
                    )}
                    <Link
                      href={`/catalogue/${bid.lot.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-navy transition-colors hover:bg-ivory"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View Lot
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Tab: Watchlist                                                    */
  /* ---------------------------------------------------------------- */

  const renderWatchlist = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-semibold text-navy">
          Watchlist
        </h2>
        <span className="text-sm text-warm-gray">
          {watchlistLots.length} item{watchlistLots.length !== 1 && "s"}
        </span>
      </div>

      {watchlistLots.length === 0 ? (
        <div className="rounded-xl border border-border-light bg-white p-12 text-center">
          <Heart className="mx-auto h-12 w-12 text-warm-gray/40" />
          <h3 className="mt-4 font-heading text-lg font-semibold text-navy">
            Your watchlist is empty
          </h3>
          <p className="mt-2 text-sm text-warm-gray">
            Browse the catalogue and add items you are interested in.
          </p>
          <Link
            href="/catalogue"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
          >
            Browse Catalogue
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {watchlistLots.map((lot) => (
            <div
              key={lot.id}
              className="rounded-xl border border-border-light bg-white shadow-sm overflow-hidden transition-shadow duration-200 hover:shadow-md"
            >
              {/* Image */}
              <div className="relative h-52 w-full">
                <img
                  src={lot.image}
                  alt={lot.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-navy/80 text-white text-xs font-semibold px-2 py-1 rounded">
                  Lot {lot.lotNumber}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-heading text-base font-semibold text-navy leading-tight line-clamp-2">
                  {lot.title}
                </h3>
                <p className="text-sm text-warm-gray mt-1">
                  {lot.origin} &middot; {lot.size}
                </p>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-warm-gray font-medium">
                    Current Bid
                  </span>
                  <span className="text-lg font-bold text-navy">
                    {formatCurrency(lot.currentBid)}
                  </span>
                </div>

                <div className="mt-3">
                  <CountdownTimer endTime={lot.endTime} size="sm" />
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Link
                    href={`/catalogue/${lot.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
                  >
                    <Gavel className="h-3.5 w-3.5" />
                    Place Bid
                  </Link>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-warm-gray transition-colors hover:bg-danger/5 hover:text-danger hover:border-danger/30"
                  >
                    <Heart className="h-3.5 w-3.5 fill-current" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Tab: Won Items                                                   */
  /* ---------------------------------------------------------------- */

  const renderWonItems = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-semibold text-navy">
          Won Items
        </h2>
        <span className="text-sm text-warm-gray">1 item</span>
      </div>

      <div className="rounded-xl border border-border-light bg-white shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative w-full md:w-56 h-56 md:h-auto shrink-0">
            <img
              src={wonItem.image}
              alt={wonItem.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 p-5 sm:p-6">
            <h3 className="font-heading text-lg font-semibold text-navy leading-tight">
              {wonItem.title}
            </h3>
            <p className="text-sm text-warm-gray mt-1">
              {wonItem.origin} &middot; {wonItem.size}
            </p>

            {/* Price breakdown */}
            <div className="mt-4 rounded-lg bg-ivory p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-warm-gray">Winning Bid</span>
                <span className="font-semibold text-navy">
                  {formatCurrency(wonItem.wonPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-warm-gray">
                  Buyer&apos;s Premium (10%)
                </span>
                <span className="font-semibold text-navy">
                  {formatCurrency(wonItem.buyersPremium)}
                </span>
              </div>
              <div className="border-t border-border-light pt-2 flex items-center justify-between">
                <span className="font-semibold text-navy">Total</span>
                <span className="text-lg font-bold text-navy">
                  {formatCurrency(wonItem.total)}
                </span>
              </div>
            </div>

            {/* Status badges */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-warm-gray" />
                <span className="text-sm text-warm-gray">Payment:</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Paid
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-warm-gray" />
                <span className="text-sm text-warm-gray">Shipping:</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-navy">
                  {wonItem.shippingStatus} &mdash; tracking:{" "}
                  <span className="font-mono">{wonItem.trackingNumber}</span>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                Download Certificate
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-navy transition-colors hover:bg-ivory"
              >
                <CreditCard className="h-3.5 w-3.5" />
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Tab: Bid History                                                 */
  /* ---------------------------------------------------------------- */

  const renderBidHistory = () => (
    <div className="space-y-4">
      <h2 className="font-heading text-2xl font-semibold text-navy">
        Bid History
      </h2>

      {/* Desktop Table */}
      <div className="hidden sm:block rounded-xl border border-border-light bg-white shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-light bg-ivory">
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-warm-gray">
                Date
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-warm-gray">
                Lot
              </th>
              <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-warm-gray">
                Your Bid
              </th>
              <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-warm-gray">
                Result
              </th>
            </tr>
          </thead>
          <tbody>
            {bidHistoryRows.map((row, i) => (
              <tr
                key={`${row.lotNumber}-${row.date}`}
                className={`
                  border-b border-border-light last:border-b-0
                  transition-colors duration-150
                  ${i % 2 === 0 ? "bg-white" : "bg-ivory/50"}
                  hover:bg-gold/5
                `}
              >
                <td className="px-5 py-4 text-sm text-charcoal whitespace-nowrap">
                  {row.date}
                </td>
                <td className="px-5 py-4">
                  <div className="text-sm font-medium text-navy">
                    {row.lot}
                  </div>
                  <div className="text-xs text-warm-gray">
                    Lot {row.lotNumber}
                  </div>
                </td>
                <td className="px-5 py-4 text-right text-sm font-semibold text-navy whitespace-nowrap">
                  {formatCurrency(row.yourBid)}
                </td>
                <td className="px-5 py-4 text-center">
                  <span
                    className={`
                      inline-flex items-center rounded-full px-2.5 py-0.5
                      text-xs font-semibold
                      ${
                        row.result === "Won"
                          ? "bg-success/10 text-success"
                          : "bg-danger/10 text-danger"
                      }
                    `}
                  >
                    {row.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-3">
        {bidHistoryRows.map((row) => (
          <div
            key={`${row.lotNumber}-${row.date}-mobile`}
            className="rounded-xl border border-border-light bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-navy">{row.lot}</p>
                <p className="text-xs text-warm-gray mt-0.5">
                  Lot {row.lotNumber} &middot; {row.date}
                </p>
              </div>
              <span
                className={`
                  inline-flex items-center rounded-full px-2.5 py-0.5
                  text-xs font-semibold shrink-0
                  ${
                    row.result === "Won"
                      ? "bg-success/10 text-success"
                      : "bg-danger/10 text-danger"
                  }
                `}
              >
                {row.result}
              </span>
            </div>
            <div className="mt-2 pt-2 border-t border-border-light flex items-center justify-between">
              <span className="text-xs text-warm-gray">Your Bid</span>
              <span className="text-sm font-bold text-navy">
                {formatCurrency(row.yourBid)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Tab: Notification Preferences                                    */
  /* ---------------------------------------------------------------- */

  const renderNotifications = () => (
    <div className="space-y-6">
      <h2 className="font-heading text-2xl font-semibold text-navy">
        Notification Preferences
      </h2>

      {/* Email Notifications */}
      <div className="rounded-xl border border-border-light bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="h-5 w-5 text-gold" />
          <h3 className="font-heading text-lg font-semibold text-navy">
            Email Notifications
          </h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-charcoal">
                Outbid alerts
              </p>
              <p className="text-xs text-warm-gray mt-0.5">
                Receive an email when you are outbid on an item.
              </p>
            </div>
            <Toggle enabled={emailOutbid} onChange={setEmailOutbid} />
          </div>
          <div className="border-t border-border-light" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-charcoal">
                Auction ending soon
              </p>
              <p className="text-xs text-warm-gray mt-0.5">
                Get notified when auctions you are watching are about to end.
              </p>
            </div>
            <Toggle enabled={emailEndingSoon} onChange={setEmailEndingSoon} />
          </div>
          <div className="border-t border-border-light" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-charcoal">
                New auction announcements
              </p>
              <p className="text-xs text-warm-gray mt-0.5">
                Be the first to know about new auction listings.
              </p>
            </div>
            <Toggle enabled={emailNewAuctions} onChange={setEmailNewAuctions} />
          </div>
          <div className="border-t border-border-light" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-charcoal">
                Bid confirmations
              </p>
              <p className="text-xs text-warm-gray mt-0.5">
                Receive a confirmation email each time you place a bid.
              </p>
            </div>
            <Toggle enabled={emailBidConfirm} onChange={setEmailBidConfirm} />
          </div>
        </div>
      </div>

      {/* SMS Notifications */}
      <div className="rounded-xl border border-border-light bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Phone className="h-5 w-5 text-gold" />
          <h3 className="font-heading text-lg font-semibold text-navy">
            SMS Notifications
          </h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-charcoal">
                Outbid alerts
              </p>
              <p className="text-xs text-warm-gray mt-0.5">
                Receive an SMS when you are outbid.
              </p>
            </div>
            <Toggle enabled={smsOutbid} onChange={setSmsOutbid} />
          </div>
          <div className="border-t border-border-light" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-charcoal">
                Auction ending soon
              </p>
              <p className="text-xs text-warm-gray mt-0.5">
                Receive an SMS when auctions you are watching are about to end.
              </p>
            </div>
            <Toggle enabled={smsEndingSoon} onChange={setSmsEndingSoon} />
          </div>
          <div className="border-t border-border-light" />
          <div>
            <label
              htmlFor="smsPhone"
              className="block text-sm font-medium text-charcoal"
            >
              Phone number for SMS
            </label>
            <input
              id="smsPhone"
              type="tel"
              value={smsPhone}
              onChange={(e) => setSmsPhone(e.target.value)}
              placeholder="04XX XXX XXX"
              className="mt-1.5 h-11 w-full max-w-xs rounded-lg border border-border bg-white px-4 text-sm text-navy outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold placeholder:text-warm-gray/50"
            />
          </div>
        </div>
      </div>

      {/* Push Notifications */}
      <div className="rounded-xl border border-border-light bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-5 w-5 text-gold" />
          <h3 className="font-heading text-lg font-semibold text-navy">
            Push Notifications
          </h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-charcoal">
                Outbid alerts
              </p>
              <p className="text-xs text-warm-gray mt-0.5">
                Receive a push notification when you are outbid.
              </p>
            </div>
            <Toggle enabled={pushOutbid} onChange={setPushOutbid} />
          </div>
          <div className="border-t border-border-light" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-charcoal">
                Auction ending soon
              </p>
              <p className="text-xs text-warm-gray mt-0.5">
                Receive a push notification when auctions are about to end.
              </p>
            </div>
            <Toggle enabled={pushEndingSoon} onChange={setPushEndingSoon} />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
        >
          <CheckCircle className="h-4 w-4" />
          Save Preferences
        </button>
      </div>
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Tab: Account Settings                                            */
  /* ---------------------------------------------------------------- */

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="font-heading text-2xl font-semibold text-navy">
        Account Settings
      </h2>

      {/* Personal Information */}
      <div className="rounded-xl border border-border-light bg-white p-5 sm:p-6 shadow-sm">
        <h3 className="font-heading text-lg font-semibold text-navy mb-5">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-charcoal"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              defaultValue="Sarah"
              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-white px-4 text-sm text-navy outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-charcoal"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              defaultValue="Mitchell"
              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-white px-4 text-sm text-navy outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-charcoal"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              defaultValue="sarah.mitchell@example.com"
              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-white px-4 text-sm text-navy outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-charcoal"
            >
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              defaultValue="0412 345 678"
              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-white px-4 text-sm text-navy outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="company"
              className="block text-sm font-medium text-charcoal"
            >
              Company{" "}
              <span className="text-warm-gray font-normal">(optional)</span>
            </label>
            <input
              id="company"
              type="text"
              placeholder="Your company name"
              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-white px-4 text-sm text-navy outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold placeholder:text-warm-gray/50"
            />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="rounded-xl border border-border-light bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <MapPin className="h-5 w-5 text-gold" />
          <h3 className="font-heading text-lg font-semibold text-navy">
            Shipping Address
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label
              htmlFor="street"
              className="block text-sm font-medium text-charcoal"
            >
              Street Address
            </label>
            <input
              id="street"
              type="text"
              defaultValue="42 Collins Street"
              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-white px-4 text-sm text-navy outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-charcoal"
            >
              City
            </label>
            <input
              id="city"
              type="text"
              defaultValue="Melbourne"
              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-white px-4 text-sm text-navy outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-charcoal"
            >
              State
            </label>
            <select
              id="state"
              defaultValue="VIC"
              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-white px-4 text-sm text-navy outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold appearance-none"
            >
              <option value="ACT">ACT</option>
              <option value="NSW">NSW</option>
              <option value="NT">NT</option>
              <option value="QLD">QLD</option>
              <option value="SA">SA</option>
              <option value="TAS">TAS</option>
              <option value="VIC">VIC</option>
              <option value="WA">WA</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="postcode"
              className="block text-sm font-medium text-charcoal"
            >
              Postcode
            </label>
            <input
              id="postcode"
              type="text"
              defaultValue="3000"
              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-white px-4 text-sm text-navy outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-charcoal"
            >
              Country
            </label>
            <select
              id="country"
              defaultValue="AU"
              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-white px-4 text-sm text-navy outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold appearance-none"
            >
              <option value="AU">Australia</option>
              <option value="NZ">New Zealand</option>
            </select>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
          >
            <CheckCircle className="h-4 w-4" />
            Update Profile
          </button>
        </div>
      </div>

      {/* Change Password */}
      <div className="rounded-xl border border-border-light bg-white p-5 sm:p-6 shadow-sm">
        <h3 className="font-heading text-lg font-semibold text-navy mb-5">
          Change Password
        </h3>
        <div className="max-w-md space-y-4">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-charcoal"
            >
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              placeholder="Enter current password"
              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-white px-4 text-sm text-navy outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold placeholder:text-warm-gray/50"
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-charcoal"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-white px-4 text-sm text-navy outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold placeholder:text-warm-gray/50"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-charcoal"
            >
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-white px-4 text-sm text-navy outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold placeholder:text-warm-gray/50"
            />
          </div>
        </div>
        <div className="mt-5 flex justify-start">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-navy px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            Update Password
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-xl border border-danger/30 bg-danger/5 p-5 sm:p-6">
        <h3 className="font-heading text-lg font-semibold text-danger mb-2">
          Danger Zone
        </h3>
        <p className="text-sm text-warm-gray mb-4">
          Once you delete your account, there is no going back. All your data,
          bid history, and watchlist will be permanently removed.
        </p>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-danger px-5 py-2.5 text-sm font-semibold text-danger transition-colors hover:bg-danger hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Delete Account
        </button>
      </div>
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Tab Content Router                                               */
  /* ---------------------------------------------------------------- */

  const renderTabContent = () => {
    switch (activeTab) {
      case "bids":
        return renderActiveBids();
      case "watchlist":
        return renderWatchlist();
      case "won":
        return renderWonItems();
      case "history":
        return renderBidHistory();
      case "notifications":
        return renderNotifications();
      case "settings":
        return renderSettings();
      default:
        return renderActiveBids();
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="min-h-screen flex flex-col bg-warm-white">
      <Navbar />

      {/* ============================================================ */}
      {/*  Dashboard Header                                            */}
      {/* ============================================================ */}
      <section className="bg-navy">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            {/* Welcome */}
            <div>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white">
                Welcome back,{" "}
                <span className="text-gold">Sarah</span>
              </h1>
              <p className="mt-2 text-sm text-white/60">
                Member since January 2024
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <Gavel className="h-4 w-4 text-gold" />
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <p className="text-xs text-white/50 mt-0.5">Active Bids</p>
              </div>
              <div className="h-8 w-px bg-white/15" />
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <Heart className="h-4 w-4 text-gold" />
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <p className="text-xs text-white/50 mt-0.5">Watchlist</p>
              </div>
              <div className="h-8 w-px bg-white/15" />
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <Trophy className="h-4 w-4 text-gold" />
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <p className="text-xs text-white/50 mt-0.5">Won</p>
              </div>
            </div>
          </div>
        </div>
        {/* Gold rule */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </section>

      {/* ============================================================ */}
      {/*  Sidebar + Content Layout                                    */}
      {/* ============================================================ */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* ---- Sidebar ---- */}
            <aside className="lg:w-64 shrink-0">
              {/* Mobile: horizontal scrollable tabs */}
              <nav className="lg:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide">
                <div className="flex gap-2 pb-2 min-w-max">
                  {sidebarTabs.map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveTab(tab.key)}
                      className={`
                        inline-flex items-center gap-2 rounded-full px-4 py-2
                        text-sm font-medium whitespace-nowrap
                        transition-colors duration-200
                        ${
                          activeTab === tab.key
                            ? "bg-navy text-white"
                            : "bg-white text-charcoal border border-border-light hover:bg-ivory"
                        }
                      `}
                    >
                      {tab.icon}
                      {tab.label}
                      {tab.count !== undefined && (
                        <span
                          className={`
                            inline-flex items-center justify-center h-5 min-w-[20px] rounded-full
                            text-[11px] font-bold px-1.5
                            ${
                              activeTab === tab.key
                                ? "bg-gold text-navy"
                                : "bg-navy/10 text-navy"
                            }
                          `}
                        >
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </nav>

              {/* Desktop: vertical sidebar */}
              <nav className="hidden lg:block rounded-xl border border-border-light bg-white shadow-sm p-2 sticky top-24">
                {/* Logo branding */}
                <div className="px-3 py-4 mb-2 border-b border-border-light">
                  <Link href="/" className="flex items-center gap-3">
                    <Image
                      src="/pra-logo.png"
                      alt="Persian Rug Auctions"
                      width={156}
                      height={32}
                      className="h-8 w-auto object-contain"
                    />
                  </Link>
                  <p className="text-[11px] text-warm-gray mt-2 leading-tight">
                    Your trusted marketplace for authentic Persian rugs
                  </p>
                </div>
                <div className="space-y-1">
                  {sidebarTabs.map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveTab(tab.key)}
                      className={`
                        w-full flex items-center gap-3 rounded-lg px-3 py-2.5
                        text-sm font-medium transition-colors duration-200 text-left
                        ${
                          activeTab === tab.key
                            ? "bg-gold/10 text-navy"
                            : "text-charcoal hover:bg-ivory"
                        }
                      `}
                    >
                      <span
                        className={
                          activeTab === tab.key ? "text-gold" : "text-warm-gray"
                        }
                      >
                        {tab.icon}
                      </span>
                      <span className="flex-1">{tab.label}</span>
                      {tab.count !== undefined && (
                        <span
                          className={`
                            inline-flex items-center justify-center h-5 min-w-[20px] rounded-full
                            text-[11px] font-bold px-1.5
                            ${
                              activeTab === tab.key
                                ? "bg-gold text-navy"
                                : "bg-navy/10 text-navy"
                            }
                          `}
                        >
                          {tab.count}
                        </span>
                      )}
                      {activeTab === tab.key && (
                        <ChevronRight className="h-4 w-4 text-gold" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Sign Out link at bottom */}
                <div className="mt-4 pt-4 border-t border-border-light">
                  <button
                    type="button"
                    className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-warm-gray transition-colors duration-200 hover:bg-danger/5 hover:text-danger text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </nav>
            </aside>

            {/* ---- Content Area ---- */}
            <main className="flex-1 min-w-0">{renderTabContent()}</main>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

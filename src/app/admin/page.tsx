"use client";

import { useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  Users,
  Gavel,
  BarChart3,
  Settings,
  FileText,
  Truck,
  CreditCard,
  Bell,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Section =
  | "dashboard"
  | "auctions"
  | "lots"
  | "users"
  | "post-auction"
  | "analytics"
  | "settings";

interface NavItem {
  id: Section;
  label: string;
  icon: React.ElementType;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "auctions", label: "Auction Management", icon: Gavel },
  { id: "lots", label: "Lot Management", icon: Package },
  { id: "users", label: "Users & Bidders", icon: Users },
  { id: "post-auction", label: "Post-Auction", icon: FileText },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

const SECTION_TITLES: Record<Section, string> = {
  dashboard: "Dashboard Overview",
  auctions: "Auction Management",
  lots: "Lot Management",
  users: "Users & Bidders",
  "post-auction": "Post-Auction Workflow",
  analytics: "Analytics & Reports",
  settings: "Settings",
};

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const recentBids = [
  { time: "2 min ago", bidder: "Sarah M.", lot: "Lot 12 — Tabriz Silk", amount: "$2,450" },
  { time: "8 min ago", bidder: "James L.", lot: "Lot 03 — Isfahan Medallion", amount: "$1,800" },
  { time: "15 min ago", bidder: "Amir R.", lot: "Lot 27 — Heriz Runner", amount: "$920" },
  { time: "22 min ago", bidder: "Linda W.", lot: "Lot 05 — Kashan Garden", amount: "$3,100" },
  { time: "31 min ago", bidder: "David K.", lot: "Lot 41 — Afghan Baluchi", amount: "$680" },
];

const bidActivityByDay = [
  { day: "Mon", height: 45 },
  { day: "Tue", height: 62 },
  { day: "Wed", height: 38 },
  { day: "Thu", height: 78 },
  { day: "Fri", height: 90 },
  { day: "Sat", height: 100 },
  { day: "Sun", height: 55 },
];

const topLots = [
  { title: "Tabriz Silk Medallion", bids: 34, amount: "$2,450", image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=200&q=80" },
  { title: "Isfahan Garden Carpet", bids: 28, amount: "$3,100", image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=200&q=80" },
  { title: "Kashan Floral Runner", bids: 22, amount: "$1,800", image: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=200&q=80" },
];

const pastAuctions = [
  { name: "Winter Collection 2025", date: "Dec 15, 2025", lots: 52, revenue: "$62,400", status: "Completed" },
  { name: "Autumn Clearance 2025", date: "Oct 20, 2025", lots: 45, revenue: "$54,800", status: "Completed" },
  { name: "Summer Selection 2025", date: "Jul 10, 2025", lots: 38, revenue: "$41,200", status: "Completed" },
];

const lotsData = [
  { id: 1, lot: "001", title: "Tabriz Silk Medallion Carpet", origin: "Iran — Tabriz", startBid: "$800", currentBid: "$2,450", bids: 34, status: "Active" },
  { id: 2, lot: "003", title: "Isfahan Garden Design", origin: "Iran — Isfahan", startBid: "$1,200", currentBid: "$3,100", bids: 28, status: "Active" },
  { id: 3, lot: "005", title: "Kashan Floral Runner", origin: "Iran — Kashan", startBid: "$400", currentBid: "$1,800", bids: 22, status: "Active" },
  { id: 4, lot: "012", title: "Heriz Geometric Medallion", origin: "Iran — Heriz", startBid: "$600", currentBid: "$920", bids: 11, status: "Active" },
  { id: 5, lot: "027", title: "Afghan Baluchi Prayer Rug", origin: "Afghanistan", startBid: "$200", currentBid: "$680", bids: 8, status: "Active" },
  { id: 6, lot: "041", title: "Turkmen Saddlebag Pair", origin: "Turkmenistan", startBid: "$150", currentBid: "$150", bids: 0, status: "No Bids" },
];

const usersData = [
  { name: "Sarah Mitchell", email: "sarah.m@email.com", phone: "+61 412 345 678", registered: "Jan 15, 2026", bids: 34, status: "Active" },
  { name: "James Lawson", email: "james.l@email.com", phone: "+61 423 456 789", registered: "Dec 02, 2025", bids: 18, status: "Active" },
  { name: "Amir Rezaei", email: "amir.r@email.com", phone: "+61 434 567 890", registered: "Jan 28, 2026", bids: 12, status: "Active" },
  { name: "Linda Wang", email: "linda.w@email.com", phone: "+61 445 678 901", registered: "Nov 15, 2025", bids: 45, status: "Active" },
  { name: "David Kim", email: "david.k@email.com", phone: "+61 456 789 012", registered: "Oct 10, 2025", bids: 0, status: "Inactive" },
];

const postAuctionItems = {
  ended: [
    { lot: "Lot 15", title: "Nain Fine Silk", winner: "Michael B.", amount: "$4,200" },
    { lot: "Lot 22", title: "Qom Tree of Life", winner: "Rachel S.", amount: "$3,800" },
    { lot: "Lot 38", title: "Bidjar Iron Rug", winner: "Tom H.", amount: "$2,100" },
  ],
  contacted: [
    { lot: "Lot 08", title: "Kerman Lavar Antique", winner: "Patricia D.", amount: "$5,600" },
    { lot: "Lot 11", title: "Mashad Medallion", winner: "George K.", amount: "$1,900" },
  ],
  paid: [
    { lot: "Lot 02", title: "Tabriz Hunting Scene", winner: "Anna L.", amount: "$7,200" },
    { lot: "Lot 06", title: "Isfahan Silk Foundation", winner: "Robert M.", amount: "$4,800" },
  ],
  shipped: [
    { lot: "Lot 01", title: "Kashan Mohtasham", winner: "Julia F.", amount: "$6,400", tracking: "AU3847291056" },
  ],
};

const monthlyRevenue = [
  { month: "Jan", value: 32 },
  { month: "Feb", value: 45 },
  { month: "Mar", value: 38 },
  { month: "Apr", value: 52 },
  { month: "May", value: 48 },
  { month: "Jun", value: 61 },
  { month: "Jul", value: 41 },
  { month: "Aug", value: 55 },
  { month: "Sep", value: 68 },
  { month: "Oct", value: 54 },
  { month: "Nov", value: 72 },
  { month: "Dec", value: 62 },
];

const categoryData = [
  { name: "Persian Carpets", percentage: 45, color: "bg-gold" },
  { name: "Afghan Rugs", percentage: 25, color: "bg-burgundy" },
  { name: "Runners", percentage: 15, color: "bg-navy" },
  { name: "Kilims", percentage: 10, color: "bg-success" },
  { name: "Saddlebags", percentage: 5, color: "bg-warm-gray" },
];

const revenueByOrigin = [
  { name: "Iran — Tabriz", value: 85 },
  { name: "Iran — Isfahan", value: 72 },
  { name: "Iran — Kashan", value: 58 },
  { name: "Afghanistan", value: 42 },
  { name: "Turkmenistan", value: 28 },
];

const emailTemplates = [
  "Welcome — New Bidder Registration",
  "Bid Confirmation",
  "Outbid Alert",
  "Auction Won — Congratulations",
  "Payment Reminder",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [lotFilter, setLotFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  /* ---- helpers ---- */

  const filteredLots = lotsData.filter((lot) => {
    const matchesFilter =
      lotFilter === "all" ||
      (lotFilter === "with-bids" && lot.bids > 0) ||
      (lotFilter === "no-bids" && lot.bids === 0);
    const matchesSearch =
      searchQuery === "" ||
      lot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.lot.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  /* ---------------------------------------------------------------- */
  /*  Sidebar                                                          */
  /* ---------------------------------------------------------------- */

  const Sidebar = () => (
    <>
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-[#F5F5F0] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-burgundy/15">
          <Image
            src="/pra-logo.png"
            alt="Persian Rug Auctions"
            width={180}
            height={40}
            className="h-10 w-auto object-contain"
          />
          {/* Mobile close */}
          <button
            className="ml-auto lg:hidden text-charcoal/60 hover:text-burgundy"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-3">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveSection(item.id);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-burgundy/10 text-burgundy border-l-3 border-burgundy"
                        : "text-charcoal/70 hover:text-charcoal hover:bg-burgundy/5"
                    }`}
                  >
                    <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-burgundy" : "text-warm-gray"}`} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Admin user */}
        <div className="border-t border-burgundy/15 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy text-sm font-bold">
              MK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-charcoal truncate">Majid K.</p>
              <p className="text-xs text-warm-gray">Administrator</p>
            </div>
          </div>
          <button className="mt-3 w-full text-left text-xs text-warm-gray hover:text-danger transition-colors">
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );

  /* ---------------------------------------------------------------- */
  /*  Top Bar                                                          */
  /* ---------------------------------------------------------------- */

  const TopBar = () => (
    <header className="sticky top-0 z-30 bg-white border-b border-border px-4 sm:px-8 py-4 flex items-center gap-4">
      {/* Hamburger */}
      <button
        className="lg:hidden p-2 rounded-lg hover:bg-ivory-dark transition-colors"
        onClick={() => setMobileSidebarOpen(true)}
      >
        <div className="space-y-1.5">
          <span className="block w-5 h-0.5 bg-charcoal" />
          <span className="block w-5 h-0.5 bg-charcoal" />
          <span className="block w-5 h-0.5 bg-charcoal" />
        </div>
      </button>

      {/* Title */}
      <h1 className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl font-bold text-charcoal">
        {SECTION_TITLES[activeSection]}
      </h1>

      <div className="flex-1" />

      {/* Search */}
      <div className="hidden sm:flex items-center bg-ivory rounded-lg px-3 py-2 w-64 border border-border-light focus-within:border-gold transition-colors">
        <Search className="w-4 h-4 text-warm-gray mr-2 shrink-0" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-sm outline-none w-full text-charcoal placeholder:text-warm-gray"
        />
      </div>

      {/* Notifications */}
      <button className="relative p-2 rounded-lg hover:bg-ivory-dark transition-colors">
        <Bell className="w-5 h-5 text-charcoal" />
        <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-danger rounded-full text-white text-[10px] font-bold flex items-center justify-center">
          3
        </span>
      </button>

      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-navy-dark text-sm font-bold cursor-pointer">
        MK
      </div>
    </header>
  );

  /* ---------------------------------------------------------------- */
  /*  Dashboard Section                                                */
  /* ---------------------------------------------------------------- */

  const DashboardSection = () => (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {/* Active Auction */}
        <div className="bg-white rounded-xl border border-border p-5 sm:p-6">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm text-warm-gray font-medium">Active Auction</p>
            <span className="flex items-center gap-1.5 text-xs font-medium text-success">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Live
            </span>
          </div>
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-charcoal leading-snug">
            Clearance Auction Feb 2026
          </h3>
          <div className="mt-3 flex items-center gap-2 text-sm text-warm-gray">
            <Clock className="w-4 h-4" />
            <span>Ends in 4d 12h 36m</span>
          </div>
          <p className="mt-2 text-xs text-warm-gray">66 lots &middot; 234 bidders</p>
        </div>

        {/* Total Bids */}
        <div className="bg-white rounded-xl border border-border p-5 sm:p-6">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm text-warm-gray font-medium">Total Bids</p>
            <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
          </div>
          <h3 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-charcoal">847</h3>
          <p className="mt-1 text-sm text-success font-medium flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            12% from last auction
          </p>
        </div>

        {/* Registered Bidders */}
        <div className="bg-white rounded-xl border border-border p-5 sm:p-6">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm text-warm-gray font-medium">Registered Bidders</p>
            <div className="w-9 h-9 rounded-lg bg-navy/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-navy" />
            </div>
          </div>
          <h3 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-charcoal">234</h3>
          <p className="mt-1 text-sm text-success font-medium flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            8% from last auction
          </p>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-xl border border-border p-5 sm:p-6">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm text-warm-gray font-medium">Revenue This Auction</p>
            <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-gold-dark" />
            </div>
          </div>
          <h3 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-charcoal">$48,650</h3>
          <p className="mt-1 text-xs text-warm-gray">Estimated based on current bids</p>
        </div>
      </div>

      {/* Two column: Recent Bids + Auction Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bids */}
        <div className="bg-white rounded-xl border border-border p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-charcoal">Recent Bids</h3>
            <button className="text-xs text-gold-dark hover:text-gold font-medium transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6">
            <table className="w-full text-sm min-w-[420px]">
              <thead>
                <tr className="text-warm-gray text-xs uppercase tracking-wider border-b border-border-light">
                  <th className="text-left pb-3 font-medium">Time</th>
                  <th className="text-left pb-3 font-medium">Bidder</th>
                  <th className="text-left pb-3 font-medium">Lot</th>
                  <th className="text-right pb-3 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentBids.map((bid, i) => (
                  <tr key={i} className="border-b border-border-light last:border-0">
                    <td className="py-3 text-warm-gray whitespace-nowrap">{bid.time}</td>
                    <td className="py-3 text-charcoal font-medium whitespace-nowrap">{bid.bidder}</td>
                    <td className="py-3 text-charcoal whitespace-nowrap">{bid.lot}</td>
                    <td className="py-3 text-right font-semibold text-gold-dark whitespace-nowrap">{bid.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Auction Performance */}
        <div className="bg-white rounded-xl border border-border p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-charcoal">
              Auction Performance
            </h3>
            <span className="text-xs text-warm-gray">Bid activity by day</span>
          </div>
          <div className="flex items-end justify-between gap-2 h-48 px-2">
            {bidActivityByDay.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-gold-dark to-gold-light transition-all duration-500"
                  style={{ height: `${d.height * 1.6}px` }}
                />
                <span className="text-xs text-warm-gray font-medium">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: Lots by Status + Top Lots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lots by Status */}
        <div className="bg-white rounded-xl border border-border p-5 sm:p-6">
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-charcoal mb-5">
            Lots by Status
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-charcoal font-medium">Active</span>
                <span className="text-warm-gray">12 lots</span>
              </div>
              <div className="w-full h-3 bg-ivory rounded-full overflow-hidden">
                <div className="h-full bg-success rounded-full" style={{ width: "18%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-charcoal font-medium">With Bids</span>
                <span className="text-warm-gray">48 lots</span>
              </div>
              <div className="w-full h-3 bg-ivory rounded-full overflow-hidden">
                <div className="h-full bg-gold rounded-full" style={{ width: "73%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-charcoal font-medium">No Bids Yet</span>
                <span className="text-warm-gray">6 lots</span>
              </div>
              <div className="w-full h-3 bg-ivory rounded-full overflow-hidden">
                <div className="h-full bg-warning rounded-full" style={{ width: "9%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Top Lots */}
        <div className="bg-white rounded-xl border border-border p-5 sm:p-6">
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-charcoal mb-5">
            Top Lots by Bid Count
          </h3>
          <div className="space-y-4">
            {topLots.map((lot, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-ivory-dark flex items-center justify-center shrink-0 overflow-hidden">
                  <ImageIcon className="w-6 h-6 text-warm-gray" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal truncate">{lot.title}</p>
                  <p className="text-xs text-warm-gray">{lot.bids} bids</p>
                </div>
                <span className="text-sm font-bold text-gold-dark">{lot.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Auction Management Section                                       */
  /* ---------------------------------------------------------------- */

  const AuctionManagementSection = () => (
    <div className="space-y-6">
      {/* Current Auction */}
      <div className="bg-white rounded-xl border border-border p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-charcoal">
                Clearance Auction &mdash; February 2026
              </h3>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-success/10 text-success text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                Live
              </span>
            </div>
            <p className="text-sm text-warm-gray">Currently active auction with registered bidders</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-lg bg-gold hover:bg-gold-dark text-navy-dark text-sm font-semibold transition-colors flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit Auction
            </button>
            <button className="px-4 py-2 rounded-lg border border-danger text-danger hover:bg-danger hover:text-white text-sm font-semibold transition-colors">
              End Auction
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-ivory rounded-lg p-4">
            <p className="text-xs text-warm-gray mb-1">Start Date</p>
            <p className="text-sm font-semibold text-charcoal flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold-dark" />
              Feb 1, 2026
            </p>
          </div>
          <div className="bg-ivory rounded-lg p-4">
            <p className="text-xs text-warm-gray mb-1">End Date</p>
            <p className="text-sm font-semibold text-charcoal flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold-dark" />
              Feb 14, 2026
            </p>
          </div>
          <div className="bg-ivory rounded-lg p-4">
            <p className="text-xs text-warm-gray mb-1">Total Lots</p>
            <p className="text-sm font-semibold text-charcoal">66</p>
          </div>
          <div className="bg-ivory rounded-lg p-4">
            <p className="text-xs text-warm-gray mb-1">Total Bids</p>
            <p className="text-sm font-semibold text-charcoal">847</p>
          </div>
        </div>
      </div>

      {/* Past Auctions */}
      <div className="bg-white rounded-xl border border-border p-5 sm:p-6">
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-charcoal mb-5">Past Auctions</h3>
        <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6">
          <table className="w-full text-sm min-w-[540px]">
            <thead>
              <tr className="text-warm-gray text-xs uppercase tracking-wider border-b border-border-light">
                <th className="text-left pb-3 font-medium">Auction Name</th>
                <th className="text-left pb-3 font-medium">Date</th>
                <th className="text-left pb-3 font-medium">Lots</th>
                <th className="text-left pb-3 font-medium">Total Revenue</th>
                <th className="text-left pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {pastAuctions.map((auction, i) => (
                <tr key={i} className="border-b border-border-light last:border-0">
                  <td className="py-3.5 text-charcoal font-medium">{auction.name}</td>
                  <td className="py-3.5 text-warm-gray">{auction.date}</td>
                  <td className="py-3.5 text-charcoal">{auction.lots}</td>
                  <td className="py-3.5 font-semibold text-gold-dark">{auction.revenue}</td>
                  <td className="py-3.5">
                    <span className="px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-semibold">
                      {auction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create New */}
      <button className="px-5 py-3 rounded-lg bg-gold hover:bg-gold-dark text-navy-dark text-sm font-bold transition-colors flex items-center gap-2">
        <Plus className="w-5 h-5" />
        Create New Auction
      </button>
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Lot Management Section                                           */
  /* ---------------------------------------------------------------- */

  const LotManagementSection = () => (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <div className="flex items-center bg-white rounded-lg px-3 py-2.5 border border-border focus-within:border-gold transition-colors w-full sm:w-72">
          <Search className="w-4 h-4 text-warm-gray mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search lots..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm outline-none w-full text-charcoal placeholder:text-warm-gray"
          />
        </div>

        <div className="relative">
          <select
            value={lotFilter}
            onChange={(e) => setLotFilter(e.target.value)}
            className="appearance-none bg-white border border-border rounded-lg px-4 py-2.5 pr-9 text-sm text-charcoal cursor-pointer focus:border-gold outline-none transition-colors"
          >
            <option value="all">All Lots</option>
            <option value="with-bids">With Bids</option>
            <option value="no-bids">No Bids</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray pointer-events-none" />
        </div>

        <div className="sm:ml-auto">
          <button className="px-4 py-2.5 rounded-lg bg-gold hover:bg-gold-dark text-navy-dark text-sm font-bold transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Lot
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[780px]">
            <thead>
              <tr className="text-warm-gray text-xs uppercase tracking-wider border-b border-border bg-ivory/50">
                <th className="text-left px-5 py-3 font-medium">Image</th>
                <th className="text-left px-5 py-3 font-medium">Lot #</th>
                <th className="text-left px-5 py-3 font-medium">Title</th>
                <th className="text-left px-5 py-3 font-medium">Origin</th>
                <th className="text-left px-5 py-3 font-medium">Starting Bid</th>
                <th className="text-left px-5 py-3 font-medium">Current Bid</th>
                <th className="text-left px-5 py-3 font-medium"># Bids</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="text-right px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLots.map((lot) => (
                <tr key={lot.id} className="border-b border-border-light last:border-0 hover:bg-ivory/30 transition-colors">
                  <td className="px-5 py-3">
                    <div className="w-10 h-10 rounded bg-ivory-dark flex items-center justify-center">
                      <ImageIcon className="w-4 h-4 text-warm-gray" />
                    </div>
                  </td>
                  <td className="px-5 py-3 font-mono text-charcoal font-semibold">{lot.lot}</td>
                  <td className="px-5 py-3 text-charcoal font-medium max-w-[200px] truncate">{lot.title}</td>
                  <td className="px-5 py-3 text-warm-gray whitespace-nowrap">{lot.origin}</td>
                  <td className="px-5 py-3 text-charcoal">{lot.startBid}</td>
                  <td className="px-5 py-3 font-semibold text-gold-dark">{lot.currentBid}</td>
                  <td className="px-5 py-3 text-charcoal">{lot.bids}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        lot.status === "Active"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {lot.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded hover:bg-ivory-dark transition-colors text-warm-gray hover:text-charcoal">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-danger/10 transition-colors text-warm-gray hover:text-danger">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Users & Bidders Section                                          */
  /* ---------------------------------------------------------------- */

  const UsersSection = () => (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl border border-border p-5 sm:p-6">
          <p className="text-sm text-warm-gray mb-1">Total Registered</p>
          <h3 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-charcoal">234</h3>
        </div>
        <div className="bg-white rounded-xl border border-border p-5 sm:p-6">
          <p className="text-sm text-warm-gray mb-1">Active Bidders This Auction</p>
          <h3 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-charcoal">89</h3>
        </div>
        <div className="bg-white rounded-xl border border-border p-5 sm:p-6">
          <p className="text-sm text-warm-gray mb-1">New This Week</p>
          <h3 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-success">12</h3>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="text-warm-gray text-xs uppercase tracking-wider border-b border-border bg-ivory/50">
                <th className="text-left px-5 py-3 font-medium">Name</th>
                <th className="text-left px-5 py-3 font-medium">Email</th>
                <th className="text-left px-5 py-3 font-medium">Phone</th>
                <th className="text-left px-5 py-3 font-medium">Registered</th>
                <th className="text-left px-5 py-3 font-medium">Bids Placed</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user, i) => (
                <tr key={i} className="border-b border-border-light last:border-0 hover:bg-ivory/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center text-navy text-xs font-bold">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="font-medium text-charcoal">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-warm-gray">{user.email}</td>
                  <td className="px-5 py-3.5 text-warm-gray whitespace-nowrap">{user.phone}</td>
                  <td className="px-5 py-3.5 text-warm-gray whitespace-nowrap">{user.registered}</td>
                  <td className="px-5 py-3.5 text-charcoal font-medium">{user.bids}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        user.status === "Active"
                          ? "bg-success/10 text-success"
                          : "bg-warm-gray/10 text-warm-gray"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Post-Auction Workflow Section                                     */
  /* ---------------------------------------------------------------- */

  const PostAuctionSection = () => {
    const Column = ({
      title,
      icon: Icon,
      color,
      items,
      actionLabel,
      showTracking,
    }: {
      title: string;
      icon: React.ElementType;
      color: string;
      items: { lot: string; title: string; winner: string; amount: string; tracking?: string }[];
      actionLabel: string;
      showTracking?: boolean;
    }) => (
      <div className="bg-white rounded-xl border border-border flex flex-col">
        <div className="px-4 py-3 border-b border-border-light flex items-center gap-2">
          <Icon className={`w-4 h-4 ${color}`} />
          <h4 className="text-sm font-bold text-charcoal">{title}</h4>
          <span className="ml-auto text-xs bg-ivory rounded-full px-2 py-0.5 text-warm-gray font-medium">
            {items.length}
          </span>
        </div>
        <div className="p-3 space-y-3 flex-1">
          {items.map((item, i) => (
            <div key={i} className="bg-ivory rounded-lg p-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded bg-ivory-dark flex items-center justify-center shrink-0">
                  <ImageIcon className="w-4 h-4 text-warm-gray" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-charcoal truncate">{item.lot} &mdash; {item.title}</p>
                  <p className="text-xs text-warm-gray">Winner: {item.winner}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gold-dark">{item.amount}</span>
                {showTracking && item.tracking ? (
                  <span className="text-[10px] text-warm-gray bg-white px-2 py-1 rounded font-mono">
                    {item.tracking}
                  </span>
                ) : (
                  <button className="text-xs text-navy font-semibold hover:text-gold-dark transition-colors">
                    {actionLabel}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        <Column
          title="Auction Ended"
          icon={AlertCircle}
          color="text-warning"
          items={postAuctionItems.ended}
          actionLabel="Contact Winner"
        />
        <Column
          title="Winner Contacted"
          icon={Clock}
          color="text-navy"
          items={postAuctionItems.contacted}
          actionLabel="Mark Paid"
        />
        <Column
          title="Payment Received"
          icon={CheckCircle}
          color="text-success"
          items={postAuctionItems.paid}
          actionLabel="Ship Item"
        />
        <Column
          title="Shipped"
          icon={Truck}
          color="text-gold-dark"
          items={postAuctionItems.shipped}
          actionLabel="Complete"
          showTracking
        />
      </div>
    );
  };

  /* ---------------------------------------------------------------- */
  /*  Analytics Section                                                */
  /* ---------------------------------------------------------------- */

  const AnalyticsSection = () => (
    <div className="space-y-6">
      {/* Revenue Chart */}
      <div className="bg-white rounded-xl border border-border p-5 sm:p-6">
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-charcoal mb-5">
          Monthly Revenue (2025)
        </h3>
        <div className="flex items-end justify-between gap-1.5 sm:gap-2 h-52 px-1">
          {monthlyRevenue.map((m) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-[10px] text-gold-dark font-bold">
                ${(m.value * 1000).toLocaleString()}
              </span>
              <div className="w-full relative rounded-t-md overflow-hidden" style={{ height: `${m.value * 2.8}px` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-navy to-navy-light opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-gold/20 to-transparent" />
              </div>
              <span className="text-[10px] text-warm-gray font-medium">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl border border-border p-5">
          <p className="text-xs text-warm-gray mb-1">Average Lot Price</p>
          <h4 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal">$1,240</h4>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <p className="text-xs text-warm-gray mb-1">Avg Bids Per Lot</p>
          <h4 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal">8.3</h4>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <p className="text-xs text-warm-gray mb-1">Sell-Through Rate</p>
          <h4 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-success">94%</h4>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <p className="text-xs text-warm-gray mb-1">Repeat Bidder Rate</p>
          <h4 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal">62%</h4>
        </div>
      </div>

      {/* Two column: Categories + Revenue by Origin */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Categories */}
        <div className="bg-white rounded-xl border border-border p-5 sm:p-6">
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-charcoal mb-5">
            Popular Categories
          </h3>
          <div className="space-y-4">
            {categoryData.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-charcoal font-medium">{cat.name}</span>
                  <span className="text-warm-gray">{cat.percentage}%</span>
                </div>
                <div className="w-full h-3 bg-ivory rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${cat.color}`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Origin */}
        <div className="bg-white rounded-xl border border-border p-5 sm:p-6">
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-charcoal mb-5">
            Revenue by Origin
          </h3>
          <div className="space-y-4">
            {revenueByOrigin.map((item) => (
              <div key={item.name}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-charcoal font-medium">{item.name}</span>
                  <span className="text-warm-gray">${(item.value * 620).toLocaleString()}</span>
                </div>
                <div className="w-full h-3 bg-ivory rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-dark to-gold-light rounded-full"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Settings Section                                                 */
  /* ---------------------------------------------------------------- */

  const SettingsSection = () => (
    <div className="space-y-6">
      {/* Auction Defaults */}
      <div className="bg-white rounded-xl border border-border p-5 sm:p-6">
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-charcoal mb-5">
          Auction Defaults
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs text-warm-gray font-medium mb-1.5">Default Starting Bid</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-warm-gray">$</span>
              <input
                type="text"
                defaultValue="200"
                className="w-full bg-ivory border border-border rounded-lg pl-7 pr-4 py-2.5 text-sm text-charcoal outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-warm-gray font-medium mb-1.5">Buyer&apos;s Premium</label>
            <div className="relative">
              <input
                type="text"
                defaultValue="10"
                className="w-full bg-ivory border border-border rounded-lg pl-4 pr-7 py-2.5 text-sm text-charcoal outline-none focus:border-gold transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-warm-gray">%</span>
            </div>
          </div>
          <div>
            <label className="block text-xs text-warm-gray font-medium mb-1.5">Payment Deadline</label>
            <div className="relative">
              <input
                type="text"
                defaultValue="72"
                className="w-full bg-ivory border border-border rounded-lg pl-4 pr-14 py-2.5 text-sm text-charcoal outline-none focus:border-gold transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-warm-gray">hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Email Templates */}
      <div className="bg-white rounded-xl border border-border p-5 sm:p-6">
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-charcoal mb-5">
          Email Templates
        </h3>
        <div className="space-y-2">
          {emailTemplates.map((template, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3 rounded-lg bg-ivory hover:bg-ivory-dark transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-warm-gray" />
                <span className="text-sm text-charcoal font-medium">{template}</span>
              </div>
              <button className="text-xs text-gold-dark hover:text-gold font-medium transition-colors flex items-center gap-1">
                <Edit className="w-3.5 h-3.5" />
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Business Details */}
      <div className="bg-white rounded-xl border border-border p-5 sm:p-6">
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-charcoal mb-5">
          Business Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs text-warm-gray font-medium mb-1.5">Company Name</label>
            <input
              type="text"
              defaultValue="Persian Rug Auctions Pty Ltd"
              className="w-full bg-ivory border border-border rounded-lg px-4 py-2.5 text-sm text-charcoal outline-none focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-warm-gray font-medium mb-1.5">ABN</label>
            <input
              type="text"
              defaultValue="12 345 678 901"
              className="w-full bg-ivory border border-border rounded-lg px-4 py-2.5 text-sm text-charcoal outline-none focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-warm-gray font-medium mb-1.5">Contact Email</label>
            <input
              type="text"
              defaultValue="admin@persianrugauctions.com.au"
              className="w-full bg-ivory border border-border rounded-lg px-4 py-2.5 text-sm text-charcoal outline-none focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-warm-gray font-medium mb-1.5">Contact Phone</label>
            <input
              type="text"
              defaultValue="+61 3 9000 1234"
              className="w-full bg-ivory border border-border rounded-lg px-4 py-2.5 text-sm text-charcoal outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Save */}
      <button className="px-6 py-3 rounded-lg bg-gold hover:bg-gold-dark text-navy-dark text-sm font-bold transition-colors">
        Save Settings
      </button>
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Section Router                                                   */
  /* ---------------------------------------------------------------- */

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection />;
      case "auctions":
        return <AuctionManagementSection />;
      case "lots":
        return <LotManagementSection />;
      case "users":
        return <UsersSection />;
      case "post-auction":
        return <PostAuctionSection />;
      case "analytics":
        return <AnalyticsSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return <DashboardSection />;
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-ivory">
      <Sidebar />

      {/* Main content area offset by sidebar */}
      <div className="lg:ml-64">
        <TopBar />

        <main className="p-4 sm:p-6 lg:p-8">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}

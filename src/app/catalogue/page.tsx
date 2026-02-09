"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LotCard from "@/components/LotCard";
import CountdownTimer from "@/components/CountdownTimer";
import { lots } from "@/data/lots";
import {
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
  Search,
  ChevronDown,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

type ViewMode = "grid" | "list";
type SortOption =
  | "ending-soonest"
  | "newest-listed"
  | "price-low"
  | "price-high"
  | "most-bids";

interface Filters {
  search: string;
  priceMin: string;
  priceMax: string;
  origins: string[];
  types: string[];
  materials: string[];
  eras: string[];
  sizes: string[];
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "ending-soonest", label: "Ending Soonest" },
  { value: "newest-listed", label: "Newest Listed" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "most-bids", label: "Most Bids" },
];

const ORIGIN_OPTIONS = [
  "Persia (Iran)",
  "Afghanistan",
  "India",
  "Turkey",
  "Pakistan",
];

const TYPE_OPTIONS = ["Carpet", "Runner", "Kilim", "Saddlebag"];

const MATERIAL_OPTIONS = ["Wool", "Silk", "Wool & Silk", "Cotton"];

const ERA_OPTIONS = [
  "Antique (pre-1940)",
  "Vintage (1940-1980)",
  "Contemporary",
];

const SIZE_OPTIONS = [
  "Small (<2m\u00B2)",
  "Medium (2-6m\u00B2)",
  "Large (6-12m\u00B2)",
  "Palace (12m\u00B2+)",
];

const PRICE_PRESETS = [
  { label: "Under $500", min: "", max: "500" },
  { label: "$500\u2013$2,000", min: "500", max: "2000" },
  { label: "$2,000\u2013$5,000", min: "2000", max: "5000" },
  { label: "$5,000+", min: "5000", max: "" },
];

const INITIAL_FILTERS: Filters = {
  search: "",
  priceMin: "",
  priceMax: "",
  origins: [],
  types: [],
  materials: [],
  eras: [],
  sizes: [],
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Compute area in m^2 from the sizeCm field like "407x296" */
function areaFromSizeCm(sizeCm: string): number {
  const parts = sizeCm.split("\u00D7"); // multiplication sign
  if (parts.length === 2) {
    const w = parseFloat(parts[0]);
    const h = parseFloat(parts[1]);
    if (!isNaN(w) && !isNaN(h)) return (w * h) / 10_000; // cm^2 -> m^2
  }
  return 0;
}

/** Match a lot's era string to a filter era category */
function matchEra(lotEra: string, filterEra: string): boolean {
  const lower = lotEra.toLowerCase();
  if (filterEra === "Antique (pre-1940)") return lower.includes("antique");
  if (filterEra === "Vintage (1940-1980)") return lower.includes("vintage");
  if (filterEra === "Contemporary") return lower.includes("contemporary");
  return false;
}

/** Match a size category filter */
function matchSize(sizeCm: string, sizeFilter: string): boolean {
  const area = areaFromSizeCm(sizeCm);
  if (sizeFilter.startsWith("Small")) return area < 2;
  if (sizeFilter.startsWith("Medium")) return area >= 2 && area < 6;
  if (sizeFilter.startsWith("Large")) return area >= 6 && area < 12;
  if (sizeFilter.startsWith("Palace")) return area >= 12;
  return false;
}

/** Match a material filter — check if the lot material contains the keyword */
function matchMaterial(lotMaterial: string, filterMaterial: string): boolean {
  const m = lotMaterial.toLowerCase();
  if (filterMaterial === "Wool & Silk") {
    return m.includes("wool") && m.includes("silk");
  }
  if (filterMaterial === "Wool") {
    return m.includes("wool") && !m.includes("silk");
  }
  if (filterMaterial === "Silk") {
    return m.includes("silk") && !m.includes("wool");
  }
  if (filterMaterial === "Cotton") {
    return m.includes("cotton") && !m.includes("wool") && !m.includes("silk");
  }
  return false;
}

/* ------------------------------------------------------------------ */
/*  Collapsible Filter Section                                         */
/* ------------------------------------------------------------------ */

function FilterSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border-light pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left group"
      >
        <span className="text-sm font-semibold text-navy">{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-warm-gray transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Catalogue Page Component                                           */
/* ------------------------------------------------------------------ */

export default function CataloguePage() {
  /* ---- State ---- */
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortOption, setSortOption] = useState<SortOption>("ending-soonest");
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  /* ---- Derived ---- */
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.priceMin || filters.priceMax) count++;
    count += filters.origins.length;
    count += filters.types.length;
    count += filters.materials.length;
    count += filters.eras.length;
    count += filters.sizes.length;
    return count;
  }, [filters]);

  const activeFilterPills = useMemo(() => {
    const pills: { label: string; clear: () => void }[] = [];

    if (filters.search) {
      pills.push({
        label: `Search: "${filters.search}"`,
        clear: () => setFilters((f) => ({ ...f, search: "" })),
      });
    }
    if (filters.priceMin || filters.priceMax) {
      const min = filters.priceMin ? `$${Number(filters.priceMin).toLocaleString()}` : "$0";
      const max = filters.priceMax ? `$${Number(filters.priceMax).toLocaleString()}` : "Any";
      pills.push({
        label: `Price: ${min} \u2013 ${max}`,
        clear: () => setFilters((f) => ({ ...f, priceMin: "", priceMax: "" })),
      });
    }
    filters.origins.forEach((o) =>
      pills.push({
        label: o,
        clear: () =>
          setFilters((f) => ({
            ...f,
            origins: f.origins.filter((x) => x !== o),
          })),
      })
    );
    filters.types.forEach((t) =>
      pills.push({
        label: t,
        clear: () =>
          setFilters((f) => ({
            ...f,
            types: f.types.filter((x) => x !== t),
          })),
      })
    );
    filters.materials.forEach((m) =>
      pills.push({
        label: m,
        clear: () =>
          setFilters((f) => ({
            ...f,
            materials: f.materials.filter((x) => x !== m),
          })),
      })
    );
    filters.eras.forEach((e) =>
      pills.push({
        label: e,
        clear: () =>
          setFilters((f) => ({
            ...f,
            eras: f.eras.filter((x) => x !== e),
          })),
      })
    );
    filters.sizes.forEach((s) =>
      pills.push({
        label: s,
        clear: () =>
          setFilters((f) => ({
            ...f,
            sizes: f.sizes.filter((x) => x !== s),
          })),
      })
    );
    return pills;
  }, [filters]);

  /* ---- Filter + Sort Logic ---- */
  const filteredAndSortedLots = useMemo(() => {
    let result = [...lots];

    // Search filter
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (lot) =>
          lot.title.toLowerCase().includes(q) ||
          lot.shortTitle.toLowerCase().includes(q) ||
          lot.origin.toLowerCase().includes(q) ||
          lot.description.toLowerCase().includes(q) ||
          lot.lotNumber.includes(q)
      );
    }

    // Price filter
    if (filters.priceMin) {
      const min = parseFloat(filters.priceMin);
      if (!isNaN(min)) result = result.filter((lot) => lot.currentBid >= min);
    }
    if (filters.priceMax) {
      const max = parseFloat(filters.priceMax);
      if (!isNaN(max)) result = result.filter((lot) => lot.currentBid <= max);
    }

    // Origin filter
    if (filters.origins.length > 0) {
      result = result.filter((lot) => filters.origins.includes(lot.origin));
    }

    // Type filter
    if (filters.types.length > 0) {
      result = result.filter((lot) => filters.types.includes(lot.type));
    }

    // Material filter
    if (filters.materials.length > 0) {
      result = result.filter((lot) =>
        filters.materials.some((m) => matchMaterial(lot.material, m))
      );
    }

    // Era filter
    if (filters.eras.length > 0) {
      result = result.filter((lot) =>
        filters.eras.some((e) => matchEra(lot.era, e))
      );
    }

    // Size filter
    if (filters.sizes.length > 0) {
      result = result.filter((lot) =>
        filters.sizes.some((s) => matchSize(lot.sizeCm, s))
      );
    }

    // Sort
    switch (sortOption) {
      case "ending-soonest":
        result.sort(
          (a, b) =>
            new Date(a.endTime).getTime() - new Date(b.endTime).getTime()
        );
        break;
      case "newest-listed":
        result.sort((a, b) => b.id - a.id);
        break;
      case "price-low":
        result.sort((a, b) => a.currentBid - b.currentBid);
        break;
      case "price-high":
        result.sort((a, b) => b.currentBid - a.currentBid);
        break;
      case "most-bids":
        result.sort((a, b) => b.numberOfBids - a.numberOfBids);
        break;
    }

    return result;
  }, [filters, sortOption]);

  /* ---- "Ending Soon" lots: top 4 by number of bids ---- */
  const endingSoonLots = useMemo(
    () => [...lots].sort((a, b) => b.numberOfBids - a.numberOfBids).slice(0, 4),
    []
  );

  /* ---- Callbacks ---- */
  const toggleCheckbox = useCallback(
    (
      key: "origins" | "types" | "materials" | "eras" | "sizes",
      value: string
    ) => {
      setFilters((prev) => {
        const arr = prev[key];
        return {
          ...prev,
          [key]: arr.includes(value)
            ? arr.filter((v) => v !== value)
            : [...arr, value],
        };
      });
    },
    []
  );

  const clearAllFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const applyPricePreset = useCallback((min: string, max: string) => {
    setFilters((f) => ({ ...f, priceMin: min, priceMax: max }));
  }, []);

  /* ---- Reusable filter panel content ---- */
  const filterPanelContent = (
    <div className="space-y-0">
      {/* Search */}
      <FilterSection title="Search">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) =>
              setFilters((f) => ({ ...f, search: e.target.value }))
            }
            placeholder="Search lots..."
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-white text-sm text-charcoal placeholder:text-warm-gray/60 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30"
          />
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray text-sm">
              $
            </span>
            <input
              type="number"
              value={filters.priceMin}
              onChange={(e) =>
                setFilters((f) => ({ ...f, priceMin: e.target.value }))
              }
              placeholder="Min"
              className="w-full h-9 pl-7 pr-2 rounded-lg border border-border bg-white text-sm text-charcoal placeholder:text-warm-gray/60 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30"
            />
          </div>
          <span className="text-warm-gray text-xs">&ndash;</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray text-sm">
              $
            </span>
            <input
              type="number"
              value={filters.priceMax}
              onChange={(e) =>
                setFilters((f) => ({ ...f, priceMax: e.target.value }))
              }
              placeholder="Max"
              className="w-full h-9 pl-7 pr-2 rounded-lg border border-border bg-white text-sm text-charcoal placeholder:text-warm-gray/60 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRICE_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => applyPricePreset(preset.min, preset.max)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                filters.priceMin === preset.min &&
                filters.priceMax === preset.max
                  ? "bg-gold text-white"
                  : "bg-ivory text-charcoal hover:bg-gold/10 hover:text-gold-dark border border-border-light"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Origin */}
      <FilterSection title="Origin">
        <div className="space-y-2">
          {ORIGIN_OPTIONS.map((origin) => (
            <label
              key={origin}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.origins.includes(origin)}
                onChange={() => toggleCheckbox("origins", origin)}
                className="w-4 h-4 rounded border-border text-gold focus:ring-gold/30 cursor-pointer"
              />
              <span className="text-sm text-charcoal group-hover:text-navy transition-colors">
                {origin}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Rug Type */}
      <FilterSection title="Rug Type">
        <div className="space-y-2">
          {TYPE_OPTIONS.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.types.includes(type)}
                onChange={() => toggleCheckbox("types", type)}
                className="w-4 h-4 rounded border-border text-gold focus:ring-gold/30 cursor-pointer"
              />
              <span className="text-sm text-charcoal group-hover:text-navy transition-colors">
                {type}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Material */}
      <FilterSection title="Material">
        <div className="space-y-2">
          {MATERIAL_OPTIONS.map((material) => (
            <label
              key={material}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.materials.includes(material)}
                onChange={() => toggleCheckbox("materials", material)}
                className="w-4 h-4 rounded border-border text-gold focus:ring-gold/30 cursor-pointer"
              />
              <span className="text-sm text-charcoal group-hover:text-navy transition-colors">
                {material}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Era */}
      <FilterSection title="Era">
        <div className="space-y-2">
          {ERA_OPTIONS.map((era) => (
            <label
              key={era}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.eras.includes(era)}
                onChange={() => toggleCheckbox("eras", era)}
                className="w-4 h-4 rounded border-border text-gold focus:ring-gold/30 cursor-pointer"
              />
              <span className="text-sm text-charcoal group-hover:text-navy transition-colors">
                {era}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Size */}
      <FilterSection title="Size">
        <div className="space-y-2">
          {SIZE_OPTIONS.map((size) => (
            <label
              key={size}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.sizes.includes(size)}
                onChange={() => toggleCheckbox("sizes", size)}
                className="w-4 h-4 rounded border-border text-gold focus:ring-gold/30 cursor-pointer"
              />
              <span className="text-sm text-charcoal group-hover:text-navy transition-colors">
                {size}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-ivory">
        {/* ========================================================== */}
        {/*  Page Header                                                */}
        {/* ========================================================== */}
        <section className="bg-ivory-dark border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-6 text-sm text-warm-gray"
            >
              <ol className="flex items-center gap-2">
                <li>
                  <Link
                    href="/"
                    className="hover:text-gold transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <span className="text-border">/</span>
                </li>
                <li className="text-navy font-medium">Auction Catalogue</li>
              </ol>
            </nav>

            {/* Title */}
            <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl text-navy font-semibold mb-3">
              Clearance Auction &mdash; February 2026
            </h1>

            {/* Subtitle */}
            <p className="text-warm-gray text-base sm:text-lg mb-8">
              66 Lots &middot; Bidding Ends Sunday Feb 15 @ 4PM AEST
            </p>

            {/* Countdown */}
            <CountdownTimer
              endTime="2026-02-15T16:00:00+11:00"
              size="lg"
            />
          </div>
        </section>

        {/* ========================================================== */}
        {/*  "Ending Soon" Alert Strip                                  */}
        {/* ========================================================== */}
        <section className="bg-gradient-to-r from-gold-dark/90 via-gold to-gold-dark/90 border-b border-gold-dark/30">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Strip header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/70" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
              </span>
              <span className="text-sm font-semibold text-navy tracking-wide uppercase">
                Ending Soon &mdash; Active Bidding
              </span>
            </div>

            {/* Horizontal scroll of ending-soon lots */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
              {endingSoonLots.map((lot) => (
                <Link
                  key={lot.id}
                  href={`/lot/${lot.id}`}
                  className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-2.5 pr-4 min-w-[280px] sm:min-w-[300px] flex-shrink-0 hover:bg-white/30 transition-colors group"
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={lot.image}
                      alt={lot.shortTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-navy text-sm font-semibold truncate group-hover:text-navy/80 transition-colors">
                      {lot.shortTitle}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-navy/90 text-sm font-bold font-[family-name:var(--font-heading)]">
                        ${lot.currentBid.toLocaleString()}
                      </span>
                      <span className="text-navy/70 text-xs">
                        {lot.numberOfBids} bids
                      </span>
                    </div>
                    <div className="mt-1">
                      <CountdownTimer
                        endTime={lot.endTime}
                        size="sm"
                        showIcon={false}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/*  Main Content                                               */}
        {/* ========================================================== */}
        <section className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
          <div className="flex gap-8">
            {/* ---------------------------------------------------- */}
            {/*  Desktop Sidebar                                       */}
            {/* ---------------------------------------------------- */}
            <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
              <div className="sticky top-28">
                <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
                  {/* Heading + Clear */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-gold" />
                      <span className="text-base font-semibold text-navy font-[family-name:var(--font-heading)]">
                        Filters
                      </span>
                      {activeFilterCount > 0 && (
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gold text-white text-[10px] font-bold">
                          {activeFilterCount}
                        </span>
                      )}
                    </div>
                    {activeFilterCount > 0 && (
                      <button
                        type="button"
                        onClick={clearAllFilters}
                        className="text-xs text-burgundy hover:text-burgundy-light font-medium transition-colors"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  {filterPanelContent}
                </div>
              </div>
            </aside>

            {/* ---------------------------------------------------- */}
            {/*  Right Content Area                                     */}
            {/* ---------------------------------------------------- */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                {/* Left: filter toggle (mobile) + results count */}
                <div className="flex items-center gap-3">
                  {/* Mobile filter button */}
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-white text-sm font-medium text-navy hover:border-gold/40 transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gold text-white text-[10px] font-bold">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                  <p className="text-sm text-warm-gray">
                    Showing{" "}
                    <span className="font-semibold text-navy">
                      {filteredAndSortedLots.length}
                    </span>{" "}
                    {filteredAndSortedLots.length === 1 ? "lot" : "lots"}
                  </p>
                </div>

                {/* Right: sort + view toggle */}
                <div className="flex items-center gap-3">
                  {/* Sort dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-white text-sm font-medium text-navy hover:border-gold/40 transition-colors"
                    >
                      <span className="hidden sm:inline text-warm-gray text-xs mr-1">
                        Sort:
                      </span>
                      {SORT_OPTIONS.find((o) => o.value === sortOption)?.label}
                      <ChevronDown
                        className={`w-4 h-4 text-warm-gray transition-transform duration-200 ${
                          sortDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {sortDropdownOpen && (
                      <>
                        {/* Backdrop to close dropdown */}
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setSortDropdownOpen(false)}
                        />
                        <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-lg border border-border shadow-lg z-20 py-1">
                          {SORT_OPTIONS.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                setSortOption(option.value);
                                setSortDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                                sortOption === option.value
                                  ? "text-gold font-semibold bg-gold/5"
                                  : "text-charcoal hover:bg-ivory hover:text-navy"
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* View toggle */}
                  <div className="flex items-center rounded-lg border border-border bg-white overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setViewMode("grid")}
                      className={`p-2.5 transition-colors ${
                        viewMode === "grid"
                          ? "bg-gold text-white"
                          : "text-warm-gray hover:text-navy hover:bg-ivory"
                      }`}
                      aria-label="Grid view"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("list")}
                      className={`p-2.5 transition-colors ${
                        viewMode === "list"
                          ? "bg-gold text-white"
                          : "text-warm-gray hover:text-navy hover:bg-ivory"
                      }`}
                      aria-label="List view"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active filter pills */}
              {activeFilterPills.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {activeFilterPills.map((pill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/10 text-gold-dark text-xs font-medium border border-gold/20"
                    >
                      {pill.label}
                      <button
                        type="button"
                        onClick={pill.clear}
                        className="hover:text-burgundy transition-colors"
                        aria-label={`Remove filter: ${pill.label}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="text-xs text-burgundy hover:text-burgundy-light font-medium ml-1 transition-colors"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* Lot Grid / List */}
              {filteredAndSortedLots.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ivory-dark flex items-center justify-center">
                    <Search className="w-7 h-7 text-warm-gray" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-2">
                    No lots found
                  </h3>
                  <p className="text-warm-gray text-sm mb-6">
                    Try adjusting your filters to find what you&apos;re looking
                    for.
                  </p>
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="px-6 py-2.5 rounded-lg bg-gold hover:bg-gold-dark text-white text-sm font-semibold transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredAndSortedLots.map((lot) => (
                    <LotCard key={lot.id} lot={lot} view="grid" />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {filteredAndSortedLots.map((lot) => (
                    <LotCard key={lot.id} lot={lot} view="list" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ============================================================ */}
      {/*  Mobile Filter Slide-Over                                     */}
      {/* ============================================================ */}

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-navy-dark/60 backdrop-blur-sm transition-opacity duration-300 ${
          mobileFiltersOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileFiltersOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 left-0 z-[70] h-full w-80 max-w-[85vw] bg-white shadow-2xl shadow-black/20 flex flex-col transition-transform duration-300 ease-in-out ${
          mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Filters"
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gold" />
            <span className="font-[family-name:var(--font-heading)] text-lg font-semibold text-navy">
              Filters
            </span>
            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gold text-white text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-warm-gray transition-colors hover:bg-ivory hover:text-navy"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Panel content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {filterPanelContent}
        </div>

        {/* Panel footer */}
        <div className="border-t border-border px-5 py-4 space-y-2">
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="w-full py-2.5 rounded-lg border border-burgundy/30 text-burgundy text-sm font-medium hover:bg-burgundy/5 transition-colors"
            >
              Clear All Filters
            </button>
          )}
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(false)}
            className="w-full py-2.5 rounded-lg bg-gold hover:bg-gold-dark text-white text-sm font-semibold transition-colors"
          >
            Show {filteredAndSortedLots.length} Results
          </button>
        </div>
      </aside>
    </>
  );
}

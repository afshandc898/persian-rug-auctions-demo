"use client";

import Link from "next/link";
import { Heart, Gavel } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import type { Lot } from "@/data/lots";
import { useState } from "react";

interface LotCardProps {
  lot: Lot;
  view?: "grid" | "list";
}

export default function LotCard({ lot, view = "grid" }: LotCardProps) {
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  const savingsPercent = Math.round(((lot.rrp - lot.currentBid) / lot.rrp) * 100);

  if (view === "list") {
    return (
      <div className="lot-card bg-white rounded-xl border border-border hover:border-gold/40 hover:shadow-lg transition-all duration-300 overflow-hidden flex">
        <Link href={`/lot/${lot.id}`} className="w-64 h-48 flex-shrink-0 overflow-hidden relative">
          <img
            src={lot.image}
            alt={lot.title}
            className="lot-card-image w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-navy/80 text-white text-xs font-semibold px-2 py-1 rounded">
            Lot {lot.lotNumber}
          </div>
        </Link>
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <Link href={`/lot/${lot.id}`}>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl text-navy hover:text-gold transition-colors">
                    {lot.shortTitle}
                  </h3>
                </Link>
                <p className="text-warm-gray text-sm mt-1">{lot.origin} · {lot.size} · {lot.era}</p>
              </div>
              <button
                onClick={(e) => { e.preventDefault(); setIsWatchlisted(!isWatchlisted); }}
                className={`p-2 rounded-full transition-all ${isWatchlisted ? "text-burgundy bg-burgundy/10" : "text-warm-gray hover:text-burgundy hover:bg-burgundy/5"}`}
              >
                <Heart className="w-5 h-5" fill={isWatchlisted ? "currentColor" : "none"} />
              </button>
            </div>
            <p className="text-warm-gray text-sm line-clamp-2">{lot.description}</p>
          </div>
          <div className="flex items-end justify-between mt-4">
            <div>
              <p className="text-xs text-warm-gray uppercase tracking-wider mb-1">Current Bid</p>
              <p className="text-2xl font-[family-name:var(--font-heading)] font-bold text-navy">
                ${lot.currentBid.toLocaleString()}
              </p>
              <p className="text-xs text-success font-medium mt-0.5">{savingsPercent}% below RRP ${lot.rrp.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-warm-gray mb-1">{lot.numberOfBids} bids</p>
                <CountdownTimer endTime={lot.endTime} size="sm" />
              </div>
              <Link
                href={`/lot/${lot.id}`}
                className="bg-gold hover:bg-gold-dark text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
              >
                <Gavel className="w-4 h-4" />
                Bid Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lot-card group bg-white rounded-xl border border-border hover:border-gold/40 hover:shadow-xl transition-all duration-300 overflow-hidden">
      <Link href={`/lot/${lot.id}`} className="block relative overflow-hidden aspect-[4/3]">
        <img
          src={lot.image}
          alt={lot.title}
          className="lot-card-image w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-navy/85 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-md">
          Lot {lot.lotNumber}
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={(e) => { e.preventDefault(); setIsWatchlisted(!isWatchlisted); }}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isWatchlisted
                ? "bg-burgundy text-white"
                : "bg-white/80 text-warm-gray hover:text-burgundy hover:bg-white"
            }`}
          >
            <Heart className="w-4 h-4" fill={isWatchlisted ? "currentColor" : "none"} />
          </button>
        </div>
        {lot.numberOfBids >= 10 && (
          <div className="absolute bottom-3 left-3 bg-burgundy/90 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded-md uppercase tracking-wider">
            Hot Lot
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-success/90 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded-md">
          {savingsPercent}% below RRP
        </div>
      </Link>

      <div className="p-4">
        <div className="mb-3">
          <Link href={`/lot/${lot.id}`}>
            <h3 className="font-[family-name:var(--font-heading)] text-lg text-navy group-hover:text-gold transition-colors font-semibold leading-tight">
              {lot.shortTitle}
            </h3>
          </Link>
          <p className="text-warm-gray text-xs mt-1.5">{lot.origin} · {lot.size}</p>
        </div>

        <div className="flex items-center justify-between mb-3 pb-3 border-b border-border-light">
          <div>
            <p className="text-[10px] text-warm-gray uppercase tracking-wider font-medium">Current Bid</p>
            <p className="text-xl font-[family-name:var(--font-heading)] font-bold text-navy">
              ${lot.currentBid.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-warm-gray uppercase tracking-wider font-medium">Bids</p>
            <p className="text-lg font-[family-name:var(--font-heading)] font-semibold text-charcoal">
              {lot.numberOfBids}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <CountdownTimer endTime={lot.endTime} size="sm" showIcon={false} />
          <Link
            href={`/lot/${lot.id}`}
            className="bg-gold hover:bg-gold-dark text-white px-4 py-2 rounded-lg font-semibold text-xs transition-all hover:shadow-md flex items-center gap-1.5"
          >
            <Gavel className="w-3.5 h-3.5" />
            Bid
          </Link>
        </div>
      </div>
    </div>
  );
}

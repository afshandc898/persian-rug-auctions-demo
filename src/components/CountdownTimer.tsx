"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  endTime: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  variant?: "dark" | "light";
}

export default function CountdownTimer({ endTime, size = "md", showIcon = true, variant = "dark" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const end = new Date(endTime).getTime();
      const now = new Date().getTime();
      const difference = end - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setIsUrgent(difference < 1000 * 60 * 60 * 24); // Less than 24 hours

      return { days, hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const sizeClasses = {
    sm: { wrapper: "gap-1", box: "w-8 h-8 text-xs", label: "text-[9px]" },
    md: { wrapper: "gap-2", box: "w-12 h-12 text-lg", label: "text-[10px]" },
    lg: { wrapper: "gap-3", box: "w-16 h-16 text-2xl", label: "text-xs" },
  };

  const s = sizeClasses[size];
  const isLight = variant === "light";

  const boxColors = isUrgent
    ? "bg-danger/15 border border-danger/30"
    : isLight
      ? "bg-navy/10 border border-navy/20"
      : "bg-navy/20 border border-white/20";

  const textColor = isUrgent
    ? "text-danger"
    : isLight
      ? "text-navy"
      : "text-white";

  const labelColor = isUrgent
    ? "text-danger/60"
    : isLight
      ? "text-navy/50"
      : "text-white/80";

  const colonColor = isUrgent
    ? "text-danger/40"
    : isLight
      ? "text-navy/30"
      : "text-white/60";

  const boxHeightClass = size === "sm" ? "h-8" : size === "md" ? "h-12" : "h-16";

  return (
    <div className={`flex items-center ${s.wrapper}`}>
      {showIcon && (
        <Clock className={`${isUrgent ? "text-danger animate-pulse-gold" : "text-gold"} ${size === "sm" ? "w-3.5 h-3.5" : size === "md" ? "w-5 h-5" : "w-6 h-6"} mr-1`} />
      )}
      <div className={`flex items-center ${s.wrapper}`}>
        {[
          { value: timeLeft.days, label: "DAYS" },
          { value: timeLeft.hours, label: "HRS" },
          { value: timeLeft.minutes, label: "MIN" },
          { value: timeLeft.seconds, label: "SEC" },
        ].map((unit, i) => (
          <div key={unit.label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`${s.box} flex items-center justify-center rounded-md font-semibold font-heading ${textColor} ${boxColors}`}>
                {pad(unit.value)}
              </div>
              <span className={`${s.label} ${labelColor} mt-0.5 font-medium tracking-wider`}>{unit.label}</span>
            </div>
            {i < 3 && (
              <div className={`flex items-center justify-center ${boxHeightClass} mx-0.5`}>
                <span className={`${colonColor} font-bold ${size === "sm" ? "text-xs" : "text-lg"}`}>:</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
// Build timestamp: Tue Feb 10 00:59:45 AEDT 2026

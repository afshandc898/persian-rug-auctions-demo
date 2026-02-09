"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  endTime: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export default function CountdownTimer({ endTime, size = "md", showIcon = true }: CountdownTimerProps) {
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
              <div className={`${s.box} flex items-center justify-center rounded-md font-semibold font-[family-name:var(--font-heading)] text-white ${
                isUrgent
                  ? "bg-danger/20 border border-danger/40"
                  : "bg-navy/20 border border-white/20"
              }`}>
                {pad(unit.value)}
              </div>
              <span className={`${s.label} text-white/80 mt-0.5 font-medium tracking-wider`}>{unit.label}</span>
            </div>
            {i < 3 && (
              <span className={`mx-0.5 text-white/60 font-bold self-start mt-1.5 ${size === "sm" ? "text-xs" : "text-lg"}`}>:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

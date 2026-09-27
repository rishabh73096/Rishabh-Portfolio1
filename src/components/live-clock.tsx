"use client";

import { useEffect, useState } from "react";

interface LiveClockProps {
  className?: string;
  /** "12h" -> 01:58:12 PM · "24h" -> 13:58:37 */
  format?: "12h" | "24h";
  suffix?: string;
}

export function LiveClock({ className, format = "12h", suffix }: LiveClockProps) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: format === "12h",
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [format]);

  // Avoid a hydration mismatch: render nothing until the client tick fires.
  if (!time) return <span className={className}>&nbsp;</span>;

  return (
    <span className={className}>
      {time}
      {suffix ? ` ${suffix}` : ""}
    </span>
  );
}

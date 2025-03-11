/*
 * @Author: tommy 468369392@qq.com
 * @Date: 2025-02-28 09:58:03
 * @LastEditors: tommy 468369392@qq.com
 * @LastEditTime: 2025-03-11 15:11:07
 * @FilePath: \mySite\app\components\magicui\meteors.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
"use client";

import { cn } from "~/lib/utils";
import React, { useEffect, useState, useRef } from "react";

interface MeteorsProps {
  number?: number;
  minDelay?: number;
  maxDelay?: number;
  minDuration?: number;
  maxDuration?: number;
  angle?: number;
  className?: string;
  width?: number;
}

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 115,
  className,
  width,
}: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    [],
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getWidth = () => {
      if (width) return width;
      if (containerRef.current && containerRef.current.parentElement) {
        return containerRef.current.parentElement.clientWidth;
      }
      return window.innerWidth;
    };

    const containerWidth = getWidth();

    const styles = [...new Array(number)].map(() => ({
      "--angle": angle + "deg",
      top: -5,
      left: `calc(-10% + ${Math.floor(Math.random() * containerWidth)}px)`,
      animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
      animationDuration:
        Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) +
        "s",
    }));
    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle, width]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      {[...meteorStyles].map((style, idx) => (
        // Meteor Head
        <span
          key={idx}
          style={{ ...style }}
          className={cn(
            "pointer-events-none absolute size-0.5 rotate-[var(--angle)] animate-meteor rounded-full bg-zinc-500 shadow-[0_0_0_1px_#ffffff10]",
            className,
          )}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-zinc-500 to-transparent" />
        </span>
      ))}
    </div>
  );
};

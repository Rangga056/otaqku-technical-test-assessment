"use client";

import React, { useState, useRef } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { TrendingUp, BarChart3 } from "lucide-react";

const data = [
  { name: "Mon", value: 40 },
  { name: "Tue", value: 30 },
  { name: "Wed", value: 65 },
  { name: "Thu", value: 45 },
  { name: "Fri", value: 90 },
  { name: "Sat", value: 70 },
  { name: "Sun", value: 94 },
];

export function HeroCard() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        transition: "transform 0.1s ease-out",
      }}
      className="relative z-10 w-full max-w-md mx-auto lg:mx-0"
    >
      <div
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: rotate.x === 0 ? "transform 0.5s ease-out" : "none",
        }}
        className="stitch-card p-8 bg-white shadow-2xl rounded-2xl border border-[#DADCE0] backface-hidden"
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#5F6368] mb-1">
              Global Performance
            </p>
            <h2 className="text-4xl font-medium text-[#202124]">94.2%</h2>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#E8F0FE] flex items-center justify-center text-[#4285F4]">
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="h-40 w-full mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4285F4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4285F4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #DADCE0",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#4285F4"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-[#5F6368]">Algorithm Efficiency</span>
              <span className="text-[#202124]">23ms</span>
            </div>
            <div className="h-1.5 w-full bg-[#F8F9FA] rounded-full overflow-hidden">
              <div className="h-full bg-[#4285F4] w-[85%] transition-all duration-1000" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-[#5F6368]">Cognitive Load Index</span>
              <span className="text-[#202124]">Low</span>
            </div>
            <div className="h-1.5 w-full bg-[#F8F9FA] rounded-full overflow-hidden">
              <div className="h-full bg-[#34A853] w-[15%] transition-all duration-1000" />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#DADCE0] flex items-center gap-3 text-[#5F6368]">
          <BarChart3 size={18} />
          <span className="text-xs font-medium">
            Real-time analytical streaming active
          </span>
        </div>
      </div>

      {/* Decorative shadow that also tilts */}
      <div
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(-20px)`,
          transition: rotate.x === 0 ? "transform 0.5s ease-out" : "none",
        }}
        className="absolute inset-0 bg-black/5 blur-2xl rounded-2xl -z-10"
      />
    </div>
  );
}

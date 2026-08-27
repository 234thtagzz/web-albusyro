"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface FotoCard {
  id: number;
  title: string;
  location: string;
  image: string;
}

const cards: FotoCard[] = [
  {
    id: 1,
    title: "The Great Pyramid",
    location: "Giza, Egypt",
    image: "/images/poto_2.webp",
  },
  {
    id: 2,
    title: "Cappadocia",
    location: "Göreme, Turkey",
    image: "/images/poto_1.webp",
  },
  {
    id: 3,
    title: "Great Wall",
    location: "Beijing, China",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80&w=600",
  },
];

export default function FotoStack() {
  // Simpan kartu yang aktif diklik (default: kartu 2 di tengah)
  const [activeId, setActiveId] = useState<number>(2);

  // Fungsi untuk mendapatkan style persis seperti saat di-hover
  const getCardStyle = (id: number) => {
    const isActive = id === activeId;

    // Kartu Kiri (ID 1)
    if (id === 1) {
      return isActive
        ? "-translate-x-12 sm:-translate-x-20 md:-translate-x-24 translate-y-4 sm:translate-y-6 z-40 rotate-0 scale-105 sm:scale-110 shadow-2xl"
        : "-rotate-[10deg] sm:-rotate-[14deg] -translate-x-12 sm:-translate-x-20 md:-translate-x-24 translate-y-4 sm:translate-y-6 z-10 hover:z-41 hover:rotate-0 hover:scale-105 sm:hover:scale-110 hover:shadow-2xl";
    }

    // Kartu Tengah (ID 2)
    if (id === 2) {
      return isActive
        ? "translate-x-0 translate-y-0 z-40 rotate-0 scale-105 sm:scale-110 shadow-2xl"
        : "rotate-0 translate-x-0 translate-y-0 z-30 scale-100 sm:scale-105 shadow-2xl hover:z-41 hover:scale-110";
    }

    // Kartu Kanan (ID 3)
    if (id === 3) {
      return isActive
        ? "translate-x-12 sm:translate-x-20 md:translate-x-24 translate-y-4 sm:translate-y-6 z-40 rotate-0 scale-105 sm:scale-110 shadow-2xl"
        : "rotate-[10deg] sm:rotate-[14deg] translate-x-12 sm:translate-x-20 md:translate-x-24 translate-y-4 sm:translate-y-6 z-10 hover:z-41 hover:rotate-0 hover:scale-105 sm:hover:scale-110 hover:shadow-2xl";
    }

    return "";
  };

  return (
    <div className="w-full flex items-center justify-center p-2 sm:p-4 relative">
      <div className="relative flex items-center justify-center w-full h-[400px] sm:h-[460px]">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => setActiveId(card.id)}
            className={`absolute transition-all duration-500 ease-out cursor-pointer select-none ${getCardStyle(
              card.id
            )}`}
          >
            {/* Card Frame */}
            <div className="w-[230px] sm:w-[270px] bg-white rounded-[24px] sm:rounded-[28px] p-2.5 sm:p-3 shadow-xl border border-slate-100/80 flex flex-col relative">

            {/* Image Box - Diubah menjadi Rasio Potret (3:4) */}
            <div className="relative aspect-[3/4] w-full rounded-[18px] sm:rounded-[22px] overflow-hidden">
                <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="270px"
                className="object-cover"
                />

            </div>

            {/* Title & Location */}
            <div className="px-1 pt-2.5 pb-1.5 flex items-baseline justify-between">
                <h3 className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                {card.title}
                </h3>
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">
                {card.location}
                </span>
            </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
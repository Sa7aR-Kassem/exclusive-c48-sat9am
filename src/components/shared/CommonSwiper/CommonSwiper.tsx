"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import { SwiperOptions } from "swiper/types";

interface Slide {
  label: string;
  src: string;
}

interface CommonSwiperProps {
  slides: Slide[];
  swiperOptions?: SwiperOptions;
  variant: "main" | "categories";
}

export default function CommonSwiper({
  slides,
  swiperOptions,
  variant,
}: CommonSwiperProps) {
  return (
    <section>
      <Swiper
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !size-4 border-2",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-red-500",
        }}
        modules={[Pagination]}
        {...swiperOptions}
        className={` commonSwiper ${variant === "categories" ? "categoriesSwiper" : ""} `}>
        {slides.map((slide) => (
          <SwiperSlide key={slide.label}>
            <Image
              src={slide.src}
              alt={slide.label}
              width={1920}
              height={200}
              className="max-w-full object-cover h-96"
            />

            {variant === "categories" && (
              <h3 className="text-lg">{slide.label}</h3>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

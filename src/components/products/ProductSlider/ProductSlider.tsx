"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import type { Swiper as SwiperOptions } from "swiper";
import "swiper/css";

interface ProductSliderProps {
  images: string[];
  title: string;
}

export default function ProductSlider({ images, title }: ProductSliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperOptions | null>(null);

  return (
    <main>
      {/* Main Swiper -> pass thumbs swiper instance */}
      <Swiper
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        slidesPerView={1}
        className="mb-6">
        {images.map((image) => (
          <SwiperSlide key={image}>
            <div className="flex max-h-96 justify-center items-center bg-gray-100">
              <Image
                className="max-w-full h-full object-contain mx-auto"
                src={image}
                alt={`${title}-${image}`}
                width={1440}
                height={600}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbs Swiper -> store swiper instance */}
      {/* It is also required to set watchSlidesProgress prop */}
      <Swiper
        modules={[Thumbs]}
        watchSlidesProgress
        onSwiper={setThumbsSwiper}
        slidesPerView={3}
        spaceBetween={10}>
        {images.map((image) => (
          <SwiperSlide key={image}>
            <div className="flex min-h-8 justify-center items-center bg-gray-100">
              <Image
                className="max-w-full h-full object-contain mx-auto"
                src={image}
                alt={`${title}-${image}`}
                width={144}
                height={160}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}

"use client";
import React from "react";

import slide1 from "@/assets/images/slider-image-1.webp";
import slide2 from "@/assets/images/slider-image-2.webp";
import slide3 from "@/assets/images/slider-image-3.webp";
import CommonSwiper from "@/components/shared/CommonSwiper/CommonSwiper";

const slides = [
  {
    label: "Slide 1",
    src: slide1.src,
  },
  {
    label: "Slide 2",
    src: slide2.src,
  },
  {
    label: "Slide 3",
    src: slide3.src,
  },
];

export default function MainSlider() {
  return (
    <section>
      <CommonSwiper slides={slides} variant="main" />
    </section>
  );
}

import CommonSwiper from "@/components/shared/CommonSwiper/CommonSwiper";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import { Category } from "@/interfaces/category.interface";
import { getCategories } from "@/services/categories.service";
import { CategoriesResponse } from "@/types/response.type";
import Image from "next/image";
import React from "react";

const swiperOptions = {
  slidesPerView: 1,
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
    1536: {
      slidesPerView: 5,
    },
  },
};

export default async function Categories() {
  const categories: CategoriesResponse = await getCategories();
  // console.log("categories response", categories);

  const slides = categories.data.map((category: Category) => {
    return { label: category.name, src: category.image };
  });

  return (
    <div className="py-12">
      <SectionTitle title="Categories" subtitle="Browse By Category" />
      <CommonSwiper
        slides={slides}
        swiperOptions={swiperOptions}
        variant="categories"
      />
    </div>
  );
}

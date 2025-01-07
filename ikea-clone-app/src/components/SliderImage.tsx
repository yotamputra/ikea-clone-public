"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

type Banner = {
  banner: string[];
};

export function SliderImage({ banner }: Banner) {
  return (
    <Carousel
      plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
      className="relative w-full max-w-6xl mx-auto overflow-hidden"
    >
      <CarouselContent>
        {banner.map((image, idx) => (
          <CarouselItem key={idx}>
            <img
              src={image}
              alt={`Slide ${idx + 1}`}
              className="w-full h-70 object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

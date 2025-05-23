"use client";
import React, {
  useState,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export interface BackgroundCarouselRef {
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
}

interface BackgroundCarouselProps {
  images: string[];
}

const BackgroundCarousel = forwardRef<
  BackgroundCarouselRef,
  BackgroundCarouselProps
>(({ images }, ref) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: true },
    [Autoplay()]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  // Expose methods via ref
  useImperativeHandle(
    ref,
    () => ({
      scrollPrev,
      scrollNext,
      scrollTo,
    }),
    [scrollPrev, scrollNext, scrollTo]
  );

  // Track the selected index
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect(); // Initialize

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* The carousel container */}
      <div className="embla w-full h-full" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className="embla__slide flex-[0_0_100%] h-full relative"
            >
              <Image
                src={image}
                alt={`Background slide ${index + 1}`}
                fill
                sizes="100vw"
                quality={90}
                fetchPriority="high"
                className="object-cover transition-opacity duration-500"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#000000b3] to-[#0000004a] pointer-events-none" />

      {/* Slide indicators - Higher z-index */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`size-2 rounded-full transition-colors cursor-pointer ${
              selectedIndex === index
                ? "bg-yellow"
                : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
});

BackgroundCarousel.displayName = "BackgroundCarousel";

export default BackgroundCarousel;

/* eslint-disable @next/next/no-img-element */
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Bed,
  MoveDiagonal,
  Bath,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export interface Property {
  id: number;
  price: string;
  title: string;
  location: string;
  sqft: string;
  baths: string;
  beds: string;
  images: string[];
}

export interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [emblaNodeRef, emblaInstance] = useEmblaCarousel({ loop: true });

  React.useEffect(() => {
    if (!emblaInstance) return;
    const onSelect = () => setSelectedIndex(emblaInstance.selectedScrollSnap());
    emblaInstance.on("select", onSelect);
    onSelect();
    return () => {
      emblaInstance.off("select", onSelect);
    };
  }, [emblaInstance]);

  const scrollPrev = React.useCallback(() => {
    if (emblaInstance) emblaInstance.scrollPrev();
  }, [emblaInstance]);

  const scrollNext = React.useCallback(() => {
    if (emblaInstance) emblaInstance.scrollNext();
  }, [emblaInstance]);

  return (
    <Card className="border-none shadow-none flex w-full flex-col items-start gap-2 sm:gap-4 shrink-0 [background:#FFF] rounded-xl sm:rounded-2xl overflow-hidden">
      <div className="relative w-full h-64 overflow-hidden rounded-lg">
        <div className="absolute inset-0 z-10 flex items-center justify-between px-2 pointer-events-none">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/80 hover:bg-white/90 size-7 flex items-center justify-center pointer-events-auto"
            onClick={scrollPrev}
            tabIndex={-1}
            style={{ zIndex: 20 }}
          >
            <ChevronLeft className="w-4 h-4 text-black" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/80 hover:bg-white/90 size-7 flex items-center justify-center pointer-events-auto"
            onClick={scrollNext}
            tabIndex={-1}
            style={{ zIndex: 20 }}
          >
            <ChevronRight className="w-4 h-4 text-black" />
          </Button>
        </div>
        <div className="h-full w-full" ref={emblaNodeRef}>
          <div className="flex h-full">
            {property.images.map((img, idx) => (
              <div
                className="flex-[0_0_100%] h-full relative"
                key={img + idx}
                style={{ minWidth: "100%" }}
              >
                <div className="absolute bg-gradient-to-r from-[#00000041] via-[#00000000] to-[#00000041] z-10 inset-0 " />
                <Image
                  src={img}
                  alt={property.title}
                  className="object-cover"
                  fill
                  priority={idx === selectedIndex}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Indicators */}
        <div className="absolute left-1/2 bottom-2 -translate-x-1/2 flex gap-1 z-20">
          {property.images.map((_, i) => (
            <div
              key={i}
              className={`size-1 rounded-full transition-colors duration-200 ${
                selectedIndex === i
                  ? "bg-amber-500"
                  : "bg-white border border-gray-300"
              }`}
              onClick={() => emblaInstance && emblaInstance.scrollTo(i)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
      </div>
      <CardContent className="px-0 w-full space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start  gap-4 self-stretch">
          <div className="flex flex-col items-start gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1">
              <img
                src="/assets/currency.svg"
                alt="Currency"
                className="w-3 h-3 sm:w-4 sm:h-4"
              />
              <p className="text-sm select-none sm:text-base font-medium leading-5 text-black">
                {property.price}
              </p>
            </div>
            <p className="text-lg select-none sm:text-xl font-semibold leading-5 text-black">
              {property.title}
            </p>
            <p className="text-xs  sm:text-sm text-[rgba(0,0,0,0.70)] font-medium leading-5">
              {property.location}
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded-full select-none text-sm w-full sm:w-auto !py-5 md:!py-2 hover:bg-yellow/20  transition-all duration-300  "
          >
            See Details
          </Button>
        </div>
      </CardContent>
      <Separator className="w-full bg-yellow/20" />
      <CardFooter className="flex flex-wrap !pl-0 !pt-0 items-start gap-8 sm:gap-6 self-stretch p-2 sm:p-4">
        <div className="flex items-center gap-2">
          <MoveDiagonal className="w-3 h-3 sm:w-4 sm:h-4" />
          <p className="text-sm font-medium leading-5">{property.sqft}</p>
        </div>
        <div className="flex items-center gap-2">
          <Bath className="w-3 h-3 sm:w-4 sm:h-4" />
          <p className="text-sm font-medium leading-5">{property.baths}</p>
        </div>
        <div className="flex items-center gap-2">
          <Bed className="w-3 h-3 sm:w-4 sm:h-4" />
          <p className="text-sm font-medium leading-5">{property.beds}</p>
        </div>
      </CardFooter>
    </Card>
  );
}

/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  X,
} from "lucide-react";
import { Instrument_Serif } from "next/font/google";
import Image from "next/image";
import React, { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Separator } from "@/components/ui/separator";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});

interface Project {
  id: number;
  name: string;
  price: string;
  location: string;
  bedrooms: string;
  space: string;
  image: string;
  availableTypes: Array<
    | "Studio"
    | "1 Bedroom"
    | "2 Bedroom"
    | "3 Bedroom"
    | "4 Bedroom"
    | "5 Bedroom"
  >;
  plans: {
    [key: string]: string;
  };
}

const projects: Project[] = [
  {
    id: 1,
    name: "Skyrise",
    price: "15,000,000",
    location: "Business Bay - Dubai",
    bedrooms: "0-3 Bedrooms",
    space: "465-1,991 sqft",
    image: "/assets/off-plan-1.webp",
    availableTypes: ["Studio", "1 Bedroom", "2 Bedroom", "3 Bedroom"],
    plans: {
      Studio: "/assets/plan/skyrise-studio.webp",
      "1 Bedroom": "/assets/plan/skyrise-1br.webp",
      "2 Bedroom": "/assets/plan/skyrise-2br.webp",
      "3 Bedroom": "/assets/plan/skyrise-3br.webp",
    },
  },
  {
    id: 2,
    name: "Cavalli Coustire",
    price: "16,500,000",
    location: "Al Safa - Dubai",
    bedrooms: "3-4 Bedrooms",
    space: "3,940-26,457 sqft",
    image: "/assets/off-plan-2.webp",
    availableTypes: ["3 Bedroom", "4 Bedroom", "5 Bedroom"],
    plans: {
      "3 Bedroom": "/assets/plan/cavalli-3br.webp",
      "4 Bedroom": "/assets/plan/cavalli-4br.webp",
      "5 Bedroom": "/assets/plan/cavalli-5br.webp",
    },
  },
  {
    id: 3,
    name: "Binghatti Aquarise",
    price: "19,000,000",
    location: "Business Bay - Dubai",
    bedrooms: "2-5 Bedrooms",
    space: "2.170,47,111 sqft",
    image: "/assets/off-plan-3.webp",
    availableTypes: ["2 Bedroom", "3 Bedroom"],
    plans: {
      "2 Bedroom": "/assets/plan/binghatti-2br.webp",
      "3 Bedroom": "/assets/plan/binghatti-3br.webp",
    },
  },
];

function OffPlan() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<{
    roomType: string;
    planImage: string;
    projectName: string;
  } | null>(null);
  const planViewerRef = useRef<HTMLDivElement>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectedPlan &&
        planViewerRef.current &&
        !planViewerRef.current.contains(event.target as Node)
      ) {
        setSelectedPlan(null);
      }
    };

    if (selectedPlan) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedPlan]);

  const handleBadgeClick = (roomType: string, project: Project) => {
    const planImage = project.plans[roomType];
    if (planImage) {
      setSelectedPlan({
        roomType,
        planImage,
        projectName: project.name,
      });
    }
  };

  const closePlan = () => {
    setSelectedPlan(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
        <h2
          className={`${instrumentSerif.className} text-left text-4xl sm:text-5xl md:text-6xl`}
        >
          Invest in Tomorrow, <span className="italic text-yellow">Today</span>
        </h2>
      </div>
      <div className="w-full mx-auto">
        <div className="relative overflow-hidden   rounded-lg">
          {/* Plan Viewer - Top Right Corner */}
          {selectedPlan && (
            <div
              ref={planViewerRef}
              className="absolute left-2 right-2 top-2 md:left-auto md:top-6 md:right-6 ring-2 ring-gray-100 z-30 bg-white rounded-lg shadow-lg overflow-hidden md:w-2/3"
            >
              <div className="flex justify-between items-center p-3 bg-gray-50 border-b">
                <div className="text-sm font-medium text-gray-900">
                  {selectedPlan.projectName} - {selectedPlan.roomType}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closePlan}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-3">
                <Image
                  src={selectedPlan.planImage}
                  alt={`${selectedPlan.projectName} ${selectedPlan.roomType} floor plan`}
                  width={1500}
                  height={843}
                  className="w-full h-auto rounded"
                />
              </div>
            </div>
          )}

          {/* Navigation Arrows - Bottom Right Corner */}
          <div className="flex gap-4 absolute bottom-6 right-6 z-20">
            <Button
              variant="outline"
              size="icon"
              className="size-6 md:size-11 p-4 bg-white rounded-[38px] flex justify-center items-center gap-2 overflow-hidden"
              onClick={scrollPrev}
            >
              <ChevronLeft className="h-4 w-4 text-black" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-6 md:size-11 p-4 bg-white rounded-[38px] flex justify-center items-center gap-2 overflow-hidden"
              onClick={scrollNext}
            >
              <ChevronRight className="h-4 w-4 text-black" />
            </Button>
          </div>
          <div className="embla h-[709px]" ref={emblaRef}>
            <div className="embla__container flex h-full">
              {projects.map((project, idx) => (
                <div
                  className="embla__slide flex-[0_0_100%] h-full flex flex-col justify-end items-stretch gap-2 p-3 bg-black/5 relative overflow-hidden"
                  key={project.id}
                >
                  {/* Background Image */}
                  <Image
                    src={project.image}
                    alt={`${project.name} building view`}
                    fill
                    className="object-cover -z-10"
                    priority={idx === selectedIndex}
                  />
                  <div className="bg-gradient-to-t -z-10 from-[#000000]/50 via-[#000000]/0 to-transparent absolute inset-0"></div>
                  {/* Slide Content */}
                  <div className="flex flex-col justify-start items-start gap-4 w-full">
                    {/* Badges */}
                    <div className="flex flex-row flex-wrap gap-2 h-7">
                      {project.availableTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => handleBadgeClick(type, project)}
                          className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-yellow/50 ring-inset hover:bg-gray-100 hover:ring-yellow transition-colors cursor-pointer"
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    {/* Info Card and Arrows */}
                    <div className="w-full flex flex-row justify-between items-end">
                      {/* Info Card */}
                      <div className="p-4 bg-white rounded-[10px] flex flex-col justify-center items-start gap-2 overflow-hidden">
                        <div className="flex flex-col justify-start items-start gap-8">
                          <div className="flex flex-col justify-start items-start gap-6">
                            <div
                              className={`h-12  text-black text-3xl md:text-5xl font-normal leading-tight ${instrumentSerif.className}`}
                            >
                              {project.name}
                            </div>
                            <div className="flex flex-col justify-start items-start gap-3">
                              <div className="inline-flex justify-start items-center gap-2">
                                <div className="text-black text-base md:text-xl font-medium leading-tight">
                                  Starting from:
                                </div>
                                <div className="flex justify-start items-center gap-1">
                                  <span className="text-black flex gap-1  items-baseline text-base md:text-xl font-medium leading-tight">
                                    <img
                                      src="assets/currency.svg"
                                      alt="currency"
                                    />{" "}
                                    {project.price}
                                  </span>
                                </div>
                              </div>
                              <div className="inline-flex max-w-md justify-start items-center gap-2">
                                <MapPin className="h-4 w-4 text-black/80" />
                                <div className="text-black/80 text-sm md:text-base font-normal leading-tight">
                                  {project.location}
                                </div>
                              </div>
                              <div className="flex justify-start h-4 items-center gap-2 w-full flex-wrap">
                                <div className="flex justify-start items-center gap-2">
                                  <span className="text-black/70 text-sm md:text-base font-normal leading-tight">
                                    {project.bedrooms}
                                  </span>
                                </div>
                                <Separator orientation="vertical" />
                                <div className="flex justify-start items-center gap-2">
                                  <span className="text-black/70 text-sm md:text-base font-normal leading-tight">
                                    {project.space}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col justify-center items-start gap-2 w-full">
                            <Button
                              className="px-6 py-3 bg-slate-950 rounded-[42px] text-white text-base font-medium flex items-center gap-2"
                              size="lg"
                            >
                              <span>Make It Yours</span>
                              <ArrowUpRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Slide Indicators - Fixed Bottom Center */}
          <div className="absolute left-1/2 bottom-1 md:bottom-4 -translate-x-1/2 flex gap-1 z-20">
            {projects.map((_, i) => (
              <div
                key={i}
                className={`size-1 md:size-2 rounded-full ${
                  selectedIndex === i ? "bg-amber-500" : "bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OffPlan;

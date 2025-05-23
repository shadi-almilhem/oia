"use client";
import React, { useState, useRef } from "react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Star } from "lucide-react";

import { Instrument_Serif } from "next/font/google";
import FormSearch from "@/components/ui/form-search";
import BackgroundCarousel, {
  BackgroundCarouselRef,
} from "./BackgroundCarousel";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("for-sale");
  const carouselRef = useRef<BackgroundCarouselRef>(null);

  const backgroundImages = [
    "/assets/hero-1.webp",
    "/assets/hero-2.webp",
    "/assets/hero-3.webp",
  ];

  return (
    <div className="min-h-screen pt-8 relative">
      {/* Carousel Background */}
      <BackgroundCarousel ref={carouselRef} images={backgroundImages} />

      {/* Navigation Buttons - Highest z-index */}
      <button
        className="absolute left-4 hidden md:flex md:top-1/2 -translate-y-1/2 z-[200] bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors cursor-pointer"
        onClick={() => carouselRef.current?.scrollPrev()}
        aria-label="Previous slide"
        type="button"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        className="absolute right-4 hidden md:flex md:top-1/2 -translate-y-1/2 z-[200] bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors cursor-pointer"
        onClick={() => carouselRef.current?.scrollNext()}
        aria-label="Next slide"
        type="button"
      >
        <ChevronRight size={20} />
      </button>

      {/* Hero Section */}
      <div className="relative z-40 px-4 lg:px-8 pt-32 flex justify-center items-center flex-col gap-8">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          {/* Hero Text */}
          <div className="text-left max-w-4xl mb-12">
            <h1
              className={`text-4xl text-pretty ${instrumentSerif.className} md:text-5xl lg:text-6xl text-white leading-tight mb-6`}
            >
              Find your comfortable home
              <br />
              in <span className="text-yellow ">seconds not months.</span>
            </h1>
          </div>
          <div></div>

          {/* Search Card */}
          {/* Social Proof Component */}
          <div className="flex items-center gap-4 mb-2">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < 4
                          ? "fill-yellow text-yellow"
                          : i === 4
                          ? "fill-yellow/60 text-yellow"
                          : "fill-gray-300 text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-white">4.6</span>
              </div>
              <p className="text-xs text-gray-200">
                Rated Best Over{" "}
                <span className="font-semibold text-yellow-400">200</span>{" "}
                Reviews
              </p>
            </div>
          </div>

          <CardTitle className="md:text-2xl text-xl mb-1 font-normal text-white">
            Let&apos;s Find Your Home
          </CardTitle>
          <Card className="w-full shadow-2xl border-0 ">
            <CardContent className="space-y-6">
              {/* Tabs */}
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-fit !rounded-full grid-cols-2 bg-gray-100">
                  <TabsTrigger
                    value="for-sale"
                    className="data-[state=active]:bg-black data-[state=active]:text-white !rounded-full"
                  >
                    For Sale
                  </TabsTrigger>
                  <TabsTrigger
                    value="for-rent"
                    className="data-[state=active]:bg-black data-[state=active]:text-white !rounded-full"
                  >
                    For Rent
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="for-sale" className="mt-6">
                  <FormSearch
                    popularSearches={[
                      "House in Abu Dhabi",
                      "Villa in Saadiyat Island",
                      "Studio in Dubai",
                      "4 Bedroom House",
                    ]}
                  />
                </TabsContent>

                <TabsContent value="for-rent" className="mt-6">
                  <FormSearch
                    popularSearches={[
                      "Villa in Dubai",
                      "Studio in Abu Dhabi",
                      "4 Bedroom House in Dubai",
                      "3 Bedroom House in Abu Dhabi",
                    ]}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        <div className=" py-8 max-w-7xl w-full">
          <div className="px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="justify-self-start flex flex-col items-start border-l-2 border-yellow pl-4">
                <div className="text-4xl lg:text-5xl font-bold text-yellow mb-2">
                  300+
                </div>
                <div className="text-white  text-xl uppercase">
                  Happy Clients
                </div>
              </div>
              <div className="justify-self-start flex flex-col items-start border-l-2 border-yellow pl-4">
                <div className="text-4xl lg:text-5xl font-bold text-yellow mb-2">
                  63+
                </div>
                <div className="text-white text-xl uppercase">Projects</div>
              </div>
              <div className="justify-self-start flex flex-col items-start border-l-2 border-yellow pl-4">
                <div className="text-4xl lg:text-5xl font-bold text-yellow mb-2">
                  478+
                </div>
                <div className="text-white text-xl uppercase">Properties</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

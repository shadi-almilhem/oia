/* eslint-disable @next/next/no-img-element */
"use client";
import { Instrument_Serif } from "next/font/google";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PropertyCard } from "./PropertyCard";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});

interface Property {
  id: number;
  price: string;
  title: string;
  location: string;
  sqft: string;
  baths: string;
  beds: string;
  images: string[];
}

const propertyListings: Property[] = [
  {
    id: 1,
    price: "15,000,000",
    title: "Spacious 5BR Villa",
    location: "Harmony 3 Harmony, Tilal Al Ghaf, Dubai",
    sqft: "6216 sqft",
    baths: "6 Bathrooms",
    beds: "5 Beds",
    images: [
      "/assets/card-1.webp",
      "/assets/card-2.webp",
      "/assets/card-3.webp",
    ],
  },
  {
    id: 2,
    price: "12,500,000",
    title: "Luxurious 4BR Apartment",
    location: "Skyline Towers, Downtown Dubai",
    sqft: "3200 sqft",
    baths: "4 Bathrooms",
    beds: "4 Beds",
    images: [
      "/assets/card-2.webp",
      "/assets/card-3.webp",
      "/assets/card-4.webp",
    ],
  },
  {
    id: 3,
    price: "8,000,000",
    title: "Charming 3BR Townhouse",
    location: "Gardens Villa, Dubai South",
    sqft: "2500 sqft",
    baths: "3 Bathrooms",
    beds: "3 Beds",
    images: [
      "/assets/card-3.webp",
      "/assets/card-1.webp",
      "/assets/card-4.webp",
    ],
  },
  {
    id: 4,
    price: "50,000",
    title: "Spacious Studio",
    location: "Northside Towers",
    sqft: "2500 sqft",
    baths: "1 Bathroom",
    beds: "1 Bed",
    images: [
      "/assets/card-4.webp",
      "/assets/card-2.webp",
      "/assets/card-1.webp",
    ],
  },
];

// Function to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function NewListing() {
  const [forSaleApi, setForSaleApi] = React.useState<CarouselApi>();
  const [forRentApi, setForRentApi] = React.useState<CarouselApi>();
  const [activeTab, setActiveTab] = React.useState("for-sale");

  // Create shuffled version for rent listings
  const [shuffledRentListings] = React.useState(() =>
    shuffleArray(propertyListings)
  );

  const scrollPrev = React.useCallback(() => {
    if (activeTab === "for-sale") {
      forSaleApi?.scrollPrev();
    } else {
      forRentApi?.scrollPrev();
    }
  }, [activeTab, forSaleApi, forRentApi]);

  const scrollNext = React.useCallback(() => {
    if (activeTab === "for-sale") {
      forSaleApi?.scrollNext();
    } else {
      forRentApi?.scrollNext();
    }
  }, [activeTab, forSaleApi, forRentApi]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
        <h2
          className={`${instrumentSerif.className} text-left text-4xl sm:text-5xl md:text-6xl`}
        >
          Just for You: Our Newest Listings
        </h2>
        <div className=" hidden md:flex gap-2 w-full sm:w-auto">
          <div className="flex w-full sm:w-auto justify-end">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-yellow mr-2 hover:bg-orange-400 h-8 w-8 sm:h-10 sm:w-10"
              onClick={scrollPrev}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-yellow hover:bg-orange-400 h-8 w-8 sm:h-10 sm:w-10"
              onClick={scrollNext}
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs
        defaultValue="for-sale"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-4"
      >
        <TabsList className="grid w-full sm:w-fit !rounded-full grid-cols-2 bg-gray-100">
          <TabsTrigger
            value="for-sale"
            className="text-sm sm:text-base data-[state=active]:bg-black data-[state=active]:text-white !rounded-full"
          >
            For Sale
          </TabsTrigger>
          <TabsTrigger
            value="for-rent"
            className="text-sm sm:text-base data-[state=active]:bg-black data-[state=active]:text-white !rounded-full"
          >
            For Rent
          </TabsTrigger>
        </TabsList>
        <TabsContent value="for-sale">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            setApi={setForSaleApi}
          >
            <CarouselContent className="-ml-2 sm:-ml-4">
              {propertyListings.map((property) => (
                <CarouselItem
                  key={property.id}
                  className="pl-2 sm:pl-5 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <PropertyCard property={property} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </TabsContent>
        <TabsContent value="for-rent">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            setApi={setForRentApi}
          >
            <CarouselContent className="-ml-2 sm:-ml-4">
              {shuffledRentListings.map((property) => (
                <CarouselItem
                  key={`rent-${property.id}`}
                  className="pl-2 sm:pl-5 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <PropertyCard
                    property={{
                      ...property,
                      title: `${property.title}`,
                    }}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center sm:justify-end mt-4 sm:mt-6">
        <Button
          variant="outline"
          className="w-full sm:w-auto rounded-full font-medium text-sm sm:text-base !px-4 sm:!px-6 !py-6 sm:!py-5 bg-black text-white hover:bg-black/80 hover:text-white"
        >
          All Properties
          <ArrowUpRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}

export default NewListing;

/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { Button } from "./button";
import { Badge } from "./badge";
import { Check, ChevronsUpDown, Filter, Search } from "lucide-react";
import { Label } from "./label";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "./sheet";

const propertyTypes = [
  { value: "any", label: "Any" },
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "townhouse", label: "Townhouse" },
  { value: "penthouse", label: "Penthouse" },
  { value: "duplex", label: "Duplex" },
  { value: "sky villa", label: "Sky Villa" },
  { value: "mansion", label: "Mansion" },
  { value: "full floor", label: "Full Floor" },
  { value: "villa compound", label: "Villa Compound" },
  { value: "hotel apartment", label: "Hotel Apartment" },
  { value: "land", label: "Land" },
  { value: "building", label: "Building" },
  { value: "office", label: "Office" },
  { value: "shop", label: "Shop" },
  { value: "warehouse", label: "Warehouse" },
  { value: "labour camp", label: "Labour Camp" },
  { value: "commercial villa", label: "Commercial Villa" },
  { value: "bulk unit", label: "Bulk Unit" },
  { value: "floor", label: "Floor" },
  { value: "factory", label: "Factory" },
  { value: "industrial land", label: "Industrial Land" },
  { value: "mixed used land", label: "Mixed Used Land" },
  { value: "showroom", label: "Showroom" },
  { value: "other commercial", label: "Other Commercial" },
];

function FormSearch({ popularSearches }: { popularSearches: string[] }) {
  const [openPropertyType, setOpenPropertyType] = useState(false);
  const [propertyType, setPropertyType] = useState("");
  const [sizeRangeText, setSizeRangeText] = useState("Any");
  const [priceRangeText, setPriceRangeText] = useState("Any");
  const [minSize, setMinSize] = useState("");
  const [maxSize, setMaxSize] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [openSizeRange, setOpenSizeRange] = useState(false);
  const [openPriceRange, setOpenPriceRange] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);

  const formatPrice = (price: string) => {
    if (!price) return "";
    const num = Number.parseInt(price);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return price;
  };

  const handleDone = () => {
    if (!minPrice && !maxPrice) {
      setPriceRangeText("Any");
      return;
    }

    const formattedMin = minPrice ? formatPrice(minPrice) : "0";
    const formattedMax = maxPrice ? formatPrice(maxPrice) : "Any";

    setPriceRangeText(`AED ${formattedMin} - ${formattedMax}`);
    setOpenPriceRange(false);
  };

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    setPriceRangeText("Any");
  };

  const handleSizeDone = () => {
    if (!minSize && !maxSize) {
      setSizeRangeText("Any");
      return;
    }

    const min = minSize || "0";
    const max = maxSize || "Any";

    setSizeRangeText(`${min} - ${max} sq.ft`);
    setOpenSizeRange(false);
  };

  const handleSizeReset = () => {
    setMinSize("");
    setMaxSize("");
    setSizeRangeText("Any");
  };

  const FilterControls = () => (
    <>
      {/* Property Type */}
      <div className="space-y-2 w-full px-4">
        <Label className="text-sm font-medium text-gray-700">
          Property Type
        </Label>
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger className="!h-10 w-full">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            {propertyTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bedrooms */}
      <div className="space-y-2 w-full px-4">
        <Label className="text-sm font-medium text-gray-700">Bedrooms</Label>
        <Select>
          <SelectTrigger className="!h-10 w-full">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Property size */}
      <div className="space-y-2 w-full px-4">
        <Label className="text-sm font-medium text-gray-700">
          Property Size
        </Label>
        <div className="space-y-3 border rounded-lg p-3">
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <Label className="text-xs font-medium text-gray-500 mb-1 block">
                Minimum
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0"
                  step="100"
                  className="h-8 pl-8"
                  value={minSize}
                  onChange={(e) => setMinSize(e.target.value)}
                />
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                  ft²
                </div>
              </div>
            </div>
            <div className="w-full">
              <Label className="text-xs font-medium text-gray-500 mb-1 block">
                Maximum
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="No limit"
                  step="100"
                  className="h-8 pl-8"
                  value={maxSize}
                  onChange={(e) => setMaxSize(e.target.value)}
                />
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                  ft²
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between flex-col md:flex-row pt-3 border-t gap-4 border-gray-100">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8 w-full"
              onClick={handleSizeReset}
            >
              Reset
            </Button>
            <Button
              size="sm"
              className="bg-yellow hover:bg-yellow-600 text-white text-xs w-full"
              onClick={handleSizeDone}
            >
              Done
            </Button>
          </div>
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2 w-full px-4">
        <Label className="text-sm font-medium text-gray-700">Price Range</Label>
        <div className="space-y-3 border rounded-lg p-3">
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <Label className="text-xs font-medium text-gray-500 mb-1 block">
                Minimum
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0"
                  step="1000"
                  className="h-8 pl-8"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <div className="absolute left-2 top-1/2 -translate-y-1/2">
                  <img
                    src="/assets/currency.svg"
                    alt="AED"
                    className="w-4 h-4"
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <Label className="text-xs font-medium text-gray-500 mb-1 block">
                Maximum
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="No limit"
                  step="1000"
                  className="h-8 pl-8"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                <div className="absolute left-2 top-1/2 -translate-y-1/2">
                  <img
                    src="/assets/currency.svg"
                    alt="AED"
                    className="w-4 h-4"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between flex-col md:flex-row pt-3 border-t gap-4 border-gray-100">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8 w-full"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              size="sm"
              className="bg-yellow hover:bg-yellow-600 text-white text-xs w-full"
              onClick={handleDone}
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="flex flex-col space-y-4">
        {/* Desktop and Tablet View */}
        <div className="hidden sm:flex flex-wrap gap-4">
          {/* Search Input */}
          <div className="w-full lg:w-auto  lg:flex-1 space-y-2">
            <Label
              htmlFor="search-input"
              className="text-sm font-medium text-gray-700"
            >
              I&apos;m searching for
            </Label>
            <div className="relative">
              <Input
                id="search-input"
                type="text"
                placeholder="House, Villa, City, Area or Project"
                className="pr-10 h-10"
              />
              <Search
                className="absolute right-3 top-3 text-gray-400"
                size={16}
              />
            </div>
          </div>

          {/* Property Type */}
          <div className="w-full sm:w-1/2  md:w-1/3 lg:w-1/5 space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Property Type
            </Label>
            <Popover open={openPropertyType} onOpenChange={setOpenPropertyType}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openPropertyType}
                  className="w-full justify-between h-10 font-normal"
                >
                  {propertyType
                    ? propertyTypes.find((type) => type.value === propertyType)
                        ?.label
                    : "Any"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] p-0">
                <Command>
                  <CommandInput placeholder="Search property type..." />
                  <CommandEmpty>No property type found.</CommandEmpty>
                  <CommandList className="max-h-48">
                    <CommandGroup>
                      {propertyTypes.map((type) => (
                        <CommandItem
                          key={type.value}
                          value={type.value}
                          onSelect={(currentValue) => {
                            setPropertyType(
                              currentValue === propertyType ? "" : currentValue
                            );
                            setOpenPropertyType(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              propertyType === type.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {type.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Bedrooms */}
          <div className="w-full sm:w-1/2 max-w-32 md:w-1/3 lg:w-1/5 space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Bedrooms
            </Label>
            <Select>
              <SelectTrigger className="!h-10 w-full">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Property size */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Property Size
            </Label>
            <Select open={openSizeRange} onOpenChange={setOpenSizeRange}>
              <SelectTrigger className="!h-10 w-full">
                <SelectValue placeholder={sizeRangeText} />
              </SelectTrigger>
              <SelectContent className="!w-fit p-3">
                <div className="flex justify-between gap-4 mb-4">
                  <div className="w-36">
                    <Label className="text-xs font-medium text-gray-500 mb-1 block">
                      Minimum
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0"
                        step="100"
                        className="h-8 pl-8"
                        value={minSize}
                        onChange={(e) => setMinSize(e.target.value)}
                      />
                      <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                        ft²
                      </div>
                    </div>
                  </div>
                  <div className="w-36">
                    <Label className="text-xs font-medium text-gray-500 mb-1 block">
                      Maximum
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="No limit"
                        step="100"
                        className="h-8 pl-8"
                        value={maxSize}
                        onChange={(e) => setMaxSize(e.target.value)}
                      />
                      <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                        ft²
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between pt-3 border-t gap-4 border-gray-100">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 w-36"
                    onClick={handleSizeReset}
                  >
                    Reset
                  </Button>
                  <Button
                    size="sm"
                    className="bg-yellow hover:bg-yellow-600 text-white text-xs w-36"
                    onClick={handleSizeDone}
                  >
                    Done
                  </Button>
                </div>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Price Range
            </Label>
            <Select open={openPriceRange} onOpenChange={setOpenPriceRange}>
              <SelectTrigger className="!h-10 w-full">
                <SelectValue placeholder={priceRangeText} />
              </SelectTrigger>
              <SelectContent className="!w-fit p-3">
                <div className="flex justify-between gap-4 mb-4">
                  <div className="w-36">
                    <Label className="text-xs font-medium text-gray-500 mb-1 block">
                      Minimum
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0"
                        step="1000"
                        className="h-8 pl-8"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                      <div className="absolute left-2 top-1/2 -translate-y-1/2">
                        <img
                          src="/assets/currency.svg"
                          alt="AED"
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-36">
                    <Label className="text-xs font-medium text-gray-500 mb-1 block">
                      Maximum
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="No limit"
                        step="1000"
                        className="h-8 pl-8"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                      <div className="absolute left-2 top-1/2 -translate-y-1/2">
                        <img
                          src="/assets/currency.svg"
                          alt="AED"
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between pt-3 border-t gap-4 border-gray-100">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 w-36"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                  <Button
                    size="sm"
                    className="bg-yellow hover:bg-yellow-600 text-white text-xs w-36"
                    onClick={handleDone}
                  >
                    Done
                  </Button>
                </div>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mobile View */}
        <div className="flex sm:hidden gap-2">
          <div className="flex-1 space-y-2">
            <Label
              htmlFor="mobile-search-input"
              className="text-sm font-medium text-gray-700"
            >
              I&apos;m searching for
            </Label>
            <div className="relative">
              <Input
                id="mobile-search-input"
                type="text"
                placeholder="House, Villa, City, Area or Project"
                className="pr-10 h-10"
              />
              <Search
                className="absolute right-3 top-3 text-gray-400"
                size={16}
              />
            </div>
          </div>

          <Sheet open={openSheet} onOpenChange={setOpenSheet}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="self-end h-10 px-3"
                aria-label="More filters"
              >
                <Filter size={16} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="h-fit overflow-y-auto justify-end "
            >
              <SheetHeader className="mb-0">
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Refine your property search</SheetDescription>
              </SheetHeader>

              <div className="grid gap-2">
                <FilterControls />
              </div>

              <SheetFooter className="mt-0">
                <SheetClose asChild>
                  <div className="flex gap-2">
                    <Button
                      variant={"outline"}
                      className="w-2/5 text-black rounded-full px-10 py-2 h-auto font-medium"
                    >
                      Close Filters
                    </Button>
                    <Button className="w-3/5 bg-black rounded-full hover:bg-black/80 text-white px-10 py-4 h-auto font-medium">
                      <Search className="mr-2" size={16} />
                      Apply Filters
                    </Button>
                  </div>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex  sm:flex-row flex-col-reverse  justify-between gap-4">
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">
            Popular Search:
          </Label>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search) => (
              <Badge
                key={search}
                variant="secondary"
                className="inline-flex items-center rounded-full cursor-pointer hover:bg-gray-100 select-none bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset "
              >
                {search}
              </Badge>
            ))}
          </div>
        </div>
        <Button
          className="w-full sm:w-fit self-end bg-black rounded-full hover:bg-black/80 text-white !px-10 py-3 h-auto font-medium"
          size="lg"
        >
          <Search className="mr-2" size={16} />
          Search Fast
        </Button>
      </div>
    </div>
  );
}

export default FormSearch;

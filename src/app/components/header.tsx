/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      // More aggressive hiding - hide with smaller threshold and any downward scroll
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        // Scrolling down - hide after 300px
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up - show header
        setShowHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed pt-8 top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ willChange: "transform" }}
    >
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-500 lg:px-8 rounded-full ${
          scrolled
            ? "md:bg-slate-50/80 backdrop-blur-sm md:shadow-lg  "
            : "bg-transparent"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-300  py-2 bg-black/30  rounded-lg backdrop-blur-md md:backdrop-blur-none md:bg-transparent `}
        >
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-20 rounded-full flex items-center justify-center">
              <Link href="/">
                {scrolled ? (
                  <img
                    src="/assets/logo/oia_logo_black.svg"
                    alt="Oia Properties"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src="/assets/logo/oia_logo.svg"
                    alt="Oia Properties"
                    className="w-full h-full object-contain"
                  />
                )}
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 text-base">
              <li>
                <a
                  className={` ${
                    scrolled ? "text-black" : "text-white"
                  } font-medium transition hover:text-yellow `}
                  href="#"
                >
                  Buy
                </a>
              </li>
              <li>
                <a
                  className={` ${
                    scrolled ? "text-black" : "text-white"
                  } transition hover:text-yellow font-medium`}
                  href="#"
                >
                  Rent
                </a>
              </li>
              <li>
                <a
                  className={` ${
                    scrolled ? "text-black" : "text-white"
                  } transition hover:text-yellow font-medium`}
                  href="#"
                >
                  Sell
                </a>
              </li>
              <li>
                <a
                  className={` ${
                    scrolled ? "text-black" : "text-white"
                  } transition hover:text-yellow font-medium`}
                  href="#"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  className={` ${
                    scrolled ? "text-black" : "text-white"
                  } transition hover:text-yellow font-medium`}
                  href="#"
                >
                  Developers
                </a>
              </li>
              <li>
                <a
                  className={`rounded-full bg-yellow hover:bg-orange-400 px-6 text-md py-3  font-semibold text-white  transition-all duration-300 ${
                    scrolled ? "text-black" : "text-white"
                  }`}
                  href="#"
                >
                  Get Free Consultation
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggleMenu}
              className="block md:hidden rounded-sm bg-white bg-opacity-10 backdrop-blur-sm p-2 text-white transition hover:bg-opacity-20"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-black" />
              ) : (
                <Menu className="h-6 w-6 text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
          } bg-black/95 backdrop-blur-md rounded-lg`}
        >
          <nav className="px-4 py-4">
            <ul className="flex flex-col space-y-4">
              <li>
                <a
                  className="block text-white hover:text-orange-400 transition-colors py-2 font-medium"
                  href="#"
                >
                  Buy
                </a>
              </li>
              <li>
                <a
                  className="block text-white hover:text-orange-400 transition-colors py-2 font-medium"
                  href="#"
                >
                  Rent
                </a>
              </li>
              <li>
                <a
                  className="block text-white hover:text-orange-400 transition-colors py-2 font-medium"
                  href="#"
                >
                  Sell
                </a>
              </li>
              <li>
                <a
                  className="block text-white hover:text-orange-400 transition-colors py-2 font-medium"
                  href="#"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  className="block text-white hover:text-orange-400 transition-colors py-2 font-medium"
                  href="#"
                >
                  Developers
                </a>
              </li>
            </ul>

            {/* Mobile CTA Button */}
            <div className="mt-6 pt-4 border-t border-white border-opacity-20">
              <a
                className="block w-full text-center rounded-full bg-yellow hover:bg-orange-400 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300"
                href="#"
              >
                Get Free Consultation
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

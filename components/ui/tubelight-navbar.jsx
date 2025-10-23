"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavBar({ items, className }) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [subDropdownTimeout, setSubDropdownTimeout] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
      if (subDropdownTimeout) {
        clearTimeout(subDropdownTimeout);
      }
    };
  }, [dropdownTimeout, subDropdownTimeout]);

  return (
    <div
      className={cn("flex justify-between items-center relative", className)}
    >
      {/* <Link href="/" className="flex items-center gap-2">
        <img
          src="/assets/common.png"
          alt="Al-Rasheed Academy Logo"
          className="w-10 h-10"
        />
        <span className="text-yellow-500 font-bold text-lg">
          Al-Rasheed Academy
        </span>
      </Link> */}
      <div className="flex items-center gap-3 bg-black/20 border border-yellow-400 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon;
          const hasDropdown = item.dropdown && item.dropdown.length > 0;

          if (hasDropdown) {
            return (
              <div key={item.name} className="relative">
                <div
                  onMouseEnter={() => {
                    if (dropdownTimeout) {
                      clearTimeout(dropdownTimeout);
                      setDropdownTimeout(null);
                    }
                    setActiveDropdown(item.name);
                  }}
                  onMouseLeave={() => {
                    const timeout = setTimeout(
                      () => setActiveDropdown(null),
                      300
                    );
                    setDropdownTimeout(timeout);
                  }}
                  className="relative cursor-pointer text-lg font-black px-6 py-2 rounded-full transition-colors font-serif flex items-center gap-1 text-yellow-500 hover:text-yellow-400 slide-top"
                >
                  <span className="hidden md:inline">{item.name}</span>
                  {hasDropdown && (
                    <ChevronDown className="hidden md:inline w-4 h-4" />
                  )}
                  <span className="md:hidden">
                    <Icon size={18} strokeWidth={2.5} />
                  </span>
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                </div>
                {activeDropdown === item.name && (
                  <div
                    className="absolute top-full left-0 mt-2 w-48 bg-black/90 border border-yellow-400 rounded-lg shadow-lg z-[10000]"
                    onMouseEnter={() => {
                      if (dropdownTimeout) {
                        clearTimeout(dropdownTimeout);
                        setDropdownTimeout(null);
                      }
                    }}
                    onMouseLeave={() => {
                      const timeout = setTimeout(
                        () => setActiveDropdown(null),
                        300
                      );
                      setDropdownTimeout(timeout);
                    }}
                  >
                    {item.dropdown.map((dropdownItem) => {
                      if (dropdownItem.dropdown) {
                        return (
                          <div key={dropdownItem.name} className="relative">
                            <Link
                              href={dropdownItem.url}
                              className="block px-4 py-2 text-sm text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors font-serif"
                              onClick={(e) => {
                                // If this item has a sub-dropdown, prevent navigation and let hover handle it
                                if (
                                  dropdownItem.dropdown &&
                                  dropdownItem.dropdown.length > 0
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              onMouseEnter={() => {
                                if (subDropdownTimeout) {
                                  clearTimeout(subDropdownTimeout);
                                  setSubDropdownTimeout(null);
                                }
                                setActiveSubDropdown(dropdownItem.name);
                              }}
                              onMouseLeave={() => {
                                // Don't close immediately - let the sub-dropdown handle it
                              }}
                            >
                              {dropdownItem.name}
                            </Link>
                            {activeSubDropdown === dropdownItem.name && (
                              <div
                                className="absolute left-full top-0 mt-0 w-48 bg-black/90 border border-yellow-400 rounded-lg shadow-lg z-[11000]"
                                onMouseEnter={() => {
                                  if (subDropdownTimeout) {
                                    clearTimeout(subDropdownTimeout);
                                    setSubDropdownTimeout(null);
                                  }
                                }}
                                onMouseLeave={() => {
                                  setActiveSubDropdown(null);
                                }}
                              >
                                {dropdownItem.dropdown.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.url}
                                    className="block px-4 py-2 text-sm text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors font-serif"
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      } else {
                        return (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.url}
                            className="block px-4 py-2 text-sm text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors font-serif"
                          >
                            {dropdownItem.name}
                          </Link>
                        );
                      }
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.url}
              className={cn(
                "relative cursor-pointer text-lg font-black px-6 py-2 rounded-full transition-colors font-serif group slide-top",
                "text-yellow-500 hover:text-yellow-400",
                item.name === "Home"
                  ? "delay-200"
                  : item.name === "Gallery"
                  ? "delay-1000"
                  : ""
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

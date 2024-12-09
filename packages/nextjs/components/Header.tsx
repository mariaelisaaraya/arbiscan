"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { RainbowKitCustomConnectButton, FaucetButton } from "~~/components/scaffold-eth"; // Asegúrate de que existan
import { useOutsideClick } from "~~/hooks/scaffold-eth"; // Verifica esta dependencia

// Definimos los links del menú
type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  { label: "Pricing", href: "/pricing" },
  { label: "QuickScan", href: "/quickscan" },
  { label: "Audit Reports", href: "/audit-reports" },
  { label: "Detectors", href: "/detectors" },
  { label: "Resources", href: "/resources" },
  { label: "Contact Us", href: "/contact" },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              className={`${
                isActive ? "bg-secondary shadow-md" : ""
              } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site Header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), [])
  );

  return (
    <header className="sticky top-0 z-50 bg-base-100 shadow-md px-4 py-2">
      <div className="flex justify-between items-center container mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-10 h-10">
            <Image
              alt="ArbiScan Logo"
              src="/logo.svg"
              fill
              className="rounded"
            />
          </div>
          <span className="font-bold text-lg">ArbiScan</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-6">
          <ul className="flex space-x-4">
            <HeaderMenuLinks />
          </ul>
        </nav>

        {/* Mobile Menu */}
        <div className="lg:hidden" ref={burgerMenuRef}>
          <button
            className="btn btn-ghost"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          {isDrawerOpen && (
            <ul className="absolute right-0 top-12 bg-white shadow-md rounded-lg w-48 p-4">
              <HeaderMenuLinks />
            </ul>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <RainbowKitCustomConnectButton />
          <FaucetButton />
        </div>
      </div>
    </header>
  );
};

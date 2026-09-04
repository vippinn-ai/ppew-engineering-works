"use client";

import { useEffect, useState } from "react";

import { asset } from "@/lib/asset";

const nav = [
  { href: "#catalogue", label: "Catalogue" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#facility", label: "Facility" },
  { href: "#enquiry", label: "Contact" },
];

export default function Header({ rfqCount }: { rfqCount: number }) {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-navy text-titanium">
      <div
        className={`mx-auto flex max-w-[1320px] items-center gap-4 px-5 transition-[height] duration-300 md:px-8 ${
          condensed ? "h-16" : "h-20"
        }`}
      >
        {/* The monogram artwork carries the brand navy as its own background,
            so it sits on the navy bar without a visible plate. */}
        <a href="#top" className="flex items-center gap-3">
          <img
            src={asset("/img/monogram.png")}
            alt=""
            width={445}
            height={207}
            className={`w-auto transition-[height] duration-300 ${
              condensed ? "h-9" : "h-11"
            }`}
          />
          {/* Below md the monogram carries the brand on its own; the wordmark
              would otherwise wrap into the quote button on a 390px screen. */}
          <span className="sr-only">PP Engineering Works</span>
          <span className="hidden leading-none md:block">
            <span className="wordmark block whitespace-nowrap text-[16px] text-white lg:text-[17px]">
              PP Engineering Works
            </span>
            <span className="mt-1 hidden text-[11px] tracking-[0.06em] text-titanium/55 lg:block">
              Partnering for defence excellence
            </span>
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-[14px] text-titanium/80 transition-colors hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href="#enquiry"
          className="ml-auto flex shrink-0 items-center gap-2 bg-cyan px-3 py-2.5 text-[13.5px] font-medium whitespace-nowrap text-white transition-colors hover:bg-[#0089c6] sm:px-4 lg:ml-0"
        >
          <span className="sm:hidden">Quote</span>
          <span className="hidden sm:inline">Request quote</span>
          {rfqCount > 0 && (
            <span className="mono grid h-5 min-w-5 place-items-center bg-white px-1 text-[11px] font-medium text-navy">
              {rfqCount}
            </span>
          )}
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
          className="grid h-9 w-9 place-items-center lg:hidden"
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 block h-[1.5px] w-5 bg-titanium transition-transform ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-[1.5px] w-5 bg-titanium transition-transform ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 lg:hidden">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/8 px-5 py-3.5 text-[15px] text-titanium/85"
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

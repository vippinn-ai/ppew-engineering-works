"use client";

import Planform from "./Planform";
import { platforms, countFor, type PlatformId } from "@/lib/catalog";

export default function Hero({
  selected,
  onSelect,
}: {
  selected: PlatformId | "all";
  onSelect: (p: PlatformId | "all") => void;
}) {
  return (
    <section id="top" className="sheet bg-navy text-titanium">
      <div className="mx-auto max-w-[1320px] px-5 pt-14 pb-0 md:px-8 md:pt-20">
        <div className="grid gap-y-7 md:grid-cols-12 md:items-end md:gap-x-12">
        <h1 className="d1 lift text-white md:col-span-7">
          Built to your part number.
        </h1>
        <p className="lede lift text-titanium/75 md:col-span-5 md:pb-2 [animation-delay:90ms]">
          Airframe hardware, transparencies, restraint systems and ground
          support equipment for the transport and rotary fleets in Indian
          service. Manufactured in Phase II, Chandigarh, a few minutes from
          3 Base Repair Depot.
        </p>
        </div>

        <p className="lift mt-12 text-[13px] text-titanium/45 [animation-delay:180ms]">
          Choose an airframe to filter the catalogue
        </p>

        <div className="lift mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 [animation-delay:240ms]">
          {[...platforms].map((p) => {
            const active = selected === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelect(active ? "all" : p.id)}
                aria-pressed={active}
                className={`group relative border-t pt-5 pb-7 pr-4 text-left transition-colors ${
                  active
                    ? "border-t-cyan"
                    : "border-t-white/12 hover:border-t-white/35"
                }`}
              >
                <Planform
                  id={p.id}
                  active={active}
                  className={`h-28 w-28 transition-colors duration-200 md:h-36 md:w-36 ${
                    active
                      ? "text-cyan"
                      : "text-titanium/38 group-hover:text-titanium/65"
                  }`}
                />
                <span
                  className={`d3 mt-3 block ${
                    active ? "text-white" : "text-titanium/85"
                  }`}
                >
                  {p.name}
                </span>
                <span className="mt-1 block text-[12.5px] text-titanium/45">
                  {p.role}
                </span>
                <span className="mono mt-2 block text-[12px] text-cyan/85">
                  {countFor(p.id)} items
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

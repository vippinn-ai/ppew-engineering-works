"use client";

import { asset } from "@/lib/asset";

/* Photographs of the actual premises, ordered the way a visitor meets them:
   the street, the entrance, reception, then the shop floor.

   These are here as evidence rather than decoration. A procurement officer
   assessing an unknown vendor wants to see that the address is a real works
   with real machines in it, so the captions say what is in frame and stop
   there — no capability is claimed here that the catalogue does not already
   support. */
const photos = [
  {
    file: "building-exterior",
    label: "Plot 707A, Phase II",
    caption:
      "The works from the road, Phase II Industrial Area, Chandigarh.",
    alt: "Two-storey works building with PP Engineering Works signage above the first floor, seen from the street.",
    /* The signboard sits high in the frame and would be cropped away by a
       centred fill, so this one is anchored to the top. */
    position: "object-top",
  },
  {
    file: "entrance",
    label: "Works entrance",
    caption:
      "Board reads indigenous manufacturer of aerospace and defence aircraft components. Entry to the shop is controlled.",
    alt: "Glass entrance doors below a blue signboard, with notices reading Defence Parts Manufacturing Unit and No Unauthorized Entry Allowed.",
    position: "object-center",
  },
  {
    file: "reception",
    label: "Reception",
    caption:
      "Mi-17 and AN-32 among the airframes on the wall — two of the four the catalogue covers.",
    alt: "Reception corridor with mounted photographs of military aircraft along both walls.",
    position: "object-center",
  },
  {
    file: "vmc-front",
    label: "Machining centre",
    caption: "Jyoti vertical machining centre, powered and in service.",
    alt: "Front of a Jyoti vertical machining centre with its control pendant and illuminated status beacon.",
    position: "object-center",
  },
  {
    file: "machining-bay",
    label: "Machining bay",
    caption:
      "The same machine from the side, with a second CNC control beyond the shutter.",
    alt: "Side view of the machining centre in the workshop bay, with another CNC control panel visible further down the shop.",
    position: "object-center",
  },
  {
    file: "coolant-chip-conveyor",
    label: "Coolant and swarf",
    caption:
      "Coolant tank, pumps and chip conveyor behind the machine. Swarf in the tray is the part of a shop that cannot be staged.",
    alt: "Coolant tank with three pump motors and a chip conveyor tray filled with metal swarf behind a machine tool.",
    position: "object-center",
  },
];

export function Works() {
  return (
    <section id="works" className="bg-navy text-titanium">
      <div className="mx-auto max-w-[1320px] px-5 py-20 md:px-8 md:py-28">
        <h2 className="d2 max-w-[20ch] text-white">
          The works, from the road in.
        </h2>
        <p className="lede mt-4 text-titanium/70">
          Photographs of the premises, not of a stock factory. The sequence runs
          the way a visitor meets it — the frontage on Phase II, the entrance,
          reception, then the machines the catalogue is cut on.
        </p>

        {/* Cells sit on a hairline field so the 1px gaps read as rules, the
            same way the catalogue does. On navy the rule is white at low
            opacity rather than the light --color-rule. */}
        <div className="mt-14 grid grid-cols-1 gap-px border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p) => (
            <figure key={p.file} className="bg-navy">
              <div className="aspect-4/5 overflow-hidden bg-navy-deep">
                <img
                  src={asset(`/facility/${p.file}.webp`)}
                  alt={p.alt}
                  loading="lazy"
                  width={900}
                  height={1125}
                  className={`h-full w-full object-cover ${p.position}`}
                />
              </div>
              <figcaption className="border-t border-white/12 px-5 py-4">
                <p className="mono text-[12.5px] text-cyan/85">{p.label}</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-titanium/65">
                  {p.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

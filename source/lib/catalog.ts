export type PlatformId = "an32" | "il76" | "mi17" | "ch47" | "multi";

export const platforms: {
  id: PlatformId;
  name: string;
  role: string;
}[] = [
  { id: "an32", name: "AN-32", role: "Tactical transport" },
  { id: "il76", name: "IL-76", role: "Heavy lift transport" },
  { id: "mi17", name: "Mi-8 / Mi-17", role: "Medium lift helicopter" },
  { id: "ch47", name: "CH-47 Chinook", role: "Tandem rotor helicopter" },
  { id: "multi", name: "Multi-platform", role: "Ground equipment & tooling" },
];

export const categories = [
  "Structures & brackets",
  "Transparencies",
  "Restraint systems",
  "Ground support equipment",
  "Cargo & lashing",
  "Hydraulics & fittings",
  "Cabin & VIP interiors",
  "Electrical",
  "Tooling & dies",
  "Protective covers",
] as const;

export type Category = (typeof categories)[number];

export interface Item {
  id: string;
  name: string;
  refs?: string[];
  platforms: PlatformId[];
  category: Category;
  img: string;
}

export const items: Item[] = [
  // ---------- AN-32 ----------
  {
    id: "shock-strut",
    name: "Hydraulic accumulator shock strut (TIV)",
    platforms: ["an32"],
    category: "Hydraulics & fittings",
    img: "shock-strut",
  },
  {
    id: "slat-bracket",
    name: "Slat supporting bracket",
    refs: ["BDB-438"],
    platforms: ["an32"],
    category: "Structures & brackets",
    img: "slat-bracket",
  },
  {
    id: "cowling-brackets",
    name: "Bracket for engine panel cowling",
    platforms: ["an32"],
    category: "Structures & brackets",
    img: "cowling-brackets",
  },
  {
    id: "elt-switch",
    name: "Remote control emergency switch",
    platforms: ["an32"],
    category: "Electrical",
    img: "elt-switch",
  },
  {
    id: "door-glass-an32",
    name: "Glass panel, entrance door",
    platforms: ["an32"],
    category: "Transparencies",
    img: "door-glass-an32",
  },
  {
    id: "eyebrow-window",
    name: "Eyebrow window glass, repair & refurbishment",
    platforms: ["an32"],
    category: "Transparencies",
    img: "eyebrow-window",
  },
  {
    id: "heated-windshield",
    name: "Heated windshield",
    platforms: ["an32"],
    category: "Transparencies",
    img: "heated-windshield",
  },
  {
    id: "cargo-glass",
    name: "Glass panel, cabin cargo area",
    platforms: ["an32"],
    category: "Transparencies",
    img: "cargo-glass",
  },
  {
    id: "gear-spring",
    name: "Landing gear spring",
    platforms: ["an32"],
    category: "Structures & brackets",
    img: "gear-spring",
  },
  {
    id: "wheel-separator",
    name: "Wheel bid separator",
    platforms: ["an32"],
    category: "Ground support equipment",
    img: "wheel-separator",
  },
  {
    id: "main-jack",
    name: "Main jack, repair & overhaul",
    platforms: ["an32"],
    category: "Ground support equipment",
    img: "main-jack",
  },
  {
    id: "drum-curtain",
    name: "Drum blind curtain",
    platforms: ["an32"],
    category: "Cabin & VIP interiors",
    img: "drum-curtain",
  },
  {
    id: "troop-belt",
    name: "Troop seat belt",
    refs: ["GIG 293571 (LH)", "GIG 293559 (RH)"],
    platforms: ["an32"],
    category: "Restraint systems",
    img: "troop-belt",
  },
  {
    id: "shoulder-belt",
    name: "Navigator shoulder belt",
    platforms: ["an32"],
    category: "Restraint systems",
    img: "shoulder-belt",
  },
  {
    id: "navigator-belt",
    name: "Navigator seat tight belt",
    refs: ["STA/267502100"],
    platforms: ["an32"],
    category: "Restraint systems",
    img: "navigator-belt",
  },
  {
    id: "seat-clamp",
    name: "Passenger seat belt clamp",
    refs: ["STA 32-02-9600-054-000"],
    platforms: ["an32"],
    category: "Restraint systems",
    img: "seat-clamp",
  },
  {
    id: "bolt-with-bar",
    name: "Bolt with bar",
    refs: ["STA/32-02-9600-370-000"],
    platforms: ["an32"],
    category: "Structures & brackets",
    img: "bolt-with-bar",
  },
  {
    id: "t-union",
    name: "T-union",
    platforms: ["an32"],
    category: "Hydraulics & fittings",
    img: "t-union",
  },

  // ---------- IL-76 ----------
  {
    id: "thrust-bracket",
    name: "Thrust mounting bracket",
    platforms: ["il76"],
    category: "Structures & brackets",
    img: "thrust-bracket",
  },
  {
    id: "ramp-lever",
    name: "Lever stowed position LH/RH, ramp extension",
    refs: ["GIG 418732", "GIG 564853", "GIG 854938"],
    platforms: ["il76"],
    category: "Structures & brackets",
    img: "ramp-lever",
  },
  {
    id: "bolt-fixture",
    name: "Bolt tightening fixture",
    platforms: ["il76"],
    category: "Tooling & dies",
    img: "bolt-fixture",
  },
  {
    id: "pax-belt-il76",
    name: "Passenger safety belt",
    refs: ["IL 76/78/1-7601-9401-400-000"],
    platforms: ["il76"],
    category: "Restraint systems",
    img: "pax-belt-il76",
  },
  {
    id: "control-trolley",
    name: "Control trolley for jacks",
    platforms: ["il76"],
    category: "Ground support equipment",
    img: "control-trolley",
  },
  {
    id: "tiedown-net",
    name: "Tie down net",
    refs: ["GIG 33433 (AN-32)", "IL-7601-9606-320-300 (IL-76)"],
    platforms: ["an32", "il76"],
    category: "Cargo & lashing",
    img: "tiedown-net",
  },

  // ---------- Mi-8 / Mi-17 ----------
  {
    id: "nvg-helmet",
    name: "NVG helmet repair kit",
    platforms: ["mi17"],
    category: "Ground support equipment",
    img: "nvg-helmet",
  },
  {
    id: "mooring-net",
    name: "Cargo mooring net",
    platforms: ["mi17"],
    category: "Cargo & lashing",
    img: "mooring-net",
  },
  {
    id: "mooring-hook",
    name: "Hook, cargo mooring net",
    refs: ["V-7904-20-1"],
    platforms: ["mi17"],
    category: "Cargo & lashing",
    img: "mooring-hook",
  },
  {
    id: "tie-down",
    name: "Tie down unit",
    refs: ["8AT-0360-1 (Mi-8)", "8AT-0360-2 (Mi-17)"],
    platforms: ["mi17"],
    category: "Cargo & lashing",
    img: "tie-down",
  },
  {
    id: "three-step-ladder",
    name: "Three step ladder",
    platforms: ["mi17"],
    category: "Ground support equipment",
    img: "three-step-ladder",
  },
  {
    id: "ladder-hooks",
    name: "Hooks for three step ladder",
    platforms: ["mi17"],
    category: "Ground support equipment",
    img: "ladder-hooks",
  },
  {
    id: "tail-ladder",
    name: "Tail boom ladder, 4 steps",
    platforms: ["mi17"],
    category: "Ground support equipment",
    img: "tail-ladder",
  },
  {
    id: "gearbox-trolley",
    name: "Main gearbox trolley",
    refs: ["GIG 798520-8AT-9906-00"],
    platforms: ["mi17"],
    category: "Ground support equipment",
    img: "gearbox-trolley",
  },
  {
    id: "rotor-trolley",
    name: "Main rotor blade trolley",
    refs: ["GIG 784315-8AT-9801-00"],
    platforms: ["mi17"],
    category: "Ground support equipment",
    img: "rotor-trolley",
  },
  {
    id: "tv3-trolley",
    name: "TV3 engine transportation trolley",
    refs: ["GIG 784345-8AT-9802-22"],
    platforms: ["mi17"],
    category: "Ground support equipment",
    img: "tv3-trolley",
  },
  {
    id: "troop-belt-mi17",
    name: "Troop seat belt",
    refs: [
      "8AT-9420-180-01A / -02A",
      "8AT-9420-160-01A / -02A",
      "8AT-9420-140-01A / -02A",
    ],
    platforms: ["mi17"],
    category: "Restraint systems",
    img: "troop-belt-mi17",
  },
  {
    id: "pilot-belt-mi",
    name: "Pilot seat belt",
    platforms: ["mi17"],
    category: "Restraint systems",
    img: "pilot-belt-mi",
  },
  {
    id: "flt-eng-belt",
    name: "Flight engineer safety belt",
    platforms: ["mi17"],
    category: "Restraint systems",
    img: "flt-eng-belt",
  },
  {
    id: "load-hammock",
    name: "Load hammock",
    platforms: ["mi17"],
    category: "Cargo & lashing",
    img: "load-hammock",
  },
  {
    id: "hub-cover",
    name: "Main rotor hub & stabiliser cover",
    platforms: ["mi17"],
    category: "Protective covers",
    img: "hub-cover",
  },
  {
    id: "seat-cushion",
    name: "Pilot seat cushion & back rest",
    platforms: ["mi17"],
    category: "Protective covers",
    img: "seat-cushion",
  },
  {
    id: "crew-door",
    name: "Crew cabin entrance door",
    platforms: ["mi17"],
    category: "Structures & brackets",
    img: "crew-door",
  },

  // ---------- Chinook ----------
  {
    id: "safety-harness",
    name: "Safety harness",
    platforms: ["ch47"],
    category: "Restraint systems",
    img: "safety-harness",
  },
  {
    id: "pilot-harness",
    name: "Pilot / co-pilot seat harness",
    platforms: ["ch47"],
    category: "Restraint systems",
    img: "pilot-harness",
  },
  {
    id: "load-pallet",
    name: "Dropping load pallet",
    platforms: ["ch47"],
    category: "Cargo & lashing",
    img: "load-pallet",
  },

  // ---------- Multi-platform ----------
  {
    id: "pax-seat-single",
    name: "Front facing single passenger seat",
    platforms: ["multi"],
    category: "Cabin & VIP interiors",
    img: "pax-seat-single",
  },
  {
    id: "pax-seat-twin",
    name: "Front facing twin passenger seat",
    platforms: ["multi"],
    category: "Cabin & VIP interiors",
    img: "pax-seat-twin",
  },
  {
    id: "fitting-twin",
    name: "Attachment fitting, twin seat",
    platforms: ["multi"],
    category: "Cabin & VIP interiors",
    img: "fitting-twin",
  },
  {
    id: "fitting-single",
    name: "Attachment fitting, single seat",
    platforms: ["multi"],
    category: "Cabin & VIP interiors",
    img: "fitting-single",
  },
  {
    id: "throttle-cable",
    name: "Throttle cable",
    platforms: ["multi"],
    category: "Hydraulics & fittings",
    img: "throttle-cable",
  },
  {
    id: "jack-pg70",
    name: "Hydraulic jack PG-70",
    platforms: ["multi"],
    category: "Ground support equipment",
    img: "jack-pg70",
  },
  {
    id: "oil-rig",
    name: "Oil charging rig",
    platforms: ["multi"],
    category: "Ground support equipment",
    img: "oil-rig",
  },
  {
    id: "shop-tool",
    name: "Shop tool, ARS-1",
    refs: ["WO 1230267"],
    platforms: ["multi"],
    category: "Tooling & dies",
    img: "shop-tool",
  },
];

export const capabilities: {
  name: string;
  detail: string;
  match: Category[];
}[] = [
  {
    name: "Press dies & tooling",
    detail:
      "Die design and manufacture on in-house hydraulic presses, including rubber seal tooling and depot shop fixtures.",
    match: ["Tooling & dies"],
  },
  {
    name: "Sheet metal & structural fabrication",
    detail:
      "Brackets, fittings, levers and attachment hardware worked to drawing and part number.",
    match: ["Structures & brackets"],
  },
  {
    name: "Ground support equipment",
    detail:
      "Jacks, trolleys, ladders and rigs — new build plus repair and overhaul of existing depot equipment.",
    match: ["Ground support equipment"],
  },
  {
    name: "Restraint systems",
    detail:
      "Troop, pilot, navigator and passenger belts and harnesses, made to platform-specific part numbers.",
    match: ["Restraint systems"],
  },
  {
    name: "Transparencies & glazing",
    detail:
      "Heated windshields, entrance door panels and cabin glazing, supplied new or refurbished.",
    match: ["Transparencies"],
  },
  {
    name: "Cargo handling & lashing",
    detail:
      "Mooring nets, tie down units, load pallets and hammocks for fixed and rotary wing.",
    match: ["Cargo & lashing"],
  },
  {
    name: "Cabin interiors & VIP modification",
    detail:
      "Passenger seating, attachment fittings, blinds and aircraft painting for VIP configuration.",
    match: ["Cabin & VIP interiors"],
  },
  {
    name: "Covers & protective equipment",
    detail:
      "Rotor hub, stabiliser and nose covers, seat cushions and back rests in aviation-grade fabric.",
    match: ["Protective covers", "Electrical", "Hydraulics & fittings"],
  },
];

export function countFor(platform: PlatformId | "all") {
  return platform === "all"
    ? items.length
    : items.filter((i) => i.platforms.includes(platform)).length;
}

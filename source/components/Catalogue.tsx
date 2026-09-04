"use client";

import { useMemo, useState } from "react";
import {
  items,
  platforms,
  categories,
  type PlatformId,
  type Category,
} from "@/lib/catalog";
import { asset } from "@/lib/asset";

/** Part numbers get typed with and without separators, so match on the
 *  stripped form: "8AT9420180" finds "8AT-9420-180-01A". */
/* These brochure photos were shot in situ rather than cut out, so they are
   framed as photographs instead of being multiplied onto the cell. */
const OPAQUE = new Set([
  "cargo-glass","door-glass-an32","elt-switch","fitting-single","fitting-twin",
  "pilot-harness","safety-harness","tail-ladder","throttle-cable",
]);

const strip = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

export default function Catalogue({
  selected,
  onSelect,
  rfq,
  onToggleRfq,
}: {
  selected: PlatformId | "all";
  onSelect: (p: PlatformId | "all") => void;
  rfq: string[];
  onToggleRfq: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");

  const results = useMemo(() => {
    const q = strip(query);
    return items.filter((it) => {
      if (selected !== "all" && !it.platforms.includes(selected)) return false;
      if (cat !== "all" && it.category !== cat) return false;
      if (!q) return true;
      const hay = strip(
        [
          it.name,
          it.category,
          ...(it.refs ?? []),
          ...it.platforms.map(
            (p) => platforms.find((x) => x.id === p)?.name ?? ""
          ),
        ].join(" ")
      );
      return hay.includes(q);
    });
  }, [query, cat, selected]);

  const activeCats = useMemo(() => {
    const inScope = items.filter(
      (it) => selected === "all" || it.platforms.includes(selected)
    );
    return categories.filter((c) => inScope.some((i) => i.category === c));
  }, [selected]);

  return (
    <section id="catalogue" className="bg-paper">
      <div className="mx-auto max-w-[1320px] px-5 pt-16 pb-20 md:px-8 md:pt-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="d2">What we already build</h2>
            <p className="lede mt-3 text-ink-soft">
              Every item below has been manufactured or overhauled to drawing.
              Search by part number, GIG number or description.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mt-8 flex items-center border border-rule bg-white focus-within:border-cyan">
          <svg
            viewBox="0 0 24 24"
            className="ml-4 h-4.5 w-4.5 shrink-0 text-ink-soft"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. 8AT-9420-180-01A, windshield, trolley"
            aria-label="Search the catalogue by part number or description"
            className="mono w-full bg-transparent px-3 py-4 text-[14px] outline-none placeholder:font-sans placeholder:text-ink-soft/60"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="mr-4 text-[13px] text-ink-soft hover:text-ink"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              onSelect("all");
              setCat("all");
            }}
            className={`border px-3 py-1.5 text-[13px] transition-colors ${
              selected === "all" && cat === "all"
                ? "border-navy bg-navy text-white"
                : "border-rule bg-white text-ink-soft hover:border-ink-soft"
            }`}
          >
            All items
          </button>
          {activeCats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(cat === c ? "all" : c)}
              className={`border px-3 py-1.5 text-[13px] transition-colors ${
                cat === c
                  ? "border-navy bg-navy text-white"
                  : "border-rule bg-white text-ink-soft hover:border-ink-soft"
              }`}
            >
              {c}
            </button>
          ))}
          <p className="mono ml-auto text-[12.5px] text-ink-soft">
            {results.length} of {items.length}
          </p>
        </div>

        {/* Grid — cells sit on a hairline field so the gaps read as rules */}
        {results.length > 0 ? (
          <div className="hairline-field mt-6 grid grid-cols-2 border border-rule md:grid-cols-3 xl:grid-cols-4">
            {results.map((it) => {
              const added = rfq.includes(it.id);
              return (
                <article
                  key={it.id}
                  className="group flex flex-col bg-white p-4 transition-colors hover:bg-[#f7fbfe] md:p-5"
                >
                  <div
                    className={`flex h-36 items-center justify-center overflow-hidden md:h-44 ${
                      OPAQUE.has(it.img) ? "bg-paper p-2" : ""
                    }`}
                  >
                    <img
                      src={asset(`/products/${it.img}.webp`)}
                      alt={it.name}
                      loading="lazy"
                      className={`h-full w-full object-contain ${
                        OPAQUE.has(it.img) ? "" : "mix-blend-multiply"
                      }`}
                    />
                  </div>
                  <h3 className="mt-4 text-[14.5px] leading-snug font-medium">
                    {it.name}
                  </h3>
                  {it.refs && (
                    <ul className="mono mt-2 space-y-0.5">
                      {it.refs.slice(0, 2).map((r) => (
                        <li key={r} className="text-[11.5px] text-cyan">
                          {r}
                        </li>
                      ))}
                      {it.refs.length > 2 && (
                        <li className="text-[11.5px] text-ink-soft">
                          +{it.refs.length - 2} more
                        </li>
                      )}
                    </ul>
                  )}
                  <p className="mt-2 text-[12.5px] text-ink-soft">
                    {it.category}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5 border-t border-rule pt-3 mt-auto">
                    {it.platforms.map((p) => (
                      <span
                        key={p}
                        className="mono bg-paper px-1.5 py-0.5 text-[11px] text-ink-soft"
                      >
                        {platforms.find((x) => x.id === p)?.name}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => onToggleRfq(it.id)}
                    aria-pressed={added}
                    className={`mt-3 w-full border py-2 text-[13px] transition-colors ${
                      added
                        ? "border-cyan bg-cyan text-white"
                        : "border-rule text-ink-soft hover:border-navy hover:text-navy"
                    }`}
                  >
                    {added ? "Added to enquiry" : "Add to enquiry"}
                  </button>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-6 border border-rule bg-white p-10">
            <p className="d3">No catalogue match for that reference.</p>
            <p className="mt-2 max-w-[52ch] text-[14.5px] text-ink-soft">
              We manufacture to drawing, so items outside this list are still
              worth asking about. Send the part number and we will confirm
              feasibility and lead time.
            </p>
            <a
              href="#enquiry"
              className="mt-5 inline-block bg-navy px-5 py-2.5 text-[13.5px] text-white hover:bg-navy-lift"
            >
              Ask about a part
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

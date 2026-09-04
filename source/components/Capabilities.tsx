"use client";

import { capabilities, items } from "@/lib/catalog";
import { asset } from "@/lib/asset";

export function Capabilities() {
  return (
    <section id="capabilities" className="bg-navy text-titanium">
      <div className="mx-auto max-w-[1320px] px-5 py-20 md:px-8 md:py-28">
        <h2 className="d2 max-w-[20ch] text-white">
          Eight shop capabilities, one drawing office.
        </h2>
        <p className="lede mt-4 text-titanium/70">
          Work arrives as a drawing, a sample part or a worn assembly. It leaves
          as a serialised item against a purchase order.
        </p>

        <dl className="mt-14">
          {capabilities.map((c) => {
            const n = items.filter((i) =>
              c.match.includes(i.category)
            ).length;
            return (
              <div
                key={c.name}
                className="grid grid-cols-1 gap-x-8 gap-y-2 border-t border-white/12 py-6 md:grid-cols-[minmax(0,7fr)_minmax(0,9fr)_auto] md:py-7"
              >
                <dt className="d3 text-white">{c.name}</dt>
                <dd className="max-w-[62ch] text-[14.5px] leading-relaxed text-titanium/65">
                  {c.detail}
                </dd>
                <dd className="mono self-start text-[12.5px] whitespace-nowrap text-cyan/85">
                  {n} in catalogue
                </dd>
              </div>
            );
          })}
          <div className="border-t border-white/12" />
        </dl>
      </div>
    </section>
  );
}

export function Facility() {
  return (
    <section id="facility" className="bg-paper">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
        <div>
          <h2 className="d2 max-w-[18ch]">
            A shop floor that sits inside the supply chain it serves.
          </h2>
          <p className="mt-5 max-w-[58ch] text-[15px] leading-relaxed text-ink-soft">
            The works occupy Plot 707A in Phase II Industrial Area, Chandigarh,
            a short run from 3 Base Repair Depot. Proximity matters for this
            kind of work: sample parts move by hand, fitment is checked against
            the aircraft, and revisions happen in days rather than shipping
            cycles.
          </p>
          <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-ink-soft">
            Presses, fabrication and finishing are held in house, including the
            hydraulic press used for rubber seal manufacture. That keeps
            short-run and one-off depot items commercially viable, which is
            usually where imported spares are hardest to obtain.
          </p>

          <dl className="mono mt-9 grid grid-cols-2 gap-px border border-rule bg-rule text-[13px] sm:grid-cols-3">
            {[
              ["Catalogue items", `${items.length}`],
              ["Airframes served", "4"],
              ["Location", "Chandigarh"],
            ].map(([k, v]) => (
              <div key={k} className="bg-white px-4 py-4">
                <dt className="font-sans text-[12px] text-ink-soft">{k}</dt>
                <dd className="mt-1 text-[17px] text-navy">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="self-start border border-rule bg-white p-6">
          <div className="flex h-[380px] items-center justify-center md:h-[460px]">
            <img
              src={asset("/products/hyd-press.webp")}
              alt="Hydraulic press used for rubber seal manufacture"
              loading="lazy"
              className="h-full w-full object-contain mix-blend-multiply"
            />
          </div>
          <figcaption className="mt-5 border-t border-rule pt-4 text-[13px] text-ink-soft">
            Hydraulic press, rubber seal manufacture
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

"use client";

import { items } from "@/lib/catalog";
import { asset } from "@/lib/asset";

const PHONE = "+917837220317";
const EMAIL = "p.pengineers21@gmail.com";

export function RfqBar({
  rfq,
  onClear,
}: {
  rfq: string[];
  onClear: () => void;
}) {
  if (rfq.length === 0) return null;
  return (
    <div className="sticky bottom-0 z-30 border-t border-white/10 bg-navy-deep text-titanium">
      <div className="mx-auto flex max-w-[1320px] items-center gap-4 px-5 py-3 md:px-8">
        <p className="text-[13.5px]">
          <span className="mono text-cyan">{rfq.length}</span>{" "}
          {rfq.length === 1 ? "item" : "items"} selected
        </p>
        <button
          onClick={onClear}
          className="text-[13px] text-titanium/55 hover:text-titanium"
        >
          Clear
        </button>
        <a
          href="#enquiry"
          className="ml-auto bg-cyan px-4 py-2 text-[13.5px] text-white hover:bg-[#0089c6]"
        >
          Continue to enquiry
        </a>
      </div>
    </div>
  );
}

export function Enquiry({ rfq }: { rfq: string[] }) {
  const chosen = items.filter((i) => rfq.includes(i.id));
  const summary = chosen
    .map((c) => `- ${c.name}${c.refs ? ` (${c.refs[0]})` : ""}`)
    .join("\n");

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
    "Enquiry from ppengineeringworks.com"
  )}&body=${encodeURIComponent(
    chosen.length
      ? `Please quote for the following:\n\n${summary}\n\nQuantity:\nRequired by:\nOrganisation:\n`
      : "Please quote for:\n\nPart number:\nQuantity:\nRequired by:\nOrganisation:\n"
  )}`;

  const wa = `https://wa.me/${PHONE.replace(
    "+",
    ""
  )}?text=${encodeURIComponent(
    chosen.length
      ? `Enquiry from your website:\n${summary}`
      : "Enquiry from your website: "
  )}`;

  return (
    <section id="enquiry" className="bg-white">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-5 py-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:px-8 md:py-28">
        <div>
          <h2 className="d2 max-w-[16ch]">Send a part number, get a price.</h2>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink-soft">
            Quotes go out against a drawing, a GIG number or a sample. If you
            are raising a tender, we can supply capability details and past
            supply references on request.
          </p>

          <dl className="mt-10 border-t border-rule">
            {[
              ["Telephone", "+91 78372 20317", `tel:${PHONE}`],
              ["Email", EMAIL, `mailto:${EMAIL}`],
            ].map(([k, v, href]) => (
              <div
                key={k}
                className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-rule py-4"
              >
                <dt className="w-24 text-[13px] text-ink-soft">{k}</dt>
                <dd>
                  <a
                    href={href}
                    className="mono text-[14.5px] text-navy underline decoration-cyan decoration-2 underline-offset-4"
                  >
                    {v}
                  </a>
                </dd>
              </div>
            ))}
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-rule py-4">
              <dt className="w-24 text-[13px] text-ink-soft">Works</dt>
              <dd className="text-[14.5px] leading-relaxed">
                Plot 707A, Phase II Industrial Area
                <br />
                Chandigarh 160002, India
              </dd>
            </div>
          </dl>
        </div>

        <div className="border border-rule bg-paper p-6 md:p-8">
          <h3 className="d3">Your enquiry</h3>
          {chosen.length > 0 ? (
            <ul className="mt-5 divide-y divide-rule border-y border-rule">
              {chosen.map((c) => (
                <li key={c.id} className="flex items-center gap-3 py-3">
                  <img
                    src={asset(`/products/${c.img}.webp`)}
                    alt=""
                    className="h-10 w-10 object-contain mix-blend-multiply"
                  />
                  <span className="text-[13.5px] leading-snug">{c.name}</span>
                  {c.refs && (
                    <span className="mono ml-auto shrink-0 text-[11.5px] text-cyan">
                      {c.refs[0]}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">
              Nothing selected yet. Add items from the catalogue and they will
              be listed here, or contact us directly with a part number.
            </p>
          )}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={mailto}
              className="flex-1 bg-navy px-5 py-3 text-center text-[14px] text-white hover:bg-navy-lift"
            >
              Email the enquiry
            </a>
            <a
              href={wa}
              className="flex-1 border border-navy px-5 py-3 text-center text-[14px] text-navy hover:bg-navy hover:text-white"
            >
              Send on WhatsApp
            </a>
          </div>
          <p className="mt-4 text-[12.5px] leading-relaxed text-ink-soft">
            Both options open with your selected items already written in, so
            nothing has to be retyped.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-titanium">
      <div className="relative mx-auto max-w-[1320px] px-5 py-14 md:px-8">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div>
            <p className="wordmark text-[19px] text-white">
              PP Engineering Works
            </p>
            <p className="mt-2 text-[13px] text-titanium/50">
              Partnering for defence excellence
            </p>
          </div>
          <address className="text-[13.5px] leading-relaxed text-titanium/65 not-italic">
            Plot 707A, Phase II Industrial Area
            <br />
            Chandigarh 160002, India
            <br />
            <a href={`tel:${PHONE}`} className="mono hover:text-white">
              +91 78372 20317
            </a>
            <br />
            <a href={`mailto:${EMAIL}`} className="mono hover:text-white">
              {EMAIL}
            </a>
          </address>
        </div>
        <p className="mt-14 border-t border-white/10 pt-6 text-[12.5px] text-titanium/40">
          © {new Date().getFullYear()} PP Engineering Works. Product images and
          part references are indicative of work carried out.
        </p>
      </div>
    </footer>
  );
}

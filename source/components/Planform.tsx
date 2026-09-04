import type { PlatformId } from "@/lib/catalog";

/**
 * Top-view planforms, drawn to the convention of an aircraft recognition
 * chart: nose up, schematic rather than photographic. These are the four
 * airframes the catalogue is built around.
 */

function Blades({
  cx,
  cy,
  length,
  count,
  offset = 0,
  width = 7,
}: {
  cx: number;
  cy: number;
  length: number;
  count: number;
  offset?: number;
  width?: number;
}) {
  const step = 360 / count;
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {Array.from({ length: count }, (_, i) => (
        <rect
          key={i}
          x={-width / 2}
          y={-length}
          width={width}
          height={length}
          rx={width / 2}
          transform={`rotate(${offset + i * step})`}
        />
      ))}
      <circle cx={0} cy={0} r={width * 0.9} />
    </g>
  );
}

function Disc({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      stroke="currentColor"
      strokeOpacity={0.22}
      strokeWidth={1}
      strokeDasharray="3 5"
    />
  );
}

function An32() {
  return (
    <>
      <path d="M100 20c6.5 0 10.5 10.5 10.5 24v106l-5.5 26h-10l-5.5-26V44c0-13.5 4-24 10.5-24Z" />
      <path d="M12 86 88 73h24l76 13v9l-76 7H88l-76-7Z" />
      <rect x="55.5" y="52" width="15" height="46" rx="6.5" />
      <rect x="129.5" y="52" width="15" height="46" rx="6.5" />
      <Disc cx={63} cy={50} r={21} />
      <Disc cx={137} cy={50} r={21} />
      <rect x="42" y="47.6" width="42" height="4.8" rx="2.4" />
      <rect x="116" y="47.6" width="42" height="4.8" rx="2.4" />
      <path d="M48 155h104l-6 12H54Z" />
      <path d="M96.5 138h7l2 38h-11Z" />
    </>
  );
}

function Il76() {
  return (
    <>
      <path d="M100 16c7 0 12 12 12 30v106l-6 30H94l-6-30V46c0-18 5-30 12-30Z" />
      <path d="M88 74 10 112v13l78-11ZM112 74l78 38v13l-78-11Z" />
      <rect x="55.5" y="64" width="13" height="28" rx="6" />
      <rect x="27.5" y="78" width="13" height="28" rx="6" />
      <rect x="131.5" y="64" width="13" height="28" rx="6" />
      <rect x="159.5" y="78" width="13" height="28" rx="6" />
      <path d="M46 147h108l-6 12H52Z" />
      <path d="M95.5 150h9l2.5 32h-14Z" />
    </>
  );
}

function Mi17() {
  return (
    <>
      <path d="M100 38c12 0 20 13 20 34v36c0 12-6 18-12 20l-4 1.4V170h-8v-40.6l-4-1.4c-6-2-12-8-12-20V72c0-21 8-34 20-34Z" />
      <path d="M84 150h32v7H84Z" />
      <rect x="103" y="156" width="5" height="22" rx="2.5" />
      <Disc cx={100} cy={84} r={84} />
      <Blades cx={100} cy={84} length={84} count={5} offset={-16} width={6} />
    </>
  );
}

function Ch47() {
  return (
    <>
      {/* Proportioned from the real airframe: 18.3 m rotors on a 15.9 m
          fuselage, hubs 11.9 m apart. */}
      <path d="M100 38c-7.5 0-13 9-13 20v78c0 12 5.5 19 13 19s13-7 13-19V58c0-11-5.5-20-13-20Z" />
      <path d="M93 46h14v16H93Z" />
      <path d="M85 116h30v40H85Z" />
      <rect x="74" y="86" width="13" height="46" rx="6.5" />
      <rect x="113" y="86" width="13" height="46" rx="6.5" />
      <Disc cx={100} cy={64} r={55} />
      <Disc cx={100} cy={136} r={55} />
      <Blades cx={100} cy={64} length={55} count={3} offset={0} width={8} />
      <Blades cx={100} cy={136} length={55} count={3} offset={60} width={8} />
    </>
  );
}

const shapes: Record<string, () => React.JSX.Element> = {
  an32: An32,
  il76: Il76,
  mi17: Mi17,
  ch47: Ch47,
};

export default function Planform({
  id,
  active,
  className = "",
}: {
  id: PlatformId;
  active: boolean;
  className?: string;
}) {
  const Shape = shapes[id];
  if (!Shape) {
    // Multi-platform has no single airframe; a bolt circle stands in for the
    // shop rather than pretending an aircraft represents it.
    return (
      <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
        {/* A bolted flange: the shop, rather than any one airframe. Holes are
            masked out rather than filled, so the mark sits on any background. */}
        <defs>
          <mask id="ppew-flange">
            <rect x="0" y="0" width="200" height="200" fill="#fff" />
            {Array.from({ length: 8 }, (_, i) => {
              const a = (i * Math.PI) / 4 + Math.PI / 8;
              return (
                <circle
                  key={i}
                  cx={100 + Math.cos(a) * 65}
                  cy={100 + Math.sin(a) * 65}
                  r="7.5"
                  fill="#000"
                />
              );
            })}
          </mask>
        </defs>
        <path
          d="M100 22a78 78 0 1 0 0 156 78 78 0 0 0 0-156Zm0 26a52 52 0 1 1 0 104 52 52 0 0 1 0-104Z"
          fillRule="evenodd"
          fill="currentColor"
          mask="url(#ppew-flange)"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g fill="currentColor" stroke="none">
        <Shape />
      </g>
    </svg>
  );
}

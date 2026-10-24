import { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Decor.jsx                                                          */
/*  Decorative SVG drawings for the portfolio (mocap, electronics,     */
/*  code and VR). Everything is drawn with currentColor, so the        */
/*  parent's text-(--accent) class decides the color.                  */
/*                                                                     */
/*  Used in Home.jsx as:                                               */
/*    <HeroDecor />       inside the hero <section className="relative */
/*                        overflow-hidden ...">                        */
/*    <TraceDivider />    between sections                             */
/* ------------------------------------------------------------------ */

// SVG animations (SMIL) ignore the CSS reduced-motion setting,
// so we check it ourselves and simply skip the <animate> elements.
function useMotionOk() {
  const [ok, setOk] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setOk(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return ok;
}

/* ------------------------------------------------------------------ */
/*  Motion capture                                                     */
/* ------------------------------------------------------------------ */

/* Stick figure with tracking markers, wearing a VR headset */
export function MocapSkeleton({ className = "" }) {
  const motion = useMotionOk();

  // [x1, y1, x2, y2]
  const bones = [
    [60, 39, 60, 130], // spine
    [38, 58, 82, 58], // shoulders
    [38, 58, 22, 95], // left upper arm
    [22, 95, 14, 130], // left forearm
    [82, 58, 98, 95], // right upper arm
    [98, 95, 106, 130], // right forearm
    [48, 132, 72, 132], // hips
    [48, 132, 42, 180], // left thigh
    [42, 180, 40, 225], // left shin
    [72, 132, 78, 180], // right thigh
    [78, 180, 80, 225], // right shin
  ];

  // Marker positions
  const joints = [
    [60, 58],
    [38, 58],
    [82, 58],
    [22, 95],
    [98, 95],
    [14, 130],
    [106, 130],
    [60, 130],
    [42, 180],
    [78, 180],
    [40, 225],
    [80, 225],
  ];

  return (
    <svg
      viewBox="0 0 120 240"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* REC indicator */}
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none">
        {motion && (
          <animate
            attributeName="opacity"
            values="1;0;1"
            dur="1.4s"
            repeatCount="indefinite"
          />
        )}
      </circle>
      <text
        x="20"
        y="16"
        fontSize="10"
        fontFamily="monospace"
        fill="currentColor"
        stroke="none"
      >
        REC
      </text>

      {/* Head */}
      <circle cx="60" cy="25" r="14" />

      {/* Bones */}
      {bones.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
      ))}

      {/* Floor ring */}
      <ellipse
        cx="60"
        cy="234"
        rx="42"
        ry="5"
        strokeWidth="1.5"
        strokeDasharray="3 4"
        opacity="0.6"
      />

      {/* Markers */}
      {joints.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5.5" fill="currentColor" stroke="none">
          {motion && (
            <animate
              attributeName="opacity"
              values="1;0.3;1"
              dur="2.4s"
              begin={`${i * 0.15}s`}
              repeatCount="indefinite"
            />
          )}
        </circle>
      ))}
    </svg>
  );
}

/* IMU sensor module with X / Y / Z axes and a slowly rotating ring */
export function ImuSensor({ className = "" }) {
  const motion = useMotionOk();

  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* Rotating ring */}
      <circle
        cx="80"
        cy="80"
        r="62"
        strokeWidth="2"
        strokeDasharray="6 8"
        opacity="0.6"
      >
        {motion && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 80 80"
            to="360 80 80"
            dur="24s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* Module */}
      <rect x="40" y="40" width="80" height="80" rx="6" />
      <rect x="65" y="65" width="30" height="30" rx="2" />
      <circle cx="71" cy="71" r="2" fill="currentColor" stroke="none" />

      {/* Pads */}
      {[60, 73, 86, 99].map((y) => (
        <circle key={y} cx="50" cy={y} r="3" />
      ))}

      {/* Axes */}
      <line x1="120" y1="80" x2="146" y2="80" />
      <line x1="80" y1="40" x2="80" y2="14" />
      <line x1="40" y1="120" x2="20" y2="140" />
      <g
        fontSize="11"
        fontFamily="monospace"
        fill="currentColor"
        stroke="none"
      >
        <text x="147" y="84">
          X
        </text>
        <text x="76" y="11">
          Y
        </text>
        <text x="8" y="152">
          Z
        </text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Electronics                                                        */
/* ------------------------------------------------------------------ */

/* Arduino Uno style board */
export function ArduinoBoard({ className = "" }) {
  const headerX = Array.from({ length: 10 }, (_, i) => 70 + i * 11);
  const chipPins = Array.from({ length: 14 }, (_, i) => 93 + i * 5);

  return (
    <svg
      viewBox="0 0 200 130"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Board */}
      <rect x="12" y="8" width="180" height="114" rx="8" />

      {/* USB port + power jack */}
      <rect x="2" y="28" width="36" height="30" rx="2" />
      <rect x="2" y="80" width="30" height="26" rx="2" />

      {/* Reset button */}
      <circle cx="55" cy="30" r="7" />
      <circle cx="55" cy="30" r="3" fill="currentColor" stroke="none" />

      {/* Mounting holes */}
      <circle cx="24" cy="114" r="3" />
      <circle cx="182" cy="98" r="3" />

      {/* LEDs */}
      <rect x="150" y="34" width="8" height="4" fill="currentColor" />
      <rect x="162" y="34" width="8" height="4" fill="currentColor" />

      {/* Microcontroller */}
      <rect x="90" y="60" width="70" height="22" rx="2" />
      <circle cx="97" cy="66" r="2" fill="currentColor" stroke="none" />
      {chipPins.map((x) => (
        <g key={x} strokeWidth="1.5">
          <line x1={x} y1="56" x2={x} y2="60" />
          <line x1={x} y1="82" x2={x} y2="86" />
        </g>
      ))}

      {/* Header pins */}
      {headerX.map((x) => (
        <g key={x}>
          <rect x={x} y="12" width="6" height="6" />
          <rect x={x} y="108" width="6" height="6" />
        </g>
      ))}

      <text
        x="100"
        y="101"
        fontSize="10"
        fontFamily="monospace"
        fill="currentColor"
        stroke="none"
      >
        UNO
      </text>
    </svg>
  );
}

/* PCB chip with traces and a data pulse running along two of them */
export function ChipWithTraces({ className = "" }) {
  const motion = useMotionOk();

  // Traces drawn from the chip pin outwards on the left side;
  // the right side is the same set, mirrored.
  const traces = [
    { d: "M44 40 H30 L22 32 H10", pad: [10, 32] },
    { d: "M44 50 H12", pad: [12, 50] },
    { d: "M44 60 H24 L16 68 H10", pad: [10, 68] },
    { d: "M44 70 H34 L26 78 H10", pad: [10, 78] },
    { d: "M44 80 H30 L20 90 H10", pad: [10, 90] },
  ];
  const pins = [40, 50, 60, 70, 80];

  const side = traces.map((t) => (
    <g key={t.d}>
      <path d={t.d} />
      <circle cx={t.pad[0]} cy={t.pad[1]} r="3.5" />
    </g>
  ));

  return (
    <svg
      viewBox="0 0 160 120"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Chip body */}
      <rect x="50" y="30" width="60" height="60" rx="4" />
      <circle cx="60" cy="40" r="3" fill="currentColor" stroke="none" />

      {/* Chip pins */}
      {pins.map((y) => (
        <g key={y}>
          <line x1="44" y1={y} x2="50" y2={y} />
          <line x1="110" y1={y} x2="116" y2={y} />
        </g>
      ))}

      {/* Traces (left + mirrored right) */}
      {side}
      <g transform="translate(160 0) scale(-1 1)">{side}</g>

      {/* Data pulses */}
      {motion && (
        <>
          <circle r="3" fill="currentColor" stroke="none">
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              path="M10 32 H22 L30 40 H44"
            />
          </circle>
          <circle r="3" fill="currentColor" stroke="none">
            <animateMotion
              dur="3s"
              begin="1.5s"
              repeatCount="indefinite"
              path="M150 78 H134 L126 70 H116"
            />
          </circle>
        </>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Code                                                               */
/* ------------------------------------------------------------------ */

/* Small editor window with a Unity style C# snippet and a blinking cursor */
export function CodeWindow({ className = "" }) {
  const motion = useMotionOk();

  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* Window frame + title bar */}
      <rect x="2" y="2" width="196" height="116" rx="8" />
      <line x1="2" y1="24" x2="198" y2="24" />
      <circle cx="16" cy="13" r="3" fill="currentColor" stroke="none" />
      <circle cx="28" cy="13" r="3" />
      <circle cx="40" cy="13" r="3" />

      {/* Code */}
      <g
        fontSize="11"
        fontFamily="monospace"
        fill="currentColor"
        stroke="none"
      >
        <text x="14" y="43">
          void Update()
        </text>
        <text x="14" y="59">
          {"{"}
        </text>
        <text x="26" y="75">
          rig.Track(markers);
        </text>
        <text x="26" y="91">
          vr.Render();
        </text>
        <text x="14" y="107">
          {"}"}
        </text>

        {/* Blinking cursor */}
        <rect x="106" y="81" width="6" height="12">
          {motion && (
            <animate
              attributeName="opacity"
              values="1;0;1"
              keyTimes="0;0.5;1"
              calcMode="discrete"
              dur="1.2s"
              repeatCount="indefinite"
            />
          )}
        </rect>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  VR                                                                 */
/* ------------------------------------------------------------------ */

/* VR headset, front view, with blinking tracking cameras */
export function VrHeadset({ className = "" }) {
  const motion = useMotionOk();
  const cameras = [
    [34, 32],
    [100, 30],
    [166, 32],
  ];

  return (
    <svg
      viewBox="0 0 200 110"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* Side straps */}
      <rect x="1" y="42" width="14" height="26" rx="4" />
      <rect x="185" y="42" width="14" height="26" rx="4" />

      {/* Visor */}
      <rect x="14" y="20" width="172" height="70" rx="18" />

      {/* Nose cutout */}
      <path d="M90 90 Q100 76 110 90" />

      {/* Lenses */}
      {[65, 135].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="55" r="20" />
          <circle
            cx={cx}
            cy="55"
            r="11"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <circle cx={cx} cy="55" r="3" fill="currentColor" stroke="none" />
        </g>
      ))}

      {/* Tracking cameras */}
      {cameras.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="currentColor" stroke="none">
          {motion && (
            <animate
              attributeName="opacity"
              values="1;0.25;1"
              dur="2s"
              begin={`${i * 0.4}s`}
              repeatCount="indefinite"
            />
          )}
        </circle>
      ))}
    </svg>
  );
}

/* VR controller with a tracking ring of LEDs */
export function VrController({ className = "" }) {
  const motion = useMotionOk();
  const leds = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4;
    return [60 + 30 * Math.cos(a), 36 + 30 * Math.sin(a)];
  });

  return (
    <svg
      viewBox="0 0 120 150"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <g transform="rotate(-15 60 80)">
        {/* Tracking ring + LEDs */}
        <circle cx="60" cy="36" r="30" />
        {leds.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.5" fill="currentColor" stroke="none">
            {motion && (
              <animate
                attributeName="opacity"
                values="1;0.2;1"
                dur="2s"
                begin={`${i * 0.25}s`}
                repeatCount="indefinite"
              />
            )}
          </circle>
        ))}

        {/* Grip */}
        <path d="M44 62 Q40 100 48 128 Q60 138 72 128 Q80 100 76 62" />

        {/* Thumbstick + buttons */}
        <circle cx="60" cy="78" r="7" />
        <circle cx="60" cy="78" r="3" fill="currentColor" stroke="none" />
        <circle cx="50" cy="96" r="3" />
        <circle cx="70" cy="96" r="3" />
      </g>
    </svg>
  );
}

/* Perspective floor grid along the bottom edge, like a VR play area */
export function VrGrid() {
  const W = 1200;
  const H = 120;
  const vx = W / 2; // vanishing point x
  const vy = -240; // vanishing point y (above the grid)
  const t = (0 - vy) / (H - vy); // where y = 0 sits on the line to the bottom

  // Lines that converge on the vanishing point
  const verticals = Array.from({ length: 25 }, (_, i) => {
    const x = -600 + i * 100;
    return [vx + (x - vx) * t, 0, x, H];
  });

  // Horizontal lines, spaced wider toward the viewer
  const horizontals = Array.from({ length: 7 }, (_, i) => {
    const y = H * Math.pow((i + 1) / 7, 2);
    return y;
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 w-full h-24 text-(--accent) opacity-30 pointer-events-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="vr-grid-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <mask id="vr-grid-mask">
          <rect width={W} height={H} fill="url(#vr-grid-fade)" />
        </mask>
      </defs>

      <g mask="url(#vr-grid-mask)">
        {verticals.map(([x1, y1, x2, y2], i) => (
          <line
            key={`v${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {horizontals.map((y) => (
          <line
            key={`h${y}`}
            x1="0"
            y1={y}
            x2={W}
            y2={y}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Backgrounds + dividers                                             */
/* ------------------------------------------------------------------ */

/* Faint PCB traces and code glyphs behind the whole hero */
export function HeroBackground() {
  const left = [
    "M0 80 H180 L240 140 H420",
    "M0 200 H100 L160 260 H300",
    "M0 330 H220 L280 270 H380",
    "M0 460 H140 L200 520 H360",
  ];
  const right = [
    "M1200 120 H1040 L980 180 H820",
    "M1200 260 H1100 L1040 320 H900",
    "M1200 400 H980 L920 460 H780",
    "M1200 540 H1120 L1060 480 H940",
  ];
  // Via / pad at the end of each trace
  const pads = [
    [420, 140],
    [300, 260],
    [380, 270],
    [360, 520],
    [820, 180],
    [900, 320],
    [780, 460],
    [940, 480],
  ];
  // [text, x, y]
  const glyphs = [
    ["</>", 30, 135],
    ["{ }", 40, 295],
    ["=>", 40, 415],
    [";", 70, 575],
    ["[ ]", 1070, 215],
    ["#", 1110, 355],
    ["//", 1060, 590],
  ];

  return (
    <svg
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full text-(--accent) opacity-10 pointer-events-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {[...left, ...right].map((d) => (
        <path key={d} d={d} />
      ))}
      {pads.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="8" />
          <circle cx={x} cy={y} r="2.5" fill="currentColor" stroke="none" />
        </g>
      ))}
      <g fontSize="30" fontFamily="monospace" fill="currentColor" stroke="none">
        {glyphs.map(([text, x, y]) => (
          <text key={`${text}-${x}`} x={x} y={y}>
            {text}
          </text>
        ))}
      </g>
    </svg>
  );
}

/* Horizontal PCB trace used as a section divider */
export function TraceDivider() {
  const motion = useMotionOk();
  const path = "M0 10 H220 L232 4 H368 L380 10 H600";

  return (
    <svg
      viewBox="0 0 600 20"
      className="w-full max-w-2xl mx-auto text-(--accent) opacity-70"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
      <circle cx="232" cy="4" r="3" fill="currentColor" />
      <circle cx="368" cy="4" r="3" fill="currentColor" />
      {motion && (
        <circle r="3" fill="currentColor" stroke="none">
          <animateMotion dur="6s" repeatCount="indefinite" path={path} />
        </circle>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Everything for the hero in one component                           */
/* ------------------------------------------------------------------ */

/* Place inside the hero <section className="relative overflow-hidden ...">.
   The side columns are only shown from the lg breakpoint up. */
export function HeroDecor() {
  return (
    <>
      <HeroBackground />
      <VrGrid />

      {/* Left: mocap, Arduino, code */}
      <div className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-5 text-(--accent) opacity-80 pointer-events-none">
        <MocapSkeleton className="w-24 h-48" />
        <ArduinoBoard className="w-40" />
        <CodeWindow className="w-44" />
      </div>

      {/* Right: VR headset, controller, IMU, chip */}
      <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-5 text-(--accent) opacity-80 pointer-events-none">
        <VrHeadset className="w-40" />
        <VrController className="w-20" />
        <ImuSensor className="w-28 h-28" />
        <ChipWithTraces className="w-36" />
      </div>
    </>
  );
}
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT_FAMILY} from './fonts';

// All scenes draw into the same 1080×500 canvas
export const SCENE_WIDTH = 1080;
export const SCENE_HEIGHT = 500;

const YELLOW = '#FFE600';
const PINK = '#FF5DA2';
const CYAN = '#4FD1FF';
const ORANGE = '#FF8A3D';
const GREEN = '#3DDC84';
const INK = '#14132a';

const usePop = (delay: number) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config: {damping: 11, stiffness: 170}});
};

// Scales an SVG group from its own center
const popTransform = (scale: number, cx: number, cy: number) =>
  `translate(${cx} ${cy}) scale(${scale}) translate(${-cx} ${-cy})`;

const Canvas: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg width={SCENE_WIDTH} height={SCENE_HEIGHT} viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}>
    {children}
  </svg>
);

const Sparkle: React.FC<{x: number; y: number; size: number; color: string; rotation: number}> = ({
  x,
  y,
  size,
  color,
  rotation,
}) => (
  <path
    transform={`translate(${x} ${y}) rotate(${rotation}) scale(${size / 100})`}
    d="M0 -100 C 12 -30 30 -12 100 0 C 30 12 12 30 0 100 C -12 30 -30 12 -100 0 C -30 -12 -12 -30 0 -100 Z"
    fill={color}
  />
);

/** «Друзья, всем привет!» — waving hand and a greeting bubble */
export const GreetingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const hand = usePop(0);
  const bubble = usePop(6);
  const wave = 22 * Math.sin(frame / 3);
  const burst = interpolate(frame, [6, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const colors = [YELLOW, PINK, CYAN, ORANGE];

  return (
    <Canvas>
      {Array.from({length: 16}).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const distance = 60 + 260 * burst;
        return (
          <circle
            key={i}
            cx={720 + Math.cos(angle) * distance}
            cy={220 + Math.sin(angle) * distance * 0.6}
            r={i % 2 ? 9 : 13}
            fill={colors[i % colors.length]}
            opacity={1 - burst * 0.9}
          />
        );
      })}
      <g transform={popTransform(hand, 330, 420)}>
        <g transform={`rotate(${wave} 330 420)`} stroke={INK} strokeWidth={7} fill="#FFC48C">
          {[
            [255, 95, 205],
            [300, 65, 235],
            [345, 75, 225],
            [390, 105, 195],
          ].map(([x, y, h]) => (
            <rect key={x} x={x - 22} y={y} width={44} height={h} rx={22} />
          ))}
          <rect x={150} y={230} width={44} height={150} rx={22} transform="rotate(-40 172 305)" />
          <rect x={225} y={210} width={210} height={210} rx={70} />
        </g>
        {[0, 1].map((i) => (
          <path
            key={i}
            d={`M ${470 + i * 40} ${120 - i * 20} q 40 60 0 120`}
            stroke={YELLOW}
            strokeWidth={9}
            strokeLinecap="round"
            fill="none"
            opacity={0.5 + 0.5 * Math.sin(frame / 3 + i)}
          />
        ))}
      </g>
      <g transform={popTransform(bubble, 780, 210)}>
        <path d="M 580 110 h 400 a 40 40 0 0 1 40 40 v 120 a 40 40 0 0 1 -40 40 h -320 l -60 50 l 10 -50 h -30 a 40 40 0 0 1 -40 -40 v -120 a 40 40 0 0 1 40 -40 z" fill={YELLOW} />
        <text x={780} y={238} textAnchor="middle" fontFamily={FONT_FAMILY} fontWeight={800} fontSize={80} fill={INK}>
          ПРИВЕТ!
        </text>
      </g>
    </Canvas>
  );
};

/** «Я сейчас тестирую Claude» — a laptop with an AI chat and test checkmarks */
export const TestingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const laptop = usePop(0);
  const userBubble = usePop(6);
  const checks = [usePop(22), usePop(34), usePop(46)];
  const typing = frame < 26;
  const answer = interpolate(frame, [26, 50], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <Canvas>
      <g transform={popTransform(laptop, 450, 260)}>
        <rect x={150} y={50} width={600} height={360} rx={28} fill="#2a2850" stroke="#8b8bd6" strokeWidth={6} />
        <rect x={175} y={75} width={550} height={310} rx={14} fill="#F5F0E8" />
        <path d="M 120 410 h 660 l 50 44 h -760 z" fill="#8b8bd6" />
        <Sparkle x={215} y={112} size={22} color="#D97757" rotation={frame * 4} />
        <text x={245} y={124} fontFamily={FONT_FAMILY} fontWeight={800} fontSize={32} fill="#3a3a3a">
          Claude
        </text>
        <g transform={popTransform(userBubble, 600, 175)} opacity={userBubble}>
          <rect x={440} y={150} width={260} height={56} rx={28} fill="#E3D9C8" />
          <rect x={470} y={172} width={200} height={12} rx={6} fill="#a99f8e" />
        </g>
        {typing ? (
          [0, 1, 2].map((i) => (
            <circle key={i} cx={230 + i * 36} cy={262 - 10 * Math.max(0, Math.sin(frame / 2.5 - i))} r={11} fill="#D97757" />
          ))
        ) : (
          <g>
            {[0, 1, 2].map((i) => (
              <rect
                key={i}
                x={205}
                y={240 + i * 36}
                height={16}
                rx={8}
                width={interpolate(answer, [i / 3, (i + 1) / 3], [0, [430, 380, 260][i]], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })}
                fill="#bdb3a2"
              />
            ))}
          </g>
        )}
      </g>
      {checks.map((check, i) => (
        <g key={i} transform={popTransform(check, 920, 110 + i * 130)}>
          <circle cx={920} cy={110 + i * 130} r={50} fill={GREEN} />
          <path
            d={`M ${895} ${110 + i * 130} l 18 18 l 32 -36`}
            stroke="white"
            strokeWidth={12}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      ))}
    </Canvas>
  );
};

const NET_LAYERS = [
  {x: 110, ys: [130, 250, 370]},
  {x: 260, ys: [70, 190, 310, 430]},
  {x: 410, ys: [130, 250, 370]},
];

/** «Хочу создать рилс с помощью нейросети» — a neural network feeding a vertical video */
export const CreateReelScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const net = usePop(0);
  const phone = usePop(14);
  const progress = interpolate(frame, [24, durationInFrames - 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const done = usePop(durationInFrames - 20);

  const edges = NET_LAYERS.slice(0, -1).flatMap((layer, l) =>
    layer.ys.flatMap((y1) => NET_LAYERS[l + 1].ys.map((y2) => ({x1: layer.x, y1, x2: NET_LAYERS[l + 1].x, y2}))),
  );

  return (
    <Canvas>
      <g transform={popTransform(net, 260, 250)} opacity={net}>
        {edges.map((e, i) => (
          <line key={i} {...e} stroke="rgba(255,255,255,0.22)" strokeWidth={4} />
        ))}
        {edges.map((e, i) => {
          const t = (frame / 22 + (i * 0.37) % 1) % 1;
          return (
            <circle key={i} cx={e.x1 + (e.x2 - e.x1) * t} cy={e.y1 + (e.y2 - e.y1) * t} r={8} fill={YELLOW} opacity={Math.sin(t * Math.PI)} />
          );
        })}
        {NET_LAYERS.flatMap((layer, l) =>
          layer.ys.map((y, i) => (
            <circle
              key={`${l}-${i}`}
              cx={layer.x}
              cy={y}
              r={28 + 4 * Math.sin(frame / 5 + l + i)}
              fill={CYAN}
              stroke="white"
              strokeWidth={5}
            />
          )),
        )}
      </g>
      <g opacity={phone}>
        <line x1={490} y1={250} x2={630} y2={250} stroke={YELLOW} strokeWidth={10} strokeDasharray="22 16" strokeDashoffset={-frame * 3} strokeLinecap="round" />
        <path d="M 625 220 l 40 30 l -40 30 z" fill={YELLOW} />
      </g>
      <g transform={popTransform(phone, 830, 250)}>
        <defs>
          <linearGradient id="reel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={PINK} />
            <stop offset="1" stopColor={ORANGE} />
          </linearGradient>
        </defs>
        <rect x={710} y={20} width={240} height={460} rx={36} fill="#0b0b16" stroke={PINK} strokeWidth={6} />
        <rect x={724} y={34} width={212} height={432} rx={26} fill="url(#reel)" opacity={0.25 + 0.75 * progress} />
        <circle cx={830} cy={240} r={56} fill="rgba(255,255,255,0.92)" />
        <path d="M 812 210 l 50 30 l -50 30 z" fill={PINK} />
        <rect x={750} y={420} width={160} height={12} rx={6} fill="rgba(255,255,255,0.35)" />
        <rect x={750} y={420} width={160 * progress} height={12} rx={6} fill="white" />
        <text x={830} y={92} textAnchor="middle" fontFamily={FONT_FAMILY} fontWeight={800} fontSize={34} fill="white">
          REELS
        </text>
      </g>
      {[
        [700, 60],
        [975, 140],
        [960, 420],
      ].map(([x, y], i) => (
        <Sparkle key={i} x={x} y={y} size={30 * done} color={YELLOW} rotation={frame * 3 + i * 30} />
      ))}
    </Canvas>
  );
};

/** «Посмотрим, что из этого выйдет» — curious eyes looking around */
export const LetsSeeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const eyes = usePop(0);
  const marks = [usePop(8), usePop(14), usePop(20)];
  const lookX = interpolate(frame, [0, 12, 24, 36, 48], [0, -55, -55, 55, 0], {
    extrapolateRight: 'clamp',
  });
  const lookY = interpolate(frame, [36, 48, 70], [0, -30, -30], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // Quick blink after the look-around
  const blink = interpolate(frame, [52, 55, 58], [1, 0.08, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <Canvas>
      {[
        {x: 170, y: 170, color: YELLOW, size: 120},
        {x: 905, y: 150, color: PINK, size: 140},
        {x: 540, y: 95, color: CYAN, size: 90},
      ].map((m, i) => (
        <text
          key={i}
          x={m.x}
          y={m.y + 14 * Math.sin(frame / 6 + i * 2)}
          textAnchor="middle"
          fontFamily={FONT_FAMILY}
          fontWeight={800}
          fontSize={m.size * marks[i]}
          fill={m.color}
          transform={`rotate(${(i - 1) * 12} ${m.x} ${m.y})`}
        >
          ?
        </text>
      ))}
      <g transform={popTransform(eyes, 540, 300)}>
        {[400, 680].map((cx) => (
          <g key={cx} transform={`translate(0 300) scale(1 ${blink}) translate(0 -300)`}>
            <ellipse cx={cx} cy={300} rx={120} ry={140} fill="white" stroke={INK} strokeWidth={8} />
            <circle cx={cx + lookX} cy={310 + lookY} r={58} fill={INK} />
            <circle cx={cx + lookX + 20} cy={290 + lookY} r={16} fill="white" />
          </g>
        ))}
      </g>
    </Canvas>
  );
};

export const SCENES = [GreetingScene, TestingScene, CreateReelScene, LetsSeeScene];

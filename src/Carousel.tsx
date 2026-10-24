import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {FONT_FAMILY} from './fonts';

// Instagram carousel: one frame = one 1080×1350 slide
export const SLIDE_WIDTH = 1080;
export const SLIDE_HEIGHT = 1350;

const YELLOW = '#FFE600';
const PINK = '#FF5DA2';
const CYAN = '#4FD1FF';
const GREEN = '#3DDC84';
const MUTED = 'rgba(255,255,255,0.72)';
// Comment keyword for the course pre-registration call to action
const CTA_KEYWORD = 'РИЛС';

const Hl: React.FC<{children: React.ReactNode; color?: string}> = ({children, color = YELLOW}) => (
  <span style={{color}}>{children}</span>
);

const Title: React.FC<{children: React.ReactNode; size?: number}> = ({children, size = 72}) => (
  <div style={{fontWeight: 800, fontSize: size, lineHeight: 1.12, textTransform: 'uppercase', letterSpacing: -1}}>
    {children}
  </div>
);

const Body: React.FC<{children: React.ReactNode; size?: number}> = ({children, size = 38}) => (
  <div style={{fontWeight: 500, fontSize: size, lineHeight: 1.4, color: MUTED}}>{children}</div>
);

const StepTag: React.FC<{n: number}> = ({n}) => (
  <div
    style={{
      alignSelf: 'flex-start',
      background: YELLOW,
      color: '#14132a',
      fontWeight: 800,
      fontSize: 30,
      padding: '10px 26px',
      borderRadius: 999,
      textTransform: 'uppercase',
    }}
  >
    Шаг {n}
  </div>
);

const Phone: React.FC<{src: string; height: number; rotate?: number; accent?: string}> = ({
  src,
  height,
  rotate = 0,
  accent = 'rgba(255,255,255,0.15)',
}) => (
  <div
    style={{
      height,
      width: (height * 9) / 16,
      borderRadius: height * 0.06,
      border: `10px solid #0b0b16`,
      outline: `4px solid ${accent}`,
      overflow: 'hidden',
      transform: `rotate(${rotate}deg)`,
      boxShadow: '0 30px 70px rgba(0,0,0,0.55)',
      flexShrink: 0,
    }}
  >
    <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
  </div>
);

const PromptBubble: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div
    style={{
      background: '#F5F0E8',
      color: '#2a2a2a',
      borderRadius: 36,
      borderBottomRightRadius: 8,
      padding: '34px 40px',
      fontWeight: 500,
      fontSize: 34,
      lineHeight: 1.45,
      boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
    }}
  >
    {children}
  </div>
);

const Check: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{display: 'flex', gap: 22, alignItems: 'flex-start'}}>
    <div
      style={{
        width: 46,
        height: 46,
        borderRadius: '50%',
        background: GREEN,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
      }}
    >
      <svg width={26} height={26} viewBox="0 0 26 26">
        <path d="M4 13 l6 6 l12 -13" stroke="white" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <div style={{fontWeight: 500, fontSize: 36, lineHeight: 1.35}}>{children}</div>
  </div>
);

const Arrow: React.FC<{size?: number}> = ({size = 90}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{flexShrink: 0}}>
    <path d="M10 50 H 80 M 55 22 L 85 50 L 55 78" stroke={YELLOW} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WORDS: [string, string][] = [
  ['Друзья,', '0,00'],
  ['всем', '0,98'],
  ['привет!', '1,06'],
  ['Я', '1,66'],
  ['сейчас', '1,74'],
  ['тестирую', '2,08'],
  ['Claude.', '3,20'],
  ['Хочу', '3,76'],
];

const SCENES: [string, string][] = [
  ['scene1.jpg', '«Всем привет!»'],
  ['scene2.jpg', '«Тестирую Claude»'],
  ['scene3.jpg', '«Рилс с помощью нейросети»'],
  ['scene4.jpg', '«Посмотрим, что выйдет»'],
];

const slides: React.ReactNode[] = [
  // 1 — cover
  <>
    <Title size={84}>
      Как я сделала Reels с <Hl>разделённым экраном</Hl>
    </Title>
    <Body size={40}>из обычного селфи-видео — с помощью нейросети Claude</Body>
    <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}>
      <Phone src="carousel/original.jpg" height={620} rotate={-5} />
      <Arrow />
      <Phone src="carousel/split.jpg" height={700} rotate={4} accent={YELLOW} />
    </div>
  </>,
  // 2 — the source
  <>
    <Title>
      С чего я <Hl>начала</Hl>
    </Title>
    <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: 60}}>
      <Phone src="carousel/original.jpg" height={820} />
      <div style={{display: 'flex', flexDirection: 'column', gap: 34}}>
        <Body size={40}>Обычное видео на телефон:</Body>
        {['10 секунд', 'просто говорю в камеру', 'без монтажа', 'без субтитров', 'без графики'].map((t) => (
          <div key={t} style={{fontWeight: 800, fontSize: 40, display: 'flex', gap: 18}}>
            <Hl color={PINK}>—</Hl>
            {t}
          </div>
        ))}
      </div>
    </div>
  </>,
  // 3 — the prompt
  <>
    <StepTag n={1} />
    <Title>
      Поставила задачу <Hl>нейросети</Hl>
    </Title>
    <Body>Загрузила видео в Claude и написала обычными словами:</Body>
    <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 40}}>
      <PromptBubble>
        «Сделай вертикальный ролик 9:16 с анимированными субтитрами по словам, синхронно с речью — в стиле
        TikTok, с подсветкой текущего слова. Субтитры не перекрывают лицо, крупные, отступ снизу не меньше 170
        пикселей. Шрифт простой и читаемый.»
      </PromptBubble>
      <Body size={34}>
        Видео собиралось в <Hl color={CYAN}>Remotion</Hl> — это инструмент, который делает ролики из кода. Код
        писала нейросеть, не я.
      </Body>
    </div>
  </>,
  // 4 — transcription
  <>
    <StepTag n={2} />
    <Title size={64}>
      Нейросеть <Hl>расшифровала</Hl> мою речь
    </Title>
    <Body>Каждое слово получило точное время — когда я начинаю его произносить:</Body>
    <div style={{display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 10}}>
      {WORDS.map(([word, time]) => (
        <div
          key={word}
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '2px solid rgba(255,255,255,0.15)',
            borderRadius: 22,
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <span style={{fontWeight: 800, fontSize: 38}}>{word}</span>
          <span style={{fontWeight: 500, fontSize: 26, color: CYAN}}>{time} с</span>
        </div>
      ))}
    </div>
    <div style={{flex: 1}} />
    <div style={{background: 'rgba(255,93,162,0.14)', border: `2px solid ${PINK}`, borderRadius: 28, padding: '28px 34px'}}>
      <div style={{fontWeight: 800, fontSize: 34, marginBottom: 12}}>Пара ошибок распознавания:</div>
      <Body size={34}>
        «срил» → <Hl>рилс</Hl>, «меросети» → <Hl>нейросети</Hl>, «клод» → <Hl>Claude</Hl>. Их исправили до
        сборки ролика.
      </Body>
    </div>
  </>,
  // 5 — TikTok captions
  <>
    <StepTag n={3} />
    <Title>
      Субтитры <Hl>как в TikTok</Hl>
    </Title>
    <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: 56}}>
      <Phone src="carousel/reel.jpg" height={800} accent={YELLOW} />
      <div style={{display: 'flex', flexDirection: 'column', gap: 36}}>
        <Check>
          Слово, которое я говорю, <Hl>подсвечивается</Hl>
        </Check>
        <Check>Крупный читаемый шрифт</Check>
        <Check>Лицо открыто</Check>
        <Check>Отступ снизу 300 px</Check>
      </div>
    </div>
  </>,
  // 6 — split screen
  <>
    <StepTag n={4} />
    <Title>
      Разделила <Hl>экран</Hl>
    </Title>
    <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: 50}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 36, flex: 1}}>
        <PromptBubble>«Сделай это видео в виде раздельных экранов: мой сверху, снизу анимированные картинки, которые иллюстрируют то, что я говорю.»</PromptBubble>
        <Body size={34}>
          Сверху — я, снизу — <Hl color={CYAN}>анимация</Hl>, субтитры остались.
        </Body>
      </div>
      <Phone src="carousel/split.jpg" height={700} accent={YELLOW} />
    </div>
  </>,
  // 7 — illustrations
  <>
    <StepTag n={5} />
    <Title size={64}>
      Картинка на <Hl>каждую фразу</Hl>
    </Title>
    <div style={{flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignContent: 'center'}}>
      {SCENES.map(([src, label]) => (
        <div key={src} style={{display: 'flex', flexDirection: 'column', gap: 14}}>
          <Img
            src={staticFile(`carousel/${src}`)}
            style={{width: '100%', borderRadius: 26, border: '3px solid rgba(255,255,255,0.15)'}}
          />
          <div style={{fontWeight: 800, fontSize: 30, textAlign: 'center'}}>{label}</div>
        </div>
      ))}
    </div>
    <Body size={34}>Анимации сменяются ровно в тот момент, когда я начинаю новую фразу.</Body>
  </>,
  // 8 — before / after
  <>
    <Title>
      Было → <Hl>стало</Hl>
    </Title>
    <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30}}>
      {[
        ['carousel/original.jpg', 'Было', undefined],
        ['carousel/split.jpg', 'Стало', YELLOW],
      ].map(([src, label, accent]) => (
        <div key={src} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24}}>
          <div style={{fontWeight: 800, fontSize: 40, textTransform: 'uppercase', color: accent ?? MUTED}}>{label}</div>
          <Phone src={src as string} height={780} accent={accent} />
        </div>
      ))}
    </div>
  </>,
  // 9 — call to action: course pre-registration
  <>
    <div
      style={{
        alignSelf: 'flex-start',
        background: PINK,
        color: 'white',
        fontWeight: 800,
        fontSize: 30,
        padding: '10px 26px',
        borderRadius: 999,
        textTransform: 'uppercase',
      }}
    >
      Открыта предзапись
    </div>
    <Title size={76}>
      Научу делать <Hl>такие Reels</Hl> с нейросетью
    </Title>
    <Body size={38}>Без монтажа и сложных программ — пошагово, на твоих собственных видео.</Body>
    <div style={{display: 'flex', flexDirection: 'column', gap: 26, marginTop: 10}}>
      <Check>Субтитры, которые попадают в каждое слово</Check>
      <Check>Разделённый экран с анимацией под твой текст</Check>
      <Check>Карусели для постов — как эта</Check>
    </div>
    <div style={{flex: 1}} />
    <div
      style={{
        background: YELLOW,
        color: '#14132a',
        borderRadius: 36,
        padding: '40px 44px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        boxShadow: '0 24px 60px rgba(255,230,0,0.25)',
      }}
    >
      <div style={{fontWeight: 800, fontSize: 50, lineHeight: 1.15, textTransform: 'uppercase'}}>
        Напиши «{CTA_KEYWORD}» в комментариях
      </div>
      <div style={{fontWeight: 500, fontSize: 34, lineHeight: 1.35}}>
        и я пришлю тебе в директ подробности курса и ссылку на предзапись
      </div>
    </div>
  </>,
];

export const SLIDE_COUNT = slides.length;

export const Carousel: React.FC = () => {
  const frame = useCurrentFrame();
  const isLast = frame === slides.length - 1;

  return (
    <AbsoluteFill
      style={{
        background: 'radial-gradient(circle at 50% 25%, #2b2660 0%, #15132e 60%, #0b0a1a 100%)',
        color: 'white',
        fontFamily: FONT_FAMILY,
        padding: '70px 80px 60px',
        display: 'flex',
        flexDirection: 'column',
        gap: 30,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          background: `linear-gradient(90deg, ${YELLOW}, ${PINK}, ${CYAN})`,
        }}
      />
      {slides[frame]}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 500, fontSize: 28, color: MUTED}}>
        <span>
          {frame + 1} / {slides.length}
        </span>
        {isLast ? null : <span style={{fontWeight: 800, color: YELLOW}}>листай →</span>}
      </div>
    </AbsoluteFill>
  );
};

import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import type {TikTokPage} from '@remotion/captions';
import {FONT_FAMILY} from './fonts';

const HIGHLIGHT_COLOR = '#FFE600';
export const CaptionPage: React.FC<{page: TikTokPage; bottomOffset: number; fontSize: number}> = ({
  page,
  bottomOffset,
  fontSize,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Current time relative to the start of the sequence, converted to absolute time
  const absoluteTimeMs = page.startMs + (frame / fps) * 1000;

  const enter = spring({frame, fps, config: {damping: 14, stiffness: 200}, durationInFrames: 8});

  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: bottomOffset}}>
      <div
        style={{
          maxWidth: 940,
          textAlign: 'center',
          fontFamily: FONT_FAMILY,
          fontWeight: 800,
          fontSize,
          lineHeight: 1.25,
          textTransform: 'uppercase',
          transform: `translateY(${interpolate(enter, [0, 1], [40, 0])}px) scale(${interpolate(enter, [0, 1], [0.85, 1])})`,
          opacity: enter,
        }}
      >
        {page.tokens.map((token) => {
          const isActive = token.fromMs <= absoluteTimeMs && token.toMs > absoluteTimeMs;
          const activeFrame = Math.round(((token.fromMs - page.startMs) / 1000) * fps);
          const pop = isActive
            ? spring({frame: frame - activeFrame, fps, config: {damping: 10, stiffness: 300}, durationInFrames: 6})
            : 0;

          return (
            <span
              key={token.fromMs}
              style={{
                display: 'inline-block',
                margin: '0 0.24em',
                color: isActive ? HIGHLIGHT_COLOR : 'white',
                transform: `scale(${1 + 0.08 * pop})`,
                WebkitTextStroke: '14px black',
                paintOrder: 'stroke fill',
                textShadow: '0 6px 18px rgba(0,0,0,0.55)',
              }}
            >
              {token.text.trim()}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

import {useMemo} from 'react';
import {AbsoluteFill, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Video} from '@remotion/media';
import type {Caption} from '@remotion/captions';
import {Captions, splitIntoSentences} from './Captions';
import {SCENE_HEIGHT, SCENE_WIDTH, SCENES} from './Illustrations';

const HALF = 960;
const VIDEO_TOP = -380;
// Start each illustration slightly before the sentence it illustrates
const SCENE_LEAD_FRAMES = 4;

const SceneShell: React.FC<{children: React.ReactNode; fadeOut: boolean}> = ({children, fadeOut}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 14, stiffness: 160}});
  const exit = fadeOut
    ? interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
    : 1;

  return (
    <AbsoluteFill
      style={{
        top: 20,
        height: SCENE_HEIGHT,
        alignItems: 'center',
        opacity: Math.min(enter, exit),
        transform: `translateY(${interpolate(enter, [0, 1], [60, 0])}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const SplitScreenVideo: React.FC<{captions: Caption[]}> = ({captions}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const sceneStarts = useMemo(
    () =>
      splitIntoSentences(captions)
        .slice(0, SCENES.length)
        .map((sentence, i) => (i === 0 ? 0 : Math.round((sentence[0].startMs / 1000) * fps) - SCENE_LEAD_FRAMES)),
    [captions, fps],
  );

  return (
    <AbsoluteFill style={{backgroundColor: 'black'}}>
      <div style={{position: 'absolute', top: 0, width: '100%', height: HALF, overflow: 'hidden'}}>
        {/* Scale the 9:16 source to full width and crop so the face sits in the middle of the top half */}
        <Video
          src={staticFile('video.mp4')}
          style={{position: 'absolute', width: 1080, height: 1920, top: VIDEO_TOP}}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          top: HALF,
          width: '100%',
          height: HALF,
          overflow: 'hidden',
          background: 'radial-gradient(circle at 50% 30%, #2b2660 0%, #15132e 60%, #0b0a1a 100%)',
        }}
      >
        {/* Slowly drifting dots keep the background alive between scenes */}
        {Array.from({length: 12}).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: ((i * 97 + frame * (0.6 + (i % 3) * 0.3)) % (SCENE_WIDTH + 40)) - 20,
              top: (i * 173) % HALF,
              width: 8 + (i % 4) * 4,
              height: 8 + (i % 4) * 4,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
            }}
          />
        ))}
        {sceneStarts.map((start, i) => {
          const Scene = SCENES[i];
          const end = sceneStarts[i + 1] ?? durationInFrames;
          return (
            <Sequence key={i} from={start} durationInFrames={end - start}>
              <SceneShell fadeOut={i < sceneStarts.length - 1}>
                <Scene />
              </SceneShell>
            </Sequence>
          );
        })}
      </div>
      <div
        style={{
          position: 'absolute',
          top: HALF - 4,
          width: '100%',
          height: 8,
          background: 'linear-gradient(90deg, #FFE600, #FF5DA2, #4FD1FF)',
        }}
      />
      {/* Bottom margin required by the brief is at least 170 px */}
      <Captions captions={captions} bottomOffset={190} fontSize={78} />
    </AbsoluteFill>
  );
};

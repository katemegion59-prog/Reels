import {useMemo} from 'react';
import {AbsoluteFill, Sequence, staticFile, useVideoConfig} from 'remotion';
import {Video} from '@remotion/media';
import {loadFont} from '@remotion/fonts';
import {createTikTokStyleCaptions} from '@remotion/captions';
import type {Caption} from '@remotion/captions';
import {CaptionPage} from './CaptionPage';

export const FONT_FAMILY = 'Montserrat';

for (const subset of ['cyrillic', 'latin']) {
  loadFont({
    family: FONT_FAMILY,
    url: staticFile(`montserrat-${subset}-800-normal.woff2`),
    weight: '800',
  });
}

// Higher values = more words per page
const SWITCH_CAPTIONS_EVERY_MS = 1100;

export const CaptionedVideo: React.FC<{captions: Caption[]}> = ({captions}) => {
  const {fps} = useVideoConfig();

  // Split into sentences first so a page never spans the end of one sentence and the start of the next
  const pages = useMemo(() => {
    const sentences: Caption[][] = [[]];
    for (const caption of captions) {
      sentences[sentences.length - 1].push(caption);
      if (/[.!?]$/.test(caption.text.trim())) {
        sentences.push([]);
      }
    }
    return sentences
      .filter((sentence) => sentence.length > 0)
      .flatMap(
        (sentence) =>
          createTikTokStyleCaptions({
            captions: sentence,
            combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
          }).pages,
      );
  }, [captions]);

  return (
    <AbsoluteFill style={{backgroundColor: 'black'}}>
      <Video src={staticFile('video.mp4')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      {pages.map((page, index) => {
        const nextPage = pages[index + 1] ?? null;
        const startFrame = Math.round((page.startMs / 1000) * fps);
        const lastTokenEnd = page.tokens[page.tokens.length - 1].toMs;
        // Keep the page on screen until the next one starts, or briefly after the last word
        const endMs = nextPage ? nextPage.startMs : lastTokenEnd + 600;
        const endFrame = Math.round((endMs / 1000) * fps);
        const durationInFrames = endFrame - startFrame;

        if (durationInFrames <= 0) {
          return null;
        }

        return (
          <Sequence key={index} from={startFrame} durationInFrames={durationInFrames}>
            <CaptionPage page={page} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

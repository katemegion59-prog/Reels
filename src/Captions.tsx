import {useMemo} from 'react';
import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import {createTikTokStyleCaptions} from '@remotion/captions';
import type {Caption} from '@remotion/captions';
import {CaptionPage} from './CaptionPage';

// Higher values = more words per page
const SWITCH_CAPTIONS_EVERY_MS = 1100;

export const splitIntoSentences = (captions: Caption[]): Caption[][] => {
  const sentences: Caption[][] = [[]];
  for (const caption of captions) {
    sentences[sentences.length - 1].push(caption);
    if (/[.!?]$/.test(caption.text.trim())) {
      sentences.push([]);
    }
  }
  return sentences.filter((sentence) => sentence.length > 0);
};

export const Captions: React.FC<{captions: Caption[]; bottomOffset: number; fontSize: number}> = ({
  captions,
  bottomOffset,
  fontSize,
}) => {
  const {fps} = useVideoConfig();

  // Split into sentences first so a page never spans the end of one sentence and the start of the next
  const pages = useMemo(
    () =>
      splitIntoSentences(captions).flatMap(
        (sentence) =>
          createTikTokStyleCaptions({
            captions: sentence,
            combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
          }).pages,
      ),
    [captions],
  );

  return (
    <AbsoluteFill>
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
            <CaptionPage page={page} bottomOffset={bottomOffset} fontSize={fontSize} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

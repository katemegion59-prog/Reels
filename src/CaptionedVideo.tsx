import {AbsoluteFill, staticFile} from 'remotion';
import {Video} from '@remotion/media';
import type {Caption} from '@remotion/captions';
import {Captions} from './Captions';

export const CaptionedVideo: React.FC<{captions: Caption[]}> = ({captions}) => {
  return (
    <AbsoluteFill style={{backgroundColor: 'black'}}>
      <Video src={staticFile('video.mp4')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      {/* Bottom margin required by the brief is at least 170 px; keep extra room for platform UI */}
      <Captions captions={captions} bottomOffset={300} fontSize={86} />
    </AbsoluteFill>
  );
};

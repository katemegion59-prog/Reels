import {Composition, staticFile} from 'remotion';
import type {Caption} from '@remotion/captions';
import {CaptionedVideo} from './CaptionedVideo';
import {SplitScreenVideo} from './SplitScreenVideo';
import {Carousel, SLIDE_COUNT, SLIDE_HEIGHT, SLIDE_WIDTH} from './Carousel';

const FPS = 30;

const calculateMetadata = async () => {
  const captions: Caption[] = await fetch(staticFile('captions.json')).then((r) => r.json());
  // Source video is 10.04 s long
  return {durationInFrames: Math.floor(10.04 * FPS), props: {captions}};
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CaptionedVideo"
        component={CaptionedVideo}
        width={1080}
        height={1920}
        fps={FPS}
        durationInFrames={300}
        defaultProps={{captions: [] as Caption[]}}
        calculateMetadata={calculateMetadata}
      />
      <Composition
        id="SplitScreen"
        component={SplitScreenVideo}
        width={1080}
        height={1920}
        fps={FPS}
        durationInFrames={300}
        defaultProps={{captions: [] as Caption[]}}
        calculateMetadata={calculateMetadata}
      />
      {/* Each frame is one carousel slide; render with --sequence to get one PNG per slide */}
      <Composition
        id="Carousel"
        component={Carousel}
        width={SLIDE_WIDTH}
        height={SLIDE_HEIGHT}
        fps={1}
        durationInFrames={SLIDE_COUNT}
      />
    </>
  );
};

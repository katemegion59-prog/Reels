import {staticFile} from 'remotion';
import {loadFont} from '@remotion/fonts';

export const FONT_FAMILY = 'Montserrat';

for (const subset of ['cyrillic', 'latin']) {
  loadFont({
    family: FONT_FAMILY,
    url: staticFile(`montserrat-${subset}-800-normal.woff2`),
    weight: '800',
  });
}

import {staticFile} from 'remotion';
import {loadFont} from '@remotion/fonts';

export const FONT_FAMILY = 'Montserrat';

for (const weight of ['500', '800']) {
  for (const subset of ['cyrillic', 'latin']) {
    loadFont({
      family: FONT_FAMILY,
      url: staticFile(`montserrat-${subset}-${weight}-normal.woff2`),
      weight,
    });
  }
}

# Reels — вертикальный ролик с анимированными субтитрами (Remotion)

- `public/video.mp4` — исходное видео
- `public/captions.json` — слова с таймингами (Whisper small, исправлены ошибки распознавания)
- `src/` — композиция `CaptionedVideo` 1080×1920, 30 fps

Рендер: `npm run render` → `out/reel.mp4`

## Split screen

Композиция `SplitScreen`: сверху видео, снизу анимированные иллюстрации к каждой фразе (`src/Illustrations.tsx`).
Сцены привязаны к началу предложений в `captions.json`.

Рендер: `npm run render:split` → `out/reel-split.mp4`

## Карусель

Композиция `Carousel` (1080×1350, один кадр = один слайд): история о том, как из исходного видео получился Reels.
Скриншоты для слайдов лежат в `public/carousel/`.

Рендер: `npm run render:carousel` → `out/carousel/element-*.png`

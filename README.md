# Reels — вертикальный ролик с анимированными субтитрами (Remotion)

- `public/video.mp4` — исходное видео
- `public/captions.json` — слова с таймингами (Whisper small, исправлены ошибки распознавания)
- `src/` — композиция `CaptionedVideo` 1080×1920, 30 fps

Рендер: `npm run render` → `out/reel.mp4`

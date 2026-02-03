# Valentine's Day — Will you be my Valentine? 💕

A romantic, interactive single-page web app where someone asks their special someone to be their Valentine. Built with **React**, **Tailwind CSS**, and smooth animations.

## Features

- **Single-page**: No routing, no reloads; one hero section at 100vh
- **Floating hearts**: Infinite spawn (800–1400ms), 20–40s lifespan, gentle drift and rotation, removed from DOM after exit
- **Arc heading**: "Heyyy! Beautiful!!" with letter-by-letter fade+slide along a soft arch
- **State flow**: Initial question → "May I?" → YES/NO → "Will you be my Valentine?" → YES = celebration, NO = button dodges
- **Celebration**: Roses and hearts falling, couple image placeholder, soft success state
- **Optional sound**: Chime on first interaction, pop on buttons, success on final YES (add your own audio files in `src/hooks/useSound.js`)
- **Responsive**: Works on desktop and mobile

## Tech stack

- React 18
- Vite
- Tailwind CSS
- Vanilla JS (requestAnimationFrame) for heart animation

## Setup

```bash
cd valentines-app
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

Static output is in `dist/`; deploy to any static host (Vercel, Netlify, GitHub Pages, etc.).

## Customization

- **Background image**: In `App.jsx`, add your red/pink hearts image to the background div (see comment).
- **Sounds**: In `src/hooks/useSound.js`, set `SOUNDS.chime`, `SOUNDS.pop`, and `SOUNDS.success` to your audio file paths (e.g. in `public/sounds/`).
- **Couple image**: Replace the emoji in `src/components/Celebration.jsx` with an `<img>` to your image or GIF.

## Code structure

- `src/App.jsx` — State machine (initial → first_yes / first_no → celebration), layout, content
- `src/components/FloatingHearts.jsx` — Heart spawn loop, requestAnimationFrame animation, DOM cleanup
- `src/components/ArcHeading.jsx` — Arc text and letter animation
- `src/components/ActionButtons.jsx` — YES/NO buttons, NO dodge logic when in final question
- `src/components/SparkleOverlay.jsx` — Glitter overlay during transitions
- `src/components/Celebration.jsx` — Falling roses/hearts and success message
- `src/hooks/useSound.js` — Optional sound (chime, pop, success)

## Troubleshooting (can't see the app?)

1. **Use the URL Vite prints**  
   After `npm run dev`, Vite shows something like `Local: http://localhost:5174/`. Open that exact URL (the port can be 5173, 5174, etc. if another app is using the port).

2. **Run from the app folder**  
   In the terminal, run:
   ```bash
   cd "d:\cursor projects\valentines-app"
   npm run dev
   ```
   (Or `cd valentines-app` if you're already in `d:\cursor projects`.)

3. **Check the browser console**  
   Press **F12** → **Console**. If you see red errors, that explains the blank or broken page. The app now has an error boundary: if React crashes, you’ll see “Something went wrong” and can open the console for details.

4. **Hard refresh**  
   Try **Ctrl+Shift+R** (or Cmd+Shift+R on Mac) to clear cache and reload.

Enjoy, and good luck! 💕

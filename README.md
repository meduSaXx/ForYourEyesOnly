# A World of Your Own - birthday website for Sammie

Plain HTML / CSS / JavaScript (ES modules) built with Vite. No framework, no API keys, no .env.

## Run locally (VS Code)
1. Install Node.js 18+ from https://nodejs.org
2. Unzip, then in VS Code: File > Open Folder > `sammie-birthday`
3. Terminal > New Terminal, then:

    npm install
    npm run dev

4. Open the address it prints (usually http://localhost:5173). Use `localhost`, not a file:// path (the PIN check needs a secure context).

## Production build
    npm run build      # output folder: dist
    npm run preview    # optional: test the built site locally

## Deploy on Vercel
Import the folder/repo. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.

## Where things are
- `index.html` page markup and the letter text (`<script id="letter">`)
- `src/main.js` calendar, PIN, intro animation, music, letter pages
- `src/styles.css` all styling
- `public/assets/` stickers, postcard images and both audio files; `src/assets/paper.jpg` letter paper

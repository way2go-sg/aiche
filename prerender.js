import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { preview } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

// LIST YOUR ROUTES HERE
const routesToPrerender = ['/', '/menu', '/events', '/insider', '/board'];

(async () => {
  console.log('⚡ Prerendering started...');
  
  // 1. Build the app first (ensures dist exists)
  // We assume 'npm run build' runs 'vite build' before this script starts.

  // 2. Start the Preview Server
  const server = await preview({
    preview: { port: 1337 },
    root: toAbsolute('dist'),
    configFile: false,
  });

  const browser = await puppeteer.launch();

  for (const route of routesToPrerender) {
    const page = await browser.newPage();
    
    // 3. Visit the route
    try {
      await page.goto(`http://localhost:1337${route}`, {
        waitUntil: 'networkidle0', // Waits for animations/images to settle
      });

      // 4. Capture the HTML
      const html = await page.content();

      // 5. Save to dist/route/index.html
      // Handle the root route '/' specifically
      const filePath = route === '/' 
        ? 'dist/index.html' 
        : `dist${route}/index.html`;

      const dir = path.dirname(toAbsolute(filePath));
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      fs.writeFileSync(toAbsolute(filePath), html);
      console.log(`✅ Generated: ${filePath}`);
    } catch (e) {
      console.error(`❌ Failed to render ${route}:`, e);
    }
    
    await page.close();
  }

  await browser.close();
  server.httpServer.close();
  console.log('🎉 Prerendering complete!');
  process.exit(0);
})();
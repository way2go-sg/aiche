import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { preview } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const routesToPrerender = ['/', '/menu', '/events', '/insider', '/board'];

(async () => {
  console.log('⚡ Prerendering started...');
  
  let server;
  let browser;

  try {
    // 1. Start the Preview Server
    server = await preview({
      preview: { port: 1337 },
      root: toAbsolute('dist'),
      configFile: false,
    });

    // 2. Try to launch browser (Will work locally, might fail on Vercel)
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Helps in some CI environments
    });

  } catch (e) {
    console.warn('\n⚠️  WARNING: Could not launch browser for pre-rendering.');
    console.warn('   This is expected on Vercel/Netlify free tier builds.');
    console.warn('   Your site will still work, but "social media preview cards" might default to index.html.');
    console.warn('   Google SEO will still work fine (Google runs JS).\n');
    
    // Close server if it started
    if (server) server.httpServer.close();
    
    // EXIT SUCCESSFULLY so the build doesn't fail
    process.exit(0);
  }

  // ... (The rest of your loop code remains the same) ...
  try {
    for (const route of routesToPrerender) {
        const page = await browser.newPage();
        await page.goto(`http://localhost:1337${route}`, { waitUntil: 'networkidle0' });
        
        const html = await page.content();
        const filePath = route === '/' ? 'dist/index.html' : `dist${route}/index.html`;
        const dir = path.dirname(toAbsolute(filePath));
        
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(toAbsolute(filePath), html);
        console.log(`✅ Generated: ${filePath}`);
        await page.close();
    }
  } catch (e) {
      console.error('Error during page rendering:', e);
  }

  await browser.close();
  server.httpServer.close();
  console.log('🎉 Prerendering complete!');
  process.exit(0);
})();
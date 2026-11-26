import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import wawoff2 from 'wawoff2';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const brand500 = '#1BB549';
const brand700 = '#11803A';
const brand50 = '#EEFAF2';
const ink900 = '#0F1A14';
const ink500 = '#5E6D64';
const surface = '#FFFFFF';

const fontFamily = 'Plus Jakarta Sans';
const width = 1200;
const height = 627;
const pad = 72;
const safeWidth = width - pad * 2;

const line1 = 'La tua app iOS e Android,';
const line2 = 'ad abbonamento.';
const subtitle = 'React Native per startup e PMI · Disdici quando vuoi';
const pill = 'Si parte in 14 giorni · 7 giorni di prova';

const el = (type, props) => ({ type, props });

async function loadFont(weight) {
  const file = join(root, `public/fonts/plus-jakarta-sans-${weight}.woff2`);
  const compressed = await readFile(file);
  // wawoff2 reuses one wasm buffer, so copy before the next decode.
  return Buffer.from(await wawoff2.decompress(compressed));
}

async function loadLogo() {
  const svg = await readFile(join(root, 'public/logo.svg'), 'utf8');
  const path = svg.match(/<path\b[^>]*\bd="([^"]+)"/)?.[1];
  if (!path) throw new Error('public/logo.svg has no path to draw');
  return path;
}

async function textWidth(text, style, fonts) {
  const svg = await satori(
    el('div', {
      style: {
        fontFamily,
        display: 'flex',
        ...style,
      },
      children: text,
    }),
    { width: 2400, height: 400, fonts },
  );
  const png = new Resvg(svg).render().asPng();
  const trimmed = await sharp(png).trim().png().toBuffer({ resolveWithObject: true });
  return trimmed.info.width;
}

async function main() {
  const font400 = await loadFont(400);
  const font500 = await loadFont(500);
  const font700 = await loadFont(700);
  const font800 = await loadFont(800);
  const logoPath = await loadLogo();

  const fonts = [
    { name: fontFamily, data: font400, weight: 400, style: 'normal' },
    { name: fontFamily, data: font500, weight: 500, style: 'normal' },
    { name: fontFamily, data: font700, weight: 700, style: 'normal' },
    { name: fontFamily, data: font800, weight: 800, style: 'normal' },
  ];

  const displayTracking = -2;
  let headlineSize = 68;
  let headlineWidth = safeWidth;

  for (const size of [76, 74, 72, 70, 68]) {
    const measured = Math.max(
      await textWidth(line1, { fontSize: size, fontWeight: 800, letterSpacing: displayTracking }, fonts),
      await textWidth(line2, { fontSize: size, fontWeight: 800, letterSpacing: displayTracking }, fonts),
    );
    if (measured <= safeWidth) {
      headlineSize = size;
      headlineWidth = measured;
      break;
    }
  }

  const headlineLeading = Math.round((headlineSize * 70) / 64);
  const subtitleWidth = await textWidth(subtitle, {
    fontSize: 30,
    fontWeight: 400,
    letterSpacing: 0,
  }, fonts);

  if (subtitleWidth > safeWidth) {
    throw new Error(`Subtitle is ${subtitleWidth}px, wider than the ${safeWidth}px safe area`);
  }

  const roomOnRight = safeWidth - Math.max(headlineWidth, subtitleWidth);
  const shapeSize = roomOnRight >= 280 ? Math.min(360, roomOnRight - 48) : 0;

  const logo = el('svg', {
    width: 48,
    height: 48,
    viewBox: '0 0 300 300',
    style: { width: 48, height: 48 },
    children: [
      el('rect', { width: 300, height: 300, fill: brand500 }),
      el('path', { d: logoPath, fill: '#FEFEFE', fillRule: 'evenodd', clipRule: 'evenodd' }),
    ],
  });

  const wordmark = el('div', {
    style: {
      fontSize: 26,
      lineHeight: '42px',
      fontWeight: 700,
      letterSpacing: 0,
      color: ink900,
    },
    children: 'Santo Riggio',
  });

  const headline = el('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: headlineSize,
      lineHeight: `${headlineLeading}px`,
      fontWeight: 800,
      letterSpacing: displayTracking,
    },
    children: [
      el('div', { style: { color: ink900 }, children: line1 }),
      el('div', { style: { color: brand500 }, children: line2 }),
    ],
  });

  const sub = el('div', {
    style: {
      fontSize: 30,
      lineHeight: '49px',
      fontWeight: 400,
      letterSpacing: 0,
      color: ink500,
    },
    children: subtitle,
  });

  const trust = el('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 24px',
      borderRadius: 999,
      backgroundColor: brand50,
      color: brand700,
      fontSize: 21,
      lineHeight: '30px',
      fontWeight: 500,
      letterSpacing: 0,
    },
    children: [
      el('div', {
        style: {
          width: 12,
          height: 12,
          borderRadius: 999,
          backgroundColor: brand500,
        },
      }),
      pill,
    ],
  });

  const domain = el('div', {
    style: {
      fontSize: 21,
      lineHeight: '30px',
      fontWeight: 500,
      letterSpacing: 0,
      color: ink500,
    },
    children: 'santoriggio.it',
  });

  const shape = shapeSize
    ? el('div', {
        style: {
          position: 'absolute',
          right: pad,
          top: Math.round((height - shapeSize) / 2),
          width: shapeSize,
          height: shapeSize,
          borderRadius: shapeSize / 2,
          backgroundColor: brand50,
        },
      })
    : null;

  const tree = el('div', {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: pad,
      backgroundColor: surface,
      fontFamily,
      position: 'relative',
      boxSizing: 'border-box',
    },
    children: [
      shape,
      el('div', {
        style: { display: 'flex', alignItems: 'center', gap: 15 },
        children: [logo, wordmark],
      }),
      el('div', {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 24,
          flexGrow: 1,
        },
        children: [headline, sub],
      }),
      el('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        children: [trust, domain],
      }),
    ].filter(Boolean),
  });

  const svg = await satori(tree, { width, height, fonts });
  let png = new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng();

  if (png.length > 300 * 1024) {
    png = await sharp(png).png({ compressionLevel: 9 }).toBuffer();
  }

  const meta = await sharp(png).metadata();
  if (meta.width !== width || meta.height !== height) {
    throw new Error(`Expected ${width}×${height}, got ${meta.width}×${meta.height}`);
  }
  if (png.length > 300 * 1024) {
    throw new Error(`OG image is ${png.length} bytes, over the 300 KB limit`);
  }

  const out = join(root, 'public/og-image.png');
  await writeFile(out, png);
  console.log(
    `og-image.png ${meta.width}×${meta.height}, ${png.length} bytes, headline ${headlineSize}px, shape ${shapeSize || 'none'}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

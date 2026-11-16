/**
 * Brand photography generator -> public/images/*.webp
 * Run in background: nohup bun scripts/generate-images.mjs > scripts/imggen.log 2>&1 &
 */
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const TMP = '/home/z/my-project/.tmp-img';
const OUT = '/home/z/my-project/public/images';
fs.mkdirSync(TMP, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

const COMMON = 'photorealistic professional travel photography, warm golden sunrise light, high quality, detailed, no text, no watermark, no logo';

const IMAGES = [
  { name: 'hot-air-balloon-marrakech-sunrise-atlas', size: '1536x768', prompt: `Several colorful hot air balloons floating at sunrise above Marrakech palm grove, snow-capped Atlas Mountains on the horizon, pink and orange sky, ` + COMMON },
  { name: 'montgolfiere-marrakech-palmeraie-lever-soleil', size: '1344x768', prompt: `Single hot air balloon flying low over a lush palm grove near Marrakech at dawn, palm trees below, soft golden mist, ` + COMMON },
  { name: 'hot-air-balloon-private-flight-couple-marrakech', size: '1344x768', prompt: `Romantic couple standing in a hot air balloon wicker basket at sunrise, view over desert landscape and mountains, warm light on their faces, ` + COMMON },
  { name: 'hot-air-balloon-vip-flight-champagne-marrakech', size: '1344x768', prompt: `Passengers toasting with sparkling wine glasses inside a luxury hot air balloon basket above Morocco landscape at sunrise, elegant atmosphere, ` + COMMON },
  { name: 'hot-air-balloon-camel-ride-combo-marrakech', size: '1344x768', prompt: `Camel caravan walking through a palm grove near Marrakech in early morning light, a colorful hot air balloon in the sky above, ` + COMMON },
  { name: 'hot-air-balloon-agafay-desert-marrakech', size: '1344x768', prompt: `Hot air balloon floating over the Agafay stone desert in Morocco, arid hills and dunes, Atlas Mountains far in background, sunrise colors, ` + COMMON },
  { name: 'hot-air-balloon-agadir-souss-valley', size: '1344x768', prompt: `Hot air balloon flying over green Souss valley fields and argan trees near Agadir Morocco, Atlantic ocean faintly visible in the distance, morning haze, ` + COMMON },
  { name: 'berber-breakfast-hot-air-balloon-marrakech', size: '1344x768', prompt: `Traditional Moroccan Berber breakfast served outdoors after balloon flight: mint tea, msemen pancakes, olives, amlou, carpets and low tables in a desert camp, morning sun, ` + COMMON },
  { name: 'hot-air-balloon-inflation-dawn-marrakech', size: '1344x768', prompt: `Ground crew inflating a large colorful hot air balloon envelope at dawn in Morocco, glowing burner flame, dramatic sky, ` + COMMON },
  { name: 'hot-air-balloon-flight-certificate-landing', size: '1344x768', prompt: `Happy group of tourists celebrating after hot air balloon landing in Moroccan field, holding flight certificates, pilot shaking hands, morning light, ` + COMMON },
  { name: 'hot-air-balloon-pilot-morocco', size: '864x1152', prompt: `Portrait of a friendly Moroccan hot air balloon pilot in his 40s wearing professional flight uniform, standing in front of a hot air balloon basket at sunrise, confident warm smile, ` + COMMON },
  { name: 'atlas-mountains-hot-air-balloon-aerial', size: '1536x768', prompt: `Aerial view from a hot air balloon over the snow-capped High Atlas Mountains in Morocco at sunrise, layered mountain ridges, dramatic valleys, ` + COMMON },
  { name: 'hot-air-balloon-burner-flame', size: '1344x768', prompt: `Close-up of hot air balloon burner shooting a bright flame into the envelope, inside view of colorful nylon fabric, blue morning sky, ` + COMMON },
  { name: 'hot-air-balloon-marriage-proposal-marrakech', size: '1344x768', prompt: `Man proposing with a ring to his partner in a private hot air balloon basket above Morocco at sunrise, small banner attached to basket, romantic golden light, ` + COMMON },
  { name: 'marrakech-medina-aerial-sunrise', size: '1344x768', prompt: `Aerial view of Marrakech medina rooftops and Koutoubia minaret at sunrise, pink terracotta walls, hot air balloon in the sky, soft haze, ` + COMMON },
  { name: 'hot-air-balloon-passengers-basket', size: '1344x768', prompt: `Diverse happy passengers looking down from a hot air balloon basket over Moroccan landscape, hands raised in joy, sunrise light, ` + COMMON },
];

async function main() {
  const zai = await ZAI.create();
  for (const img of IMAGES) {
    const pngPath = path.join(TMP, img.name + '.png');
    const webpPath = path.join(OUT, img.name + '.webp');
    if (fs.existsSync(webpPath)) { console.log('skip (exists):', img.name); continue; }
    let ok = false;
    for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
      try {
        const res = await zai.images.generations.create({ prompt: img.prompt, size: img.size });
        const b64 = res?.data?.[0]?.base64;
        if (!b64) throw new Error('empty response');
        fs.writeFileSync(pngPath, Buffer.from(b64, 'base64'));
        const meta = await sharp(pngPath).metadata();
        await sharp(pngPath).webp({ quality: 82 }).toFile(webpPath);
        fs.unlinkSync(pngPath);
        console.log(`OK ${img.name} ${meta.width}x${meta.height} -> ${webpPath}`);
        ok = true;
      } catch (e) {
        console.error(`attempt ${attempt} FAILED ${img.name}:`, e?.message || e);
        await new Promise((r) => setTimeout(r, 1500 * attempt));
      }
    }
    if (!ok) console.error('GAVE UP:', img.name);
  }
  console.log('DONE');
}
main().catch((e) => { console.error('FATAL', e); process.exit(1); });

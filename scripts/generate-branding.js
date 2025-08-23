#!/usr/bin/env node
/*
  Generate TapPro branding assets using Sharp from SVG templates.
  Outputs:
    - assets/icon.png (1024x1024)
    - assets/adaptive-icon.png (1024x1024, transparent bg)
    - assets/splash.png (1284x2778)
    - assets/favicon.png (64x64)
    - resources/app-icon.png (512x512)
    - resources/feature-graphic.png (1024x500)
    - resources/privacy-policy.html to PlayStore/AppStore
*/
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const BRAND = {
    name: "Expo-Boilerplate",
    primary: "#171c20", // deep navy
    accent: "#ff7a00", // royal blue
    white: "#ffe3c9",
};

const out = (p) => path.resolve(process.cwd(), p);

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive: true});
}

const logo = fs.readFileSync(path.resolve(__dirname, "logo.svg"), "utf-8");

function logoSVG({
    size: _size = 1024,
    stroke: _stroke = 64,
    color: _color = BRAND.white,
    bg: _bg = "transparent",
    withGradientBg: _withGradientBg = false,
} = {}) {
    return logo
        .replace(/width="[^"]*"/, `width="${_size}"`)
        .replace(/height="[^"]*"/, `height="${_size}"`);
}

function splashSVG({width = 1284, height = 2778}) {
    // Maintain center-safe design and reuse logoSVG for the rings
    const minSide = Math.min(width, height);
    const stroke = Math.round(minSide * 0.03);
    const centerX = Math.round(width / 2);
    const centerY = Math.round(height * 0.58);
    const r3 = Math.round(minSide * 0.3);

    const logoSize = Math.round(r3 / 0.8);
    const gradientId = "bgGrad";

    // Generate logo SVG (transparent background) and extract inner content to inline
    const logoRaw = logoSVG({
        size: logoSize,
        stroke,
        color: BRAND.white,
        bg: "transparent",
        withGradientBg: false,
    });
    const logoInner = logoRaw
        .replace(/<\?xml[\s\S]*?\?>/, "")
        .replace(/^[\s\S]*?<svg[^>]*>/, "")
        .replace(/<\/svg>\s*$/, "");

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="${gradientId}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${BRAND.primary}"/>
      <stop offset="100%" stop-color="${BRAND.primary}"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#${gradientId})"/>

  <!-- Inline logoSVG content, centered at desired location -->
  <svg x="${Math.round(centerX - logoSize / 3)}" y="${Math.round(centerY - logoSize / 8)}" width="${logoSize}" height="${logoSize}" viewBox="0 0 ${logoSize} ${logoSize}">
    ${logoInner}
  </svg>

  <g font-family="-apple-system,Segoe UI,Helvetica,Arial,sans-serif" font-size="${Math.round(minSide * 0.08)}" font-weight="700" text-anchor="middle" fill="${BRAND.white}">
    <text x="${centerX}" y="${Math.round(centerY + r3 + minSide * 0.12)}">${BRAND.name}</text>
  </g>
</svg>`;
}

async function svgToPng(svg, filePath, width, height) {
    const buffer = Buffer.from(svg);
    await sharp(buffer, {density: 300})
        .resize(width, height, {fit: "cover"})
        .png()
        .toFile(filePath);
}

async function main() {
    ensureDir(out("assets"));

    // Icon (gradient bg + white rings)
    const iconSvg = logoSVG({
        size: 1024,
        stroke: 64,
        color: BRAND.white,
        withGradientBg: true,
    });
    await svgToPng(iconSvg, out("assets/icon.png"), 1024, 1024);

    // Adaptive icon (transparent bg + white rings)
    const adaptiveSvg = logoSVG({
        size: 1024,
        stroke: 64,
        color: BRAND.white,
        bg: "transparent",
        withGradientBg: false,
    });
    await svgToPng(adaptiveSvg, out("assets/adaptive-icon.png"), 1024, 1024);

    // Splash
    const splashSvg = splashSVG({width: 1284, height: 2778});
    await svgToPng(splashSvg, out("assets/splash.png"), 1284, 2778);

    // Favicon 64x64 (simple white rings on blue bg)
    const faviconSvg = logoSVG({
        size: 256,
        stroke: 24,
        color: BRAND.white,
        withGradientBg: true,
    });
    await svgToPng(faviconSvg, out("assets/favicon.png"), 64, 64);

    console.log(`✅ Generated ${BRAND.name} branding assets in assets/*.png`);

    ensureDir(out("resources"));

    const appIcon = logoSVG({
        size: 512,
        stroke: 32,
        color: BRAND.white,
        bg: "transparent",
        withGradientBg: false,
    });
    await svgToPng(appIcon, out("resources/app-icon.png"), 512, 512);

    const featureGraphic = logoSVG({
        size: 1024,
        stroke: 64,
        color: BRAND.white,
        bg: "transparent",
        withGradientBg: false,
    });
    await svgToPng(
        featureGraphic,
        out("resources/feature-graphic.png"),
        1024,
        500
    );

    console.log(`✅ Generated ${BRAND.name} resources in resources/*.png`);
}

main().catch((err) => {
    console.error("Failed to generate branding assets", err);
    process.exit(1);
});

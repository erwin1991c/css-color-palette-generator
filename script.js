const baseColorInput = document.getElementById('base-color');
const colorPreview = document.querySelectorAll('.color-preview div');
const cssCode = document.querySelector('.css-code pre code');

baseColorInput.addEventListener('input', (e) => {
    const baseColor = e.target.value;
    generateColorPalette(baseColor);
});

function generateColorPalette(baseColor) {
    const primary = baseColor;
    const secondary = getSecondaryColor(baseColor);
    const accent = getAccentColor(baseColor);
    const background = getBackgroundColor(baseColor);
    const text = getTextColor(baseColor);

    colorPreview[0].style.backgroundColor = primary;
    colorPreview[1].style.backgroundColor = secondary;
    colorPreview[2].style.backgroundColor = accent;
    colorPreview[3].style.backgroundColor = background;
    colorPreview[4].style.backgroundColor = text;

    const css = `
        :root {
            --primary: ${primary};
            --secondary: ${secondary};
            --accent: ${accent};
            --background: ${background};
            --text: ${text};
        }
    `;
    cssCode.textContent = css;
}

function getSecondaryColor(baseColor) {
    const hsl = rgbToHsl(baseColor);
    hsl.l += 0.1;
    return hslToRgb(hsl);
}

function getAccentColor(baseColor) {
    const hsl = rgbToHsl(baseColor);
    hsl.h += 120;
    hsl.l += 0.2;
    return hslToRgb(hsl);
}

function getBackgroundColor(baseColor) {
    const hsl = rgbToHsl(baseColor);
    hsl.l += 0.3;
    return hslToRgb(hsl);
}

function getTextColor(baseColor) {
    const hsl = rgbToHsl(baseColor);
    hsl.l += 0.4;
    return hslToRgb(hsl);
}

function rgbToHsl(rgb) {
    const r = parseInt(rgb.substring(1, 3), 16) / 255;
    const g = parseInt(rgb.substring(3, 5), 16) / 255;
    const b = parseInt(rgb.substring(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return { h, s, l };
}

function hslToRgb(hsl) {
    let r, g, b;

    const hueToRgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    const { h, s, l } = hsl;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hueToRgb(p, q, h + 1 / 3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1 / 3);
    }

    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}

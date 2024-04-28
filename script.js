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
const [r, g, b] = rgb.substring(4, rgb.length - 1).split(',').map((x) => parseInt(x, 10) / 255);
const max = Math.max(r, g, b);
const min = Math.min(r, g, b);
const l = (max + min) / 2;
const h = max === min ? 0 : (g - b) * (max - min) / (6 * (1 - Math.abs(2 * l - 1)));
const s = max === 0 ? 0 : (max - min) / (1 - Math.abs(2 * l - 1));
return { h: h / 360, s, l };
}

function hslToRgb(hsl) {
	const h = hsl.h * 360;
	const s = hsl.s;
	const l = hsl.l;
	const q = l * (1 + s);
	const p = l * (1 - s);
	const r = getColorValue(h + 120, q, p);
	const g = getColorValue(h, q, p);
	const b = getColorValue(h - 120, q, p);
	return `rgb(${r}, ${g}, ${b})`;
}

function getColorValue(h, q, p) {
	if (h > 360) {
		h -= 360;
	} else if (h < 0) {
		h += 360;
	}
	if (h < 60) {
		return p + (q - p) * h / 60;
	} else if (h < 180) {
		return q;
	} else if (h < 240) {
		return p + (q - p) * (240 - h) / 60;
	} else {
		return p;
	}
}

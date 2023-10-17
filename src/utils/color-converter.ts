const regexes = {
  matchAnyColor:
    /(#(?:[\da-f]{3,4}){2}|rgb\((?:\d{1,3},\s*){2}\d{1,3}\)|rgba\((?:\d{1,3},\s*){3}\d*\.?\d+\)|hsl\(\d{1,3}(?:,\s*\d{1,3}%){2}\)|hsla\(\d{1,3}(?:,\s*\d{1,3}%){2},\s*\d*\.?\d+\))/gi,
};

function identifyType(color: string) {
  if (color.startsWith("hsl(")) {
    return "hsl";
  } else if (color.startsWith("hsla(")) {
    return "hsla";
  } else if (color.startsWith("rgb(")) {
    return "rgb";
  } else if (color.startsWith("rgba(")) {
    return "rgba";
  } else if (color.startsWith("#")) {
    return "hex";
  }
}

function fromHex(hex: string, normalize?: boolean) {
  if (!hex.match(/^#?(?:[0-9a-fA-F]{3}){1,2}$|^#?(?:[0-9a-fA-F]{8})$/i))
    throw new Error('Invalid Hex code: "' + hex + '"');
  let r = "0x00";
  let g = "0x00";
  let b = "0x00";
  let a = "0x00";

  if (hex.length == 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];
  } else if (hex.length == 3) {
    r = "0x" + hex[0] + hex[0];
    g = "0x" + hex[1] + hex[1];
    b = "0x" + hex[2] + hex[2];
  } else if (hex.length == 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  } else if (hex.length == 6) {
    r = "0x" + hex[0] + hex[1];
    g = "0x" + hex[2] + hex[3];
    b = "0x" + hex[4] + hex[5];
  } else if (hex.length == 9) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
    a = "0x" + hex[7] + hex[8];
  } else if (hex.length == 8) {
    r = "0x" + hex[0] + hex[1];
    g = "0x" + hex[2] + hex[3];
    b = "0x" + hex[4] + hex[5];
    a = "0x" + hex[6] + hex[7];
  }

  let normalizer = 1;
  if (normalize) {
    normalizer = parseInt(a, 16) / 255;
  }

  const color = {
    r: Math.floor(parseInt(r, 16) * normalizer),
    g: Math.floor(parseInt(g, 16) * normalizer),
    b: Math.floor(parseInt(b, 16) * normalizer),
    a: normalize ? 1 : parseInt(a, 16) / 255,
  };
  return color;
}

function fromRgb(rgb: string) {
  const matches = rgb.match(
    /rgb\((?:(\d{1,3}),\s*)(?:(\d{1,3}),\s*)(\d{1,3})\)/gi
  );
  if (!matches) throw new Error('Invalid RGB code: "' + rgb + '"');

  const r = Math.min(Math.max(Number(matches[0]), 0), 255) / 255;
  const g = Math.min(Math.max(Number(matches[1]), 0), 255) / 255;
  const b = Math.min(Math.max(Number(matches[2]), 0), 255) / 255;

  const color = {
    r: Math.floor(r),
    g: Math.floor(g),
    b: Math.floor(b),
    a: 1,
  };
  return color;
}

function fromRgba(rgba: string, normalize?: boolean) {
  const matches = rgba.match(
    /rgba\((?:(\d{1,3}),\s*)(?:(\d{1,3}),\s*)(?:(\d{1,3}),\s*)(\d*\.?\d+)\)/gi
  );
  if (!matches) throw new Error('Invalid RGBA code: "' + rgba + '"');

  const r = Math.min(Math.max(Number(matches[0]), 0), 255) / 255;
  const g = Math.min(Math.max(Number(matches[1]), 0), 255) / 255;
  const b = Math.min(Math.max(Number(matches[2]), 0), 255) / 255;
  const a = Math.min(Math.max(Number(matches[3]), 0), 1);

  let normalizer = 1;
  if (normalize) {
    normalizer = a;
  }

  const color = {
    r: Math.floor(r) * normalizer,
    g: Math.floor(g) * normalizer,
    b: Math.floor(b) * normalizer,
    a: normalize ? 1 : a,
  };
  return color;
}

function fromHsl(rgb: string) {}

function fromHsla(rgb: string, normalize?: boolean) {}

function toRgba(color: { r: number; g: number; b: number; a: number }) {
  const r = color.r.toString();
  const g = color.g.toString();
  const b = color.b.toString();
  const a = color.a.toString();

  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

const Color = {
  identifyType,
  fromHex,
  fromRgb,
  fromRgba,
  fromHsl,
  fromHsla,
  toRgba,
};
export default Color;

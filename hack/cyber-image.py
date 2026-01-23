#!/usr/bin/env python3
from PIL import Image, ImageOps, ImageEnhance, ImageFilter
import argparse
import random
import os

def pixelate(img: Image.Image, pixel: int) -> Image.Image:
    w, h = img.size
    # Downscale then upscale with nearest-neighbor for crisp pixels
    dw = max(1, w // pixel)
    dh = max(1, h // pixel)
    small = img.resize((dw, dh), resample=Image.BILINEAR)
    return small.resize((w, h), resample=Image.NEAREST)

def quantize_grays(img: Image.Image, levels: int) -> Image.Image:
    """
    Reduce grayscale image to N gray levels (2..256).
    Example levels=12 gives a cyber-posterized look with detail.
    """
    levels = max(2, min(256, levels))
    step = 255 / (levels - 1)
    return img.point(lambda p: int(round(p / step) * step))

def glitch_bands_bw(img: Image.Image, band_h: int, max_shift: int, prob: float) -> Image.Image:
    """Shift horizontal bands left/right for a glitchy cyber look (still B/W)."""
    w, h = img.size
    out = Image.new(img.mode, (w, h))
    y = 0
    while y < h:
        bh = min(band_h, h - y)
        band = img.crop((0, y, w, y + bh))
        if random.random() < prob:
            shift = random.randint(-max_shift, max_shift)
        else:
            shift = 0

        # Paste with wrap-around so no blank edges
        if shift == 0:
            out.paste(band, (0, y))
        else:
            s = shift % w
            left = band.crop((0, 0, w - s, bh))
            right = band.crop((w - s, 0, w, bh))
            out.paste(right, (0, y))
            out.paste(left, (s, y))
        y += bh
    return out

def add_bw_noise(img: Image.Image, flip_prob: float) -> Image.Image:
    """Randomly flip some pixels (white<->black) for texture. Assumes mode 'L' with 0/255."""
    if flip_prob <= 0:
        return img
    w, h = img.size
    px = img.load()
    for y in range(h):
        for x in range(w):
            if random.random() < flip_prob:
                px[x, y] = 255 - px[x, y]
    return img

def add_scan_speckle(img: Image.Image, every: int, prob: float) -> Image.Image:
    """On every Nth row, flip a few pixels to create scanline/signal noise. B/W safe."""
    if every <= 0 or prob <= 0:
        return img
    w, h = img.size
    px = img.load()
    for y in range(0, h, every):
        for x in range(w):
            if random.random() < prob:
                px[x, y] = 255 - px[x, y]
    return img

def main():
    ap = argparse.ArgumentParser(description="Make a black/white cyber pixelated version of an image.")
    ap.add_argument("input", help="Input image (png/jpg/etc)")
    ap.add_argument("-o", "--output", default=None, help="Output file (png). Default: <input>_cyber_bw.png")
    ap.add_argument("--pixel", type=int, default=10, help="Pixel size (smaller = more recognizable). Try 4-10.")
    ap.add_argument("--contrast", type=float, default=1.7, help="Contrast boost (1.0 = none).")
    ap.add_argument("--sharp", type=float, default=1.5, help="Sharpness boost (1.0 = none).")
    ap.add_argument("--dither", action="store_true", help="Use Floyd-Steinberg dithering for B/W.")
    ap.add_argument("--threshold", type=int, default=170, help="Threshold for B/W if not dithering (0-255).")
    ap.add_argument("--glitch", action="store_true", help="Enable glitch band shifts.")
    ap.add_argument("--band-h", type=int, default=12, help="Glitch band height (pixels).")
    ap.add_argument("--max-shift", type=int, default=28, help="Max horizontal shift for glitch bands.")
    ap.add_argument("--glitch-prob", type=float, default=0.35, help="Probability a band glitches (0-1).")
    ap.add_argument("--noise", type=float, default=0.0, help="Random pixel flip probability (0-1).")
    ap.add_argument("--scan-every", type=int, default=8, help="Every N rows add scan speckle (0 disables).")
    ap.add_argument("--scan-prob", type=float, default=0.00, help="Scanline speckle flip probability (0-1).")
    ap.add_argument("--seed", type=int, default=None, help="Random seed for repeatable results.")
    args = ap.parse_args()

    if args.seed is not None:
        random.seed(args.seed)

    inp = args.input
    if args.output is None:
        base, _ = os.path.splitext(inp)
        out_path = base + "_cyber_bw.png"
    else:
        out_path = args.output

    img = Image.open(inp).convert("RGB")

    # Grayscale + dynamic range
    gray = ImageOps.grayscale(img)
    gray = ImageOps.autocontrast(gray, cutoff=1)

    # Add “graphic” pop before pixelation
    gray = ImageEnhance.Contrast(gray).enhance(args.contrast)
    gray = ImageEnhance.Sharpness(gray).enhance(args.sharp)
    gray = gray.filter(ImageFilter.UnsharpMask(radius=1.2, percent=150, threshold=3))

    # Pixelate while still grayscale (keeps details nicer)
    pix = pixelate(gray, pixel=max(1, args.pixel))

    # Convert to true B/W
    # if args.dither:
    #     bw = pix.convert("1", dither=Image.Dither.FLOYDSTEINBERG).convert("L")
    #     # Make sure it's exactly 0/255 in L mode
    #     bw = bw.point(lambda p: 255 if p > 0 else 0)
    # else:
    #     t = max(0, min(255, args.threshold))
    #     bw = pix.point(lambda p: 255 if p >= t else 0)
    bw = quantize_grays(pix, levels=12)

    # Optional cyber vibe effects (still black/white)
    if args.glitch:
        bw = glitch_bands_bw(bw, band_h=max(1, args.band_h),
                             max_shift=max(1, args.max_shift),
                             prob=max(0.0, min(1.0, args.glitch_prob)))

    bw = add_bw_noise(bw, flip_prob=max(0.0, min(1.0, args.noise)))
    bw = add_scan_speckle(bw, every=args.scan_every, prob=max(0.0, min(1.0, args.scan_prob)))

    bw.save(out_path, format="PNG")
    print(f"Saved: {out_path}")

if __name__ == "__main__":
    main()
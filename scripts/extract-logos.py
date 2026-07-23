#!/usr/bin/env python3
"""One-time extraction of logo marks from the old Figma-designed tile PNGs.

Each old tile (images/experience/*.png, images/links/*.png) followed the same
template: a brand-colored background with the logo mark in the top-left corner.
This script crops the logo region and chroma-keys the background out, leaving a
transparent-background logo in images/logos/ that the CSS-generated cards use.

Usage: python3 scripts/extract-logos.py
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "images", "logos")

# name -> dict(src, box, bg_x, thr, [bg_x2], [fill_holes])
# bg_x: x coordinate (full-tile space) sampled per-row to estimate the
# background color, so vertical gradients key out cleanly. bg_x2 adds a second
# sample column and interpolates between the two across the crop, which handles
# diagonal gradients. fill_holes restores enclosed transparent regions (glyphs
# that matched the background color, e.g. YouTube's play triangle).
JOBS = {
    # tribe: superseded — the current mark is hand-built vector art at images/logos/tribe.svg
    "anthropic": dict(src="images/experience/anthropic.png", box=(60, 70, 350, 300),  bg_x=700, thr=(40, 110)),
    "meta":      dict(src="images/experience/meta.png",      box=(60, 70, 480, 350),  bg_x=700, thr=(40, 110)),
    "ateam":     dict(src="images/experience/ateam.png",     box=(95, 120, 300, 290), bg_x=70, bg_x2=340, thr=(26, 60)),
    "amazon":    dict(src="images/experience/amazon.png",    box=(60, 70, 350, 350),  bg_x=700, thr=(40, 110)),
    "woebot":    dict(src="images/experience/woebot.png",    box=(70, 80, 340, 340),  bg_x=700, thr=(40, 110)),
    "nirvana":   dict(src="images/experience/nirvana.png",   box=(80, 80, 320, 320),  bg_x=700, thr=(55, 120)),
    "activant":  dict(src="images/experience/activant.png",  box=(80, 90, 320, 310),  bg_x=700, thr=(30, 90)),
    "mr":        dict(src="images/experience/mr.png",        box=(90, 90, 300, 320),  bg_x=700, thr=(30, 90)),
    "harvard":   dict(src="images/experience/harvard.png",   box=(95, 85, 300, 290),  bg_x=700, thr=(55, 130)),
    "openai":    dict(src="images/experience/openai.png",    box=(60, 60, 360, 360),  bg_x=700, thr=(40, 110)),
    "microsoft": dict(src="images/experience/microsoft.png", box=(60, 60, 360, 360),  bg_x=700, thr=(40, 110)),
    "calendar":  dict(src="images/links/calendar.png",       box=(60, 60, 350, 350),  bg_x=700, thr=(25, 90)),
    "resume":    dict(src="images/links/resume.png",         box=(60, 60, 350, 350),  bg_x=700, thr=(25, 90)),
    "linkedin":  dict(src="images/links/linkedin.png",       box=(60, 60, 350, 350),  bg_x=700, thr=(25, 90), fill_holes=True),
    "youtube":   dict(src="images/links/youtube.png",        box=(60, 60, 470, 350),  bg_x=700, thr=(25, 90), fill_holes=True),
}


def fill_enclosed_holes(out, crop):
    """Restore original colors in transparent regions not reachable from the
    image border — glyphs whose color matched the keyed background."""
    w, h = out.size
    opx, px = out.load(), crop.load()
    outside = [[False] * w for _ in range(h)]
    stack = [(x, y) for x in range(w) for y in (0, h - 1)]
    stack += [(x, y) for y in range(h) for x in (0, w - 1)]
    while stack:
        x, y = stack.pop()
        if x < 0 or y < 0 or x >= w or y >= h or outside[y][x] or opx[x, y][3] > 0:
            continue
        outside[y][x] = True
        stack += [(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)]
    for y in range(h):
        for x in range(w):
            if opx[x, y][3] == 0 and not outside[y][x]:
                opx[x, y] = px[x, y] + (255,)


def extract(name, src, box, bg_x, thr, bg_x2=None, fill_holes=False):
    path = os.path.join(ROOT, src)
    if not os.path.exists(path):
        print(f"  skip {name}: {src} not found")
        return
    img = Image.open(path).convert("RGB")
    lo, hi = thr
    x0, y0, x1, y1 = box
    crop = img.crop(box)
    px = crop.load()
    out = Image.new("RGBA", crop.size, (0, 0, 0, 0))
    opx = out.load()
    for y in range(crop.height):
        bg_l = img.getpixel((bg_x, y0 + y))
        bg_r = img.getpixel((bg_x2, y0 + y)) if bg_x2 else bg_l
        for x in range(crop.width):
            t = (x0 + x - bg_x) / (bg_x2 - bg_x) if bg_x2 else 0.0
            bg = tuple(l + (r - l) * t for l, r in zip(bg_l, bg_r))
            p = px[x, y]
            d = (sum((a - b) ** 2 for a, b in zip(p, bg))) ** 0.5
            if d <= lo:
                continue
            a = 1.0 if d >= hi else (d - lo) / (hi - lo)
            # un-blend edge pixels so anti-aliased fringes keep the logo color
            r = max(0, min(255, round(bg[0] + (p[0] - bg[0]) / a)))
            g = max(0, min(255, round(bg[1] + (p[1] - bg[1]) / a)))
            b = max(0, min(255, round(bg[2] + (p[2] - bg[2]) / a)))
            opx[x, y] = (r, g, b, round(a * 255))
    if fill_holes:
        fill_enclosed_holes(out, crop)
    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)
    os.makedirs(OUT, exist_ok=True)
    dest = os.path.join(OUT, f"{name}.png")
    out.save(dest, optimize=True)
    print(f"  {name}: {out.size[0]}x{out.size[1]} -> {os.path.relpath(dest, ROOT)}")


if __name__ == "__main__":
    print("Extracting logo marks:")
    for name, job in JOBS.items():
        extract(name, **job)

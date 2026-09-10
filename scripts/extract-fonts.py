import os
from collections import Counter

import pymupdf
from PIL import Image

root = r"c:\Proyectos_Trabajo\forge-gym"
brand = os.path.join(root, "public", "brand")
fonts_dir = os.path.join(root, "public", "fonts")
os.makedirs(fonts_dir, exist_ok=True)

doc = pymupdf.open(r"c:\Users\Aorus 5\Downloads\LOGO_ATOM.pdf")
seen = set()
for xref, _ext, _type, name, *_rest in doc[0].get_fonts():
    if xref in seen:
        continue
    seen.add(xref)
    try:
        info = doc.extract_font(xref)
    except Exception as exc:
        print("font fail", name, exc)
        continue
    data = info[3] if isinstance(info, (list, tuple)) and len(info) > 3 else None
    if not data:
        print("no data", name, type(info), getattr(info, "keys", lambda: None)())
        continue
    ext = "ttf"
    if data[:4] == b"OTTO":
        ext = "otf"
    safe = name.replace("+", "_").replace("/", "_")
    path = os.path.join(fonts_dir, f"{safe}.{ext}")
    with open(path, "wb") as handle:
        handle.write(data)
    print("font", name, "bytes", len(data), "->", path)

guide = Image.open(os.path.join(brand, "guide-type.png")).convert("RGB")
print("guide-type", guide.size)

# sample a grid of unique-ish colors that aren't paper-white
w, h = guide.size
swatches = []
for y in range(int(h * 0.45), h, 12):
    for x in range(40, w - 40, 18):
        r, g, b = guide.getpixel((x, y))
        if r > 245 and g > 245 and b > 245:
            continue
        if r < 18 and g < 18 and b < 18:
            continue
        swatches.append((r, g, b))

counts = Counter((r // 4 * 4, g // 4 * 4, b // 4 * 4) for r, g, b in swatches)
print("palette-ish colors in lower type page:")
for color, n in counts.most_common(25):
    if n < 80:
        continue
    print(f"  #{color[0]:02x}{color[1]:02x}{color[2]:02x}  n={n}")

# also sample top logo page for gold/red gradient
top = Image.open(os.path.join(brand, "guide-top.png")).convert("RGB")
print("guide-top", top.size)
top_counts = Counter()
tw, th = top.size
for y in range(0, th, 16):
    for x in range(0, tw, 16):
        r, g, b = top.getpixel((x, y))
        if max(r, g, b) - min(r, g, b) < 25:
            continue
        top_counts[(r // 8 * 8, g // 8 * 8, b // 8 * 8)] += 1
print("saturated colors in top:")
for color, n in top_counts.most_common(15):
    print(f"  #{color[0]:02x}{color[1]:02x}{color[2]:02x}  n={n}")

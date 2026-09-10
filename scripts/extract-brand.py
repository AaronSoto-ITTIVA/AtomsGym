import os
from collections import Counter

import pymupdf
from PIL import Image

pdf_path = r"c:\Users\Aorus 5\Downloads\LOGO_ATOM.pdf"
out_dir = r"c:\Proyectos_Trabajo\forge-gym\public\brand"
os.makedirs(out_dir, exist_ok=True)

doc = pymupdf.open(pdf_path)
print("pages", doc.page_count)
page = doc[0]
print("rect", page.rect)
print("fonts", page.get_fonts())

mat = pymupdf.Matrix(3, 3)
pix = page.get_pixmap(matrix=mat, alpha=False)
png_path = os.path.join(out_dir, "brand-guide.png")
pix.save(png_path)
print("saved", png_path, pix.width, pix.height)

for i, img in enumerate(page.get_images(full=True)):
    xref = img[0]
    info = doc.extract_image(xref)
    fname = os.path.join(out_dir, f"pdf-image-{i}.{info['ext']}")
    with open(fname, "wb") as handle:
        handle.write(info["image"])
    print("image", i, info["ext"], info["width"], info["height"], fname)

im = Image.open(png_path).convert("RGB")
small = im.resize((im.width // 8, im.height // 8))


def bucket(pixel):
    return (pixel[0] // 8 * 8, pixel[1] // 8 * 8, pixel[2] // 8 * 8)


counts = Counter(bucket(p) for p in small.getdata())
interesting = [
    (color, n)
    for color, n in counts.most_common(80)
    if not (color[0] > 240 and color[1] > 240 and color[2] > 240)
]
print("top colors:")
for color, n in interesting[:40]:
    print(f"#{color[0]:02x}{color[1]:02x}{color[2]:02x}  n={n}  rgb={color}")

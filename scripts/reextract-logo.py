import os

import pymupdf
from PIL import Image

pdf_path = r"c:\Users\Aorus 5\Downloads\LOGO_ATOM.pdf"
out = r"c:\Proyectos_Trabajo\forge-gym\tmp-brand"
os.makedirs(out, exist_ok=True)

doc = pymupdf.open(pdf_path)
page = doc[0]
for i, img in enumerate(page.get_images(full=True)):
    info = doc.extract_image(img[0])
    path = os.path.join(out, f"img-{i}.{info['ext']}")
    with open(path, "wb") as handle:
        handle.write(info["image"])
    print(i, info["ext"], info["width"], info["height"], path)

mat = pymupdf.Matrix(2.2, 2.2)
pix = page.get_pixmap(matrix=mat, alpha=False)
full = os.path.join(out, "full.png")
pix.save(full)
print("full", pix.width, pix.height)

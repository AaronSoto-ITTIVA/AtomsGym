import os

from PIL import Image, ImageFilter, ImageChops, ImageOps

brand = r"c:\Proyectos_Trabajo\forge-gym\public\brand"
out = r"c:\Proyectos_Trabajo\forge-gym\public"

palette = Image.open(os.path.join(brand, "guide-palette.png")).convert("RGB")
w, h = palette.size
# left half usually has black isotipo on light paper
left = palette.crop((0, 0, w // 2, h))
gray = left.convert("L")
mask = gray.point(lambda p: 255 if p < 70 else 0)
bbox = mask.getbbox()
print("isotipo bbox", bbox, "left", left.size)
if bbox:
    pad = 24
    x0, y0, x1, y1 = bbox
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(left.width, x1 + pad)
    y1 = min(left.height, y1 + pad)
    crop = left.crop((x0, y0, x1, y1))
    crop.save(os.path.join(out, "logo-isotipo.png"))
    print("saved isotipo", crop.size)

# circular imagotipo on top guide: look for bright-on-dark circle-ish region
top = Image.open(os.path.join(brand, "guide-top.png")).convert("RGB")
tw, th = top.size
# focus center band
cx0, cy0, cx1, cy1 = int(tw * 0.18), int(th * 0.08), int(tw * 0.82), int(th * 0.92)
center = top.crop((cx0, cy0, cx1, cy1))
center.save(os.path.join(brand, "logo-circle-region.png"))
print("circle region", center.size)

# also save a square logo for header from palette right (white on black)
right = palette.crop((w // 2, 0, w, h))
rg = right.convert("L")
rmask = rg.point(lambda p: 255 if p > 180 else 0)
rbbox = rmask.getbbox()
print("white isotipo bbox", rbbox)
if rbbox:
    pad = 24
    x0, y0, x1, y1 = rbbox
    crop = right.crop((max(0, x0 - pad), max(0, y0 - pad), min(right.width, x1 + pad), min(right.height, y1 + pad)))
    crop.save(os.path.join(out, "logo-isotipo-light.png"))
    print("saved light isotipo", crop.size)

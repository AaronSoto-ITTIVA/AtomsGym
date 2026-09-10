from PIL import Image

mid = Image.open(r"c:\Proyectos_Trabajo\forge-gym\tmp-brand\mid.png").convert("RGBA")
typ = Image.open(r"c:\Proyectos_Trabajo\forge-gym\tmp-brand\type.png").convert("RGBA")
out = r"c:\Proyectos_Trabajo\forge-gym\public"
dbg = r"c:\Proyectos_Trabajo\forge-gym\tmp-brand"
print("mid", mid.size, "type", typ.size)


def isolate(im, threshold=130, pad=20):
    work = im.copy()
    px = work.load()
    w, h = work.size
    for y in range(h):
        for x in range(w):
            r, g, b, _a = px[x, y]
            if (r + g + b) / 3 > threshold:
                px[x, y] = (0, 0, 0, 0)
            else:
                px[x, y] = (0, 0, 0, 255)
    bbox = work.getbbox()
    if not bbox:
        return work
    x0, y0, x1, y1 = bbox
    return work.crop((max(0, x0 - pad), max(0, y0 - pad), min(w, x1 + pad), min(h, y1 + pad)))


def gold(im):
    data = list(im.getdata())
    im.putdata([(252, 188, 16, a) if a else (0, 0, 0, 0) for _r, _g, _b, a in data])
    return im


def white(im):
    data = list(im.getdata())
    im.putdata([(255, 255, 255, a) if a else (0, 0, 0, 0) for _r, _g, _b, a in data])
    return im


# Tight crop around the left isotipo (skip header label and bottom formula)
iso_box = (220, 280, 750, 1180)
iso_src = mid.crop(iso_box)
iso_src.save(rf"{dbg}\iso-src.png")
isotipo = isolate(iso_src, 120, 8)
isotipo.save(rf"{out}\logo-mark.png")
gold(isotipo.copy()).save(rf"{out}\logo-mark-gold.png")
white(isotipo.copy()).save(rf"{out}\logo-mark-white.png")
print("isotipo", isotipo.size)

# Lockup: top of type page, generous vertical crop
lock_box = (60, 20, 1880, 520)
lock_src = typ.crop(lock_box)
lock_src.save(rf"{dbg}\lock-src.png")
lockup = isolate(lock_src, 125, 16)
lockup.save(rf"{out}\logo-lockup.png")
white(lockup.copy()).save(rf"{out}\logo-lockup-white.png")
gold(lockup.copy()).save(rf"{out}\logo-lockup-gold.png")
print("lockup", lockup.size)

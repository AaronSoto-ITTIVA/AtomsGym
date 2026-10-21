from pathlib import Path
from PIL import Image
import numpy as np

ASSETS = Path(r"C:\Users\Aorus 5\.cursor\projects\c-Proyectos-Trabajo-forge-gym\assets")
DEST = Path(r"c:\Proyectos_Trabajo\forge-gym\public\exercises")
SIZE = (1312, 1199)

NEW_IDS = [
    "low-cable-row",
    "seated-pullover",
    "lying-leg-curl",
    "smith-glute-squat",
    "cable-lateral-raise",
    "bodyweight-lunge",
    "reverse-lunge",
    "walking-lunge",
    "lateral-lunge",
    "bulgarian-bodyweight",
    "step-up",
    "jumping-lunge",
    "bodyweight-squat",
    "push-up",
    "incline-push-up",
    "diamond-push-up",
    "pike-push-up",
    "bench-dip",
    "inverted-row",
    "glute-bridge",
    "single-leg-glute-bridge",
    "calf-raise-bw",
    "wall-sit",
    "plank",
    "side-plank",
    "dead-bug",
    "mountain-climbers",
    "hanging-knee-raise",
    "treadmill",
    "elliptical",
    "stationary-bike",
]

PANELS_1X4 = [
    (4, 336),
    (328, 660),
    (652, 984),
    (976, 1310),
]
BADGE_WINDOWS = [(10, 80), (340, 410), (665, 735), (995, 1065)]


def gold_mask(arr: np.ndarray) -> np.ndarray:
    return (arr[:, :, 0] > 180) & (arr[:, :, 1] > 140) & (arr[:, :, 2] < 90)


def panel_top(arr: np.ndarray) -> int:
    gold = gold_mask(arr)
    h = arr.shape[0]
    for y in range(470, min(820, h)):
        windows = 0
        for x0, x1 in BADGE_WINDOWS:
            if int(gold[y, x0:x1].sum()) >= 8:
                windows += 1
        if windows >= 3:
            return max(0, y - 10)
    for y in range(470, min(700, h)):
        windows = 0
        for x0, x1 in BADGE_WINDOWS:
            if int(gold[y, x0:x1].sum()) >= 6:
                windows += 1
        if windows >= 2:
            return max(0, y - 10)
    return 520


def badge_runs(gold: np.ndarray, x0: int, x1: int, y0: int, y1: int, min_run: int = 16) -> list:
    starts = []
    y = y0
    while y < y1:
        if int(gold[y, x0:x1].sum()) >= 10:
            start = y
            while y < y1 and int(gold[y, x0:x1].sum()) >= 10:
                y += 1
            if y - start >= min_run:
                starts.append(start)
        else:
            y += 1
    return starts


def grid_2x2_mid_y(arr: np.ndarray, y0: int):
    gold = gold_mask(arr)
    h, w, _ = arr.shape
    left = badge_runs(gold, 8, 90, y0 + 80, h - 40)
    right = badge_runs(gold, w // 2, w // 2 + 90, y0 + 80, h - 40)
    if left and right and abs(left[0] - right[0]) < 50:
        return max(0, min(left[0], right[0]) - 8)
    return None


def split_one(im: Image.Image, stem: str) -> None:
    arr = np.asarray(im)
    h, w, _ = arr.shape
    y0 = panel_top(arr)
    im.crop((0, 0, w, y0)).save(DEST / f"{stem}-overview.png")
    force_row = stem in {
        "incline-push-up",
        "diamond-push-up",
        "bench-dip",
    }
    y_mid = None if force_row else grid_2x2_mid_y(arr, y0)
    if y_mid:
        x_mid = w // 2
        boxes = [
            (4, y0, x_mid - 3, y_mid - 2),
            (x_mid + 3, y0, w - 2, y_mid - 2),
            (4, y_mid, x_mid - 3, h),
            (x_mid + 3, y_mid, w - 2, h),
        ]
        kind = "2x2"
    else:
        boxes = [(x0, y0, x1, h) for x0, x1 in PANELS_1X4]
        kind = "1x4"
    for i, box in enumerate(boxes, start=1):
        im.crop(box).save(DEST / f"{stem}-step-{i}.png")
    print("import", stem, kind, "y0", y0, "y_mid", y_mid)


def main() -> None:
    missing = []
    for stem in NEW_IDS:
        src = ASSETS / f"{stem}.jpg"
        if not src.exists():
            src = ASSETS / f"{stem}.png"
        if not src.exists():
            missing.append(stem)
            continue
        im = Image.open(src).convert("RGB").resize(SIZE, Image.Resampling.LANCZOS)
        im.save(DEST / f"{stem}.png")
        split_one(im, stem)
    if missing:
        print("MISSING", missing)


if __name__ == "__main__":
    main()

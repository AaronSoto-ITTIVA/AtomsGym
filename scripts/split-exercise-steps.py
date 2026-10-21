from pathlib import Path
import numpy as np
from PIL import Image

ROOT = Path(r"c:\Proyectos_Trabajo\forge-gym\public\exercises")

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
    for y in range(470, min(650, h)):
        windows = 0
        for x0, x1 in BADGE_WINDOWS:
            if int(gold[y, x0:x1].sum()) >= 6:
                windows += 1
        if windows >= 2:
            return max(0, y - 10)
    return 500


def badge_runs(gold: np.ndarray, x0: int, x1: int, y0: int, y1: int, min_run: int = 20) -> list[int]:
    starts: list[int] = []
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


def grid_2x2_mid_y(arr: np.ndarray, y0: int) -> int | None:
    gold = gold_mask(arr)
    h, w, _ = arr.shape
    left = badge_runs(gold, 8, 90, y0 + 80, h - 40)
    right = badge_runs(gold, w // 2, w // 2 + 90, y0 + 80, h - 40)
    if left and right and abs(left[0] - right[0]) < 40:
        return max(0, min(left[0], right[0]) - 8)
    return None


def split_one(path: Path) -> None:
    im = Image.open(path).convert("RGB")
    arr = np.asarray(im)
    h, w, _ = arr.shape
    if (w, h) != (1312, 1199):
        print("skip unexpected size", path.name, im.size)
        return

    y0 = panel_top(arr)
    stem = path.stem
    im.crop((0, 0, w, y0)).save(ROOT / f"{stem}-overview.png")

    y_mid = grid_2x2_mid_y(arr, y0)
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
        im.crop(box).save(ROOT / f"{stem}-step-{i}.png")
    print("split", stem, kind, "y0", y0, "y_mid", y_mid)


def main() -> None:
    for path in sorted(ROOT.glob("*.png")):
        name = path.name
        if "-step-" in name or name.endswith("-overview.png"):
            continue
        split_one(path)


if __name__ == "__main__":
    main()

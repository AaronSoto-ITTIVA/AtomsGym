from pathlib import Path
import numpy as np
from PIL import Image

ROOT = Path(r"c:\Proyectos_Trabajo\forge-gym\public\exercises")

BADGE_WINDOWS = [(10, 80), (340, 410), (665, 735), (995, 1065)]


def panel_top(arr: np.ndarray) -> int:
    gold = (arr[:, :, 0] > 180) & (arr[:, :, 1] > 140) & (arr[:, :, 2] < 90)
    h = arr.shape[0]
    hits = []
    for y in range(470, 650):
        windows = 0
        for x0, x1 in BADGE_WINDOWS:
            if int(gold[y, x0:x1].sum()) >= 6:
                windows += 1
        if windows >= 3:
            hits.append(y)
    if hits:
        return max(470, hits[0] - 8)
    return 500


def main():
    for path in sorted(ROOT.glob("*.png")):
        if "-step-" in path.name or path.name.endswith("-overview.png"):
            continue
        arr = np.asarray(Image.open(path).convert("RGB"))
        y0 = panel_top(arr)
        print(f"{path.stem:32} y0={y0}")


if __name__ == "__main__":
    main()

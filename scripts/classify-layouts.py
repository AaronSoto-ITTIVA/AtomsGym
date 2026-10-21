from pathlib import Path
import numpy as np
from PIL import Image

ROOT = Path(r"c:\Proyectos_Trabajo\forge-gym\public\exercises")


def is_grid_2x2(arr: np.ndarray) -> tuple[bool, int]:
    gold = (arr[:, :, 0] > 180) & (arr[:, :, 1] > 140) & (arr[:, :, 2] < 90)
    h, w, _ = arr.shape
    hits = []
    for y in range(740, min(1020, h)):
        if int(gold[y, 8:90].sum()) >= 8 and int(gold[y, 640:760].sum()) >= 8:
            hits.append(y)
    if hits:
        return True, int(hits[0])
    return False, 0


grid = []
row = []
for path in sorted(ROOT.glob("*.png")):
    if "-step-" in path.name or path.name.endswith("-overview.png"):
        continue
    arr = np.asarray(Image.open(path).convert("RGB"))
    two, y = is_grid_2x2(arr)
    if two:
        grid.append((path.stem, y))
    else:
        row.append(path.stem)

print("2x2", len(grid))
for name, y in grid:
    print(f"  {name} y_mid~{y}")
print("1x4", len(row))
for name in row:
    print(f"  {name}")

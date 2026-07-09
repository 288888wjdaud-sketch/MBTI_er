import os
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(BASE_DIR, "public", "eb9da986-e88e-49d8-81a4-b8fdc75921a8.png")
OUT_DIR = os.path.join(BASE_DIR, "public", "images", "mbti")

# 그리드 순서 (좌->우, 위->아래)
GRID = [
    ["ISTJ", "ISFJ", "INFJ", "INTJ"],
    ["ISTP", "ISFP", "INFP", "INTP"],
    ["ESTP", "ESFP", "ENFP", "ENTP"],
    ["ESTJ", "ESFJ", "ENFJ", "ENTJ"],
]

os.makedirs(OUT_DIR, exist_ok=True)

im = Image.open(SRC)
width, height = im.size
print("source size:", width, height)

cell_w = width / 4
cell_h = height / 4

for row, codes in enumerate(GRID):
    for col, code in enumerate(codes):
        left = round(col * cell_w)
        upper = round(row * cell_h)
        right = round((col + 1) * cell_w)
        lower = round((row + 1) * cell_h)
        cell = im.crop((left, upper, right, lower))
        out_path = os.path.join(OUT_DIR, f"{code.lower()}.png")
        cell.save(out_path)
        print("saved", out_path, cell.size)

"""Render a supplied head-and-chest photo as editable terminal characters."""
import json
import sys
from collections import deque
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

image = Image.open(sys.argv[1]).convert('RGB')
# Upper portrait: head, shoulders and upper chest.
image = image.crop((150, 70, 1150, 1210)).resize((90, 61), Image.Resampling.LANCZOS)
pixels = image.load()
background = set()
queue = deque((x, y) for x in range(90) for y in (0, 60))
queue.extend((x, y) for y in range(61) for x in (0, 89))
while queue:
    x, y = queue.popleft()
    if (x, y) in background or not (0 <= x < 90 and 0 <= y < 61):
        continue
    r, g, b = pixels[x, y]
    if not (r > 65 and 0 <= r-g < 19 and 0 <= g-b < 28):
        continue
    background.add((x, y))
    queue.extend(((x-1,y),(x+1,y),(x,y-1),(x,y+1)))
gray = ImageOps.autocontrast(image.convert('L'), cutoff=1)
ramp = ' .,:;irsXA253hMHGS#9B&@'
lines = []
for y in range(61):
    lines.append(''.join(' ' if (x,y) in background else ramp[min(len(ramp)-1, int((1-gray.getpixel((x,y))/255)*(len(ramp)-1)))] for x in range(90)))
Path('assets/portrait-ascii.json').write_text(json.dumps(lines), encoding='utf-8')
preview = Image.new('RGB', (720, 820), '#161b22')
draw = ImageDraw.Draw(preview)
font = ImageFont.truetype('C:/Windows/Fonts/consola.ttf', 13)
for y, line in enumerate(lines):
    draw.text((8, 10+y*13), line, font=font, fill='#a8b8ca')
Path('tmp').mkdir(exist_ok=True)
preview.save('tmp/portrait-preview.png')
print('Generated 90-column ASCII portrait.')

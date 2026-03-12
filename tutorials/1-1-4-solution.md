---
layout: default
title: "Tutorial 1.1 - Step 4 Solution"
permalink: /tutorials/1-1-4-solution/
---

# Step 4 - Solution

[← Step 4]({{ site.baseurl }}/tutorials/1-1-4/) · [Tutorial 1.1]({{ site.baseurl }}/tutorials/1-1/) · [Step 5 →]({{ site.baseurl }}/tutorials/1-1-5/)

---

Here is one way to add **rotation** by giving each piece multiple offset lists and a **`rotate()`** method. The L piece gets four rotations; O stays one; Z gets two.

```python
# Inside Piece.__init__, example for L with 4 rotations:
if self.type == "L":
    self.offsets = [
        [(0, 0), (0, 1), (0, 2), (1, 2)],   # default
        [(0, 1), (1, 1), (2, 1), (0, 0)],   # 90° CW
        [(1, 0), (1, 1), (1, 2), (0, 0)],   # 180°
        [(0, 1), (1, 1), (2, 1), (2, 2)],   # 270° CW
    ]
elif self.type == "O":
    self.offsets = [[(0, 0), (1, 0), (0, 1), (1, 1)]]
else:  # Z
    self.offsets = [
        [(0, 0), (1, 0), (1, 1), (2, 1)],
        [(1, 0), (1, 1), (0, 1), (0, 2)],
    ]
```

**`rotate()` method on Piece:**

```python
def rotate(self, n=1):
    self.offset_num = (self.offset_num + n) % len(self.offsets)
```

**In the game loop, key handling (e.g. in `run()` or your event handler):**

```python
if event.key == pygame.K_w:
    self.pieces[0].rotate(1)
```

**What’s going on:**

- Each piece type has a list of offset lists. `offset_num` is the index of the current rotation. `render()` and `check_collision()` already use `self.offsets[self.offset_num]`, so they automatically use the new shape after rotation.
- `rotate(1)` advances the index and wraps with modulo. No collision check yet - that’s Step 5.

Next: only allow rotation if it doesn’t overlap the wall or the board (try → check → rollback).

**[← Back to Step 4]({{ site.baseurl }}/tutorials/1-1-4/)** · **[Step 5 →]({{ site.baseurl }}/tutorials/1-1-5/)**

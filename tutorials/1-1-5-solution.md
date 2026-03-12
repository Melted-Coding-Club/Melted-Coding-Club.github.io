---
layout: default
title: "Tutorial 1.1 - Step 5 Solution"
permalink: /tutorials/1-1-5-solution/
---

# Step 5 - Solution

[← Step 5]({{ site.baseurl }}/tutorials/1-1-5/) · [Tutorial 1.1]({{ site.baseurl }}/tutorials/1-1/) · [Step 6 →]({{ site.baseurl }}/tutorials/1-1-6/)

---

Here is one way to make **rotation** use try → check → rollback so we don’t rotate into walls or other pieces.

**Updated `rotate()` on Piece (use `import copy` at top if you use `copy.copy`):**

```python
def rotate(self, n=1):
    old_offset = self.offset_num
    self.offset_num = (self.offset_num + n) % len(self.offsets)
    if self.check_collision():
        self.offset_num = old_offset
```

Or without importing copy (since it’s an int):

```python
def rotate(self, n=1):
    old_offset = self.offset_num
    self.offset_num = (self.offset_num + n) % len(self.offsets)
    if self.check_collision():
        self.offset_num = old_offset
```

**What’s going on:**

- We save the current rotation index, then apply the new rotation. `check_collision()` uses the new `offsets[self.offset_num]`, so it detects if the rotated shape is out of bounds or overlapping the board. If so, we restore `offset_num` so the piece stays in the previous rotation.

Next: clear full rows and add scoring (Step 6).

**[← Back to Step 5]({{ site.baseurl }}/tutorials/1-1-5/)** · **[Step 6 →]({{ site.baseurl }}/tutorials/1-1-6/)**

---
layout: default
title: "Tutorial 1.1 - Step 6 Solution"
permalink: /tutorials/1-1-6-solution/
---

# Step 6 - Solution

[← Step 6]({{ site.baseurl }}/tutorials/1-1-6/) · [Tutorial 1.1]({{ site.baseurl }}/tutorials/1-1/)

---

Here is one way to implement **clearing full rows** and shifting blocks down. This version also adds simple scoring.

**`check_rows()` on Game:**

```python
def check_rows(self):
    rows = [0] * self.game_area[1]
    for block in self.board:
        r = block["location"][1]
        rows[r] += 1
    full_rows = [i for i in range(self.game_area[1]) if rows[i] >= self.game_area[0]]
    for r in full_rows:
        self.board = [b for b in self.board if b["location"][1] != r]
    for block in self.board:
        col, row = block["location"]
        drop = sum(1 for fr in full_rows if fr < row)
        if drop > 0:
            block["location"] = (col, row - drop)
    if full_rows:
        self.score += len(full_rows) * 100  # or use a scoring table
```

**Where to call it:** In `Piece.move()`, when `direction == "down"` and you have a collision, after `update_board()` and before `new_piece()`:

```python
if direction == "down":
    self.origin = old_origin
    self.update_board()
    self.game.check_rows()   # add this
    self.new_piece()
```

**Initialise score in `Game.__init__`:**  
`self.score = 0`

**Optional - draw score:** In your render method, use `pygame.font` to draw `f"Score: {self.score}"` somewhere on the screen.

**What’s going on:**

- We count blocks per row; any row with count ≥ width is full. We collect full row indices, remove all blocks in those rows, then for each remaining block we add to its row the number of full rows that were **below** it (so blocks “fall” into the gap). Score is increased by a fixed amount per cleared row.

You’ve completed the Tetris tutorial. From here you can add a game-over check (e.g. when a new piece would collide immediately), a menu, or different piece types and images.

**[← Back to Step 6]({{ site.baseurl }}/tutorials/1-1-6/)** · **[Tutorial 1.1]({{ site.baseurl }}/tutorials/1-1/)**

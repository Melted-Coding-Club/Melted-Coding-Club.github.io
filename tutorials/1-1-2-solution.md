---
layout: default
title: "Tutorial 1.1 - Step 2 Solution"
permalink: /tutorials/1-1-2-solution/
---

# Step 2 - Solution

[← Step 2]({{ site.baseurl }}/tutorials/1-1-2/) · [Tutorial 1.1]({{ site.baseurl }}/tutorials/1-1/) · [Step 3 →]({{ site.baseurl }}/tutorials/1-1-3/)

---

Here is one way to add the **Piece** class and store the board and current piece. This uses simple coloured rectangles; you can swap in images later.

```python
import pygame
import sys


class Piece:
    def __init__(self, game, p_type="L"):
        self.game = game
        x = game.game_area[0] // 2 - 1
        self.origin = [x, 0]
        self.type = p_type
        self.offset_num = 0
        # One list of offsets per rotation; for now just one (L-shape)
        if self.type == "L":
            self.offsets = [
                [(0, 0), (0, 1), (0, 2), (1, 2)],
            ]
        elif self.type == "O":
            self.offsets = [
                [(0, 0), (1, 0), (0, 1), (1, 1)],
            ]
        else:
            self.offsets = [[(0, 0), (1, 0), (1, 1), (2, 1)]]  # Z

    def render(self):
        origin_px = (
            self.game.game_location[0] * self.game.grid_size,
            self.game.game_location[1] * self.game.grid_size,
        )
        for (dx, dy) in self.offsets[self.offset_num]:
            gx = self.origin[0] + dx
            gy = self.origin[1] + dy
            px = origin_px[0] + gx * self.game.grid_size
            py = origin_px[1] + gy * self.game.grid_size
            rect = pygame.Rect(px, py, self.game.grid_size, self.game.grid_size)
            pygame.draw.rect(self.game.screen, "blue", rect)
            pygame.draw.rect(self.game.screen, "black", rect, 1)


class Game:
    def __init__(self):
        pygame.init()
        self.clock = pygame.time.Clock()
        default_grid_size = 30
        self.screen_grid = (22, 24)
        self.screen = pygame.display.set_mode(
            (self.screen_grid[0] * default_grid_size, self.screen_grid[1] * default_grid_size),
            pygame.RESIZABLE,
        )
        self.grid_size = self.screen.get_size()[0] / self.screen_grid[0]
        self.game_location = (6, 3)
        self.game_area = (10, 20)
        self.board = []
        self.pieces = [Piece(self, "L")]

    def run(self):
        while True:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()

            self.screen.fill("white")
            pygame.draw.rect(
                self.screen,
                "black",
                (
                    self.game_location[0] * self.grid_size,
                    self.game_location[1] * self.grid_size,
                    self.game_area[0] * self.grid_size,
                    self.game_area[1] * self.grid_size,
                ),
            )
            for block in self.board:
                loc = block["location"]
                px = self.game_location[0] * self.grid_size + loc[0] * self.grid_size
                py = self.game_location[1] * self.grid_size + loc[1] * self.grid_size
                pygame.draw.rect(
                    self.game.screen, "gray",
                    (px, py, self.grid_size, self.grid_size),
                )
            self.pieces[0].render()
            pygame.display.update()
            self.clock.tick(60)


if __name__ == "__main__":
    Game().run()
```

**What’s going on:**

- **Board**: `self.board` is a list of dicts with `"location"`. We don’t add anything yet; we draw any blocks in the loop so that when we lock pieces in Step 3, they’ll appear.
- **Piece**: holds `origin`, `offsets` (list of lists of (dx, dy)), and `offset_num`. `render()` converts each (origin + offset) to pixel coordinates and draws a rect. The piece needs `self.game` to access `grid_size` and `game_location` - that’s why we pass the game into the piece.

Next step: make the piece move and lock when it hits the bottom or the board.

**[← Back to Step 2]({{ site.baseurl }}/tutorials/1-1-2/)** · **[Step 3 →]({{ site.baseurl }}/tutorials/1-1-3/)**

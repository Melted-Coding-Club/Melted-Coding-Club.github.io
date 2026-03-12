---
layout: default
title: "Tutorial 1.1 - Step 3 Solution"
permalink: /tutorials/1-1-3-solution/
---

# Step 3 - Solution

[← Step 3]({{ site.baseurl }}/tutorials/1-1-3/) · [Tutorial 1.1]({{ site.baseurl }}/tutorials/1-1/) · [Step 4 →]({{ site.baseurl }}/tutorials/1-1-4/)

---

Here is one way to implement **moving**, **collision**, **locking**, and **new piece**.

```python
import pygame
import sys
import random


class Piece:
    def __init__(self, game, p_type="L"):
        self.game = game
        x = game.game_area[0] // 2 - 1
        self.origin = [x, 0]
        self.type = p_type
        self.offset_num = 0
        if self.type == "L":
            self.offsets = [[(0, 0), (0, 1), (0, 2), (1, 2)]]
        elif self.type == "O":
            self.offsets = [[(0, 0), (1, 0), (0, 1), (1, 1)]]
        else:
            self.offsets = [[(0, 0), (1, 0), (1, 1), (2, 1)]]

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

    def check_collision(self):
        block_locations = []
        for (dx, dy) in self.offsets[self.offset_num]:
            block_locations.append((self.origin[0] + dx, self.origin[1] + dy))
        board_locations = [b["location"] for b in self.game.board]
        for (cx, cy) in block_locations:
            if cy >= self.game.game_area[1]:
                return True
            if cx < 0 or cx >= self.game.game_area[0]:
                return True
            if (cx, cy) in board_locations:
                return True
        return False

    def move(self, direction):
        old_origin = self.origin.copy()
        if direction == "down":
            self.origin[1] += 1
        elif direction == "left":
            self.origin[0] -= 1
        elif direction == "right":
            self.origin[0] += 1
        if self.check_collision():
            self.origin = old_origin
            if direction == "down":
                self.update_board()
                self.new_piece()
            return True
        return False

    def update_board(self):
        for (dx, dy) in self.offsets[self.offset_num]:
            loc = (self.origin[0] + dx, self.origin[1] + dy)
            self.game.board.append({"location": loc, "image": None})

    def new_piece(self):
        self.game.pieces.remove(self.game.pieces[0])
        p_type = random.choice(["L", "O", "Z"])
        self.game.pieces.append(Piece(self.game, p_type))


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
        self.USEREVENT = pygame.USEREVENT + 1
        pygame.time.set_timer(self.USEREVENT, 400)

    def run(self):
        while True:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_a:
                        self.pieces[0].move("left")
                    if event.key == pygame.K_d:
                        self.pieces[0].move("right")
                    if event.key == pygame.K_s:
                        self.pieces[0].move("down")
                if event.type == self.USEREVENT:
                    self.pieces[0].move("down")

            self.screen.fill("white")
            pygame.draw.rect(
                self.screen, "black",
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
                pygame.draw.rect(self.game.screen, "gray", (px, py, self.grid_size, self.grid_size))
            self.pieces[0].render()
            pygame.display.update()
            self.clock.tick(60)


if __name__ == "__main__":
    Game().run()
```

**What’s going on:**

- **`check_collision()`**: builds the set of (col, row) for the piece, checks bounds and overlap with `board`.
- **`move()`**: saves `origin`, applies delta, checks collision; on collision restores `origin`; on **down** collision also calls `update_board()` and `new_piece()`.
- **`update_board()`**: appends one `{"location": ..., "image": ...}` per cell of the piece.
- **`new_piece()`**: removes current piece from the list and appends a new random piece. The game loop always uses `pieces[0]` as the current piece.

Next: add rotation (Step 4).

**[← Back to Step 3]({{ site.baseurl }}/tutorials/1-1-3/)** · **[Step 4 →]({{ site.baseurl }}/tutorials/1-1-4/)**

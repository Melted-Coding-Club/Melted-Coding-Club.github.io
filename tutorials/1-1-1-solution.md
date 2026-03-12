---
layout: default
title: "Tutorial 1.1 - Step 1 Solution"
permalink: /tutorials/1-1-1-solution/
---

# Step 1 - Solution

[← Step 1]({{ site.baseurl }}/tutorials/1-1-1/) · [Tutorial 1.1]({{ site.baseurl }}/tutorials/1-1/) · [Step 2 →]({{ site.baseurl }}/tutorials/1-1-2/)

---

Here is one way to implement the **Game** class and an empty game area.

```python
import pygame
import sys


class Game:
    def __init__(self):
        pygame.init()
        self.clock = pygame.time.Clock()

        default_grid_size = 30
        self.screen_grid = (22, 24)
        self.screen = pygame.display.set_mode(
            (self.screen_grid[0] * default_grid_size, self.screen_grid[1] * default_grid_size),
            pygame.RESIZABLE
        )
        self.grid_size = self.screen.get_size()[0] / self.screen_grid[0]
        self.game_location = (6, 3)
        self.game_area = (10, 20)
        self.board = []

    def run(self):
        while True:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()

            self.screen.fill("white")

            # Draw game area (black rectangle)
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

            pygame.display.update()
            self.clock.tick(60)


if __name__ == "__main__":
    Game().run()
```

**What’s going on:**

- **`__init__`** sets up the window, computes `grid_size` from the window size, and stores `game_location`, `game_area`, and an empty `board`. All of this lives in one place - the `Game` object.
- **`run()`** is the main loop: handle quit, fill background, draw the play area using `game_location`, `game_area`, and `grid_size`, then update the display.

Once this works, you’re ready to add the **Piece** class and draw a piece on the grid in Step 2.

**[← Back to Step 1]({{ site.baseurl }}/tutorials/1-1-1/)** · **[Step 2 →]({{ site.baseurl }}/tutorials/1-1-2/)**

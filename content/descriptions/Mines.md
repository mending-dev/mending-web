A lightweight and powerful plugin for Paper servers (version 1.21+), designed to make mine creation and management fast, easy, and flexible. With **Mines**, server administrators can create, edit, and manage multiple mines, control reset intervals, set custom block contents, and more—all without unnecessary overhead.

Mines is perfect for **SkyMines**, **BoxPvP**, **Prison servers**, or any server where automated, resettable mines are needed.

---

## Features

- **Easy Mine Management**  
  Quickly create new mines and configure them with minimal setup. Supports defining positions, blocks, reset intervals, and more.

- **Automatic Reset**  
  Mines automatically reset based on configured intervals. Supports per-mine scheduling with customizable timers.

- **Intuitive GUI Configuration**  
  Configure all aspects of your mines through a fully-featured graphical interface. Easily manage positions, contents, reset intervals, and more without touching the config files.

- **Lightweight Design**  
  Despite its functionality, Mines is designed to be fast and resource-friendly, without unnecessary complexity.

- **Flexible Configuration**  
  Each mine can have its own settings saved in a structured JSON configuration, allowing easy backups and edits.

- **Async & Performance-Optimized**  
  Automatic mine resets and other long-running tasks are handled efficiently to minimize server lag.

---

## Commands

The plugin provides the main `/mines` command with several subcommands:

- `/mines wand` – Get a wand to set positions for new mines.
- `/mines save <name>` – Save current selection.
- `/mines reset <name>` – Reset a specific mine.
- `/mines set interval <name> <seconds>` – Set the reset interval for a specific mine.
- `/mines set location <name>` – Set the teleport location for a mine.
- `/mines reload` – Reload all mine configurations.
- `/mines list` – List all mines.

> Note: All commands require the appropriate permissions (e.g., `mines.command.set`). Permissions can be managed via your server’s permission system.

---

## Configuration

All mines are stored in a JSON configuration file (`mines.json`). Example structure:

```json
{
  "exampleMine": {
    "resetInterval": 600,
    "contents": [
      {
        "blockType": "STONE",
        "chance": 100
      },
      {
        "blockType": "DIAMOND_ORE",
        "chance": 10
      }
    ],
    "positions": {
      ...
    }
  }
}
```
---
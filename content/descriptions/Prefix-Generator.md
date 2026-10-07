A lightweight application that creates Minecraft prefix textures for your server. You enter a text and a background color, and it generates a ready-to-use PNG that you can add to a resource pack.

## Features

- Generate prefixes from just a text and a background color
- Set the background and text color with a hex code or a color picker
- Multiple styles, each with its own adjustable settings (outline, shadow, gradients, and more)
- Live preview
- Export as PNG
- Available as a desktop app for Windows, macOS and Linux

## Upcoming Features
- Export multiple prefixes
- Export as Java & Bedrock Texturepack
- Export as ItemsAdder, Oraxen and Nexo configuration for Drag & Drop installation
- Add Custom Icons
- Save and Load Projects

## Getting Started

Download the latest version for your system:

| System | File |
| --- | --- |
| Windows | `.msi` or `.exe` |
| macOS (Apple Silicon, M1 and newer) | `.dmg` with `aarch64` in the name |
| macOS (Intel) | `.dmg` with `x64` in the name |
| Linux | `.AppImage`, `.deb` or `.rpm` |

## Installation

### Windows

1. Download the `.msi` or `.exe` file and run it.
2. If Windows SmartScreen shows a warning, click **More info** and then **Run anyway**.
3. Follow the installer and start the app from the Start menu.

### macOS

1. Download the `.dmg` that matches your Mac and open it.
2. Drag **Prefix Generator** into the **Applications** folder.
3. On first launch, right-click the app and choose **Open**, then confirm.

If macOS says the app is damaged or cannot be opened, run this once in the Terminal:

```bash
xattr -cr "/Applications/Prefix Generator.app"
```

### Linux

AppImage:

```bash
chmod +x Prefix.Generator*.AppImage
./Prefix.Generator*.AppImage
```

Debian / Ubuntu (`.deb`):

```bash
sudo apt install ./Prefix.Generator*.deb
```

Fedora / openSUSE (`.rpm`):

```bash
sudo dnf install ./Prefix.Generator*.rpm
```

Note: The apps are not code-signed, which is why Windows and macOS show a warning on first launch.

## Usage

1. Enter the prefix text, for example `Admin`.
2. Choose a background color with a hex code or the color picker.
3. Select a style and adjust its settings.
4. Click **Download PNG** and save the file.

---
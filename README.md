# CSS Clamp Extension

Easily generate fluid typography `clamp()` functions in CSS.

## Features

Convert a set of numbers into a linear interpolation `clamp()` function.

### Usage

1.  **Type your values**:
    *   **4 Values**: `MinFont MaxFont MinWidth MaxWidth` (e.g., `16 40 900 1600`)
    *   **2 Values**: `MinFont MaxFont` (e.g., `16 40`). This uses the default viewport widths configured in settings.
2.  **Trigger the command**:
    *   Place your cursor anywhere inside the values (no selection needed).
    *   Press `Alt+Shift+C` (Mac: `Opt+Shift+C`).
    *   Or run the command `Convert to Clamp` from the Command Palette.

### Examples

*   `16 40 900 1600` -> `clamp(1.1429rem, -1.0607rem + 3.4286vw, 2.8571rem)`
*   `16 40` (with defaults 500-1500) -> `clamp(1.1429rem, 0.1829rem + 2.4vw, 2.8571rem)`

Supports space or comma separators.

## Extension Settings

This extension contributes the following settings:

*   `clampExtension.globalMinViewport`: Default minimum viewport width in pixels (default: `992`). Used when only 2 values are provided.
*   `clampExtension.globalMaxViewport`: Default maximum viewport width in pixels (default: `1920`). Used when only 2 values are provided.
*   `clampExtension.baseFontSize`: Base font size in pixels for `rem` conversion (default: `16`).

## Release Notes

### 0.0.1

Initial release with support for:
*   4-value input (MinFont, MaxFont, MinWidth, MaxWidth)
*   2-value input (MinFont, MaxFont) using configurable defaults
*   Space and comma separators
*   Smart cursor detection (no selection required)

## Working with Markdown

You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**

# Style Guide Generator Chrome Extension

A Chrome extension that analyzes websites and generates comprehensive style guides by extracting colors, fonts, spacing, and border radius values.

## Features

- Extracts color palette used on the webpage
- Identifies all font families in use
- Catalogs spacing values (margin and padding)
- Lists border radius values
- Visual representation of colors with preview swatches
- Clean, organized display of style information

## Installation

1. Clone this repository:
```bash
git clone [repository-url]
cd style-guide-generator
```

2. Install dependencies:
```bash
npm install
```

3. Build the extension:
```bash
npm run build
```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked"
   - Select the `dist` folder from this project

## Usage

1. Navigate to any website you want to analyze
2. Click the Style Guide Generator extension icon in your Chrome toolbar
3. The extension will automatically analyze the current page and display:
   - Color palette with visual swatches
   - Font families in use
   - Spacing values (margin and padding)
   - Border radius values

## Development

To work on the extension locally:

1. Run the development server:
```bash
npm run dev
```

Note: The extension functionality won't work in development mode as it requires Chrome's extension APIs. Use the development server only for UI changes.

2. Make your changes
3. Build the extension:
```bash
npm run build
```

4. Reload the extension in Chrome:
   - Go to `chrome://extensions/`
   - Find the Style Guide Generator extension
   - Click the refresh icon

## Project Structure

- `manifest.json` - Chrome extension configuration
- `content-script.js` - Analyzes page styles
- `main.js` - Popup UI logic
- `style.css` - Extension styling
- `index.html` - Popup HTML structure

## Technical Details

The extension works by:
1. Injecting a content script into the active webpage
2. Using `getComputedStyle()` to extract actual CSS values
3. Collecting unique style values into categories
4. Displaying the results in an organized popup interface

## Browser Compatibility

Currently only supports Google Chrome and other Chromium-based browsers that support Manifest V3 extensions.
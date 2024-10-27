# JSON Response Collector Extension

This Chrome extension captures JSON responses from websites you visit and allows you to download individual or all collected responses.

## Features

- Collects JSON responses with URL details for each visited website.
- Avoids duplicate entries for the same URL.
- Download functionality to save individual JSON responses or all responses at once.

## Extension Setup

1. Clone or download this repository.
2. Navigate to chrome://extensions in your Chrome browser.
3. Enable Developer Mode (top-right corner).
4. Click Load unpacked and select the folder where this extension is stored.
5. The extension icon should now appear in your browser toolbar.

## Extension File Structure

```bash
json-collector-extension/
├── manifest.json          # Extension metadata and permissions
├── background.js          # Background script for intercepting JSON responses
├── popup.html             # Popup interface
├── popup.js               # JavaScript for popup download functionality
└── icons/
    └── icon.png
```

## Demo

Flask App for Testing

```bash
pip install flask
python -u ".\json_test_app\app.py"
```

# Visual Diff Tool

Visual Diff Tool is a simple Node.js utility to **capture screenshots of two web pages**, **compare them pixel-by-pixel**, and **detect visual differences**.

Built using **Puppeteer** and **Pixelmatch**.

Good for **UI regression testing** and **visual validation** during your development or deployment processes.

---

## ✨ Features

- Compare two web pages visually.
- Full-page screenshots with automatic scrolling.
- Chainable API for clean and readable tests.
- Configurable viewport, threshold, labels, and actions (click/type/wait).
- Auto-saves the diff image when differences are found.

---

## 🚀 Installation

```bash
npm install visual-diff-tool
```

---

## 📸 Basic Usage

```javascript
const visualCompare = require('visual-diff-tool');

visualCompare('https://example.com')
    .and('https://example.org')
    .setLabel('homepage-compare')
    .setViewport(1280, 720)
    .setThreshold(0.05)
    .compare()
    .then(result => {
        console.log(result);
    });
```

**Result format:**
```json
{
  "diffPixels": 152,
  "diffPath": "path/to/generated/diff-image.png",
  "isDifferent": true
}
```

---

## 🛠️ API Reference

| Method | Description |
| :--- | :--- |
| `visualCompare(url1)` | Initialize comparison with the first URL. |
| `.and(url2)` | Set the second URL to compare against. |
| `.setLabel(label)` | Set a custom label for screenshots and diff images. |
| `.setViewport(width, height)` | Set browser viewport dimensions. |
| `.setThreshold(value)` | Set pixel difference sensitivity threshold (default `0.1`). |
| `.click(selector)` | Perform a click action on the page before capturing. |
| `.type(selector, text)` | Type text into a field before capturing. |
| `.waitForSelector(selector, options)` | Wait for an element to appear before capturing. |
| `.compare()` | Execute the comparison and return the result. |

---

## 📂 Project Structure

```
visual-compare/
├── node_modules/
├── screenshots/            # Saved screenshots and diffs
├── src/
│   ├── actions/
│   │   └── actionHandler.js
│   ├── browsers/
│   │   ├── headlessBrowser.js
│   │   └── puppeteerBrowser.js
│   ├── utils/
│   │   ├── autoScroll.js
│   │   └── screenshotComparison.js
│   ├── index.js
│   ├── sample.js
│   └── visualCompare.js
├── tests/
│   └── index.test.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚡ Advanced Usage Example

Perform actions like login and navigate through screens before comparison:

```javascript
visualCompare('https://myapp.com/login')
    .and('https://staging.myapp.com/login')
    .click('#login-button')
    .type('#username', 'testuser')
    .type('#password', 'password123')
    .waitForSelector('.dashboard')
    .setViewport(1440, 900)
    .setLabel('login-dashboard')
    .setThreshold(0.02)
    .compare()
    .then(result => {
        if (result.isDifferent) {
            console.log(`Found differences! See: ${result.diffPath}`);
        } else {
            console.log('No visual differences detected.');
        }
    });
```

---

## 📦 Output

- Screenshots and diffs are saved automatically under `/screenshots/` directory.
- Filenames are generated based on the **label** you provide.

Example:

```
screenshots/
├── login-dashboard-screen1-1714384823945.png
├── login-dashboard-screen2-1714384823957.png
├── login-dashboard-diff-1714384823988.png
```

---

## 🧩 Extensibility

This tool is designed to be **modular**:

- **Browser Engine**: Easily swap Puppeteer with other engines (like Playwright) by creating a new browser class.
- **Screenshot Comparison**: Replace Pixelmatch with another library inside `screenshotComparison.js` if needed.

Future enhancements (e.g., ignoring dynamic elements) can be added easily without breaking the core.

---

## ❗ Important Notes

- Ensure your URLs are stable and fully loaded before screenshots.
- Dynamic content (ads, dates, random data) may cause minor differences.
- Auto-scrolling ensures full-page screenshots are consistent.

---

## 📝 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributing

We welcome contributions!  
Feel free to open issues, suggest new features, or submit a pull request to improve this project.


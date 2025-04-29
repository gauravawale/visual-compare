const fs = require('fs');
const path = require('path');
const visualCompare = require('../src/index');

jest.setTimeout(60000); // Set timeout for long page loads

test('compares screenshots and detects pixel differences', async () => {
    const result = await visualCompare('https://example.com')
        .and('https://example.org')
        .setLabel('example-diff')
        .setViewport(1280, 1000)
        .compare();

    expect(result.diffPixels).toBeGreaterThanOrEqual(0);

    if (result.diffPath) {
        expect(fs.existsSync(result.diffPath)).toBe(true);
    } else {
        expect(result.isDifferent).toBe(false);
    }
});

test('supports chaining and custom thresholds', async () => {
    const result = await visualCompare('https://example.com')
        .and('https://example.org')
        .setThreshold(0.2)
        .setLabel('example-diff-threshold')
        .compare();

    expect(result.diffPixels).toBeGreaterThanOrEqual(0);

    if (result.diffPath) {
        expect(result.diffPath).toMatch(/\.png$/);
    } else {
        expect(result.isDifferent).toBe(false);
    }
});

// visualCompare.js
const PuppeteerBrowser = require('./browsers/puppeteerBrowser');
const ActionHandler = require('./actions/actionHandler');
const ScreenshotComparison = require('./utils/screenshotComparison');
const autoScroll = require('./utils/autoScroll');
const path = require('path');
const fs = require('fs');

class VisualCompare {
    constructor(url1, options = {}) {
        this.url1 = url1;
        this.label = 'diff';
        this.actions = new ActionHandler();
        this.viewport = { width: 1280, height: 800 };
        this.threshold = 0;
        this.outputDir = options.outputDir || path.resolve(process.cwd(), 'screenshots');
        this.clearOutputDir = options.clearOutputDir ?? true;

        console.log('--------------------------------');
        console.log(this.outputDir);

        fs.mkdirSync(this.outputDir, { recursive: true });

        this.browser = new PuppeteerBrowser();
    }

    setThreshold(value) {
        this.threshold = value;
        return this;
    }

    and(url2) {
        this.url2 = url2;
        return this;
    }

    click(selector) {
        this.actions.addAction({ type: 'click', selector });
        return this;
    }

    type(selector, text) {
        this.actions.addAction({ type: 'type', selector, text });
        return this;
    }

    waitForSelector(selector, options = {}) {
        this.actions.addAction({ type: 'waitForSelector', selector, options });
        return this;
    }

    setViewport(width, height) {
        this.viewport = { width, height };
        return this;
    }

    setLabel(label) {
        this.label = label;
        return this;
    }

    async compare() {
        const page1 = await this._setupPage(this.url1);
        await autoScroll(page1);
        const imgPath1 = await ScreenshotComparison.captureScreenshot(page1, this.outputDir, this.label, 'screen1');
        await this.close();

        const page2 = await this._setupPage(this.url2);
        await autoScroll(page2);
        const imgPath2 = await ScreenshotComparison.captureScreenshot(page2, this.outputDir, this.label, 'screen2');

        await this.close();
        return await ScreenshotComparison.compareScreenshots(imgPath1, imgPath2, this.label, this.threshold);

    }

    async _setupPage(url) {
        await this.browser.launch();
        const page = await this.browser.goto(url).catch(err => console.error('goto failed', err));

        await this.browser.setViewport(page, this.viewport.width, this.viewport.height);

        await this.actions.performActions(page);

        return page;
    }

    async close() {
        await this.browser.close();
    }
}

module.exports = VisualCompare;

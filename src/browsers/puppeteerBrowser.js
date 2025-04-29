// puppeteerBrowser.js
const puppeteer = require('puppeteer');
const HeadlessBrowser = require('./headlessBrowser');

class PuppeteerBrowser extends HeadlessBrowser {
    constructor() {
        super();
        this.browser = null;
    }

    async launch() {
        this.browser = await puppeteer.launch();
        return this.browser;
    }

    async goto(url) {
        const page = await this.browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        return page;
    }

    async screenshot(page, path, fullPage) {
        await page.screenshot({ path, fullPage });
    }

    async setViewport(page, width, height) {
        await page.setViewport({ width, height });
    }

    async close() {
        await this.browser.close();
    }
}

module.exports = PuppeteerBrowser;

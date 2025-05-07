// puppeteerBrowser.js
const puppeteer = require('puppeteer');
const HeadlessBrowser = require('./headlessBrowser');

class PuppeteerBrowser extends HeadlessBrowser {
    constructor() {
        super();
        this.browser = null;
    }

    async launch() {
        this.browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-software-rasterizer',
                '--disable-extensions',
                '--disable-background-networking',
                '--disable-sync',
                '--metrics-recording-only',
                '--window-size=1280,720'
            ],
            defaultViewport: {
                width: 1280,
                height: 720
            },
            protocolTimeout: 120000,
            headless: true
        });
        return this.browser;
    }

    async goto(url) {
        const page = await this.browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 120000 });
        console.log('------- Go to successful');
        return page;
    }

    async setViewport(page, width, height) {
        await page.setViewport({ width, height });
    }

    async close() {
        await this.browser.close();
    }
}

module.exports = PuppeteerBrowser;

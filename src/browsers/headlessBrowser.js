// headlessBrowser.js
class HeadlessBrowser {
    constructor() {
        if (this.constructor === HeadlessBrowser) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    async launch() {
        throw new Error('Method "launch" must be implemented.');
    }

    async goto(url) {
        throw new Error('Method "goto" must be implemented.');
    }

    async screenshot(path, fullPage) {
        throw new Error('Method "screenshot" must be implemented.');
    }

    async setViewport(width, height) {
        throw new Error('Method "setViewport" must be implemented.');
    }

    async close() {
        throw new Error('Method "close" must be implemented.');
    }

    static create() {
        return new this();
    }
}

module.exports = HeadlessBrowser;

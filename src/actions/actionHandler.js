// actionHandler.js
class ActionHandler {
    constructor(actions = []) {
        this.actions = actions;
    }

    addAction(action) {
        this.actions.push(action);
    }

    async performActions(page) {
        for (const action of this.actions) {
            if (action.type === 'click') {
                await page.click(action.selector);
            } else if (action.type === 'type') {
                await page.type(action.selector, action.text);
            } else if (action.type === 'waitForSelector') {
                await page.waitForSelector(action.selector, action.options);
            }
        }
    }
}

module.exports = ActionHandler;

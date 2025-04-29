const VisualCompare = require('./visualCompare');

function visualCompare(url1, options = {}) {
    return new VisualCompare(url1, options);
}

module.exports = visualCompare;

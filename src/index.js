const VisualCompare = require('./visualCompare');

function visualCompare(url1) {
    return new VisualCompare(url1);
}

module.exports = visualCompare;

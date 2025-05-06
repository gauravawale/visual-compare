// screenshotComparison.js
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

class ScreenshotComparison {
    static async captureScreenshot(page, outputDir, label, suffix) {
        const timestamp = Date.now();
        const imgPath = path.join(outputDir, `${label}-${suffix}-${timestamp}.png`);
        console.log(suffix + ' taking screenshot');
        await page.waitForSelector('body', { visible: true });
        console.log('waiting done!');
        await page.screenshot({ path: imgPath, fullPage: false }).catch(err => console.error('Screenshot failed:', err));
        console.log(suffix + ' taking screenshot done');
        return imgPath;
    }

    static async compareScreenshots(imgPath1, imgPath2, label, threshold = 0.1) {
        const img1 = PNG.sync.read(fs.readFileSync(imgPath1));
        const img2 = PNG.sync.read(fs.readFileSync(imgPath2));

        const width = Math.min(img1.width, img2.width);
        const height = Math.min(img1.height, img2.height);

        // Crop both images to shared size
        const croppedImg1 = this._cropImage(img1, width, height);
        const croppedImg2 = this._cropImage(img2, width, height);

        const diff = new PNG({ width, height });
        const diffPixels = pixelmatch(
            croppedImg1.data,
            croppedImg2.data,
            diff.data,
            width,
            height,
            { threshold }
        );

        const diffPath = path.join(path.dirname(imgPath1), `${label}-diff-${Date.now()}.png`);
        if (diffPixels > 0) {
            fs.writeFileSync(diffPath, PNG.sync.write(diff));
            return { diffPixels, diffPath, isDifferent: true };
        }

        return { diffPixels, diffPath: null, isDifferent: false };
    }

     static _cropImage(png, width, height) {
        const cropped = new PNG({ width, height });
        PNG.bitblt(png, cropped, 0, 0, width, height, 0, 0);
        return cropped;
    }
}

module.exports = ScreenshotComparison;

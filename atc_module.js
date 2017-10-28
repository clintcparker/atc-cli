const puppeteer = require('puppeteer');

var atcModule = { 
    runATC : function (atcOpts){
        (async() => {
        let devToolsVal = atcOpts.debug
        const browser = await puppeteer.launch({devtools : devToolsVal, headless:!devToolsVal});
        const page = await browser.newPage();
        await page.goto('https://workforcenow.adp.com', {waitUntil: 'networkidle'});
        await page.type('.input1',atcOpts.username);
        await page.type('.input2',atcOpts.password);
        await page.click('input.primaryButton');
        await page.waitForNavigation({waitUntil: 'networkidle', networkIdleTimeout:5000});
        await page.click('span#EnrollmentProfileSplash\\.Cancel_LABEL');
        await page.goto('https://workforcenow.adp.com/portal/theme#/Myself_ttd_MyselfTabTimecardsAttendanceSchCategoryTLMWebMyTimecard/MyselfTabTimecardsAttendanceSchCategoryTLMWebMyTimecard',{waitUntil:'networkidle', networkIdleTimeout:5000});
        await page.addScriptTag({url:'https://cdn.rawgit.com/dwachss/bililiteRange/master/bililiteRange.js'});
        await page.addScriptTag({url:'https://cdn.rawgit.com/dwachss/bililiteRange/master/jquery.sendkeys.js'});
        await page.addScriptTag({url:'https://cdn.rawgit.com/ebiggz/ADPAutoTimecard/master/adpAutoTimecard.js'});
        var result = await page.evaluate((atcOpts) => {
            runATC(atcOpts.entries, atcOpts.salariedMode);
          },atcOpts);
        await page.waitFor(5000);
        await page.click('#btnSubmit');
        await page.waitFor(10000);
        browser.close();
        })();
    }
}

module.exports = atcModule;
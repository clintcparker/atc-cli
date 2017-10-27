var prompt = require('password-prompt')
const puppeteer = require('puppeteer');

var atcModule = { 
    runATC : function (atcOpts){
        (async() => {
          let password
        if (atcOpts.password){
          password = atcOpts.password;
        } else {
          password = await prompt('password: ')
        }
        let devToolsVal = atcOpts.debug
        const browser = await puppeteer.launch({devtools : devToolsVal, headless:!devToolsVal});
        const page = await browser.newPage();
        var userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
        await page.setUserAgent(userAgent)
        console.log('opening');
        await page.goto('https://workforcenow.adp.com', {waitUntil: 'networkidle'});
        await page.type('.input1','cparker@mboinc');
        await page.type('.input2',password);
        await page.click('input.primaryButton');
        console.log('login submitted');
        await page.waitForNavigation({waitUntil: 'networkidle', networkIdleTimeout:5000});
        console.log('waiting for nav');
        await page.goto('https://workforcenow.adp.com/portal/theme#/Myself_ttd_MyselfTabTimecardsAttendanceSchCategoryTLMWebMyTimecard/MyselfTabTimecardsAttendanceSchCategoryTLMWebMyTimecard',{waitUntil:'networkidle', networkIdleTimeout:5000})
        console.log('navigated');
        console.log('injecting');
        await page.addScriptTag({url:'https://cdn.rawgit.com/dwachss/bililiteRange/master/bililiteRange.js'});
        await page.addScriptTag({url:'https://cdn.rawgit.com/dwachss/bililiteRange/master/jquery.sendkeys.js'});
        await page.addScriptTag({url:'https://cdn.rawgit.com/ebiggz/ADPAutoTimecard/master/adpAutoTimecard.js'});
        console.log(Date.now())
        console.log('evaluating');
        console.log(Date.now())
        
        var result = await page.evaluate((atcOpts) => {
            runATC(atcOpts.entries, atcOpts.salariedMode);
          },atcOpts);
        // var result = await page.waitForFunction("runATC",atcOpts.entries,atcOpts.salariedMode);
        console.log(result); 
        await page.waitFor(5000);
        await page.click('#btnSubmit');
        await page.waitFor(10000);
        browser.close();
        })();
    }
}

module.exports = atcModule;
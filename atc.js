//start.js
var program = require("commander");
var prompt = require('password-prompt')
const puppeteer = require('puppeteer');
const fs = require('fs');
var opts ={}


program
//.version(package.version)
.option("-n, --username <name>", "adp username")
.option("-t, --entries <times>", "time card entries in JSON")
.option("-s, --salaried", "Salaried Mode")




program.parse(process.argv);

if (!process.argv.slice(2).length) {
program.outputHelp();
}



if (!(program.entries && program.username)){
  exit;
}


loadPage();

function loadPage(){
  (async() => {
  
  let password = await prompt('password: ')

  var devToolsVal = false;
  devToolsVal = true;
  
  //var atcOpts = {entries: [{hours:"8", projectCode:"00109"}], salariedMode: true};
  var atcOpts = {entries: program.entries, salariedMode: program.salaried};
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
  
  //await page.focus('#toolbarQuickSearch');
  //await page.type('clint',{delay:300});
  
  //MyTeam_ttd_manOrganizationalChart
  //await page.click('#MyTeam_navItem',{delay:100});
  //await page.click('#MyTeam_ttd_manOrganizationalChart',{delay:100});
  console.log('waiting for nav');
  //MyTeam_navItem_label
  await page.goto('https://workforcenow.adp.com/portal/theme#/Myself_ttd_MyselfTabTimecardsAttendanceSchCategoryTLMWebMyTimecard/MyselfTabTimecardsAttendanceSchCategoryTLMWebMyTimecard',{waitUntil:'networkidle', networkIdleTimeout:5000})
  //await page.waitForNavigation({waitUntil: 'networkidle', networkIdleTimeout:5000});
  
  console.log('navigated');
  //await page.url('https://workforcenow.adp.com/portal/theme#/MyTeam_ttd_m anOrganizationalChart/manOrganizationalChart', {waitUntil: 'networkidle', networkIdleTimeout:6000});
  //console.log(`Current directory: ${process.cwd()}`);
  console.log('injecting');
  //await page.injectFile('adp_org.js');
  await page.addScriptTag({url:'https://cdn.rawgit.com/dwachss/bililiteRange/master/bililiteRange.js'});
  await page.addScriptTag({url:'https://cdn.rawgit.com/dwachss/bililiteRange/master/jquery.sendkeys.js'});
  await page.addScriptTag({url:'https://cdn.rawgit.com/ebiggz/ADPAutoTimecard/master/adpAutoTimecard.js'});
  console.log(Date.now())
  //await page.addScriptTag({path:'runatc.js'});
  /*
  var dataStr = '{"emplRcdNum":"0","employeeId":"100068"}';
  var googresult = await page.evaluate((dataStr)=>{
      return Promise.resolve($.ajax({
          method:'POST',
          url:'https://workforcenow.adp.com/portal/orgchart/ajax?action=orgChartBean.loadOrgChartAjax&type=METHOD_ACTION',
          data: {data : dataStr}
      }));
  }, dataStr);
  */
  
  console.log('evaluating');
  console.log(Date.now())
  
  var result = await page.evaluate((atcOpts) => {
      runATC(atcOpts.entries, atcOpts.salariedMode);
    },atcOpts);
  console.log(result); 
  await page.waitFor(5000);
  await page.click('#btnSubmit');
  
  await page.waitFor(10000);
  browser.close();
  })();
  
  }
 const puppy = require("puppeteer");
 
const id = "hicap73988@isecv.com";
const pass = "Keybo@rd1";

let challanegeName = ["challenge1"  , "challenge2", "challenge3", "challenge4", "challenge5"];
let description = "Test Challenge";
let tags = ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"];

let moderators = [
    "nocidi6371",
    "ralariv999",
    "yasekin473",
    "sibaje3329",
    "pamahex943",
    "mijora9576",
    "bokej31440",
    "pamahex943", 
    "kejavib309",
    "fenemo4073"
];

async function main(){
    let browser = await puppy.launch({
        headless: false, 
        defaultViewport: false,
        args: ["--start-maximized"]
    });
    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1", id);
    await tab.type("#input-2", pass);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForNavigation({waitUntil: "networkidle2"});
    await tab.click(".username.text-ellipsis");
    await tab.click("a[data-analytics='NavBarProfileDropDownAdministration']");
    await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li", {visible:true});
    let adminButtons = await tab.$$(".nav-tabs.nav.admin-tabbed-nav li");
    await adminButtons[1].click();
    await tab.waitForSelector(".btn.btn-green.backbone.pull-right", {visible: true});
    let createChallengeButton = await tab.$(".btn.btn-green.backbone.pull-right");
    let createChallengeUrl = await tab.evaluate(function(ele){
        return ele.getAttribute("href");
    }, createChallengeButton);
    for(let i = 0; i < 5; i++){
        await createChallenge("https://www.hackerrank.com" + createChallengeUrl, tab, i);
    }

    await browser.close();
}

async function createChallenge(url, tab, i){
    await tab.goto(url);
    await tab.waitForSelector("#name", {visible: true});
    await tab.type("#name", challanegeName[i]);
    await tab.type("#preview", description);
    await tab.waitForSelector(".CodeMirror textarea", {visible: true});
    let textareas = await tab.$$(".CodeMirror textarea");
    for(let j = 0; j < textareas.length; j++){
        await textareas[j].type(description);
    }
    await tab.waitForSelector("#tags_tag", {visible: true});
    for(let j = 0; j < tags.length; j++){
        await tab.type("#tags_tag", tags[j]);
        await tab.keyboard.press('Enter');
    }
    await tab.waitForSelector(".save-challenge.btn.btn-green", {visible: true});
    await tab.click(".save-challenge.btn.btn-green");
    await tab.waitForSelector("li[data-tab = 'moderators']", {visible: true});
    await tab.click("li[data-tab = 'moderators']");
    await tab.waitForSelector("#moderator", {visible : true});
    for(let j = 0; j < moderators.length; j++){
        await tab.type("#moderator", moderators[j]);
        await tab.click(".btn.moderator-save");
    }
    await tab.click(".save-challenge.btn.btn-green");
}


main();
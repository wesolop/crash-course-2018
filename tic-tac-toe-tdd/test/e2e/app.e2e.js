import {expect} from 'chai';
import puppeteer from 'puppeteer';
import {beforeAndAfter, app} from './../environment';

describe('React application', () => {
  let page;
  beforeAndAfter();
  before(async () => {
    const browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it('should start a new game', async () => {
    const user1 = 'Yaniv';
    const user2 = 'Computer';
    await page.goto(app.getUrl('/'));
    await page.waitForSelector('.user1');
    await page.type('.user1', user1);
    await page.type('.user2', user2);
    await page.$eval('.start', btn => btn.click());
    expect(await page.$eval('.input1', el => el.innerText)).to.equal(user1);
    expect(await page.$eval('.input2', el => el.innerText)).to.equal(user2);
  });
});

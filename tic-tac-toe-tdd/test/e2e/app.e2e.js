import {expect} from 'chai';
import puppeteer from 'puppeteer';
import {beforeAndAfter, app} from './../environment';

describe('React application', () => {
  let page;
  beforeAndAfter();
  before(async () => {
    const browser = await puppeteer.launch({devtools: true});
    page = await browser.newPage();
  });

  it('should start a new game', async () => {
    const user1 = 'Yaniv';
    const user2 = 'Computer';
    await page.goto(app.getUrl('/'));
    await page.waitForSelector('.user1');
    await page.$eval('.user1', (el, u1) => {
      el.value = u1;
      const event = new Event('change', {bubbles: true});
      event.simulated = true;
      el.dispatchEvent(event);
    }, user1);
    await page.$eval('.user2', (el, u2) => {
      el.value = u2;
      const event = new Event('change', {bubbles: true});
      event.simulated = true;
      el.dispatchEvent(event);
    }, user2);
    await page.$eval('.start', btn => btn.click());
    expect(await page.$eval('.input1', el => el.innerText)).to.equal(user1);
    expect(await page.$eval('.input2', el => el.innerText)).to.equal(user2);
  });
});

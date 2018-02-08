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

  describe('open page', () => {
    it('should display title', async () => {
      await page.goto(app.getUrl('/'));
      expect(await page.$eval('h2', h => h.innerText)).to.equal('Hello World!');
    });
  });
});

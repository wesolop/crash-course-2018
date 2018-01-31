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

  it('should display title', async () => {
    await page.goto(app.getUrl('/'));
    const text = await page.$eval('h2', el => el.innerText);
    expect(text).to.equal('Hello World!');
  });
});

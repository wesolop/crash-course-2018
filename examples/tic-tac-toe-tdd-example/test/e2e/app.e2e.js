import {expect} from 'chai';
import puppeteer from 'puppeteer';
import {beforeAndAfter, app} from './../environment';
import {inputTestkitFactory, buttonTestkitFactory} from 'wix-style-react/dist/testkit/puppeteer';

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
    const user1Driver = await inputTestkitFactory({dataHook: 'user1', page});
    const user2Driver = await inputTestkitFactory({dataHook: 'user2', page});
    const buttonDriver = await buttonTestkitFactory({dataHook: 'newGame', page});
    await user1Driver.enterText(user1);
    await user2Driver.enterText(user2);
    await buttonDriver.click();
    expect(await page.$eval('[data-hook="user1Title"]', el => el.innerText)).to.equal(user1);
    expect(await page.$eval('[data-hook="user2Title"]', el => el.innerText)).to.equal(user2);
  });
});

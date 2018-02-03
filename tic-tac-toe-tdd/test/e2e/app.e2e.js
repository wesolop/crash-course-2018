import {expect} from 'chai';
import puppeteer from 'puppeteer';
import {beforeAndAfter, app} from './../environment';

const appDriver = page => ({
  when: {
    newGame: async ({user1, user2}) => {
      await page.type('[data-hook="user1"]', user1);
      await page.type('[data-hook="user2"]', user2);
      await page.$eval('[data-hook="start"]', btn => btn.click());
    },
    navigateAndWait: async (url = '/') => {
      await page.goto(app.getUrl(url));
      await page.waitForSelector('[data-hook="user1"]');
    },
    clickACellAt: index => page.$$eval('td', (els, i) => els[i].click(), index)
  },
  get: {
    user1Title: () => page.$eval('[data-hook="input1"]', el => el.innerText),
    user2Title: () => page.$eval('[data-hook="input2"]', el => el.innerText),
    aCellAt: index => page.$$eval('td', (els, i) => els[i].innerText, index),
  }
});

describe('React application', () => {
  let page, driver;
  beforeAndAfter();
  before(async () => {
    const browser = await puppeteer.launch();
    page = await browser.newPage();
    driver = appDriver(page);
  });

  it('should start a new game', async () => {
    const user1 = 'Yaniv';
    const user2 = 'Computer';
    await driver.when.navigateAndWait();
    await driver.when.newGame({user1, user2});
    expect(await driver.get.user1Title()).to.equal(user1);
    expect(await driver.get.user2Title()).to.equal(user2);
  });

  it('should show "X" after forst user clicks', async () => {
    const user1 = 'Yaniv';
    const user2 = 'Computer';
    await driver.when.navigateAndWait();
    await driver.when.newGame({user1, user2});
    await driver.when.clickACellAt(0);
    expect(await driver.get.aCellAt(0)).to.equal('X');
  });
});

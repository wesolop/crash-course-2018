import {expect} from 'chai';
import puppeteer from 'puppeteer';
import {beforeAndAfter, app} from './../environment';

const appDriver = page => ({
  when: {
    newGame: async ({user1, user2}) => {
      await page.type('.user1', user1);
      await page.type('.user2', user2);
      await page.$eval('.start', btn => btn.click());
    },
    navigateAndWait: async (url = '/') => {
      await page.goto(app.getUrl(url));
      await page.waitForSelector('.user1');
    }
  },
  get: {
    user1Title: () => page.$eval('.input1', el => el.innerText),
    user2Title: () => page.$eval('.input2', el => el.innerText),
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
});

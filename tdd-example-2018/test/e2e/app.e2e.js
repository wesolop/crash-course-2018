import {expect} from 'chai';
import puppeteer from 'puppeteer';
import {beforeAndAfter, app} from './../environment';

const appDriver = ({page}) => ({
  when: {
    newGame: async ({p1, p2}) => {
      await page.type('[data-hook="p1Input"]', p1);
      await page.type('[data-hook="p2Input"]', p2);
      await page.click('[data-hook="newGame"]');
    },
    navigate: () => page.goto(app.getUrl('/'))
  },
  get: {
    p1Name: () => page.$eval('.p1Name', el => el.innerText),
    p2Name: () => page.$eval('.p2Name', el => el.innerText),
  }
});

describe('React application', () => {
  let driver, page;
  beforeAndAfter();

  before(async () => {
    const browser = await puppeteer.launch();
    page = await browser.newPage();
    driver = appDriver({page});
  });

  it('should start a new game', async () => {
    const p1 = 'Yaniv';
    const p2 = 'Computer';
    await driver.when.navigate();
    await driver.when.newGame({p1, p2});
    expect(await driver.get.p1Name()).to.equal(p1);
    expect(await driver.get.p2Name()).to.equal(p2);
  });
});

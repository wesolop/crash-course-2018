import {expect} from 'chai';
import puppeteer from 'puppeteer';
import {beforeAndAfter, app} from './../environment';
import {inputTestkitFactory} from 'wix-style-react/dist/testkit/puppeteer';

const appDriver = page => ({
  when: {
    newGame: async ({user1, user2}) => {
      const user1InputTestkit = await inputTestkitFactory({dataHook: 'user1', page});
      await user1InputTestkit.enterText(user1);
      const user2InputTestkit = await inputTestkitFactory({dataHook: 'user2', page});
      await user2InputTestkit.enterText(user2);
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
    winnerMessage: () => page.$eval('[data-hook="winner-message"]', el => el.innerText),
    hasWinner: async () => !!(await page.$('[data-hook="winner-message"]'))
  },
  is: {
    gameVisible: async () => !!(await page.$('table')),
    registrationVisible: async () => !!(await page.$('[data-hook="registration"]'))
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

  it('should show "X" after first user clicks', async () => {
    const user1 = 'Yaniv';
    const user2 = 'Computer';
    await driver.when.navigateAndWait();
    await driver.when.newGame({user1, user2});
    expect(await driver.get.aCellAt(0)).to.equal('');
    await driver.when.clickACellAt(0);
    expect(await driver.get.aCellAt(0)).to.equal('X');
  });

  it('first user should win the game', async () => {
    const user1 = 'Yaniv';
    const user2 = 'Computer';
    await driver.when.navigateAndWait();
    await driver.when.newGame({user1, user2});
    await driver.when.clickACellAt(0);
    await driver.when.clickACellAt(3);
    expect(await driver.get.hasWinner(), 'has winner').to.equal(false);
    await driver.when.clickACellAt(1);
    await driver.when.clickACellAt(4);
    await driver.when.clickACellAt(2);
    expect(await driver.get.winnerMessage()).to.equal(`${user1} won!`);
  });

  it('should hide game while registration on', async () => {
    await driver.when.navigateAndWait();
    expect(await driver.is.gameVisible(), 'is game visible').to.equal(false);
  });

  it('should hide registration after game started', async () => {
    const user1 = 'Yaniv';
    const user2 = 'Computer';
    await driver.when.navigateAndWait();
    await driver.when.newGame({user1, user2});
    expect(await driver.is.registrationVisible(), 'is registration visible').to.equal(false);
  });
});

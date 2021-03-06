import {expect} from 'chai';
import puppeteer from 'puppeteer';
import {beforeAndAfter, app} from './../environment';
import {inputTestkitFactory, buttonTestkitFactory} from 'wix-style-react/dist/testkit/puppeteer';

const appDriver = ({page}) => ({
  when: {
    newGame: async ({user1, user2}) => {
      const user1Driver = await inputTestkitFactory({dataHook: 'user1', page});
      const user2Driver = await inputTestkitFactory({dataHook: 'user2', page});
      const buttonDriver = await buttonTestkitFactory({dataHook: 'newGame', page});
      await user1Driver.enterText(user1);
      await user2Driver.enterText(user2);
      await buttonDriver.click();
    },
    navigate: () => page.goto(app.getUrl('/')),
    clickACellAt: index => page.$$eval('td', (cells, _index) => cells[_index].click(), index),
  },
  get: {
    player1Name: () => page.$eval('[data-hook="user1Title"]', el => el.innerText),
    player2Name: () => page.$eval('[data-hook="user2Title"]', el => el.innerText),
    aCellAt: index => page.$$eval('td', (cells, _index) => cells[_index].innerText, index),
    winnerMessage: () => page.$eval('[data-hook="winner"]', el => el.innerText),
  },
  is: {
    winnerVisible: async () => !!(await page.$('[data-hook="winner"]'))
  }
});

describe('React application', () => {
  let page, driver;
  beforeAndAfter();
  before(async () => {
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });
    page = await browser.newPage();
    driver = appDriver({page});
  });

  it('should start a new game', async () => {
    const user1 = 'Yaniv';
    const user2 = 'Computer';
    await driver.when.navigate();
    await driver.when.newGame({user1, user2});
    expect(await driver.get.player1Name()).to.equal(user1);
    expect(await driver.get.player2Name()).to.equal(user2);
  });

  it('should show "x" after first player clicks', async () => {
    const user1 = 'Yaniv';
    const user2 = 'Computer';
    await driver.when.navigate();
    await driver.when.newGame({user1, user2});
    expect(await driver.get.aCellAt(0)).to.equal('');
    await driver.when.clickACellAt(0);
    expect(await driver.get.aCellAt(0)).to.equal('X');
  });

  it('first player should win the game', async () => {
    const user1 = 'Yaniv';
    const user2 = 'Computer';
    await driver.when.navigate();
    await driver.when.newGame({user1, user2});
    await driver.when.clickACellAt(0);
    await driver.when.clickACellAt(3);
    expect(await driver.is.winnerVisible(), 'is winner visible').to.equal(false);
    await driver.when.clickACellAt(1);
    await driver.when.clickACellAt(4);
    await driver.when.clickACellAt(2);
    expect(await driver.get.winnerMessage()).to.equal('Yaniv wins!');
  });
});

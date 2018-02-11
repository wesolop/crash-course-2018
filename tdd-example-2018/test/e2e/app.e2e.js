import {expect} from 'chai';
import puppeteer from 'puppeteer';
import {beforeAndAfter, app} from './../environment';
import {inputTestkitFactory} from 'wix-style-react/dist/testkit/puppeteer';

const appDriver = ({page}) => ({
  when: {
    newGame: async ({p1, p2}) => {
      const p1Driver =
        await inputTestkitFactory({dataHook: 'p1Input', page});
      const p2Driver =
        await inputTestkitFactory({dataHook: 'p2Input', page});

      await p1Driver.enterText(p1);
      await p2Driver.enterText(p2);
      await page.click('[data-hook="newGame"]');
    },
    navigate: () => page.goto(app.getUrl('/')),
    clickACellAt: index =>
      page.$$eval('td', (elements, _index) => elements[_index].click(), index)
  },
  get: {
    p1Name: () => page.$eval('.p1Name', el => el.innerText),
    p2Name: () => page.$eval('.p2Name', el => el.innerText),
    cellAt: index =>
      page.$$eval('td', (elements, _index) => elements[_index].innerText, index)
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

  it('should show an "X" after first player clicks', async () => {
    const p1 = 'Yaniv';
    const p2 = 'Computer';
    await driver.when.navigate();
    await driver.when.newGame({p1, p2});
    expect(await driver.get.cellAt(0)).to.equal('');
    await driver.when.clickACellAt(0);
    expect(await driver.get.cellAt(0)).to.equal('X');
  });
});

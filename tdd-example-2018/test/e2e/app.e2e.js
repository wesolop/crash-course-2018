import {expect} from 'chai';
import puppeteer from 'puppeteer';
import {beforeAndAfter, app} from './../environment';
import {inputTestkitFactory} from 'wix-style-react/dist/testkit/puppeteer';

const appDriver = ({page}) => ({
  when: {
    newGame: async ({p1, p2} = {p1: 'Yaniv', p2: 'Computer'}) => {
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
      page.$$eval('td', (elements, _index) => elements[_index].innerText, index),
    winnerMessage: () => page.$eval('[data-hook="winnerMessage"]', el => el.innerText),
    leaderBoard: () => page.$eval('[data-hook="leader-board"]', el => (
      Array.from(el.querySelectorAll('[data-hook="leader-board-row"]')).map(row => ({
        name: row.querySelector('[data-hook="leader-board-name"]').textContent.trim(),
        score: Number(row.querySelector('[data-hook="leader-board-score"]').textContent),
      }))
    )),
  },
  is: {
    winnerMessageVisible: async () => !!(await page.$('[data-hook="winnerMessage"]')),
    gameDisplayed: async () => Boolean(await page.$('[data-hook="game-board"]')),
    registrationDisplayed: async () => Boolean(await page.$('[data-hook="registration"]'))
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
    await driver.when.navigate();
    await driver.when.newGame();
    expect(await driver.get.cellAt(0)).to.equal('');
    await driver.when.clickACellAt(0);
    expect(await driver.get.cellAt(0)).to.equal('X');
  });

  it('first player should win', async () => {
    const p1 = 'Yaniv';
    const p2 = 'Computer';
    await driver.when.navigate();
    await driver.when.newGame({p1, p2});
    await driver.when.clickACellAt(0);
    await driver.when.clickACellAt(3);
    await driver.when.clickACellAt(1);
    await driver.when.clickACellAt(4);
    await driver.when.clickACellAt(2);
    expect(await driver.get.winnerMessage()).to.equal(`${p1} wins!`);
  });

  it('should not have a winner', async () => {
    await driver.when.navigate();
    await driver.when.newGame();
    expect(await driver.is.winnerMessageVisible(), 'winner message visible').to.equal(false);
  });

  it('should not have board rendered before registration', async () => {
    await driver.when.navigate();
    expect(await driver.is.gameDisplayed()).to.be.false;
  });

  it('should have board rendered after registration', async () => {
    await driver.when.navigate();
    await driver.when.newGame();
    expect(await driver.is.gameDisplayed()).to.be.true;
  });

  it('should initialy render registration', async () => {
    await driver.when.navigate();
    expect(await driver.is.registrationDisplayed()).to.be.true;
  });

  it('should hide registration after game started', async () => {
    await driver.when.navigate();
    await driver.when.newGame();
    expect(await driver.is.registrationDisplayed()).to.be.false;
  });

  // it('should display empty leaderboard before new game', async () => {
  //   const p1 = 'Yaniv';
  //   const p2 = 'Omer';
  //   await driver.when.navigate();
  //   await driver.when.newGame({p1, p2});
  //   expect(await driver.get.leaderBoard()).to.be.eql([
  //     {name: p1, score: 0},
  //     {name: p2, score: 0},
  //   ]);
  // });

  // it('should display leaderboard with 0:0 after new game', async () => {
  //   const p1 = 'Yaniv';
  //   const p2 = 'Omer';
  //   await driver.when.navigate();
  //   await driver.when.newGame({p1, p2});
  //   expect(await driver.get.leaderBoard()).to.be.eql([
  //     {name: p1, score: 0},
  //     {name: p2, score: 0},
  //   ]);
  // });

  it.skip('should update leader board upon player winning', async () => {
    const p1 = 'Yaniv';
    const p2 = 'Omer';
    await driver.when.navigate();
    await driver.when.newGame({p1, p2});
    await driver.when.clickACellAt(0);
    await driver.when.clickACellAt(3);
    await driver.when.clickACellAt(1);
    await driver.when.clickACellAt(4);
    await driver.when.clickACellAt(2);
    expect(await driver.get.leaderBoard()).to.be.eql([
      {name: p1, score: 1},
      {name: p2, score: 0},
    ]);
  });
});

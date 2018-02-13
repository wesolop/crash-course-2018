import 'jsdom-global/register';
import {expect} from 'chai';
import createAppDriver from './App.driver';
import nock from 'nock';
import {baseURL} from '../../../test/test-common';
import eventually from 'wix-eventually';



describe('App', () => {
  let driver, nockScope;

  beforeEach(async () => {
    nockScope = nock(baseURL + '/')
      .get('/leader-board')
      .reply(200, []);

    driver = createAppDriver().when.craeted();

    await eventually(() => {
      expect(nockScope.isDone()).to.be.true;
    });
  });

  afterEach(() => {
    driver.cleanup();
  });


  it('should show "O" after second player clicks', () => {
    const p1 = 'Yaniv';
    const p2 = 'Computer';
    driver.when.startGame({p1, p2})
    .when.clickCell(0)
    .when.clickCell(1);

    expect(driver.get.cellText(1)).to.eq('O');
  });

  it('should show second play (O) win', () => {
    const p1 = 'Yaniv';
    const p2 = 'Computer';
    driver.when.startGame({p1, p2})
    .when.clickCell(3)
    .when.clickCell(0)
    .when.clickCell(7)
    .when.clickCell(1)
    .when.clickCell(5)
    .when.clickCell(2);

    expect(driver.get.winnerMessage().includes(p2)).to.be.true;

  });

  it('should show first play (X) win', () => {
    const p1 = 'Yaniv';
    const p2 = 'Computer';
    driver.when.startGame({p1, p2})
    .when.clickCell(0)
    .when.clickCell(3)
    .when.clickCell(1)
    .when.clickCell(7)
    .when.clickCell(2)
    .when.clickCell(5);

    expect(driver.get.winnerMessage().includes(p1)).to.be.true;

  });

  it('should render empty leaderBoard', () => {
    expect(driver.get.leaderBoard()).to.be.eql('00');
  });

  it.skip('should show leaderBoard with names after registration', () => {
    const p1 = 'Yaniv';
    const p2 = 'Computer';
    driver.when.startGame({p1, p2});

    expect(driver.get.winnerMessage().includes(p1)).to.be.true;
  });
});

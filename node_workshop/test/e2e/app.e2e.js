import {expect} from 'chai';
import puppeteer from 'puppeteer';
import env from './../environment';
import Chance from 'chance';

const {server, rpcServer, beforeAndAfter} = env();

describe('React application', () => {
  let page, chance;
  beforeAndAfter();

  afterEach(() => rpcServer.reset());

  before(async () => {
    chance = new Chance();
    const browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it('should site comments', async () => {
    const siteId = chance.guid();
    const aComment = {text: chance.word(), author: chance.word()};
    rpcServer.when('CommentsService', 'fetch').respond(([reqSiteId]) =>
      reqSiteId === siteId ? [aComment] : null);

    await page.goto(server.getUrl(`/?siteId=${siteId}`));
    await page.waitForSelector('li');

    expect(await page.$$eval('li', items => items.map(li => li.innerText))).to.eql([`${aComment.text} | ${aComment.author}`]);
  });
});

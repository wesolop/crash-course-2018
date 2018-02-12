import {expect} from 'chai';
import axios from 'axios';
import adapter from 'axios/lib/adapters/http';
import {beforeAndAfter, app} from '../environment';
import {baseURL} from '../test-common';
import {wixAxiosInstanceConfig} from 'wix-axios-config';

const axiosInstance = wixAxiosInstanceConfig(axios, {baseURL, adapter});

describe('When rendering', () => {
  beforeAndAfter();

  it('should display a title', async () => {
    const url = app.getUrl('/');
    const response = await axiosInstance.get(url);

    expect(response.data).to.contain('Wix Full Stack Project Boilerplate');
  });

  it('leaderboard is empty by default', async () => {
    const url = app.getUrl('/leader-board');
    const {data} = await axiosInstance.get(url);
    expect(data).to.be.eql([]);
  });

  it('leaderboard should match after setScors', async() => {
    const url = app.getUrl('/leader-board');
    const newLeaderBoard = [
      {name: 'Yaniv', score: 3},
      {name: 'Omer', score: 5}
    ];
    await axiosInstance.post(url, newLeaderBoard);
    const {data} = await axiosInstance.get(url);
    expect(data).to.be.eql(newLeaderBoard);
  });
});

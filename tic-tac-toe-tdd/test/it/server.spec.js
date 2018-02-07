import {expect} from 'chai';
import axios from 'axios';
import adapter from 'axios/lib/adapters/http';
import {beforeAndAfter, app} from '../environment';
import {baseURL} from '../test-common';
import {wixAxiosInstanceConfig} from 'wix-axios-config';

const axiosInstance = wixAxiosInstanceConfig(axios, {baseURL, adapter});

describe('When rendering', () => {
  beforeAndAfter();

  it('should load saved game', async () => {
    const gameData = {
      user1: 'foo',
      user2: 'bar',
      board: [['O', 'X', ''], ['', 'O', ''], ['', '', 'O']],
      winner: 'foo',
      currentPlayer: 'X',
      gameStarted: true,
    };
    const url = app.getUrl('/game');
    await axiosInstance.post(url, gameData);
    const response = await axiosInstance.get(url);
    expect(response.data).to.eql(gameData);
  });
});

import {expect} from 'chai';
import axios from 'axios';
import adapter from 'axios/lib/adapters/http';
import env from '../environment';
import {baseURL} from '../test-common';
import {wixAxiosInstanceConfig} from 'wix-axios-config';
import Chance from 'chance';

const axiosInstance = wixAxiosInstanceConfig(axios, {baseURL, adapter});
const {beforeAndAfter, server, rpcServer} = env();

describe('When rendering', () => {
  const chance = new Chance();

  beforeAndAfter();

  it('should load saved comments', async () => {
    const siteId = chance.guid();
    const aComment = {text: chance.word(), author: chance.word()};
    rpcServer.when('CommentsService', 'fetch')
      .respond(([reqSiteId]) => reqSiteId === siteId ? [aComment] : null);

    const url = server.getUrl(`/comments/${siteId}`);
    const response = await axiosInstance.get(url);

    expect(response.data).to.eql([aComment]);
  });
});

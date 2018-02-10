import 'jsdom-global/register';
import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import nock from 'nock';
import i18next from 'i18next';
import {I18nextProvider} from 'react-i18next';
import App from './App';
import translation from '../../assets/locale/messages_en.json';
import Chance from 'chance';
import {baseURL} from '../../../test/test-common';
import eventually from 'wix-eventually';

const i18nData = {
  lng: 'en',
  keySeparator: '$',
  resources: {
    en: {translation}
  }
};

describe('App', () => {
  let wrapper;
  const chance = new Chance();

  afterEach(() => wrapper.detach());

  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error(`pending mocks: ${nock.pendingMocks()}`);
    }
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should display site comments', () => {
    const siteId = chance.guid();
    require('jsdom-global')(undefined, {url: `${baseURL}/?siteId=${siteId}`});
    const aComment = {text: chance.word(), author: chance.word()};

    nock(baseURL).get(`/comments/${siteId}`).reply(() => [aComment]);

    wrapper = mount(
      <I18nextProvider i18n={i18next.init(i18nData)}>
        <App/>
      </I18nextProvider>,
      {attachTo: document.createElement('div')}
    );
    return eventually(() =>
      expect(wrapper.find('li').at(0).text()).to.equal(`${aComment.text} | ${aComment.author}`));
  });
});

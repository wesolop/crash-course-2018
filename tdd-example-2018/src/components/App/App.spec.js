import 'jsdom-global/register';
import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import i18next from 'i18next';
import {I18nextProvider} from 'react-i18next';
import App from './App';
import translation from '../../assets/locale/messages_en.json';

import createAppDriver from './App.driver';
const i18nData = {
  lng: 'en',
  keySeparator: '$',
  resources: {
    en: {translation}
  }
};

describe('App', () => {
  let wrapper, driver;

  afterEach(() => wrapper.detach());

  beforeEach(() => {
    wrapper = mount(
      <I18nextProvider i18n={i18next.init(i18nData)}>
        <App/>
      </I18nextProvider>,
      {attachTo: document.createElement('div')}
    );

    driver = createAppDriver(wrapper);

  });

  it('should show "O" after second player clicks', () => {
    const p1 = 'Yaniv';
    const p2 = 'Computer';
    driver.when.startGame({p1, p2})
    .when.clickCell(0)
    .when.clickCell(1);

    expect(wrapper.find('td').at(1).text()).to.eq('O');
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

    expect(driver.get.winnerMessage().includes('Yaniv')).to.be.true;

  });
});

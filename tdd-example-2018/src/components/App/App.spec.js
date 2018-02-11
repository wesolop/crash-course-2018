import 'jsdom-global/register';
import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import i18next from 'i18next';
import {inputTestkitFactory as enzymeInputTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';
import {I18nextProvider} from 'react-i18next';
import App from './App';
import translation from '../../assets/locale/messages_en.json';

const i18nData = {
  lng: 'en',
  keySeparator: '$',
  resources: {
    en: {translation}
  }
};

describe('App', () => {
  let wrapper;

  afterEach(() => wrapper.detach());

  it('should show "O" after second player clicks', () => {
    const p1 = 'Yaniv';
    const p2 = 'Computer';

    wrapper = mount(
      <I18nextProvider i18n={i18next.init(i18nData)}>
        <App/>
      </I18nextProvider>,
      {attachTo: document.createElement('div')}
    );
    enzymeInputTestkitFactory({dataHook: 'p1Input', wrapper}).enterText(p1);
    enzymeInputTestkitFactory({dataHook: 'p2Input', wrapper}).enterText(p2);
    wrapper.find('[data-hook="newGame"]').simulate('click');
    wrapper.find('td').at(0).simulate('click');
    wrapper.find('td').at(1).simulate('click');
    expect(wrapper.find('td').at(1).text()).to.eq('O');
  });
});

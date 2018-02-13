import React from 'react';
import {mount} from 'enzyme';
import {inputTestkitFactory as enzymeInputTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';
import i18next from 'i18next';
import {I18nextProvider} from 'react-i18next';
import translation from '../../assets/locale/messages_en.json';
import App from './App';

const i18nData = {
  lng: 'en',
  keySeparator: '$',
  resources: {
    en: {translation}
  }
};

export default _wrapper => {
  let wrapper = _wrapper;
  const driver = {
    cleanup: () => {
      if (wrapper) {
        wrapper.detach();
      }
    },

    when: {
      craeted: () => {
        wrapper = mount(
          <I18nextProvider i18n={i18next.init(i18nData)}>
            <App/>
          </I18nextProvider>,
          {attachTo: document.createElement('div')}
        );
        return driver;
      },
      startGame: ({p1, p2}) => {
        enzymeInputTestkitFactory({dataHook: 'p1Input', wrapper}).enterText(p1);
        enzymeInputTestkitFactory({dataHook: 'p2Input', wrapper}).enterText(p2);
        wrapper.find('[data-hook="newGame"]').simulate('click');
        return driver;
      },
      clickCell: index => {
        wrapper.find('td').at(index).simulate('click');
        return driver;
      }
    },
    get: {
      cellText: (index: number) => wrapper.find('td').at(index).text(),
      winnerMessage: () => wrapper.find('[data-hook="winnerMessage"]').text(),
      leaderBoard: () => wrapper.find('[data-hook="leader-board"]').text()
    }
  };

  return driver;
};

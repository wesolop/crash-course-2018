import {inputTestkitFactory as enzymeInputTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

export default wrapper => {
  const driver = {
    when: {
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
      winnerMessage: () => wrapper.find('[data-hook="winnerMessage"]').text()
    }
  };

  return driver;
};

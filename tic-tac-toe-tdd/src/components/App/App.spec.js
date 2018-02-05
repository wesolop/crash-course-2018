import 'jsdom-global/register';
import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import App from './App';

describe('App', () => {
  let wrapper;

  afterEach(() => wrapper.detach());

  it('show "O" after second player clicks', () => {
    const player1 = 'Yaniv';
    const player2 = 'Bla';

    wrapper = mount(
      <App/>,
      {attachTo: document.createElement('div')}
    );
    wrapper.find('[data-hook="user1"]').simulate('change', {target: {value: player1}});
    wrapper.find('[data-hook="user2"]').simulate('change', {target: {value: player2}});
    wrapper.find('[data-hook="start"]').simulate('click');
    wrapper.find('td').at(0).simulate('click');
    wrapper.find('td').at(1).simulate('click');
    expect(wrapper.find('td').at(1).text()).to.eq('O');
  });
});

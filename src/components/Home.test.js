import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';


describe('Tests for Home', () => {
  it('displays all required info', () => {
    const wrapper = shallow(<Home />);
    const welcome = <h3>Welcome to Book A Meal</h3>
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.contains(welcome)).toBe(true)
  })
})

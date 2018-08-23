import React from 'react';
import { shallow } from 'enzyme';
import Meals from './Meals.jsx';
import sessionStorage from 'mock-local-storage';


describe('Tests for Meals', () => {
  it('displays all required info', () => {
    const wrapper = shallow(<Meals/>);
    const title = <h2 className="w3-conatiner w3-cell">Meals</h2>

    expect(wrapper.find('div').length).toBe(7);
    expect(wrapper.contains(title)).toBe(true)
  })
})

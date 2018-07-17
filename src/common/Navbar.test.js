import React from 'react';
import { shallow } from 'enzyme';
import { Link } from "react-router-dom";
import Navbar from './Navbar.jsx';


describe('These are navbar tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(< Navbar />);
    const hcd = 'Hot Corner Delicacies'
    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('ul').length).toBe(2);
    expect(wrapper.contains(hcd)).toEqual(true);
  });
});

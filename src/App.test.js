import React from 'react';
import { shallow, mount } from 'enzyme';
import sessionStorage from 'mock-local-storage';
import App from './App';

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('div').length).toBe(1)
});

it('renders all components', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find('div').length).toBe(10)
});


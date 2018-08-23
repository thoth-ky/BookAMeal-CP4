import React from 'react';
import { shallow } from 'enzyme';
import SignIn from './SignIn';

describe('These are tests for Signin component', () => {
  it('test that signin works', () => {
    const wrapper = shallow(<SignIn />);
    const title = <h3>Sign In</h3>
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('label').length).toBe(2);
    expect(wrapper.contains(title)).toEqual(true);
  })

})

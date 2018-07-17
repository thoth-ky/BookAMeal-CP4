import React from 'react';
import { shallow } from 'enzyme';
import SignUp from './SignUp.jsx';


describe('These are tests for signup component', () => {
  it('test signup has all html tags', () => {
    const wrapper = shallow(< SignUp />);
    const button = <input className="btn btn-primary" type="submit" value="Sign Up" />
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.contains('Username:')).toEqual(true);
    expect(wrapper.contains('Email:')).toEqual(true);
    expect(wrapper.contains('Password:')).toEqual(true);
    expect(wrapper.contains('Confirm Password:')).toEqual(true);
    expect(wrapper.contains(button)).toEqual(true)
  })
});

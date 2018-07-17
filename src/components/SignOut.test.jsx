import React from 'react';
import { shallow } from 'enzyme';
import sessionStorage from 'mock-local-storage';
import SignOut from './SignOut.jsx';

describe('Tests for signout', () => {
  it('displays all required info', () => {
    const wrapper = shallow(<SignOut/>);
    const msg = <p>You have successfuly logged out</p>
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.contains(msg)).toEqual(true);
  })
})

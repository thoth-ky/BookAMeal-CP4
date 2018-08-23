import React from 'react';
import { shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import sessionStorage from 'mock-local-storage';
import SignOut from './SignOut';

describe('Tests for signout', () => {
  it('displays all required info', () => {
    const wrapper = shallow(<SignOut />);
    wrapper.setState({ isLoggedOut: false })
    expect(wrapper.find('div').length).toBe(1);
  })

  it('can logout user', () => {
    fetchMock.get('/api/v2/signout', { status: 200, body: { message: 'User has been logged out successfully.' } })
    const wrapper = mount(<SignOut />)
    wrapper.setState({ isLoggedOut: false })
    expect(wrapper.find('div').length).toBe(2);
  })
})

import React from 'react';
import { shallow } from 'enzyme';
import sessionStorage from 'mock-local-storage';
import SignOut from './SignOut.jsx';
import fetchMock from 'fetch-mock';

describe('Tests for signout', () => {
  it('displays all required info', () => {
    fetchMock.get('/api/v2/signout', {status: 200, body:{message: 'User has been logged out successfully.'}});
    const wrapper = shallow(<SignOut/>);
    wrapper.setState({access_token: 'valid token'})
    const msg = <p>You have successfuly logged out</p>
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.contains(msg)).toEqual(true);
  })
})

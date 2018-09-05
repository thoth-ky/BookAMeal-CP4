import React from 'react';
import { shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import sessionStorage from 'mock-local-storage';
import SignIn from './SignIn';

describe('These are tests for Signin component', () => {
  it('test that signin renders correctly', () => {
    const wrapper = shallow(<SignIn />);
    const title = <h3>Sign In</h3>
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('label').length).toBe(2);
    expect(wrapper.contains(title)).toEqual(true);
  })

  it('can login', () => {
    fetchMock.post('https://bookameal-staging.herokuapp.com/api/v2/signin', { access_token: 'valid access token', message: 'User successfully logged in.' });
    const wrapper = mount(<SignIn />);
    wrapper.setState({ username: 'kyalo', password: 'password' })
    const form = wrapper.find('form')
    form.simulate('submit')
    expect(wrapper.state().submitted).toEqual(true)
    fetchMock.restore()
  })
})

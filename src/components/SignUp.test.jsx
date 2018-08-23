import React from 'react';
import { shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import sessionStorage from 'mock-local-storage';
import SignUp from './SignUp.jsx';
import { wrap } from 'module';

describe('These are tests for signup component', () => {
  it('test signup has all html tags', () => {
    let wrapper = shallow(<SignUp />);
    let button = <input className="btn btn-primary" type="submit" value="Sign Up" />

    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.contains('Username:')).toEqual(true);
    expect(wrapper.contains('Email:')).toEqual(true);
    expect(wrapper.contains('Password:')).toEqual(true);
    expect(wrapper.contains('Confirm Password:')).toEqual(true);
    expect(wrapper.contains(button)).toEqual(true);
  });

  it('test it returns error message if passwords dont match', () => {
    const wrapper = mount(<SignUp />);
    wrapper.setState({
      username: 'kyalo',
      email: 'kyalo@mail.com',
      password: 'kyalo123453',
      password1: 'kyalo12345',
    })
    const form = wrapper.find('form');
    form.simulate('submit')
    expect(wrapper.state('alert')).toEqual('Ensure passwords match and use more than 8 characters');
  })

  it('test submit works', () => {
    fetchMock.post('/api/v2/signup', { access_token: 'valid access token', message: 'User registration succesful, and logged in.' });
    const wrapper = mount(<SignUp />);
    wrapper.setState(
      {
        username: 'kyalo', email: 'kyalo@mail.com', password: 'kyalo12345', password1: 'kyalo12345',
      },
    )
    const form = wrapper.find('form')
    form.simulate('submit').then()
    wrapper.update()
    expect(wrapper.state().alert).toEqual('User registration succesful, and logged in.')

    fetchMock.restore()
  })
})

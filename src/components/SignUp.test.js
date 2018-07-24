import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import moxios from 'moxios';

// component
import SignUp from './SignUp.jsx';


describe('These are tests for signup component', () => {

  it('test signup has all html tags', () => {
    var wrapper = shallow(< SignUp />);
    var button = <input className="btn btn-primary" type="submit" value="Sign Up" />

    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.contains('Username:')).toEqual(true);
    expect(wrapper.contains('Email:')).toEqual(true);
    expect(wrapper.contains('Password:')).toEqual(true);
    expect(wrapper.contains('Confirm Password:')).toEqual(true);
    expect(wrapper.contains(button)).toEqual(true);

  });

  it('signup form submit works', () => {
    const submitRequest = sinon.stub(SignUp.prototype, 'handleSubmit').returns(true);

    const wrapper = mount(<SignUp />);
    wrapper.find('form').simulate('submit');
    expect(submitRequest.called).toBe(true);

    submitRequest.restore();
    })
  });

  it('should store access_token after successful SignUp', () =>{
    const wrapper = mount(<SignUp />);
    const usernameInput = wrapper.find('input[type="text"]');
    const emailInput = wrapper.find('input[type="email"]');
    const passInput =  wrapper.find('input[name="password"]');
    const passInput1 =  wrapper.find('input[name="password1"]');

    usernameInput.value = 'kyalo'
    emailInput.value = 'kyalo@mail.com'
    passInput.value = 'kyalo1234'
    passInput1.value = 'kyalo1234'
    const form = wrapper.find('form');
    form.simulate('submit')

    moxios.wait(function () {
    let request = moxios.requests.mostRecent()
      request.respondWith({
      status: 200,
      response:
        {
          access_token: 'validToken',
          is_admin: false,
          message: 'Successfully logged in'
        }
      }).then(function () {
        expect(sessionStorage.getItem('access_token')).to.equal('validToken')
        })
      })
    })

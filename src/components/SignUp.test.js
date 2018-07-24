import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
<<<<<<< HEAD
<<<<<<< HEAD
import fetchMock from 'fetch-mock';
// component
=======
>>>>>>> Update tests
=======
import moxios from 'moxios';

// component
>>>>>>> Fix failing tests in signup
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

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Fix failing tests in signup
  });

  it('signup form submit works', () => {
    const submitRequest = sinon.stub(SignUp.prototype, 'handleSubmit').returns(true);

    const wrapper = mount(<SignUp />);
    wrapper.find('form').simulate('submit');
    expect(submitRequest.called).toBe(true);

    submitRequest.restore();
    })
<<<<<<< HEAD

  it('test it returns error message if passwords dont match', () =>{
    window.alert = jest.fn()
    const wrapper = mount(<SignUp />);
    wrapper.setState({ username: 'kyalo' , email: 'kyalo@mail.com', password: 'kyalo123453', password1: 'kyalo12345' })
    const form = wrapper.find('form');
    form.simulate('submit')
    expect(window.alert).toHaveBeenCalledWith("Ensure passwords match and use more than 8 characters")
    })

=======
  })
it('signup form submit works', () => {
  var wrapper = mount(< SignUp />);
  var submit = sinon.sandbox.stub(SignUp.prototype, 'handleSubmit').;
  wrapper.find('form').simulate('submit');
  expect(submit.called).to.be.true;
=======
  });
>>>>>>> Fix failing tests in signup

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

<<<<<<< HEAD
})
>>>>>>> Update tests
});
=======
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
>>>>>>> Fix failing tests in signup

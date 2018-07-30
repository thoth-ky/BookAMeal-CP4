import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import fetchMock from 'fetch-mock';
// import localStorage from 'jest-localstorage-mock';
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

  it('test it returns error message if passwords dont match', () =>{
    window.alert = jest.fn()
    const wrapper = mount(<SignUp />);
    wrapper.setState({ username: 'kyalo' , email: 'kyalo@mail.com', password: 'kyalo123453', password1: 'kyalo12345' })
    const form = wrapper.find('form');
    form.simulate('submit')
    expect(window.alert).toHaveBeenCalledWith("Ensure passwords match and use more than 8 characters")  
    })
  
  it('can successfully store user token', () => {
    fetchMock.post('/api/v2/signup', {status: 200, body:{ access_token:'valid token', message: 'Successfully logged in', is_admin: false}});
    const wrapper = mount(<SignUp />);

    wrapper.setState({ username: 'kyalo' , email: 'kyalo@mail.com', password: 'kyalo12345', password1: 'kyalo12345' })
    const form = wrapper.find('form');
    form.simulate('submit')

    expect(localStorage.setItem).toHaveBeenCalledWith('access_token', 'valid token');
    expect(localStorage.__STORE__['access_token']).toBe('valid token');
    fetchMock.restore()
  })
  });


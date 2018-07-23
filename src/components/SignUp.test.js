import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
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

  })
it('signup form submit works', () => {
  var wrapper = mount(< SignUp />);
  var submit = sinon.sandbox.stub(SignUp.prototype, 'handleSubmit').;
  wrapper.find('form').simulate('submit');
  expect(submit.called).to.be.true;

  Signup.restore();


})
});

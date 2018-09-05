import React from 'react';
import { shallow} from 'enzyme';
import fetchMock from 'fetch-mock';
import sessionStorage from 'mock-local-storage';
import SignOut from './SignOut';

describe ('Tests for signout', () => {
  it ('renders succesfully', () => {
    fetchMock.get('https://bookameal-staging.herokuapp.com/api/v2/signout', { message: 'User has been logged out successfully.' })
    const wrapper = shallow(<SignOut />);
  })
})

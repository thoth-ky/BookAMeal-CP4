import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../NotFound';


describe('Tests for NotFound', () => {
  it('displays all required info ', () => {
    const wrapper = shallow(<NotFound />);
    const title = <h2>HTTP 404</h2>
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.contains(title)).toBe(true)
  })
})

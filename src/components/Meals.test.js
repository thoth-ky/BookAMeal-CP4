import React from 'react';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import sessionStorage from 'mock-local-storage';
import Meals from './Meals';

describe ('Tests for Meals', () => {
  it ('renders without crashing', () => {
    fetchMock.get('https://bookameal-staging.herokuapp.com/api/v2/meals',
      { message: 'Succesful request',
        meals: [
          { meal_id: 1, name: 'githeri', price: 50, description: 'Traditional', caterer: 'mutuku' },
          { meal_id: 2, name: 'choma', price: 2000, description: 'Choma', caterer: 'mutuku' }] })
    const wrapper = mount(<Meals />);
    const title = <h2 className="w3-conatiner w3-cell">Meals</h2>

    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.contains(title)).toBe(true)
    const buttons = wrapper.find('button')
    // should find 2 buttons, for create and refresh
    expect(buttons.length).toBe(2)

    fetchMock.restore()
  })

  it ('It can render multiple meals', () => {
    fetchMock.get('https://bookameal-staging.herokuapp.com/api/v2/meals',
      { message: 'Succesful request',
        meals: [
          { meal_id: 1, name: 'githeri', price: 50, description: 'Traditional', caterer: 'mutuku' },
          { meal_id: 2, name: 'choma', price: 2000, description: 'Choma', caterer: 'mutuku' }] })
    const wrapper = mount(<Meals />);
    wrapper.setState(
      {
        meal_id: null,
        name: 'testmeal',
        description: 'description',
        price: 300,
        meals: [
          { meal_id: 1, name: 'githeri', price: 50, description: 'Traditional', caterer: 'mutuku' },
          { meal_id: 2, name: 'choma', price: 2000, description: 'Choma', caterer: 'mutuku' },
        ],
        show_modal: false,
        alert: null,
      },
    )
    // div count should be higher

    expect(wrapper.find('div').length).toBe(21);

    // find button
    const buttons = wrapper.find('button')
    // should find 6 buttons, 4 for each meal panel and 2 for create and refresh
    expect(buttons.length).toBe(6)
  })
})

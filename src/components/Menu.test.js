import React from 'react';
import { mount } from 'enzyme';
import sessionStorage from 'mock-local-storage';
import fetchMock from 'fetch-mock';
import Menu from './Menu';
import { timeConverter } from '../common/helpers';


describe ('Tests for Menu', () => {
  it ('displays all required info', () => {
    fetchMock.get('/api/v2/menu',
      {
        message: 'Menu request succesful',
        menu: {
          date: 1535490000,
          meals: [
            { meal_id: 1, name: 'coffee', price: 100, description: 'Kenyan coffee', caterer: 'mutuku' },
            { meal_id: 2, name: 'tea', price: 150, description: 'Kericho gold', caterer: 'mutuku' },
          ] } })

    const wrapper = mount(<Menu />);
    wrapper.setState({
      meals: [
        { meal_id: 1, name: 'coffee', price: 100, description: 'Kenyan coffee', caterer: 'mutuku' },
        { meal_id: 2, name: 'tea', price: 150, description: 'Kericho gold', caterer: 'mutuku' },
      ],
      date: 1535490000,
      show_cart: false,
      cart: [],
      alert: null,
      quantity: null,
    })
    const title = <h3>Menu for Date: { timeConverter(1535490000) }</h3>
    expect(wrapper.contains(title)).toEqual(true)
  })
})

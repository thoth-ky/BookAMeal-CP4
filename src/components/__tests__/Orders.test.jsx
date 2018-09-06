import React from 'react';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import sessionStorage from 'mock-local-storage';
import Orders from '../Orders';


describe('Tests for Orders', () => {
  it('renders correctly', () => {
    fetchMock.get('https://bookameal-staging.herokuapp.com/api/v2/orders',
      { message: 'All Orders',
        orders: [
          { order_id: 1,
            time_ordered: 1533415118,
            due_time: 1533416340,
            owner: 'mutuku',
            meals: [
              { meal_id: 1, name: 'Muthokoi', quantity: 3, unit_price: 500, caterer: 'mutuku', sub_total: 1500 },
              { meal_id: 6, name: 'chips', quantity: 2, unit_price: 1000, caterer: 'mutuku', sub_total: 2000 },
            ],
            total: 3500 },
          { order_id: 2,
            time_ordered: 1534441262,
            due_time: 1565956800,
            owner: 'mutuku',
            meals: [
              { meal_id: 2, name: 'tea', quantity: 1, unit_price: 150, caterer: 'mutuku', sub_total: 150 },
              { meal_id: 3, name: 'coffee', quantity: 2, unit_price: 100, caterer: 'mutuku', sub_total: 200 },
            ],
            total: 350 },
        ],
      })
    const wrapper = mount(<Orders />);
    wrapper.setState({
      orders: [
        { order_id: 1,
          time_ordered: 1533415118,
          due_time: 1533416340,
          owner: 'mutuku',
          meals: [
            { meal_id: 1, name: 'Muthokoi', quantity: 3, unit_price: 500, caterer: 'mutuku', sub_total: 1500 },
            { meal_id: 6, name: 'chips', quantity: 2, unit_price: 1000, caterer: 'mutuku', sub_total: 2000 },
          ],
          total: 3500 },
        { order_id: 2,
          time_ordered: 1534441262,
          due_time: 1565956800,
          owner: 'mutuku',
          meals: [
            { meal_id: 2, name: 'tea', quantity: 1, unit_price: 150, caterer: 'mutuku', sub_total: 150 },
            { meal_id: 3, name: 'coffee', quantity: 2, unit_price: 100, caterer: 'mutuku', sub_total: 200 },
          ],
          total: 350 },
      ] })
    const title = <h2>Orders Information</h2>
    expect(wrapper.find('div').length).toBe(28);
    expect(wrapper.contains(title)).toBe(true)
  })
})

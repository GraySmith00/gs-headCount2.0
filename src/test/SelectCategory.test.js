import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import SelectCategory from '../components/SelectCategory';

describe('SelectCategory component', () => {
  let wrapper;
  let changeCategory;

  beforeEach(() => {
    changeCategory = jest.fn();
    wrapper = shallow(<SelectCategory changeCategory={changeCategory} />);
  });

  it('renders without crashing', () => {
    const changeCategory = jest.fn();
    const div = document.createElement('div');
    ReactDOM.render(<SelectCategory changeCategory={changeCategory} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should have an initail state', () => {
    expect(wrapper.state().value).toEqual('');
  });

  it('should change the value state when changing the select value', () => {
    wrapper.find('.select-category').simulate('change', {
      target: { value: 'Kindergartners In Full Day Propgram' }
    });

    expect(wrapper.state().value).toEqual(
      'Kindergartners In Full Day Propgram'
    );
  });

  it('should call the changeCategory method', () => {
    wrapper.find('.select-category').simulate('change', {
      target: { value: 'Kindergartners In Full Day Propgram' }
    });

    expect(changeCategory).toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

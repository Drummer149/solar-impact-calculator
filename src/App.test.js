import React from 'react';
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from './App';

Enzyme.configure({adapter: new Adapter()});

describe('<App />', () => {
  const defaultProps = {}

  it('render', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  })

});

import React from 'react';
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SolarForm from './SolarForm';

Enzyme.configure({adapter: new Adapter()});

describe('<SolarForm />', () => {
  const defaultProps = {}
  

  test('render', () => {
    const wrapper = shallow(<SolarForm />);
    expect(wrapper.exists()).toBe(true);
  })
});

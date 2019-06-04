import React from 'react';
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SolarForm from './SolarForm';
import Moment from 'moment';

Enzyme.configure({adapter: new Adapter()});

describe('<SolarForm />', () => {

  const setInstalltionMock = jest.fn();
  const preventDefaultMock = jest.fn();

  const defaultProps = {
    setSolarInstallationSpecs: setInstalltionMock
  };

  const event = {
    preventDefault: preventDefaultMock,
    target: {
      name: 'currentInstallation',
      value: 10
    }
  };

  const dateNow = Moment.now();
  
  test('Renders', () => {
    const wrapper = shallow(<SolarForm {...defaultProps} />);
    expect(wrapper.exists()).toBe(true);
  })

  test('Renders correctly', () => {
    const wrapper = shallow(<SolarForm {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  })

  test('Component has a method on change and will expect the state to change given an HTMLInputEvent', () => {
    const wrapper = shallow(<SolarForm {...defaultProps} />);
    wrapper.instance().onChange(event)
    expect(wrapper.state().currentInstallation).toBe(event.target.value);
  })

  test('Component has a method on date change and will expect the state to change given a Moment Date', () => {
    const wrapper = shallow(<SolarForm {...defaultProps} />);
    wrapper.instance().onDateChange(dateNow);
    expect(wrapper.state().startDate).toBe(dateNow);
  })

  test('Component has a method on submit change and will expect the state to change given a Moment Date', () => {
    const wrapper = shallow(<SolarForm {...defaultProps} />);
    wrapper.instance().onChange(event);
    wrapper.instance().onDateChange(dateNow);
    wrapper.instance().onSubmit(event);

    let mockData = {
      startDate: dateNow,
      currentInstallation: event.target.value,
    }

    expect(setInstalltionMock).toBeCalledWith(mockData);
  })
});

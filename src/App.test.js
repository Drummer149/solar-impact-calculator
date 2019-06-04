import React from 'react';
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from './App';
import Moment from 'moment';

Enzyme.configure({adapter: new Adapter()});

describe('<App />', () => {
  const defaultProps = {}

  const event = {
    target: {
      name: 'currentInstallation',
      value: 10
    }
  };

  const dateNow = Moment.now();

  it('render', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  test('Renders correctly', () => {
    const wrapper = shallow(<App {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Has a method setSolarInstallation which sets the state ', () => {
    jest.useFakeTimers();
    const wrapper = shallow(<App {...defaultProps} />);
    let mockData = {
      startDate: dateNow,
      currentInstallation: event.target.value,
    }
    wrapper.instance().scrollToPanel = jest.fn();
    wrapper.instance().setSolarInstallation(mockData);
    expect(wrapper.state().display).toBe(true);

    setTimeout(() => {
      expect(wrapper.state().currentInstallation).toBe(10);
      expect(wrapper.state().startDate).toBe(dateNow);
    }, 1000);
    
    expect(wrapper.instance().scrollToPanel).toBeCalled();

    jest.runAllTimers();
  });

  
});

import React from 'react';
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import StatCard from './StatCard';
import Moment from 'moment';

Enzyme.configure({adapter: new Adapter()});

describe('<StatCard />', () => {
  const defaultProps = {
    index: 0, 
    key: 0, 
    metric: 
      {
        title: 'METRIC TONNES OF CARBON DIOXIDE, ENTERING OUR ATMOSPHERE', 
        logo: 'carbon', 
        multiplier: 0.001
      }
    }

  test('render', () => {
    const wrapper = shallow(<StatCard {...defaultProps}/>);
    expect(wrapper.exists()).toBe(true);
  });

  test('Has method get hours and will return the amount of hours between two dates', () => {
    const wrapper = shallow(<StatCard {...defaultProps}/>);
    expect(wrapper.instance().findHours(Moment('2019-01-01'), '2018-12-31')).toBe(24);
    expect(wrapper.instance().findHours(Moment('2019-01-01'), '2018-12-30')).toBe(48);
    expect(wrapper.instance().findHours(Moment('2019-01-01'), '2018-12-29')).toBe(72);
    expect(wrapper.instance().findHours(Moment('2019-01-01'), '2018-12-28')).toBe(96);
  });

  test('Has method convertHoursAndPanelsToKiloWattHours and will return the amount of kilowatt hours for particular solar system', () => {
    const wrapper = shallow(<StatCard {...defaultProps}/>);
    expect(wrapper.instance().convertHoursAndPanelsToKiloWattHours(24, 1)).toBe(3.72);
  });
});

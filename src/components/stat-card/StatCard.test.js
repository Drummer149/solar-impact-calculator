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
    startDate: Moment.now(),
    currentInstallation: 0,
    metric: 
      {
        title: 'METRIC TONNES OF CARBON DIOXIDE, ENTERING OUR ATMOSPHERE', 
        logo: 'carbon', 
        multiplier: 0.001
      }
    }

  test('Renders', () => {
    const wrapper = shallow(<StatCard {...defaultProps}/>);
    expect(wrapper.exists()).toBe(true);
  });

  test('Renders correctly', () => {
    const wrapper = shallow(<StatCard {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  })

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

  test('Has method getStat a will return the final statistic based on a kilowatt hour and a multiplier', () => {
    const wrapper = shallow(<StatCard {...defaultProps}/>);
    expect(wrapper.instance().getStat(300, 1)).toBe(300);
    expect(wrapper.instance().getStat(300, 0.5)).toBe(150);
    expect(wrapper.instance().getStat(300, 2)).toBe(600);
  });

  test('Has method getFlowDirection and will return css rule that will reverse flow direction on odd indexs', () => {
    const wrapper = shallow(<StatCard {...defaultProps}/>);
    expect(wrapper.instance().getFlowDirection(0)).toBe('row');
    expect(wrapper.instance().getFlowDirection(1)).toBe('row-reverse');
    expect(wrapper.instance().getFlowDirection(2)).toBe('row');
    expect(wrapper.instance().getFlowDirection(3)).toBe('row-reverse');
    expect(wrapper.instance().getFlowDirection(4)).toBe('row');
    expect(wrapper.instance().getFlowDirection(5)).toBe('row-reverse');
  });
});

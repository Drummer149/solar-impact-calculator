import React, { Component } from 'react';
import Icon from '../icon/Icon';
import Moment from 'moment';
import Odometer from 'react-odometerjs';
import './StatCard.css';
import PropTypes from 'prop-types';

/**
 * Component to display a stat given some props
 */
class StatCard extends Component {

  constructor(props){
    super(props);
    this.state = {
      stat: 0,
      flowDirection: false,
      panelWattage: 310,
    }
  }

  // Find the amount of hours from a start to an enddate
  findHours(startDate, endDate){
    let duration = Moment.duration(startDate.diff(Moment(endDate)));
    return Math.round(duration.asHours());
  }

  // Convert hours and the number of solar panels to how many kilowatt hours the system produces
  convertHoursAndPanelsToKiloWattHours(hours, numPanels){
    return hours * 310 * numPanels / 2 / 1000;
  }

  // Take in new props to set the statistic of the displaying card
  componentWillReceiveProps(props){
    let hours = this.findHours(Moment(), props.startDate);
    let kph = this.convertHoursAndPanelsToKiloWattHours(hours, props.currentInstallation);
    let newStat = parseInt(kph * props.metric.multiplier);
    this.setState({stat : newStat});
  }
  
  render() {
    // Every second panel is reversed within flexbox
    let flowDirection = this.props.index % 2 === 1 ? 'row-reverse' : 'row';

    return (
      <div className="statCard" style={{ flexDirection : flowDirection }}>
        <div className="statHalf text" >
          <div style={{width: '80%'}}>
            YOU HAVE PREVENTED <Odometer value={this.state.stat} duration={1000 * this.props.index} format="d" /> {this.props.metric.title}
          </div>
        </div>
        <div className="statHalf logo">
          <Icon style={{fill: '#05AC72'}} name={this.props.metric.logo.toString()}/>
        </div>
      </div>
     )
   }
 }

 export default StatCard;
 
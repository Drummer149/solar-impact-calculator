import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import SolarForm from './components/solar-form/SolarForm';
import StatCard from './components/stat-card/StatCard';
import Moment from 'moment';

/**
 * Main Application component
 */
class App extends Component {
  constructor() {
    super();
    this.state = {
      display: false,
      startDate: Moment.now(),
      currentInstallation: 0,
      metrics: [
        {title: 'METRIC TONNES OF CARBON DIOXIDE, ENTERING OUR ATMOSPHERE', logo: 'carbon', multiplier: 0.001},
        {title: 'SQUARE METERS OF LAND USEAGE', logo: 'earth', multiplier: 0.048},
        {title: 'LITRES OF WATER BEING WASTED AWAY', logo: 'water', multiplier: 1.1},
      ]
    }

    this.setSolarInstallation = this.setSolarInstallation.bind(this);
    this.scrollToPanel = this.scrollToPanel.bind(this);
  }

  // Method to set the installation data from the form
  setSolarInstallation(installationData){
    this.setState({display: true});
    this.scrollToPanel();
    setTimeout(() => this.setState({startDate: installationData.startDate, currentInstallation: installationData.currentInstallation}), 0);
  }

  // Method to scroll the browser to the stat cards
  scrollToPanel(){
    const statPanel = ReactDOM.findDOMNode(this.refs.statPanel);
    statPanel.scrollIntoView();
  }


  render() {
    let sidePanel;

    // If a user has not entered their current solor data, display message instead
    if(this.state.display){
      sidePanel = this.state.metrics.map(
        (metric, i) => <StatCard metric={metric} index={i} key={i} startDate={this.state.startDate} currentInstallation={this.state.currentInstallation} />
      );
    } else {
      sidePanel = (<h1 style={{color: '#fff'}}>Fill in details about your current installation</h1>)
    }
    
    return (
      <div className="container">
        <div className="half backing">
          <div className="formContainer">
            <SolarForm setSolarInstallationSpecs={this.setSolarInstallation}/>
          </div>
          <div className="arrow" onClick={this.scrollToPanel}></div>
        </div>
        <div className="half" ref="statPanel" style={{backgroundColor: '#05AC72'}}>
          {sidePanel}
        </div>
      </div>
    );
  }
}

export default App;

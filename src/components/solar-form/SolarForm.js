import React, { Component } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import { TextField, Button } from '@material-ui/core';
import './SolarForm.css';
import Moment from 'moment';
import PropTypes from 'prop-types';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
 
/**
 * Componet of a form for a user to input their solor specifications
 */
class SolarForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      startDate: Moment.now(),
      currentInstallation: 0,
    };

    // Bind functions to the this for form usage
    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Push form data to the state
  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  // Push date change to the state
  onDateChange(e){
    this.setState({ startDate: e });
  }

  // Take the state data and send it to parent
  onSubmit(e){
    e.preventDefault();
    const installationData = {
      startDate: this.state.startDate,
      currentInstallation: this.state.currentInstallation,
    };

    this.props.setSolarInstallationSpecs(installationData);
  }

  render() {
    return (
      <React.Fragment>
        <h4>How switching to Solar has affected the world?</h4>
        <ValidatorForm onSubmit={this.onSubmit}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            label="When was your solar system installed?"
            name="startDate"
            format="MMMM Do YYYY"
            value={this.state.startDate}
            onChange={this.onDateChange}
            maxDate={new Date()}
            />
        </ MuiPickersUtilsProvider>
        <TextValidator 
          type="number"
          placeholder="How many Panels were installed"
          label="How many panels were installed?"
          name="currentInstallation"
          validators={['minNumber:0', 'required']}
          errorMessages={['Must be a positive number', 'This field is required']}
          onChange={this.onChange}
          value={this.state.currentInstallation}
          min="0"
          />
          <Button id="submitBtn" type="submit">
            Submit
          </Button>
          <p>Based on Heckert 310 Wp high performance modules,<br /> in comparison to Coal fired power production</p>
        </ValidatorForm>
      </React.Fragment>
    )
  }
}

export default SolarForm;
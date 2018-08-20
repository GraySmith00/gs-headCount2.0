import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectCategory extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    };
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
    this.props.changeCategory(e.target.value);
  };

  render() {
    const categories = [
      'Kindergartners In Full Day Propgram',
      'Third Grade Tests',
      'Eigth Grade Test Scores',
      'Average Race Ethnicity MathScores'
    ];
    let options = categories.map((category, i) => (
      <option key={`category${i}`} value={i}>
        {category}
      </option>
    ));
    return (
      <div>
        <select
          className="select-category"
          value={this.state.value}
          onChange={this.handleChange}
        >
          {options}
        </select>
      </div>
    );
  }
}

SelectCategory.propTypes = {
  changeCategory: PropTypes.func.isRequired
};

export default SelectCategory;

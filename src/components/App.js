import React, { Component } from 'react';

import '../css/App.css';
import kindergartnersInFullDayPropgram from '../data/kindergartners_in_full_day_program';
import thirdGradeTests from '../data/3rd_grade_tests';
import eigthGradeTestScores from '../data/8th_grade_test_scores';
import averageRaceEthnicityMathScores from '../data/average_race_ethnicity_math_scores';

import DistrictRepository from '../helper';

import DistrictContainer from './DistrictContainer';
import Search from './Search';
import ComparisonContainer from './ComparisonContainer';
import SelectCategory from './SelectCategory';

class App extends Component {
  constructor() {
    super();
    this.state = {
      categoryIndex: 0,
      category: {},
      districts: [],
      selectedDistricts: []
    };
  }

  componentDidMount() {
    this.populateDistrictData(kindergartnersInFullDayPropgram, 0);
  }

  changeCategory = categoryIndex => {
    const categories = [
      kindergartnersInFullDayPropgram,
      thirdGradeTests,
      eigthGradeTestScores,
      averageRaceEthnicityMathScores
    ];
    this.populateDistrictData(categories[categoryIndex], categoryIndex);
  };

  populateDistrictData = (data, categoryIndex) => {
    const category = new DistrictRepository(data);
    const districts = category.findAllMatches();
    this.setState({
      categoryIndex,
      category,
      districts
    });
  };

  filterCards = string => {
    const categories = [
      kindergartnersInFullDayPropgram,
      thirdGradeTests,
      eigthGradeTestScores,
      averageRaceEthnicityMathScores
    ];
    const category = new DistrictRepository(
      categories[this.state.categoryIndex]
    );
    const districts = category.findAllMatches(string);
    this.setState({
      districts
    });
  };

  toggleSelected = location => {
    const currDistrict = this.state.districts.find(
      district => district.location === location
    );
    let selectedDistricts;
    if (!currDistrict.selected && this.state.selectedDistricts.length < 2) {
      currDistrict.selected = true;
      selectedDistricts = [...this.state.selectedDistricts, currDistrict];
    } else {
      currDistrict.selected = false;
      selectedDistricts = this.state.selectedDistricts.filter(
        district => district.location !== currDistrict.location
      );
    }
    this.setState({
      selectedDistricts
    });
  };

  render() {
    return (
      <div className="app">
        <div className="container">
          <h1>Welcome To Headcount 2.0</h1>
          <section className="filters">
            <Search filterCards={this.filterCards} />
            <SelectCategory changeCategory={this.changeCategory} />
          </section>
          <ComparisonContainer
            selectedDistricts={this.state.selectedDistricts}
            toggleSelected={this.toggleSelected}
            category={this.state.category}
          />
          <DistrictContainer
            districts={this.state.districts}
            toggleSelected={this.toggleSelected}
            category={this.state.category}
            selectedDistricts={this.state.selectedDistricts}
          />
        </div>
      </div>
    );
  }
}

export default App;

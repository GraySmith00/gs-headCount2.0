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
      categories: [],
      categoryData: {},
      districts: [],
      selectedDistricts: []
    };
  }

  componentDidMount() {
    this.populateCategories();
    this.populateDistrictData(kindergartnersInFullDayPropgram, 0);
  }

  populateCategories = () => {
    const categories = [
      kindergartnersInFullDayPropgram,
      thirdGradeTests,
      eigthGradeTestScores,
      averageRaceEthnicityMathScores
    ];
    this.setState({
      categories
    });
  };

  changeCategory = categoryIndex => {
    this.populateDistrictData(
      this.state.categories[categoryIndex],
      categoryIndex
    );
  };

  populateDistrictData = (data, categoryIndex) => {
    const categoryData = new DistrictRepository(data);
    const districts = categoryData.findAllMatches();
    this.setState({
      categoryIndex,
      categoryData,
      districts
    });
  };

  filterCards = string => {
    const categoryData = new DistrictRepository(
      this.state.categories[this.state.categoryIndex]
    );
    const districts = categoryData.findAllMatches(string);
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
    const { selectedDistricts, categoryData, districts } = this.state;
    return (
      <div className="app">
        <div className="container">
          <h1>Welcome To Headcount 2.0</h1>
          <section className="filters">
            <Search filterCards={this.filterCards} />
            <SelectCategory changeCategory={this.changeCategory} />
          </section>
          <ComparisonContainer
            selectedDistricts={selectedDistricts}
            toggleSelected={this.toggleSelected}
            categoryData={categoryData}
          />
          <DistrictContainer
            districts={districts}
            toggleSelected={this.toggleSelected}
            categoryData={categoryData}
            selectedDistricts={selectedDistricts}
          />
        </div>
      </div>
    );
  }
}

export default App;

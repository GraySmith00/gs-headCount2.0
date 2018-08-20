import React from 'react';
import PropTypes from 'prop-types';

import DistrictCard from './DistrictCard';
import '../css/ComparisonContainer.css';
import ComparisonCard from './ComparisonCard';

const ComparisonContainer = ({
  selectedDistricts,
  toggleSelected,
  categoryData
}) => {
  let cardOne;
  let cardTwo;
  let comparisonCard;

  const selectedCards = selectedDistricts.length > 1;

  if (selectedDistricts[0]) {
    cardOne = (
      <div
        className="card-one"
        style={
          selectedDistricts.length < 2
            ? {
                gridColumnStart: 3,
                justifyContent: 'center',
                transform: 'translate(-1rem)'
              }
            : null
        }
      >
        <DistrictCard
          {...selectedDistricts[0]}
          toggleSelected={toggleSelected}
          categoryData={categoryData}
          selectedCards={selectedCards}
        />
      </div>
    );
  }
  if (selectedDistricts[1]) {
    cardTwo = (
      <DistrictCard
        {...selectedDistricts[1]}
        toggleSelected={toggleSelected}
        categoryData={categoryData}
        selectedCards={selectedCards}
      />
    );
    comparisonCard = (
      <ComparisonCard
        selectedDistricts={selectedDistricts}
        categoryData={categoryData}
        selectedCards={selectedCards}
      />
    );
  }

  return (
    <div className="comparison-container">
      {cardOne}
      {comparisonCard}
      {cardTwo}
    </div>
  );
};

ComparisonContainer.propTypes = {
  selectedDistricts: PropTypes.array.isRequired,
  toggleSelected: PropTypes.func.isRequired,
  categoryData: PropTypes.object.isRequired
};

export default ComparisonContainer;

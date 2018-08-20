import React from 'react';
import PropTypes from 'prop-types';

import '../css/ComparisonCard.css';

const ComparisonCard = ({ selectedDistricts, categoryData }) => {
  const distOne = selectedDistricts[0].location;
  const distTwo = selectedDistricts[1].location;

  return (
    <div className="comparison-card">
      <h3 className="comparison-card-title">{distOne}:</h3>
      <p>{categoryData.findAverage(distOne)}</p>

      <h3>{`<--- ${
        categoryData.compareDistrictAverages(distOne, distTwo).compared
      } --->`}</h3>

      <h3 className="comparison-card-title">{distTwo}:</h3>
      <p>{categoryData.findAverage(distTwo)}</p>
    </div>
  );
};

ComparisonCard.propTypes = {
  selectedDistricts: PropTypes.array.isRequired,
  categoryData: PropTypes.object.isRequired
};

export default ComparisonCard;

import React from 'react';
import PropTypes from 'prop-types';
import DistrictCard from './DistrictCard';
import '../css/DistrictContainer.css';

const DistrictContainer = ({
  districts,
  toggleSelected,
  categoryData,
  selectedDistricts
}) => {
  let districtCards;

  const selectedCards = selectedDistricts.length > 1;

  districtCards = districts.map((district, i) => (
    <DistrictCard
      key={`${i}-${district.location}`}
      {...district}
      toggleSelected={toggleSelected}
      categoryData={categoryData}
      selectedCards={selectedCards}
    />
  ));

  return (
    <div
      className="district-container"
      style={
        selectedCards
          ? {
              gridTemplateColumns: 'repeat(5, 1fr)'
            }
          : null
      }
    >
      {districtCards}
    </div>
  );
};

DistrictContainer.propTypes = {
  districts: PropTypes.array.isRequired,
  toggleSelected: PropTypes.func.isRequired,
  categoryData: PropTypes.object.isRequired,
  selectedDistricts: PropTypes.array.isRequired
};

export default DistrictContainer;

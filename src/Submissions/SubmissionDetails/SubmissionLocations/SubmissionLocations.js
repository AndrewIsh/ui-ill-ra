import React from 'react';

const SubmissionLocations = ({
  locations
}) => {
  return <div>{ locations?.[0]?.name }</div>;
}

export default SubmissionLocations;

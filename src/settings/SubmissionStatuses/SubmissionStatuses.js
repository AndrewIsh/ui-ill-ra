import React from 'react';

import { useStripes } from '@folio/stripes/core';
import { ControlledVocab } from '@folio/stripes/smart-components';

const SubmissionStatuses = () => {
  const stripes = useStripes();

  const ConnectedControlledVocab = stripes.connect(ControlledVocab);

  return <ConnectedControlledVocab
    stripes={stripes}
    records="statuses"
    baseUrl="ill-ra/submission-statuses"
    label="This is the label"
    labelSingular="This is the singular label"
    objectLabel="This is the object label"
  />;
};

export default SubmissionStatuses;

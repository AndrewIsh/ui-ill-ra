import React from 'react';
import PropTypes from 'prop-types';

import {
  Col,
  Row,
} from '@folio/stripes/components';

import { BibliographicInfo } from './BibliographicInfo';

const SubmissionMetadata = ({
  submission
}) => {
  const metadata = submission.submissionMetadata;

  if (!metadata) return;

  return <>
    <Row>
      <Col xs={12}>
        <BibliographicInfo bibInfo={metadata.BibliographicInfo} />
      </Col>
    </Row>
  </>;
}

SubmissionMetadata.propTypes = {
  submission: PropTypes.object.isRequired
};

export default SubmissionMetadata;

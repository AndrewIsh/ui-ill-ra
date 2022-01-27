import React from 'react';
import PropTypes from 'prop-types';

import {
  Col,
  Row,
} from '@folio/stripes/components';

import {
  BibliographicInfo,
  PublicationInfo
} from '@ptfs-europe/ill-components';

const SubmissionMetadata = ({
  submission
}) => {
  const metadata = submission.submissionMetadata;

  if (!metadata) return null;

  return <>
    <Row>
      <Col xs={12}>
        <BibliographicInfo bibInfo={metadata.BibliographicInfo} />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <PublicationInfo pubInfo={metadata.PublicationInfo} />
      </Col>
    </Row>
  </>;
}

SubmissionMetadata.propTypes = {
  submission: PropTypes.object.isRequired
};

export default SubmissionMetadata;

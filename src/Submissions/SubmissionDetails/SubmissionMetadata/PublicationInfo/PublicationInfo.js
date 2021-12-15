import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  KeyValue,
  Layout,
  Row,
  Col
} from '@folio/stripes/components';

import {
  SUBMISSION_SECTIONS,
  SUBMISSION_SECTION_LABELS
} from '../../../../common/constants/submission';

// A 2D array representing the row & column layout and what
// property is displayed in which
const layout = [
  ['Publisher', 'PublicationType', 'PublicationDate'],
  ['PlaceOfPublication']
];

const getCol = ({ col, pubInfo }) => {
  return <Col key={col} xs={4}>
    <KeyValue
      data-testid={`submission-metadata-pubInfo-${col}`}
      label={<FormattedMessage id={`ui-ill-ra.submission.metadata.pubInfo.${col}`} />}
      value={pubInfo[col]}
    />
  </Col>;
};

const getRows = (pubInfo) => layout.map((row, index) => <Row key={index}>
  {row.map(col => getCol({ col, pubInfo }))}
</Row>
);

const PublicationInfo = ({
  pubInfo
}) => {
  return (
    <Layout className="margin-start-gutter">
      <Accordion
        id={SUBMISSION_SECTIONS.pubInfoSection}
        label={SUBMISSION_SECTION_LABELS[SUBMISSION_SECTIONS.pubInfoSection]}
      >
        {getRows(pubInfo)}
      </Accordion>
    </Layout>
  );
};

PublicationInfo.propTypes = {
  pubInfo: PropTypes.object.isRequired
};

export default PublicationInfo;

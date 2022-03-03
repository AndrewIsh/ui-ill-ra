import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';
import {
  ViewMetaData,
  UserName
} from '@folio/stripes/smart-components';
import { stripesConnect } from '@folio/stripes-core';

import { SUBMISSION_SECTIONS } from '../../../common/constants';

import { getById } from '../../../common/helpers/misc';

import { usersResource } from '../../../common/resources';

// Some Smart Components connect themselves, UserName doesn't
const ConnectedUserName = stripesConnect(UserName);

const SubmissionSummary = ({
  submission,
  statuses
}) => {
  const status = getById(submission.statusId, statuses);

  return <>
    <Row>
      <Col xs={12}>
        {submission.metadata && (
          <ViewMetaData
            id={`${SUBMISSION_SECTIONS.summarySection}.metadata`}
            metadata={submission.metadata}
          />
        )}
      </Col>
    </Row>

    <Row>
      <Col xs={6}>
        {status && (
          <KeyValue
            data-testid="id"
            label={<FormattedMessage id="ui-ill-ra.submission.summary.id" />}
            value={status.id}
          />
        )}
      </Col>
      <Col xs={3}>
        {status && (
          <KeyValue
            data-testid="name"
            label={<FormattedMessage id="ui-ill-ra.submission.summary.status" />}
            value={status.name}
          />
        )}
      </Col>
      <Col xs={3}>
        {submission.userId && (
          <KeyValue
            data-testid="name"
            label={<FormattedMessage id="ui-ill-ra.submission.summary.user" />}>
            <ConnectedUserName id={submission.userId} resources={{ user: usersResource }} />
          </KeyValue>
        )}
      </Col>
    </Row>
  </>;
}

SubmissionSummary.propTypes = {
  submission: PropTypes.object.isRequired,
  statuses: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired
};

export default SubmissionSummary;

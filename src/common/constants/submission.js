import { FormattedMessage } from 'react-intl';

export const SUBMISSION_SECTIONS = {
  summarySection: 'summarySection',
  locationSection: 'locationSection',
  metadataSection: 'metadataSection',
  requestsSection: 'requestsSection',
  bibInfoSection: 'bibInfoSection',
  pubInfoSection: 'pubInfoSection'
};

export const SUBMISSION_SECTION_LABELS = {
  [SUBMISSION_SECTIONS.summarySection]: <FormattedMessage id="ui-ill-ra.summary" />,
  [SUBMISSION_SECTIONS.locationSection]: <FormattedMessage id="ui-ill-ra.location" />,
  [SUBMISSION_SECTIONS.metadataSection]: <FormattedMessage id="ui-ill-ra.metadata" />,
  [SUBMISSION_SECTIONS.requestsSection]: <FormattedMessage id="ui-ill-ra.requests" />,
  [SUBMISSION_SECTIONS.bibInfoSection]: <FormattedMessage id="ui-ill-ra.bibinfo" />,
  [SUBMISSION_SECTIONS.pubInfoSection]: <FormattedMessage id="ui-ill-ra.pubinfo" />
};

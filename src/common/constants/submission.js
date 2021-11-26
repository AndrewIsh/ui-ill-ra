import { FormattedMessage } from 'react-intl';

export const SUBMISSION_SECTIONS = {
  summarySection: 'summarySection',
  requestsSection: 'requestsSection'
};


export const SUBMISSION_SECTION_LABELS = {
  [SUBMISSION_SECTIONS.summarySection]: <FormattedMessage id="ui-ill-ra.summary" />,
  [SUBMISSION_SECTIONS.requestsSection]: <FormattedMessage id="ui-ill-ra.requests" />
};

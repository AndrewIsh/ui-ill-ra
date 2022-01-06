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
  [SUBMISSION_SECTIONS.summarySection]: <FormattedMessage id="ui-ill-ra.submission.heading.summary" />,
  [SUBMISSION_SECTIONS.locationSection]: <FormattedMessage id="ui-ill-ra.submission.heading.location" />,
  [SUBMISSION_SECTIONS.metadataSection]: <FormattedMessage id="ui-ill-ra.submission.heading.metadata" />,
  [SUBMISSION_SECTIONS.requestsSection]: <FormattedMessage id="ui-ill-ra.submission.heading.requests" />,
  [SUBMISSION_SECTIONS.bibInfoSection]: <FormattedMessage id="ui-ill-ra.submission.heading.bibinfo" />,
  [SUBMISSION_SECTIONS.pubInfoSection]: <FormattedMessage id="ui-ill-ra.submission.heading.pubinfo" />
};

// Mapping between attribute (field) in form and id of accordion
// Enables us to identify which accordion to expand when an validation
// error occurs on a field
export const MAP_FIELD_ACCORDION = {
  submissionLocation: SUBMISSION_SECTIONS.locationSection,

  SupplierUniqueRecordId: SUBMISSION_SECTIONS.bibInfoSection,
  Title: SUBMISSION_SECTIONS.bibInfoSection,
  Author: SUBMISSION_SECTIONS.bibInfoSection,
  Subtitle: SUBMISSION_SECTIONS.bibInfoSection,
  SeriesTitle: SUBMISSION_SECTIONS.bibInfoSection,
  Edition: SUBMISSION_SECTIONS.bibInfoSection,
  TitleOfComponent: SUBMISSION_SECTIONS.bibInfoSection,
  AuthorOfComponent: SUBMISSION_SECTIONS.bibInfoSection,
  Volume: SUBMISSION_SECTIONS.bibInfoSection,
  Issue: SUBMISSION_SECTIONS.bibInfoSection,
  PagesRequested: SUBMISSION_SECTIONS.bibInfoSection,
  EstimatedNoPages: SUBMISSION_SECTIONS.bibInfoSection,
  BibliographicItemId: SUBMISSION_SECTIONS.bibInfoSection,
  Sponsor: SUBMISSION_SECTIONS.bibInfoSection,
  InformationSource: SUBMISSION_SECTIONS.bibInfoSection,
  BibliographicRecordId: SUBMISSION_SECTIONS.bibInfoSection,

  Publisher: SUBMISSION_SECTIONS.pubInfoSection,
  PublicationType: SUBMISSION_SECTIONS.pubInfoSection,
  PublicationDate: SUBMISSION_SECTIONS.pubInfoSection,
  PlaceOfPublication: SUBMISSION_SECTIONS.pubInfoSection
};

// ISO18626 PublicationType values
export const PUBLICATION_TYPE = [
  'ArchiveMaterial',
  'Article',
  'AudioBook',
  'Book',
  'Chapter',
  'ConferenceProc',
  'Game',
  'GovernmentPubl',
  'Image',
  'Journal',
  'Manuscript',
  'Map',
  'Movie',
  'MusicRecording',
  'MusicScore',
  'Newspaper',
  'Patent',
  'Report',
  'SoundRecording',
  'Thesis'
];

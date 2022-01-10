// Given a submission, return a best endeavour at a title
export const getSubmissionTitle = (submission) => {
  const bibInfo = submission?.submissionMetadata?.BibliographicInfo;
  if (!bibInfo) return null;

  // Potential fields containing a title, in order
  // of preference
  const potentials = [
    'TitleOfComponent',
    'Title',
    'SeriesTitle',
    'Subtitle'
  ];

  for (let i = 0; i < potentials.length; i++) {
    const field = bibInfo[potentials[i]];
    if (field) {
      return field;
    }
  }

  return null;
};

import PropTypes from 'prop-types';

// Given a record's bib metadata, return a best effort at a
// displayable title
const useTitle = (BibliographicInfo) => {
  if (!BibliographicInfo) return [];
  // Potential fields containing a title, in order
  // of preference
  const potentials = [
    'TitleOfComponent',
    'Title',
    'SeriesTitle',
    'Subtitle'
  ];

  for (let i = 0; i < potentials.length; i++) {
    const field = BibliographicInfo[potentials[i]];
    if (field) {
      return [field];
    }
  }

  return [];
};

useTitle.propTypes = {
  BibliographicInfo: PropTypes.object.isRequired
};

export default useTitle;

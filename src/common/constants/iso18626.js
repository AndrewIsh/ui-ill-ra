export const BibliographicItemIdentifierCode = [
  'ISIL',
  'ISBN',
  'ISSN',
  'ISMN'
];

export const BibliographicRecordIdentifierCode = [
  'AMICUS',
  'BL',
  'FAUST',
  'JNB',
  'LA',
  'LCCN',
  'Medline',
  'NCID',
  'OCLC',
  'PMID',
  'TP'
];

// Fields we can work with
// each has a code and value
export const validFields = {
  BibliographicItemId: {
    code: 'BibliographicItemIdentifierCode',
    value: 'BibliographicItemIdentifier'
  },
  BibliographicRecordId: {
    code: 'BibliographicRecordIdentifierCode',
    value: 'BibliographicRecordIdentifier'
  }
};

const indexes = [
    'id',
    'submissionMetadata.BibliographicInfo.Title',
    'submissionMetadata.BibliographicInfo.Author',
    'submissionMetadata.BibliographicInfo.TitleOfComponent',
    'submissionMetadata.BibliographicInfo.AuthorOfComponent'
];

export const searchableIndexes = [
    {
        labelId: 'ui-ill-ra.search.keyword',
        value: ''
    },
    ...indexes.map(index => ({
        labelId: `ui-ill-ra.search.${index.replace(/\./g, '')}`,
        value: index
    }))
];

export const getKeywordQuery = query => indexes.reduce(
    (acc, sIndex) => {
        if (acc) {
            return `${acc} or ${sIndex}="${query}"`;
        } else {
            return `${sIndex}="${query}*"`;
        }
    },
    ''
);

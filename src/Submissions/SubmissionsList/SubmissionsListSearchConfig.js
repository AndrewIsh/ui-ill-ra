const indexes = [
    'id'
];

export const searchableIndexes = [
    {
        labelId: 'ui-ill-ra.search.keyword',
        value: ''
    },
    ...indexes.map(index => ({
        labelId: `ui-ill-ra.search.${index}`,
        placeholderId: index === 'language' ? 'ui-ill-ra.search.placeholder.language' : undefined,
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
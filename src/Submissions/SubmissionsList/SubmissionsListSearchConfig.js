const indexes = [
    'id',
    'title'
];

export const searchableIndexes = [
    {
        labelId: 'ui-ill-ra.search.keyword',
        value: ''
    },
    ...indexes.map(index => ({
        labelId: `ui-ill-ra.search.${index}`,
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
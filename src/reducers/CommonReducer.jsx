const reducer = (state, action) => {
    switch (action.type) {
        case 'append':
            return [...state, ...action.payload];
        case 'clear':
            return [];
        case 'filter':
            return action.rows.filter(item => {
                return item[action.propertyName].includes(action.payload)
            });
        default:
            throw new Error('Wrong action type!');
    }
}

export default reducer; 
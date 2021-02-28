const reducer = (state, action) => {
    switch (action.type) {
        case 'append':
            return [...state, ...action.payload];
        case 'clear':
            return [];
        case 'filter':
            return action.rows.filter(item => {
                return item[action.propertyName].toUpperCase().includes(action.payload.toUpperCase())
            });
        default:
            throw new Error('Wrong action type!');
    }
}

export default reducer; 
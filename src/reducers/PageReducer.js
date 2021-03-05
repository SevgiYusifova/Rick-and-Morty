const reducer = (state, action) => {
    console.log(action);
    return action.payload;
}

export default reducer;
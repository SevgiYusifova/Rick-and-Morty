const reducer = (state, action) => {
  switch (action.type) {
    case "append":
      return [...state, ...action.payload];
    default:
      throw new Error("Wrong action type!");
  }
};

export default reducer;

const initialState = {
  id:-1,
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        id: action.payload
      };
    default:
      return state;
  }
};

export default data;

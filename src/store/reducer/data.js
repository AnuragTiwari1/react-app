const initialState = {
  phone:'+919607155846'
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

const initialState = {
  phoneNumber:'+919607155846',
  notice:{}
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case "SETNOTICE":
      return {
        ...state,
        notice: action.payload
      };
    default:
      return state;
  }
};

export default data;

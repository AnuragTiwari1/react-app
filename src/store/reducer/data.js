const initialState = {
  phoneNumber:'+919607155846',
  notice:{},
  dailyQuta: 0
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case "SETQUTA":
      return {
        ...state,
        dailyQuta: action.payload
      };
    default:
      return state;
  }
};

export default data;

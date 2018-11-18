const initialState = {
  phoneNumber:'+919607155846',
  notice:{},
  dailyQuta: 0,
  id1:true,
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case "SETQUTA":
      return {
        ...state,
        dailyQuta: action.payload
      };
    case "SETID1":
      return {
        ...state,
        id1: action.payload
      };
    default:
      return state;
  }
};

export default data;

const initialState = {
  phoneNumber:'+919607155846',
  rewardPoints:0,
  points:0
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "SETPHONE":
      return {
        ...state,
        phoneNumber: action.payload
      };

    case "SETPOINT":
    console.log("setphone is called with payload",action.payload);
      return {
        ...state,
        points: action.payload
      };

    default:
      return state;
  }
};

export default user;

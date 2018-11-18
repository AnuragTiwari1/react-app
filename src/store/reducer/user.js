const initialState = {
  phoneNumber:'+919607155846',
  rewardPoints:0,
  points:0,
  freeSpin:0,
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

    case "SETREWARD":
        console.log("setReward is called with payload",action.payload);
          return {
            ...state,
            rewardPoints: action.payload
          };
    case "SETSPIN":
            console.log("setSpin is called with payload",action.payload);
              return {
                ...state,
                freeSpin: action.payload
              };
    default:
      return state;
  }
};

export default user;

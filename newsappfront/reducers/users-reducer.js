/** @format */
export const driverList = "driverList";
export const customerList = "customerList";
export const driverDetail = "driverDetail";
export const servicesList = "services";
export const customerDetail = "customerDetail";

export const setDriverList = (data) => {
  return {
    type: driverList,
    payload: data,
  };
};

export const setDriverDetail = (data) => {
  return {
    type: driverDetail,
    payload: data,
  };
};

export const setCustomerList = (data) => {
  return {
    type: customerList,
    payload: data,
  };
};

export const setCustomerDetail = (data) => {
  return {
    type: customerDetail,
    payload: data,
  };
};




export const setServicesList = (data) => {
  return {
    type: servicesList,
    payload: data,
  };
};

const initialState = {
  driverList : [],
  customerList : [],
  driverDetail : [],
  servicesList : [],
  customerDetail : []
};

//Initial state of the counter

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case driverList:
      return {
        ...state,
        driverList: payload,
      };

      case driverDetail:
        return {
          ...state,
          driverDetail: payload,
        };

    case customerList:
      return {
        ...state,
        customerList: payload,
      };
    case customerDetail:
      return {
        ...state,
        customerDetail: payload,
      };
   
    case servicesList:
      return {
        ...state,
        servicesList: payload,
      };

    default:
      return state;
  }
};

export default reducer;

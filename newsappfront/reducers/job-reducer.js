/** @format */
export const pickupCords = "pickupCords"
export const pickupAddress = "pickupAddress"
export const deliveryCords = "deliveryCords"
export const deliveryAddress = "deliveryAddress"
export const latestJobs = "latestJobs";
export const allJobs = "allJobs";
export const pendingJobs = "pendingJobs";
export const jobDetail = "jobDetail";


export const setPickupCords = (data) => {
  return {
    type: pickupCords,
    payload: data,
  };
};
export const setPickupAddress = (data) => {
  return {
    type: pickupAddress,
    payload: data,
  };
};
export const setDeliveryCords = (data) => {
  return {
    type: deliveryCords,
    payload: data,
  };
};
export const setDeliveryAddresss = (data) => {
  return {
    type: deliveryAddress,
    payload: data,
  };
};
export const setLatestJobs = (data) => {
  return {
    type: latestJobs,
    payload: data,
  };
};
export const setAllJobs = (data) => {
  return {
    type: allJobs,
    payload: data,
  };
};
export const setPendingJobs = (data) => {
  return {
    type: pendingJobs,
    payload: data,
  };
};
export const setJobDetail = (data) => {
  return {
    type: jobDetail,
    payload: data,
  };
};



const initialState = {
  pickupCords : [],
  pickupAddress :"",
  deliveryCords:[], 
  deliveryAddress :"",
  latestJobs : [],
  allJobs : [],
  pendingJobs : [],
  jobDetail : []
};

//Initial state of the counter

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case pickupCords:
      return {
        ...state,
        pickupCords: payload,
      };

    case pickupAddress:
      return {
        ...state,
        pickupAddress: payload,
      };
    
    case deliveryCords:
      return {
        ...state,
        deliveryCords :payload
      };
    case deliveryAddress:
      return {
        ...state,
        deliveryAddress :payload
      };
    case allJobs:
      return {
        ...state,
        allJobs :payload
      };
    case pendingJobs:
      return {
        ...state,
        pendingJobs :payload
      };
    case latestJobs:
      return {
        ...state,
        latestJobs :payload
      };
    case jobDetail:
      return {
        ...state,
        jobDetail :payload
      };

    default:
      return state;
  }
};

export default reducer;

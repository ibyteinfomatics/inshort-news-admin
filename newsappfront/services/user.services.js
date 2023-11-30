import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import { fetchWrapper } from "../helpers";
import axios from "axios";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const userSubject = new BehaviorSubject(
  process.browser && localStorage.getItem("token")
);

//Login thecarcurrior
async function login(email, password) {
  try {
    const res = await fetchWrapper.post(`${baseUrl}admin/login`, {
      email: email,
      password: password,
    });
    // publish user to subscribers and store in local storage to stay logged in between page refreshes
    if (res.success) {
      userSubject.next(res.token);
      localStorage.setItem("token", res.token);
    }
    return res;
  } catch (error) {
    return error;
  }
}

//Log out the carcurrior app
function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem("token");
  userSubject.next(null);
  Router.push("/");
}

//get admin profile
async function getAdmin() {
  try {
    const res = await fetchWrapper.get(`${baseUrl}admin/profile`);
    return res;
  } catch (err) {
    console.log(err);
  }
}
// get drivers list
async function getDrivers(page, limit, search, data, filter) {
  try {
    const res = await fetchWrapper.post(
      `${baseUrl}admin/drivers_list?page=${page}&limit=${limit}&search=${search.trim()}`,
      { sort: data, filter: filter }
    );
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

// get all drivers ...... without pagination
async function getAllDrivers(search) {
  try {
    const res = await fetchWrapper.get(
      `${baseUrl}admin/get_all_drivers?search=${search || ""}`
    );
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

// get single driver by id
async function getSingleDriver(id) {
  try {
    const res = await fetchWrapper.get(`${baseUrl}admin/driver/${id}`);
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

// get single customer by id
async function getSingleCustomer(id) {
  try {
    const res = await fetchWrapper.get(`${baseUrl}admin/customer/${id}`);
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

//verify driver

async function verifyDriver(id, status) {
  try {
    const res = await fetchWrapper.patch(
      `${baseUrl}admin/verify_driver/${id}`,
      {
        driver_status: status,
        rejection_reason: "",
      }
    );
    console.log(res, "apiresponce");
    return res;
  } catch (error) {
    return error;
  }
}

//create customers list
async function createCustomer(data) {
  try {
    const res = await fetchWrapper.post(
      `${baseUrl}admin/create_customer`,
      data
    );
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

//update customers list
async function updateCustomer(id, data) {
  try {
    const res = await fetchWrapper.put(
      `${baseUrl}admin/edit_customer/${id}`,
      data
    );
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

// get customers list
async function getCustomers(page, limit, search, data, filter) {
  try {
    const res = await fetchWrapper.post(
      `${baseUrl}admin/customers_list?page=${page}&limit=${limit}&search=${search.trim()}`,
      { sort: data, filter: filter }
    );
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

//create job
async function createJob(data) {
  console.log("daa", data);
  try {
    const res = await axios.postForm(`${baseUrl}admin/create_job`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        type: "formData",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

//edit job
async function editJob(id, data) {
  try {
    const res = await axios.putForm(`${baseUrl}admin/edit_job/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        type: "formData",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

//get Latest jobs
async function getLatestJobs() {
  try {
    const res = await fetchWrapper.post(`${baseUrl}admin/recent_jobs`);
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

//get All Jobs
async function getAllJob(page, limit, search, data, filter) {
  try {
    const res = await fetchWrapper.post(
      `${baseUrl}admin/get_all_jobs?page=${page}&limit=${limit}&search=${search.trim()}`,
      { sort: data, filter: filter }
    );
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}
//get Pending Jobs
async function getPendingJob(page, limit, search, data, dateRange) {
  try {
    const res = await fetchWrapper.post(
      `${baseUrl}admin/get_all_jobs?page=${page}&limit=${limit}&search=${search.trim()}`,
      {
        sort: data,
        filter_by_date: dateRange,
        filter: {
          job_status: "pending",
        },
      }
    );
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

//get Single Jobs
async function getSingleJob(id) {
  try {
    const res = await fetchWrapper.get(`${baseUrl}admin/job/${id}`);
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

//Change users Passwords
async function changeUserPasswords(user_type, user_id, new_password) {
  try {
    const res = await fetchWrapper.patch(
      `${baseUrl}admin/change_user_password`,
      {
        user_type: user_type,
        user_id: user_id,
        new_password: new_password,
      }
    );
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

//Delete users
async function deleteUsers(data) {
  try {
    const res = await fetchWrapper.delete(
      `${baseUrl}admin/delete_user_account`,
      data
    );
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

//delete panding jobs
async function deleteJobs(data) {
  try {
    const res = await fetchWrapper.delete(`${baseUrl}admin/pending_jobs`, data);
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

// change admin password
async function changeAdminPassword(data) {
  try {
    const res = await fetchWrapper.patch(
      `${baseUrl}admin/change_password`,
      data
    );

    return res;
  } catch (error) {
    return error;
  }
}
async function getAllCustomers(search) {
  try {
    const res = await fetchWrapper.get(
      `${baseUrl}admin/get_all_customers?search=${search || ""}`
    );

    return res;
  } catch (error) {
    return error;
  }
}

// const jobDetail = async (id, token, page, search) => {
//   const limit = 10;
//   // const apiUrl = `http://thecarcourierapi.ibyteworkshop.com/admin/get_single_driver_jobs/${id}`;
//   const apiUrl = `${baseUrl}admin/get_single_driver_jobs/65096ef6a547d0e570bd6bba?page=${page}&limit=${limit}&search=${search}`;

//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   try {
//     const response = await axios.get(apiUrl, config);
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };

const jobDetail = async (id, token, page, search, startDate, endDate) => {
  const limit = 10;
  const filterData = {
    filter: {
      from: startDate,
      to: endDate,
    },
  };
  const sortData = {
    sort: {
      createdAt: 1,
    },
  };
  const apiUrl = `${baseUrl}admin/get_single_driver_jobs/${id}?page=${page}&limit=${limit}&search=${search}`;

  const config = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(filterData, sortData),
  };

  try {
    const response = await axios(apiUrl, config);
    return response.data;
  } catch (error) {
    return error;
  }
};

const singleJobDetail = async (id) => {
  const token = localStorage.getItem("token");
  const apiUrl = `${baseUrl}admin/job/${id}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(apiUrl, config);
    return response.data;
  } catch (error) {
    return error;
  }
};

const invoicesList = async (id, page) => {
  const token = localStorage.getItem("token");
  const apiUrl = `${baseUrl}admin/driver_invoices/${id}?page=${page}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(apiUrl, config);
    return response.data;
  } catch (error) {
    return error;
  }
};

const fetchNewsAndSave = async (category, type) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const apiUrl = `${baseUrl}admin/fetch_news_and_save`;
  try {
    const response = await axios.post(apiUrl, { category, type }, config);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const addSingleNews = async (body) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const apiUrl = `${baseUrl}admin/add_news`;
  try {
    const response = await axios.postForm(apiUrl, body, config);
    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
  getAdmin,
  getDrivers,
  getSingleDriver,
  getSingleCustomer,
  verifyDriver,
  createCustomer,
  updateCustomer,
  getCustomers,
  createJob,
  editJob,
  getLatestJobs,
  getAllJob,
  getPendingJob,
  getSingleJob,
  changeUserPasswords,
  deleteUsers,
  deleteJobs,
  changeAdminPassword,
  getAllDrivers,
  getAllCustomers,
  jobDetail,
  singleJobDetail,
  invoicesList,
  fetchNewsAndSave,
  addSingleNews,
};

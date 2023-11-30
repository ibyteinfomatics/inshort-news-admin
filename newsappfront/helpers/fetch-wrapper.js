import getConfig from "next/config";

import { userService } from "../services";
import axios from 'axios'

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
  get,
  post,
  postMethod,
  put,
  patch,
  postForm,
  putForm,
  delete: _delete,
};

async function get(url) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(url),
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

async function post(url, body) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    credentials: "include",
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

async function postForm(url, body) {
  console.log('ddk',body)
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      type: "formData",

      ...authHeader(url),
    },
    credentials: "include",
    body: JSON.stringify(body),
  };
  const response = await axios.postForm(url, requestOptions);
  return handleResponse(response);
}

async function putForm(url, body) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      type: "formData",

      ...authHeader(url),
    },
    credentials: "include",
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

async function postMethod(url, body) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(url) },
    credentials: "include",
    body: body,
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

async function put(url, body) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

async function patch(url, body) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url, body) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    credentials: "include",
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

// prefixed with underscored because delete is a reserved word in javascript
// function _delete(url) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader(url)
//     };
//     return fetch(url, requestOptions).then(handleResponse);
// }
// helper functions

function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const token = userService.userValue;
  const isLoggedIn = token;
  const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
  if (isLoggedIn && isApiUrl) {
    //console.log(token,"token");
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      //console.log(response,"token auth");
      if ([401, 403].includes(response.status) && userService.userValue) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        userService.logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

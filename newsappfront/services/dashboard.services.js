import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import { fetchWrapper } from "../helpers";
import Router from "next/router";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}` || "localhost:4000";
const dashboardSubject = new BehaviorSubject(
  process.browser && localStorage.getItem("token")
);

async function getAlldashboards() {
  try {
    const res = await fetchWrapper.get(`${baseUrl}admin/dashboard`);
    return res;
  } catch (error) {
    return error;
  }
}



export const dashboardService = {
  dashboard: dashboardSubject.asObservable(),
  get dashboardValue() {
    return dashboardSubject.value;
  },
  getAlldashboards
};

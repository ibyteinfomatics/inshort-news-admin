import Head from "next/head";
import React, { useEffect, useState } from "react";
import SideBar from "../../../components/side-bar/SideBar";
import { userService } from "../../../services";
import { useDispatch, useSelector } from "react-redux";
import { setDriverList } from "../../../reducers/users-reducer";
import { toast } from "react-toastify";
import DashboardHeader from "../../../components/header/DashboardHeader";
import { useRouter } from "next/router";
import FilterTopHeader from "../../../components/header/FilterTopHeader";
import ReactPaginate from "react-paginate";
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';

export default function drivers() {
  const [statusSelect, setStatusSelect] = useState({ label: "All", value: "" });
  const status = [
    { label: "All", value: "" },
    { label: "Verified", value: true },
    { label: "Un-Verified", value: false },
  ];
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [option, setOption] = useState({ createdAt: -1 });
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [checkedDriver, setCheckedDriver] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [refresh, setRefresh] = useState(null);
  const [showAction, setShowAction] = useState(false);
  const [showId, setShowId] = useState(null);
  const [filter, setFilter] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  const [driver, setDriver] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState({
    label: "Driver",
    value: "",
  });

  const { driverList } = useSelector((state) => state.users);
  console.log(filter, "filter");
  useEffect(() => {
    getAllDriver();
  }, []);
  useEffect(() => {
    getAllDrivers(1, limit, search, option, filter);
    setPageNo(1);
  }, [filter]);
  useEffect(() => {
    getAllDrivers(pageNo, limit, search, option, filter);
  }, [limit, pageNo, search, option, refresh]);
  const getAllDrivers = async (pageNo, limit, search, extraData, filter) => {
    const response = await userService.getDrivers(
      pageNo,
      limit,
      search,
      extraData,
      filter
    );
    if (response.success) {
      await dispatch(setDriverList(response));
    } else {
      console.log(response.msg);
    }
  };
  const getAllDriver = async (search) => {
    try {
      const { drivers } = await userService.getAllDrivers(search);
      setDriver(drivers);
    } catch (error) {
      console.log("er", error);
    }
  };
  const deleteDriver = async (checkedDriver) => {
    checkedDriver.length == 0
      ? alert("please select at least one category")
      : confirm("Are you sure to Delete")
      ? userService
          .deleteUsers({
            user_type: "driver",
            users_ids: checkedDriver,
          })
          .then((res) => {
            console.log(res);
            if (res.success === true) {
              console.log(res.message);
              setCheckedDriver([]);
              toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
            } else {
              toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
              setBtnStatus(false);
            }
          })
          .catch((error) => {
            toast.error(error, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }) &&
        setTimeout(() => {
          setRefresh(checkedDriver);
        }, 2000)
      : null;
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
    setPageNo(1);
  };

  const changePageHandler = ({ selected }) => {
    setPageNo(Number(selected) + 1);
  };

  const handleChecked = (e, id) => {
    if (e.target.checked) {
      setCheckedDriver((prev) => [...prev, id]);
    } else {
      const temp = checkedDriver?.filter((item) => item !== id);
      setCheckedDriver(temp);
    }
  };
  const handleAllSelect = (e) => {
    if (e.target.checked) {
      let temp = [];
      driverList?.drivers?.map((item) => {
        temp.push(item._id);
      });
      setCheckedDriver(temp);
    } else {
      setCheckedDriver([]);
    }
  };
  const dateRangePicker = (e) => {
    if (e.target.name == "from") {
      setFromDate(e.target.value);

      setFilter({ ...filter, [e.target.name]: e.target.value });
    } else {
      setToDate(e.target.value);
      setFilter({ ...filter, [e.target.name]: e.target.value });
    }
  };
  const clearFilter = () => {
    setFilter({});
    setFromDate("");
    setToDate("");
    setSelectedDriver({ label: "Driver", value: "" });
    setStatusSelect({ label: "All", value: "" });
  };
  const handleDriverSearch = (e) => {
    getAllDriver(e);
  };
  const handelDriverSelect = (e) => {
    setSelectedDriver(e);
    setFilter({ ...filter, _id: e.value });
  };
  const handelStatusSelect = (e) => {
    setStatusSelect(e);
    if (e.value) {
      setFilter({ ...filter, verify_by_admin: e.value });
    } else if (e.value == false) {
      setFilter({ ...filter, verify_by_admin: e.value });
    } else {
      const temp = filter;
      delete temp.verify_by_admin;
      setFilter({ ...temp });
    }
  };
  return (
    <>
      <Head>
        <title>Drivers Lists</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <SideBar />
      <div
        className="dashboard sideBarOpen"
        onClick={() => showAction && setShowAction(!showAction)}
      >
        <DashboardHeader message="Categories List" />
        <div className="contentWrapper">
          <div className="dashboard_content newLayout">
            <FilterTopHeader
              handelUserSearch={handleDriverSearch}
              selectedUser={selectedDriver}
              handelUserSelect={handelDriverSelect}
              user={driver}
              userName="Driver"
              toDate={toDate}
              fromDate={fromDate}
              handleSearch={searchHandler}
              filter={filter}
              dateRangePicker={dateRangePicker}
              clearFilter={clearFilter}
              selectedStatus={statusSelect}
              handelStatusSelect={handelStatusSelect}
            />
            <div className="table--layout">
              {/* <Tabs>
              <TabList>
                <Tab>Title 1</Tab>
                <Tab>Title 2</Tab>
              </TabList>

              <TabPanel>
                <h2>Any content 1</h2>
              </TabPanel>
              <TabPanel>
                <h2>Any content 2</h2>
              </TabPanel>
            </Tabs> */}

              <table>
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        name="select--all"
                        onChange={(e) => {
                          handleAllSelect(e);
                        }}
                      />
                    </th>
                    <th>Sr.</th>
                    <th
                      className={
                        option.full_name === 1
                          ? "desc"
                          : option.full_name === -1
                          ? "asc"
                          : ""
                      }
                      onClick={() => {
                        setOption({
                          full_name: option.full_name == 1 ? -1 : 1,
                        });
                      }}
                    >
                      Name
                    </th>
                    <th
                      className={
                        option.phone_number === 1
                          ? "desc"
                          : option.phone_number === -1
                          ? "asc"
                          : ""
                      }
                      onClick={() => {
                        setOption({
                          phone_number: option.phone_number == 1 ? -1 : 1,
                        });
                      }}
                    >
                      Slug
                    </th>
                    <th
                      className={
                        option.email === 1
                          ? "desc"
                          : option.email === -1
                          ? "asc"
                          : ""
                      }
                      onClick={() => {
                        setOption({
                          email: option.email == 1 ? -1 : 1,
                        });
                      }}
                    >
                      Order
                    </th>
                    <th
                      className={
                        option.verify_by_admin === 1
                          ? "desc"
                          : option.verify_by_admin === -1
                          ? "asc"
                          : ""
                      }
                      onClick={() => {
                        setOption({
                          verify_by_admin: option.verify_by_admin == 1 ? -1 : 1,
                        });
                      }}
                    >
                      Date Of Creation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {driverList?.drivers?.length > 0 ? (
                    driverList?.drivers?.map((item, i) => {
                      const date = new Date(item.updatedAt);
                      const join = date.toDateString();
                      return (
                        <tr key={1 + i + (driverList?.page - 1) * limit}>
                          <td>
                            <input
                              type="checkbox"
                              checked={checkedDriver.includes(item._id)}
                              onChange={(e) => handleChecked(e, item._id)}
                            />
                          </td>
                          <td> {1 + i + (driverList?.page - 1) * limit}</td>
                          <td>{item?.full_name}</td>
                          <td>{item.phone_number}</td>
                          <td>{item.email}</td>
                          <td>
                            {item.verify_by_admin ? (
                              <span className="label label-success">
                                Verified
                              </span>
                            ) : (
                              <span className="label label-danger">
                                Un-Verified
                              </span>
                            )}
                          </td>
                          <td>
                            {item.updatedAt ? (
                              join
                            ) : (
                              <span className="label label-danger">
                                Not Joined
                              </span>
                            )}
                          </td>
                          <td>
                            <span
                              className="three--vertical--dots"
                              onClick={() => {
                                setShowAction(!showAction);
                                setShowId(item._id);
                              }}
                            >
                              <span></span>
                              <span></span>
                              <span></span>
                            </span>
                            {showAction && showId === item._id && (
                              <span className="tableActions">
                                <ul>
                                  <li
                                    onClick={() =>
                                      router.push(`/admin/drivers/${showId}`)
                                    }
                                  >
                                    <a className="view__lock">View </a>
                                  </li>
                                  <li
                                    onClick={() => {
                                      deleteDriver([showId]);
                                    }}
                                  >
                                    <a className="delete__lock">Delete </a>
                                  </li>
                                  <li
                                    onClick={() => {
                                      router.push(
                                        `/admin/drivers/update-password/${showId}`
                                      );
                                    }}
                                  >
                                    <a className="user__lock">
                                      Update Password{" "}
                                    </a>
                                  </li>
                                </ul>
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr></tr>
                  )}
                </tbody>
              </table>
              <div className="paginationView">
                <div className="dataList">
                  {driverList?.total > 0 && (
                    <p>
                      Showing {(pageNo - 1) * 10 + 1} to{" "}
                      {pageNo * 10 > driverList?.total
                        ? driverList?.total
                        : pageNo * 10}{" "}
                      of {driverList?.total} entries
                    </p>
                  )}
                </div>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="Next"
                  onPageChange={changePageHandler}
                  pageRangeDisplayed={2}
                  pageCount={driverList?.pages ?? 0}
                  previousLabel="Previous"
                  renderOnZeroPageCount={null}
                  className="pagination"
                  nextClassName="page"
                  previousClassName="page"
                  pageClassName="page"
                  activeClassName="active-page"
                  forcePage={pageNo - 1}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

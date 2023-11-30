import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { userService } from "../../../services";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerList } from "../../../reducers/users-reducer";
import { toast } from "react-toastify";
import {
  Pagination,
  Stack,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import SideBar from "../../../components/side-bar/SideBar";
import DashboardHeader from "../../../components/header/DashboardHeader";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import FilterTopHeader from "../../../components/header/FilterTopHeader";
import ReactPaginate from "react-paginate";

export default function view() {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [option, setOption] = useState({ createdAt: -1 })
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [filter,setFilter]=useState({})
  const [checkedCustomer, setCheckedCustomer] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [refresh, setRefresh] = useState(null);
  const [showAction, setShowAction] = useState(false);
  const [showId, setShowId] = useState(null);
  const [customer,setCustomer]=useState([])
  const dispatch = useDispatch();
  const router = useRouter();
  const [customerSelected,setCustomerSelected]=useState({label:"Customer",value:""})

  const { customerList } = useSelector((state) => state.users);
useEffect(()=>{
  getAllCustomer()
},[])
  useEffect(() => {
    getAllUsers(pageNo, limit, search, option, filter);
  }, [limit, pageNo, search, option, filter, refresh]);

  const getAllUsers = async (pageNo, limit, search, option, filter) => {
    const response = await userService.getCustomers(
      pageNo,
      limit,
      search,
      option,
      filter
    );
    if (response.success) {
      // setAllUsersList(resData);
      await dispatch(setCustomerList(response));
    } else {
      console.log(response.msg);
    }
  };

  const deleteCustomer = async (checkedCustomer) => {
    checkedCustomer.length == 0
      ? alert("please select at least one category")
      : confirm("Are you sure to Delete")
        ? userService
          .deleteUsers({
            user_type: "customer",
            users_ids: checkedCustomer,
          })
          .then((res) => {
            console.log(res);
            if (res.success === true) {
              console.log(res.message);
              toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
            } else {
              toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
              setBtnStatus(false);
              setCheckedCustomer([])
            }
          })
          .catch((error) => {
            toast.error(error, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }) &&
        setTimeout(() => {
          setRefresh(checkedCustomer);
        }, 2000)
        : null;
  };



  const searchHandler = (e) => {
    setSearch(e.target.value);
    setPageNo(1);
    
  };

  const changeLimitHandler = (e) => {
    const element = document.getElementById("limit");
    var value = element.options[element.selectedIndex].value;
    setLimit(value);
    setPageNo(1);
  };

  const changePageHandler = ({selected}) => {
    setPageNo(Number(selected)+1);
  };

  const handleChecked = (e, id) => {
    if (e.target.checked) {
      setCheckedCustomer((prev) => [...prev, id]);
    } else {
      const temp = checkedCustomer?.filter((item) => item !== id);
      setCheckedCustomer(temp);
    }
  };
  const handleAllSelect = (e) => {
    if (e.target.checked) {
      let temp = [];
      customerList.customers?.map((item) => {
        temp.push(item._id);
      });
      setCheckedCustomer(temp);
    } else {
      setCheckedCustomer([]);
    }
  };

  const dateRangePicker = (e) => {
    console.log(e.target.name)
    if (e.target.name == 'from') {
      setFromDate(e.target.value)
      setFilter({ ...filter, [e.target.name]: e.target.value })

    } else {
      setToDate(e.target.value)
      setFilter({ ...filter, [e.target.name]: e.target.value })

    }
  };
  const getAllCustomer=async(search)=>{
    try {
      
      const {customers}=await userService.getAllCustomers(search)
    setCustomer(customers)
    } catch (error) {
      console.log('er',error)
      
    }
  }
const handleCustomerSearch=(e)=>{
  getAllCustomer(e)
}
const handleCustomerSelect=(e)=>{
  setCustomerSelected(e)
  setFilter({...filter,_id:e.value})
  
}

const handleClear=()=>{
  setFilter({})
  setFromDate('')
  setToDate('')
  setCustomerSelected({label:"Customer",value:''})
}
  return (
    <>
      <Head>
        <title>Customer Lists</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <SideBar />
      <div
        className="dashboard sideBarOpen"
        onClick={() => showAction && setShowAction(!showAction)}
      >
        <DashboardHeader message='Customer List' />
        <div className="contentWrapper">
          <div className="dashboard_content newLayout">
            <FilterTopHeader 
            user={customer}
            userName='Customer'
            handleSearch={searchHandler} 
            selectedUser={customerSelected}
            handelUserSearch={handleCustomerSearch}
            handelUserSelect={handleCustomerSelect}
            filter={filter}
            clearFilter={handleClear}
            dateRangePicker={dateRangePicker}
            fromDate={fromDate}
            toDate={toDate}
            />
            <div className="table--layout">
              <div
                style={{
                  borderBottom: "1px solid #989898",
                  padding: "10px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <button className="creatButton label-success">
                  <Link href="/admin/customers/create-customer">
                    Create Customer
                  </Link>
                </button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        name="select--all"
                        onChange={(e) => {
                          handleAllSelect(e);
                        }} />
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
                    >Name</th>
                   
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


                    >Email</th>
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

                    >Phone</th>

                    <th
                      className={
                        option.company_name === 1
                          ? "desc"
                          : option.company_name === -1
                            ? "asc"
                            : ""
                      }
                      onClick={() => {
                        setOption({
                          company_name: option.company_name == 1 ? -1 : 1,
                        });
                      }}
                    >Company Name</th>
                    <th

                      className={
                        option.updatedAt === 1
                          ? "desc"
                          : option.updatedAt === -1
                            ? "asc"
                            : ""
                      }
                      onClick={() => {
                        setOption({
                          updatedAt: option.updatedAt == 1 ? -1 : 1,
                        });
                      }}
                    > Joining Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {customerList.customers?.length > 0 ? (
                    customerList.customers?.map((item, i) => {
                      const date = new Date(item.updatedAt);
                      const join = date.toDateString();
                      return (
                        <tr
                          key={
                            i + (customerList?.page - 1) * customerList?.limit
                          }
                        >
                          <td>
                            <input
                              type="checkbox"
                              checked={checkedCustomer.includes(item._id)}
                              onChange={(e) => handleChecked(e, item._id)}
                            />
                          </td>
                          <td>
                            {1 +
                              i +
                              (customerList?.page - 1) * customerList?.limit}
                          </td>
                          <td>
                            {item.full_name}
                          </td>
                          <td>{item.email}</td>

                          <td>
                            {item.phone_number}
                          </td>

                          <td>
                            {item.company_name}
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
                          <td >
                          <span className="three--vertical--dots" onClick={() => {
                           setShowAction(!showAction);
                           setShowId(item._id);
                          }}>
                            <span></span>
                            <span></span>
                            <span></span>
                          </span>
                          {showId === item?._id && showAction && (
                            <span className="tableActions">
                              <ul>
                              <li
                                    onClick={() =>
                                      router.push(
                                        `/admin/customers/update-profile/${showId}`
                                      )
                                    }
                                  >
                                      <a className="edit__detail">Edit </a>
                                  </li>
                                  <li
                                    onClick={() => {
                                      deleteCustomer([item._id]);
                                    }}
                                  >
                                     <a className="delete__lock">Delete </a>
                                    
                                  </li>
                                  <li
                                    onClick={() => {
                                      router.push(
                                        `/admin/customers/update-password/${showId}`
                                      );
                                    }}
                                  >
                                     <a className="edit__detail">Update Password </a>

                                    
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
                  {customerList?.total>0&& <p>Showing {(pageNo - 1) * 10 + 1} to {(pageNo * 10) > customerList?.total ? customerList?.total : (pageNo * 10)} of {customerList?.total} entries</p>}
                </div>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="Next"
                  onPageChange={changePageHandler}
                  pageRangeDisplayed={2}
                  pageCount={customerList?.pages ?? 0}
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

import React, { useEffect, useState, useRef, useId } from "react";
import Link from "next/link";
import { userService } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "../../reducers/job-reducer";
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
import { useRouter } from "next/router";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function ({ status }) {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [extraData, setExtraData] = useState({
    createdAt: 1,
  });
  const [dateRange, setDateRange] = useState(null);

  const [pageNo, setPageNo] = useState(1);
  const [nameSort, setNameSort] = useState("asc");
  const [pickSort, setPickSort] = useState("");
  const [dateSort, setDateSort] = useState("");
  const [phoneSort, setPhoneSort] = useState("");
  const [deliverySort, setDeliverySort] = useState("");
  const [statusSort, setStatusSort] = useState("");
  const [showAction, setShowAction] = useState(false);
  const [showId, setShowId] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();
  const { allJobs } = useSelector((state) => state.jobs);
  useEffect(() => {
    getAllJobs(pageNo, limit, search, extraData, dateRange);
  }, [limit, pageNo, extraData, search, dateRange, status]);

  const getAllJobs = async (pageNo, limit, search, extraData, dateRange) => {
    const response = await userService.getAllJob(
      pageNo,
      limit,
      search,
      extraData,
      dateRange,
      status
    );
    await dispatch(setAllJobs(response));
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
    setPageNo(1);
    console.log(search);
  };

  const changeLimitHandler = (e) => {
    const element = document.getElementById("limit");
    var value = element.options[element.selectedIndex].value;
    setLimit(value);
    setPageNo(1);
  };

  const changePageHandler = (event, value) => {
    setPageNo(value);
    console.log(value);
  };

  const dateRangePicker = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };
 

  return (
    <>
      <div
        className="content"
        onClick={() => showAction && setShowAction(!showAction)}
      >
        <div className="table-operations">
          <div>
            <div className="operations"></div>
            <div className="date-range">
              <div>
                <p>From</p>
                <input type="date" name="from" onChange={dateRangePicker} />
              </div>
              <div>
                <p>To</p>
                <input type="date" name="to" onChange={dateRangePicker} />
              </div>
            </div>
          </div>
          <div>
            <div className="btnLists">
              <ul>
                <li>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="text"
                      placeholder="Search..."
                      onChange={searchHandler}
                    />
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <table>
          <TableHead>
            <StyledTableRow>
              {/* <StyledTableCell
                style={{ width: "3rem" }}
                className="sorting__disabled"
              >
                <input
                  type="checkbox"
                  name="select--all"
                  onChange={(e) => {
                    handleAllSelect(e);
                  }}
                />
              </StyledTableCell> */}
              <StyledTableCell
                style={{ width: "4rem" }}
                className="sorting__disabled"
              >
                Sr.
              </StyledTableCell>
              <StyledTableCell
                className={nameSort}
                onClick={() => {
                  if (extraData["pick_up.name"] == 1) {
                    setExtraData({
                      "pick_up.name": -1,
                    });
                    setNameSort("desc");
                  } else {
                    setExtraData({
                      "pick_up.name": 1,
                    });
                    setNameSort("asc");
                  }
                  setPickSort("");
                  setPhoneSort("");
                  setDeliverySort("");
                  setDateSort("");
                  setStatusSort("");
                }}
              >
                Customer Name
              </StyledTableCell>
              <StyledTableCell
                className={pickSort}
                onClick={() => {
                  if (extraData["pick_up.address"] == 1) {
                    setExtraData({
                      "pick_up.address": -1,
                    });
                    setPickSort("desc");
                  } else {
                    setExtraData({
                      "pick_up.address": 1,
                    });
                    setPickSort("asc");
                  }
                  setNameSort("");
                  setPhoneSort("");
                  setDeliverySort("");
                  setDateSort("");
                  setStatusSort("");
                }}
              >
                Pickup Address
              </StyledTableCell>

              <StyledTableCell
                className={phoneSort}
                onClick={() => {
                  if (extraData["pick_up.mobile"] == 1) {
                    setExtraData({
                      "pick_up.mobile": -1,
                    });
                    setPhoneSort("desc");
                  } else {
                    setExtraData({
                      "pick_up.mobile": 1,
                    });
                    setPhoneSort("asc");
                  }
                  setNameSort("");
                  setPickSort("");
                  setDeliverySort("");
                  setDateSort("");
                  setStatusSort("");
                }}
              >
                Mobile
              </StyledTableCell>
              <StyledTableCell
                className={deliverySort}
                onClick={() => {
                  if (extraData["delivery.address"] == 1) {
                    setExtraData({
                      "delivery.address": -1,
                    });
                    setDeliverySort("desc");
                  } else {
                    setExtraData({
                      "delivery.address": 1,
                    });
                    setDeliverySort("asc");
                  }
                  setNameSort("");
                  setPickSort("");
                  setPhoneSort("");
                  setDateSort("");
                  setStatusSort("");
                }}
              >
                Delivery Address
              </StyledTableCell>
              <StyledTableCell
                className={dateSort}
                onClick={() => {
                  if (extraData.delivery_date == 1) {
                    setExtraData({
                      delivery_date: -1,
                    });
                    setDateSort("desc");
                  } else {
                    setExtraData({
                      delivery_date: 1,
                    });
                    setDateSort("asc");
                  }
                  setNameSort("");
                  setPickSort("");
                  setPhoneSort("");
                  setDeliverySort("");
                  setStatusSort("");
                }}
              >
                Delivery Date
              </StyledTableCell>

              <StyledTableCell
                className={statusSort}
                onClick={() => {
                  if (extraData.job_status == 1) {
                    setExtraData({
                      job_status: -1,
                    });
                    setStatusSort("desc");
                  } else {
                    setExtraData({
                      job_status: 1,
                    });
                    setStatusSort("asc");
                  }
                  setNameSort("");
                  setPickSort("");
                  setPhoneSort("");
                  setDeliverySort("");
                  setDateSort("");
                }}
              >
                Status
              </StyledTableCell>

              <StyledTableCell
                className="sorting__disabled"
                style={{ textAlign: "left" }}
              >
                Actions
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <tbody>
            {allJobs?.jobs?.length > 0 ? (
              allJobs?.jobs?.map((item, i) => {
                return (
                  <StyledTableRow
                    key={1 + i + (allJobs?.page - 1) * allJobs?.limit}
                  >
                    {/* <StyledTableCell>
                      <input
                        type="checkbox"
                        checked={checkedJob.includes(item._id)}
                        onChange={(e) => handleChecked(e, item._id)}
                      />
                    </StyledTableCell> */}
                    <StyledTableCell>
                      {1 + i + (allJobs?.page - 1) * allJobs?.limit}
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className="lock--info">
                        <span>{item?.pick_up?.name}</span>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>{item?.pick_up?.address}</StyledTableCell>
                    <StyledTableCell>{item?.pick_up?.mobile}</StyledTableCell>


                    <StyledTableCell>{item?.delivery?.address||item?.delivery?.areas?.map(item =><span>{item?.city}</span>)}</StyledTableCell>

                    <StyledTableCell>
                      {new Date(item?.delivery_date).toDateString()}
                    </StyledTableCell>

                    <StyledTableCell>
                      <span className="label label-roles first-caps">
                        {item?.job_status}
                      </span>
                    </StyledTableCell>

                    <StyledTableCell
                      onClick={() => {
                        setShowAction(!showAction);
                        setShowId(item?._id);
                      }}
                    >
                      <MoreVertIcon />
                      {showId === item?._id && showAction && (
                        <div className="more_actions">
                          <ul>
                            <li
                              onClick={() =>
                                router.push(`/admin/jobs/${showId}`)
                              }
                            >
                              <VisibilityIcon />
                              View
                            </li>
                            <li
                              onClick={() => {
                                router.push(`/admin/jobs/update/${showId}`);
                              }}
                            >
                              <EditIcon />
                              Edit
                            </li>
                          </ul>
                        </div>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan="10" style={{ textAlign: "center" }}>
                  No Job Found
                </StyledTableCell>
              </StyledTableRow>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <p>
            {" "}
            Showing {1 + (allJobs?.page - 1) * 10} to{" "}
            {allJobs?.jobs?.length + (allJobs?.page - 1) * 10} of{" "}
            {allJobs?.total} entries
          </p>
          <div className="per_page">
            Show{" "}
            <select
              name="limit"
              id="limit"
              onChange={changeLimitHandler}
              // className="limit"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>{" "}
            Entries
            <Stack spacing={2}>
              <Pagination
                count={allJobs?.pages}
                variant="outlined"
                shape="rounded"
                value={pageNo}
                onChange={changePageHandler}
              />
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    root: {
      width: "max-content",
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 0,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

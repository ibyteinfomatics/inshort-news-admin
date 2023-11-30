import React, { useEffect } from "react";
import FilterTopHeader from "../header/FilterTopHeader";
import { useState } from "react";
import { userService } from "../../services";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";

export default function JobDetail({ id, token }) {
  const [showAction, setShowAction] = useState(false);
  const [jobDetailIndex, setJobDetailIndex] = useState();
  const [driverJobdata, setDriverJobData] = useState();
  const [pageNo, setPageNo] = useState(1);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const router = useRouter();

  useEffect(() => {
    getData();
  }, [token, pageNo, search, fromDate, toDate]);

  const dateRangePicker = (e) => {
    if (e.target.name == 'from') {
      setFromDate(e.target.value)
     
      // setFilter({ ...filter, [e.target.name]: e.target.value })

    } else {
      setToDate(e.target.value)
      // setFilter({ ...filter, [e.target.name]: e.target.value })

    }

  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
    setPageNo(1);

  };

  const getData = async () => {
    let data = await userService.jobDetail(
      id,
      token,
      pageNo,
      search,
      fromDate,
      toDate
    );
    setDriverJobData(data);
  };

  const changePageHandler = ({ selected }) => {
    setPageNo(Number(selected) + 1);
  };

  const handler = (index) => {
    setJobDetailIndex(index);
    setShowAction(!showAction);
  };

 

  return (
    <>
      <div className='tabContent'>
        <div className='table--layout innerSearch'>
          <FilterTopHeader
            handleSearch={searchHandler}
            dateRangePicker={dateRangePicker}
            toDate={toDate}
            fromDate={fromDate}
          />
          <table>
            <thead>
              <tr>
               {/* <th>
                  <input type='checkbox' name='select--all' />
  </th>*/}
                <th>Sr.</th>
                <th>Customer Name</th>
                <th>Pickup Address</th>
                <th>Mobile</th>
                <th>Delivery Address</th>
                <th>Delivery Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {driverJobdata?.driverJobs?.map((data, index) => (
                <>
                  <tr key={data.job_details[0]?.delivery?.mobile}>
                    {/*<td>
                      <input type='checkbox' />
              </td>*/}
                    <td>{index + 1 + (driverJobdata?.page - 1) * 10}</td>
                    <td>{data.job_details[0]?.delivery?.name}</td>
                    <td>{data.job_details[0]?.pick_up.address}</td>
                    <td>{data.job_details[0]?.delivery?.mobile}</td>
                    <td>{data.job_details[0]?.delivery?.address}</td>
                    <td>{data.job_details[0]?.delivery_date}</td>
                    <td> <span className='label label-roles first-caps'>{data.job_details[0]?.job_status}</span></td>
                    <td>
                      <span
                        className='three--vertical--dots'
                        onClick={() => {
                          // setShowAction(!showAction);
                          handler(index);
                        }}
                      >
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                      {showAction && index === jobDetailIndex && (
                        <span className='tableActions'  style={{ maxWidth: '130px',maxHeight:'55px', overflow: 'hidden' }}  key={data.job_id}>
                          <ul key={data.job_id}>
                            <li
                            key={data.job_id}
                              onClick={() =>
                                router.push(
                                  `/admin/drivers/job_details/${data.job_id}?driverId=${id}`
                                )
                              }
                            >
                              <a className='view__lock '>View </a>
                            </li>
                          </ul>
                        </span>
                      )}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          <div className='paginationView'>
            <div className='dataList'>
              {driverJobdata?.total > 0 && (
                <p>
                  Showing {(driverJobdata.page - 1) * 10 + 1} to{" "}
                  {driverJobdata.page * 10 > driverJobdata.total
                    ? driverJobdata?.total
                    : driverJobdata.page * 10}{" "}
                  of {driverJobdata?.total} entries
                </p>
              )}
            </div>
            <ReactPaginate
              breakLabel='...'
              nextLabel='Next'
              onPageChange={changePageHandler}
              pageRangeDisplayed={2}
              pageCount={driverJobdata?.pages ?? 0}
              previousLabel='Previous'
              renderOnZeroPageCount={null}
              className='pagination'
              nextClassName='page'
              previousClassName='page'
              pageClassName='page'
              activeClassName='active-page'
              forcePage={pageNo - 1}
            />
          </div>
        </div>
      </div>
    </>
  );
}

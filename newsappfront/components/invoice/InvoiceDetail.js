import React, { useEffect } from 'react'
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { userService } from "../../services";

export default function InvoiceDetail({Id}) {
    const [invoiceData, setinvoiceData] = useState();
    const [pageNo, setPageNo] = useState(1);

    useEffect(() => {
        getData();
      }, [pageNo]);

    const getData = async () => {
        let data = await userService.invoicesList(Id,pageNo)
        setinvoiceData(data);
      };

      const changePageHandler = ({ selected }) => {
        setPageNo(Number(selected) + 1);
      };
    
    return (
        <>
        <div className='tabContent'>
        <div className='table--layout innerSearch'>
         {/* <FilterTopHeader
            handleSearch={searchHandler}
            dateRangePicker={dateRangePicker}
            toDate={toDate}
            fromDate={fromDate}
    />*/}
          <table>
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Job Id</th>
                <th>Customer Name</th>
                <th>Service Provider</th>
                <th>Date</th>
                <th>Parcle Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData?.jobsData?.map((data, index) => (
                <>  
                  <tr key={index}>
                    <td>{index + 1 + (invoiceData?.page - 1) * 10}</td>
                    <td>{data?.reference_id}</td>
                    <td>{data?.customer?.full_name}</td>
                     <td>{data?.customer?.service_provider}</td>
                    <td>{data?.delivery_date}</td>
                    <td>{data?.item_type}</td>
                    <td>${data?.earning}</td>
                   
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          <div className='paginationView'>
            <div className='dataList'>
              {invoiceData?.total > 0 && (
                <p>
                  Showing {(invoiceData.page - 1) * 10 + 1} to{" "}
                  {invoiceData.page * 10 > invoiceData.total
                    ? invoiceData?.total
                    : invoiceData.page * 10}{" "}
                  of {invoiceData?.total} entries
                </p>
              )}
            </div>
            <ReactPaginate
              breakLabel='...'
              nextLabel='Next'
              onPageChange={changePageHandler}
              pageRangeDisplayed={2}
              pageCount={invoiceData?.pages ?? 0}
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
    )
}

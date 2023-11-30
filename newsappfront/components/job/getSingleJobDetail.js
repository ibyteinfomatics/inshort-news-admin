import React from "react";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DashboardHeader from "../header/DashboardHeader";
import SideBar from "../side-bar/SideBar";
import { userService } from "../../services";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
import { useRouter } from 'next/router';

const getSingleJobDetail = ({ jobId }) => {
  const router = useRouter();
  const {driverId}=router.query
  const [driverJobdata, setDriverJobData] = useState();
  useEffect(() => {
    getData();
  }, [jobId]);

  const getData = async () => {
    let data = await userService.singleJobDetail(jobId);
    setDriverJobData(data);
  };

  const ReadableTimeFormat = (date) => {
    const ReadAbledate = moment(date);
    const convertedDateString = ReadAbledate.format("ddd MMM DD, YYYY");
    return convertedDateString;
  };
  

console.log(driverJobdata,"0000")
  return (
    <>
      <SideBar />
      <div className='dashboard sideBarOpen'>
        <DashboardHeader />
        <div className='contentWrapper'>
          <div className='dashboard_content innerPage'>
            {
              <div className='tabLayout'>
                <div className='table--layout'>
                  <div className='go-back'>
                    <div className='tableTitle'></div>
                    <div className='flexBox gap-2'>
                      <button className='creatButton back btn'>
                        <Link href={`/admin/drivers/${driverId}`}>Back to List</Link>
                      </button>
                    </div>
                  </div>
                </div>
                <Tabs>
                  <TabList>
                    <Tab>Job Details</Tab>
                  </TabList>

                  <TabPanel>
                    <div className='tabContent'>
                      <div className='grid2'>
                        <div className='card cardBlock'>
                          <h4>Basic</h4>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Created At:</div>
                            <div className='lebelData'>
                              {ReadableTimeFormat(
                                driverJobdata?.job?.createdAt
                              )}
                            </div>
                          </div>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Updated At:</div>
                            <div className='lebelData'>
                              {ReadableTimeFormat(
                                driverJobdata?.job?.updatedAt
                              )}
                            </div>
                          </div>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Job status:</div>
                            <div className='lebelData'>
                              {driverJobdata?.job?.job_status}
                            </div>
                          </div>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Job Type:</div>
                            <div className='lebelData'>
                              {driverJobdata?.job?.job_type}
                            </div>
                          </div>
                        </div>
                        <div className='card cardBlock'>
                          <h4>Invoice</h4>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Reference Id</div>
                            <div className='lebelData'>                               
                                {driverJobdata?.job?.invoice?.reference_id}                          
                            </div>
                          </div>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Item Type</div>
                            <div className='lebelData'>
                              {
                                driverJobdata?.job?.invoice?.item_type
                              }
                            </div>
                          </div>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Delivery Date </div>
                            <div className='lebelData'>
                              {driverJobdata?.job?.invoice?.delivery_date}
                            </div>
                          </div>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Delivered Parcel</div>
                            <div className='lebelData'>
                              {driverJobdata?.job?.invoice?.delivered_parcel}
                            </div>
                          </div>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Earning</div>
                            <div className='lebelData'>
                              $ {driverJobdata?.job?.invoice?.earning}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='grid2 '>
                        <div className='card cardBlock'>
                          <h4>Pickup Details</h4>

                          <div className='detailGroup'>
                            <div className='labelLeft'>Name:</div>
                            <div className='lebelData'>
                              {driverJobdata?.job?.pick_up.name}
                            </div>
                          </div>

                          <div className='detailGroup'>
                            <div className='labelLeft'>Mobile:</div>
                            <div className='lebelData'>
                              {driverJobdata?.job?.pick_up.mobile}
                            </div>
                          </div>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Instruction:</div>
                            <div className='lebelData'>
                              {driverJobdata?.job?.pick_up.instructions}
                            </div>
                          </div>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Address:</div>
                            <div className='lebelData'>
                              {driverJobdata?.job?.pick_up.address}
                            </div>
                          </div>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Address details:</div>
                            <div className='lebelData'>
                              {driverJobdata?.job?.pick_up.areas}
                            </div>
                          </div>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Coordinates:</div>
                            <div className='lebelData'>
                              {(driverJobdata?.job?.pick_up.loc.coordinates[0]).toFixed(
                                2
                              )}{" "}
                              ,{" "}
                              {(driverJobdata?.job?.pick_up.loc.coordinates[1]).toFixed(
                                2
                              )}
                            </div>
                          </div>
                        </div>
                        <div className='card cardBlock'>
                          <h4>Delivery Details</h4>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Name:</div>
                            <div className='lebelData'>
                              {driverJobdata?.job?.delivery.name}
                            </div>
                          </div>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Mobile:</div>
                            <div className='lebelData'>
                              {driverJobdata?.job?.delivery.mobile}
                            </div>
                          </div>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Instruction:</div>
                            <div className='lebelData'>
                              {driverJobdata?.job?.delivery.instruction}
                            </div>
                          </div>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Address:</div>
                            <div className='lebelData'>
                              {driverJobdata?.job?.delivery.address}
                            </div>
                          </div>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Address details:</div>
                            <div className='lebelData'>
                              {driverJobdata?.job?.delivery?.areas}
                            </div>
                          </div>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Coordinates:</div>
                            <div className='lebelData'>
                              {(driverJobdata?.job?.delivery.loc.coordinates[0]).toFixed(
                                2
                              )}{" "}
                              ,{" "}
                              {(driverJobdata?.job?.delivery.loc.coordinates[1]).toFixed(
                                2
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='grid2 '>
                        <div className='card cardBlock'>
                          <h4>Package Details</h4>

                          <div className='detailGroup'>
                            <div className='labelLeft'>Package Type:</div>
                            <div className='lebelData'>
                              {driverJobdata?.job?.package_info.item_type}
                            </div>
                          </div>

                          <div className='detailGroup'>
                            <div className='labelLeft'>No. of Packages:</div>
                            <div className='lebelData'>
                              {driverJobdata?.job?.package_info.no_of_items}
                            </div>
                          </div>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Delivery Date/Time:</div>
                            <div className='lebelData'>
                              {driverJobdata?.job?.delivery_date} /{" "}
                              {driverJobdata?.job?.delivery_time}
                            </div>
                          </div>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Vehicle:</div>
                            <div className='lebelData'>
                              {driverJobdata?.job?.preferred_vehicle_choice}
                            </div>
                          </div>
                          <div className='detailGroup'>
                            <div className='labelLeft'>
                              Cost per Mile/Parcel:
                            </div>
                            <div className='lebelData'>
                              {driverJobdata?.job?.package_info.price_per_mile}
                            </div>
                          </div>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Cost by:</div>
                            <div className='lebelData'>
                              {
                                driverJobdata?.job?.package_info
                                  ?.price_per_delivery_parcel
                              }
                            </div>
                          </div>
                        </div>
                        <div className='card cardBlock'>
                          <h4>Customer Details</h4>

                          <div className='detailGroup'>
                            <div className='labelLeft'>Company Name:</div>
                            <div className='lebelData'>
                              {driverJobdata?.job?.customer?.company_name}
                            </div>
                          </div>

                          <div className='detailGroup'>
                            <div className='labelLeft'>Full Name:</div>
                            <div className='lebelData'>
                              {driverJobdata?.job?.customer?.full_name}
                            </div>
                          </div>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Email:</div>
                            <div className='lebelData'>
                            {driverJobdata?.job?.customer?.email}
                            </div>
                          </div>
                          <div className='detailGroup'>
                            <div className='labelLeft'>Mobile No. :</div>
                            <div className='lebelData'>
                            {driverJobdata?.job?.customer?.phone_number}
                            </div>
                          </div>
                         
                          
                        </div>
                      </div>

                      <div className='grid2'>
                        <div className='card cardBlock'>
                          <h4>Pick Up Image</h4>
                          {/* <h4>{driverJobdata?.job?.attachments[0]?.name}</h4> */}
                          <div className='imageBlock'>
                            {driverJobdata?.job?.attachments[0]?.url && (
                              <img
                                src={driverJobdata?.job?.attachments[0]?.url}
                                alt='Image'
                              />
                            )}
                          </div>
                        </div>
                        <div className='card cardBlock'>
                          <h4>Delivery Image</h4>
                          <div className='imageBlock'>
                            {driverJobdata?.job?.attachments[1]?.url && (
                              <img
                                src={driverJobdata?.job?.attachments[1]?.url}
                                alt='Image'
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='grid1'>
                        <div className='card cardBlock'>
                          <h4>Pod Signature</h4>
                          <div className='imageBlock'>
                            {driverJobdata?.job?.attachments[2]?.url && (
                              <img
                                src={driverJobdata?.job?.attachments[2]?.url}
                                alt='Image'
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>                
                </Tabs>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default getSingleJobDetail;

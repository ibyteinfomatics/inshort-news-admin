import { useDispatch, useSelector } from "react-redux";
import { setDriverDetail } from "../../reducers/users-reducer";
import { useRouter } from "next/router";

const DriverDetail=()=>{
    const [status, setStatus] = useState();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [verified, setVerified] = useState(false);

  const router = useRouter();
  const id = router?.query?.driverId;
  const dispatch = useDispatch();
  const { driverDetail } = useSelector((state) => state.users);

  useEffect(() => {
    getSingleDriverDetail(id);
  }, [id]);


  const getSingleDriverDetail = async (id) => {
    const res = await userService.getSingleDriver(id);
    console.log(res)
    if (res.success) {
      setVerified(res?.driver?.verify_by_admin)
      await dispatch(setDriverDetail(res));
    } else {
      console.log(res.msg);
    }
  };

  const handleOpen = () => {
    if (verified) return;
    setOpen(true);
    setStatus("approve");
  };
  const handleOpen1 = () => {
    setOpen1(true);
    setStatus("reject");
  };

  const handleClose = () => {
    setOpen(false);
    setOpen1(false);
  };


    return (
        <div className="tabContent">
        <div className="card cardBlock">
          <div className="profileBlock">
            <div className="profileDetail py-4">
              <div className="flexBox gap-4">
                <div className="profileImage">
                  <img src="/images/manager.png" alt="Profile" />
                </div>
                <div className="nameDetail">
                  <h4>{`${driverDetail?.driver?.first_name || ""} ${driverDetail?.driver?.last_name || ""}`}</h4>
                  <p className="iconText">
                    <span>
                      <img src="/images/email.svg" alt="Email" />
                    </span>
                    {driverDetail?.driver?.email || ""}
                  </p>
                  <p className="iconText">
                    <span>
                      <img src="/images/calendar.svg" alt="Calendar" />
                    </span>
                    {driverDetail?.driver?.date_of_birth? moment(driverDetail?.driver?.date_of_birth).format('MMM DD YYYY'):notGiven}
                  </p>
                </div>
              </div>
            </div>
            <div className="profileProgress">
              <div className="page-wrapper">
                <header className="header">
                  <div className="progress-bar">
                    <div className={`step ${driverDetail?.driver?.is_email_verified&& "complete"}`} >
                      <span className="icon"></span>
                      <span className="line"></span>
                      <span className="label">Sign In</span>
                    </div>
                    <div className={`step ${driverDetail?.driver?.is_all_profile_completed&&"complete"}`}>
                      <span className="icon"></span>
                      <span className="line"></span>
                      <span className="label">Profile Completion</span>
                    </div>
                    <div className={`step ${driverDetail?.driver?.is_banking_details_completed&&"complete"}`}>
                      <span className="icon"></span>
                      <span className="line"></span>
                      <span className="label">Bank Details</span>
                    </div>
                    <div className={`step ${driverDetail?.driver?.is_documents_info_completed&&"complete"}`}>
                      <span className="icon"></span>
                      <span className="line"></span>
                      <span className="label">Verified</span>
                    </div>
                    <div className={`step ${driverDetail?.driver?.is_vehicle_info_completed&&"complete"}`}>
                      <span className="icon"></span>
                      <span className="line"></span>
                      <span className="label">Driver Jobs</span>
                    </div>
                  </div>
                </header>
                <div className="nameDetail">
                  <p className="iconText">
                    <span>
                      <img src="/images/email.svg" alt="Email" />
                    </span>
                    {driverDetail?.driver?.phone_number||notGiven}
                  </p>
                  <p className="iconText">
                    <span>
                      <img src="/images/calendar.svg" alt="Calendar" />
                    </span>
                    {driverDetail?.driver?.address_line_1? `${driverDetail?.driver?.address_line_1 || ""}${driverDetail?.driver?.address_line_2 ? `, ${driverDetail?.driver?.address_line_2}` : ""}${driverDetail?.driver?.address_line_3 ? `, ${driverDetail?.driver?.address_line_3}` : ""}`:notGiven}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid2">
          <div className="card cardBlock">
            <h4>Vehicle</h4>

            <div className="detailGroup">
              <div className="labelLeft">Registration Number:</div>
              <div className="lebelData">{driverDetail?.driver?.vehicle?.registration_number||notGiven}</div>
            </div>


            <div className="detailGroup">
              <div className="labelLeft">Model:</div>
              <div className="lebelData">{driverDetail?.driver?.vehicle?.model || notGiven}
              </div>
            </div>
            <div className="detailGroup">
              <div className="labelLeft">Joined Us:</div>
              <div className="lebelData">{driverDetail?.driver?.vehicle?.createdAt?moment(driverDetail?.driver?.vehicle?.createdAt).format('MMM DD YYYY'):notGiven}
              </div>
            </div>
          </div>
          <div className="card cardBlock">
            <h4>Banking</h4>
            <div className="detailGroup">
              <div className="labelLeft">Sort Code:</div>
              <div className="lebelData">{driverDetail?.driver?.bank_details?.sort_code || notGiven}</div>
            </div>
            <div className="detailGroup">
              <div className="labelLeft">Account No:</div>
              <div className="lebelData">{driverDetail?.driver?.bank_details?.account_number || notGiven}</div>
            </div>
            <div className="detailGroup">
              <div className="labelLeft">Name on Card:</div>
              <div className="lebelData">{driverDetail?.driver?.bank_details?.name_on_card || notGiven}</div>
            </div>

          </div>
        </div>
        <div className="grid2">
          <div className="card cardBlock">
            <h4>Proof of Address</h4>
            <div className="imageBlock">
              {driverDetail?.driver?.documents?.filter((item) => item.name == 'proof_of_address')?.[0]?.url ?
                <img src={driverDetail?.driver?.documents?.filter((item) => item.name == 'proof_of_address')?.[0]?.url} alt="Image" /> :
                <h1>No Image found</h1>}
            </div>



          </div>
          <div className="card cardBlock">
            <h4>Insurance Document</h4>
            <div className="imageBlock">
            {driverDetail?.driver?.documents?.filter((item) => item.name == 'insurance_document')?.[0]?.url ?
                <img src={driverDetail?.driver?.documents?.filter((item) => item.name == 'insurance_document')?.[0]?.url} alt="Image" /> :
                <h1>No Image found</h1>}
            </div>



          </div>
        </div>
        <div className="grid2">
          <div className="card cardBlock">
            <h4>Driving License</h4>


            <div className="detailGroupBlock">
              <div className="labelLeft">Front Pic:</div>
              <div className="lebelData">
                <div className="imageBlock">
                {driverDetail?.driver?.documents?.filter((item) => item.name == 'driving_license_front_pic')?.[0]?.url ?
                <img src={driverDetail?.driver?.documents?.filter((item) => item.name == 'driving_license_front_pic')?.[0]?.url} alt="Image" /> :
                <h1>No Image found</h1>}
                </div>
              </div>
            </div>
          </div>
          <div className="card cardBlock">
            <h4></h4>


            <div className="detailGroupBlock">
              <div className="labelLeft">Rear Pic:</div>
              <div className="lebelData">
              {driverDetail?.driver?.documents?.filter((item) => item.name == 'driving_license_rear_pic')?.[0]?.url ?
                <img src={driverDetail?.driver?.documents?.filter((item) => item.name == 'driving_license_rear_pic')?.[0]?.url} alt="Image" /> :
                <h1>No Image found</h1>}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
export default DriverDetail
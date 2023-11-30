import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SideBar() {
  const router = useRouter();
  const route = router.pathname.split("/");
  const rout = route[2];
  const [openMenu2, setOpenMenu2] = useState(false);

  const [closeNav, setCloseNav] = useState(false);

  return (
    <div className={closeNav ? "pageWrapper closeNav" : "pageWrapper"}>
      <nav className={closeNav ? "s-sidebar__nav navClose" : "s-sidebar__nav"}>
        <span className="s-sidebar__nav-link sidebar_logo_wrap">
          <img src="/images/logo.png" alt="logo" className=" sidebar_logo" />
          <p>
            <strong style={{ fontSize: "20px", color: "white" }}>
              News App
            </strong>
          </p>
        </span>
        <ul>
          <li className={rout === "dashboard" ? "active" : ""}>
            <Link href="/admin/dashboard">
              <span className="s-sidebar__nav-link">
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24.000000pt"
                  height="24.000000pt"
                  viewBox="0 0 24.000000 24.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)"
                    fill="#000000"
                    stroke="none"
                  >
                    <path
                      d="M20 130 c0 -40 -4 -70 -10 -70 -5 0 -10 -4 -10 -10 0 -6 47 -10 120
                        -10 73 0 120 4 120 10 0 6 -4 10 -10 10 -6 0 -10 30 -10 70 l0 70 -100 0 -100
                        0 0 -70z m180 0 l0 -50 -80 0 -80 0 0 50 0 50 80 0 80 0 0 -50z"
                    />
                    <path
                      d="M140 130 c0 -16 5 -30 10 -30 6 0 10 14 10 30 0 17 -4 30 -10 30 -5
                    0 -10 -13 -10 -30z"
                    />
                    <path
                      d="M110 120 c0 -11 5 -20 10 -20 6 0 10 9 10 20 0 11 -4 20 -10 20 -5 0
                      -10 -9 -10 -20z"
                    />
                    <path
                      d="M80 110 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0
                       -10 -4 -10 -10z"
                    />
                  </g>
                </svg>{" "}
                <span>Dashboard</span>{" "}
              </span>
            </Link>
          </li>{" "}
          <li className={["addnews"].includes(rout) ? "active" : ""}>
            <Link href="/admin/addnews/">
              <span className="s-sidebar__nav-link">
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24.000000pt"
                  height="24.000000pt"
                  viewBox="0 0 24.000000 24.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)"
                    fill="#000000"
                    stroke="none"
                  >
                    <path
                      d="M30 120 l0 -90 90 0 90 0 0 90 0 90 -90 0 -90 0 0 -90z m160 0 l0
                        -70 -70 0 -70 0 0 70 0 70 70 0 70 0 0 -70z"
                    />
                    <path
                      d="M110 150 c0 -13 -7 -20 -20 -20 -11 0 -20 -4 -20 -10 0 -5 9 -10 20
                        -10 13 0 20 -7 20 -20 0 -11 5 -20 10 -20 6 0 10 9 10 20 0 13 7 20 20 20 11
                        0 20 5 20 10 0 6 -9 10 -20 10 -13 0 -20 7 -20 20 0 11 -4 20 -10 20 -5 0 -10
                        -9 -10 -20z"
                    />
                  </g>
                </svg>{" "}
                <span>Add News</span>{" "}
              </span>
            </Link>
          </li>{" "}
          <li className={["addnewsinbulk"].includes(rout) ? "active" : ""}>
            <Link href="/admin/addnewsinbulk/">
              <span className="s-sidebar__nav-link">
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24.000000pt"
                  height="24.000000pt"
                  viewBox="0 0 26.000000 26.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,26.000000) scale(0.100000,-0.100000)"
                    fill="#000000"
                    stroke="none"
                  >
                    <path
                      d="M0 146 c0 -124 2 -126 130 -126 127 0 132 4 128 109 l-3 76 -37 3
                        c-25 2 -38 8 -38 18 0 11 -18 14 -90 14 l-90 0 0 -94z m162 -16 l3 -91 -70 3
                      -70 3 -3 88 -3 87 70 0 70 0 3 -90z m38 0 c0 -33 4 -60 10 -60 6 0 10 27 10
                      60 0 35 4 60 10 60 7 0 10 -27 8 -72 -3 -70 -4 -73 -28 -73 -24 0 -25 3 -28
                      73 -2 45 1 72 8 72 6 0 10 -25 10 -60z"
                    />
                    <path
                      d="M30 180 c0 -18 7 -20 60 -20 53 0 60 2 60 20 0 18 -7 20 -60 20 -53
                      0 -60 -2 -60 -20z"
                    />
                    <path
                      d="M30 130 c0 -5 11 -10 25 -10 14 0 25 5 25 10 0 6 -11 10 -25 10 -14
                      0 -25 -4 -25 -10z"
                    />
                    <path
                      d="M90 130 c0 -5 14 -10 30 -10 17 0 30 5 30 10 0 6 -13 10 -30 10 -16
                      0 -30 -4 -30 -10z"
                    />
                    <path
                      d="M30 100 c0 -5 11 -10 25 -10 14 0 25 5 25 10 0 6 -11 10 -25 10 -14
                      0 -25 -4 -25 -10z"
                    />
                    <path
                      d="M90 100 c0 -5 14 -10 30 -10 17 0 30 5 30 10 0 6 -13 10 -30 10 -16
                      0 -30 -4 -30 -10z"
                    />
                    <path
                      d="M40 70 c0 -5 9 -10 20 -10 11 0 20 5 20 10 0 6 -9 10 -20 10 -11 0
                      -20 -4 -20 -10z"
                    />
                    <path
                      d="M90 70 c0 -5 14 -10 30 -10 17 0 30 5 30 10 0 6 -13 10 -30 10 -16 0
                      -30 -4 -30 -10z"
                    />
                  </g>
                </svg>{" "}
                <span>Add News In Bulk</span>{" "}
              </span>
            </Link>
          </li>{" "}
          {/* <li className={["drivers"].includes(rout) ? "active" : ""}>
            <Link href="/admin/drivers">
              <span className="s-sidebar__nav-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-headset"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H6ZM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17 1.247 0 2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276Z" />
                  <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679c.033.161.049.325.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.807.807 0 0 0 .381-.404l.792-1.848ZM4.82 3a1.5 1.5 0 0 0-1.379.91l-.792 1.847a1.8 1.8 0 0 1-.853.904.807.807 0 0 0-.43.564L1.03 8.904a1.5 1.5 0 0 0-.03.294v.413c0 .796.62 1.448 1.408 1.484 1.555.07 3.786.155 5.592.155 1.806 0 4.037-.084 5.592-.155A1.479 1.479 0 0 0 15 9.611v-.413c0-.099-.01-.197-.03-.294l-.335-1.68a.807.807 0 0 0-.43-.563 1.807 1.807 0 0 1-.853-.904l-.792-1.848A1.5 1.5 0 0 0 11.18 3H4.82Z"></path>
                </svg>{" "}
                <span>Categories</span>{" "}
              </span>
            </Link>
          </li>{" "} */}
          {/* <li
          className={ ['customers'].includes(rout)? "active" : ""}
          >
            <Link href="/admin/customers">
            <span
              className="s-sidebar__nav-link"
             
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-headset"
                viewBox="0 0 16 16"
              >
                <path
                  d="M9.375 0.75C6.27685 0.75 3.75 3.27685 3.75 6.375C3.75 9.47314 6.27685 12 9.375 12C12.4731 12 15 9.47314 15 6.375C15 3.27685 12.4731 0.75 9.375 0.75ZM9.375 12C4.21143 12 0 16.2114 0 21.375H1.875C1.875 17.2222 5.22217 13.875 9.375 13.875C13.5278 13.875 16.875 17.2222 16.875 21.375H18.75C18.75 16.2114 14.5386 12 9.375 12ZM9.375 2.625C11.4551 2.625 13.125 4.29492 13.125 6.375C13.125 8.45508 11.4551 10.125 9.375 10.125C7.29492 10.125 5.625 8.45508 5.625 6.375C5.625 4.29492 7.29492 2.625 9.375 2.625Z"
                  fill="#ffffff"
                />
              </svg>{" "}
              <span>Customers</span>{" "}
            </span>
            </Link>
            
          </li>{" "} */}
          {/* <li
          className={ ['jobs'].includes(rout)? "active" : ""}
          >
             <Link href="/admin/jobs">
            <span
              className="s-sidebar__nav-link"
             
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-list-task"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"
                />
                <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z" />
                <path
                  fillRule="evenodd"
                  d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"
                />
              </svg>{" "}
              <span>Jobs</span>{" "}
            </span>
            </Link>
          
          </li>{" "} */}
          {/* <li
            className={ ['settings'].includes(rout)? "active" : ""}
          >
            <span
              className="s-sidebar__nav-link"
              
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-list-task"
                viewBox="0 0 16 16"
              >
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
              </svg>{" "}
              <span>Settings</span>{" "}
            </span>
            { ['settings'].includes(rout) && (
              <ul className="sub__navMenu">
                <li>
                  <Link href="/admin/settings/change-password">
                    <a>Change Password</a>
                  </Link>
                </li>
              </ul>
            )}
          </li>{" "} */}
        </ul>{" "}
        {/* <div className="userInfo">
          <div className="user__pic">
            <img src="/images/lock-img.png" alt="User" />
          </div>{" "}
          <div className="user__detail-data">
            <div className="flex flex-wrap">
              <span className="user__name"> Adam </span>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "} */}
        {/* <div className="integrator">
          <span className="btn btnBlue">Admin</span>
        </div> */}
      </nav>{" "}
      <div
        className={closeNav ? "sidebarToggle activeToggle" : "sidebarToggle"}
      >
        <span
          className="sidebarToggleBtn"
          onClick={() => setCloseNav(!closeNav)}
        ></span>
      </div>
    </div>
  );
}

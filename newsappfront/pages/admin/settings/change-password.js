import Head from "next/head";
import Link from "next/link";
import SideBar from "../../../components/side-bar/SideBar";
import DashboardHeader from "../../../components/header/DashboardHeader";
import AdminPassword from "../../../components/change password/AdminPassword";


export default function latest() {

  return (
    <>
      <Head>
        <title>Change Admin Password</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <SideBar />
      <div className="dashboard sideBarOpen">
        <DashboardHeader />
        <div className="contentWrapper">
          <div className="dashboard_content">
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
                <div>Change Admin Password</div>
                <button className="creatButton label-success">
                  <Link href="/admin/dashboard">Go To Dashboard</Link>
                </button>
              </div>
               <AdminPassword />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



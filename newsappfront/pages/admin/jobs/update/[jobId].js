import Head from "next/head";
import Link from "next/link";
import EditJob from "../../../../components/job/EditJob";
import { useRouter } from "next/router";
import SideBar from "../../../../components/side-bar/SideBar";
import DashboardHeader from "../../../../components/header/DashboardHeader";

export default function latest() {
  const router = useRouter();
  const id = router?.query?.jobId;
  return (
    <>
      <Head>
        <title>Update job</title>
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
                <div>Update Job</div>
                <button className="creatButton label-success">
                  <Link href="/admin/jobs">Back to List</Link>
                </button>
              </div>
               <EditJob id={id}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



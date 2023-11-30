import React from 'react'
import Link from 'next/dist/client/link'
import { ToastContainer } from "react-toastify";
export default function Header() {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="loginHeader">
        <div className="siteWidth">
          <div className="divideBlcok justify-between">
            <div className="leftBlock">
              <div className="Logo">
                <Link href="/">
                  <a>
                  {/* <img src='https://th.bing.com/th/id/R.d76d391ced035a5f63299a4f195f6d9a?rik=gkecFCvyzDIKKg&riu=http%3a%2f%2fe1.365dm.com%2f14%2f08%2f16-9%2f20%2fOn-Demand-Carousel-Logo_3183985.jpg%3f20140807170811&ehk=u91z%2fBSrJwpqns%2bQ5i0G7tY6QmV%2fAmSxB0Ec80QoHSU%3d&risl=&pid=ImgRaw&r=0' className='logoimage'/> */}
                  </a>
                </Link>
              </div>
            </div>
            <div className="rightBlock">
              <div className="headerRightMenu items-center">
                <div className="menuList">
                  <Link href="/" className="btn">
                    <a className="btn-logo"></a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

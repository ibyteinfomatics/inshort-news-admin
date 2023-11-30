import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
import {
  Box,
  Modal,
} from "@mui/material";
import { userService } from "../../services";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const DriverOuth = ({open, status, setDriverStatus, id}) => {

  const router = useRouter();
  console.log(router.query);

  const validationSchema = Yup.object().shape({
    reason: Yup.string().required("reason is required").min(5).max(100),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);

  const { errors } = formState;

  
 async function onSubmit (e,status) {
    open();
    let res=await userService.verifyDriver(id,status);
    if(res.driver_status=="Rejected"){
      console.log(e.reason,"reson")
      setDriverStatus(2)
    }
}

const approveHandler=async(status)=>{
  open();
  let res=await userService.verifyDriver(id,status);
      if(res.driver_status=="Accepted"){
        setDriverStatus(1)
      }
}

  return (
    <>
    {
      status=="approve"?(
        <Box className="varify">
        <div className="form_group">
          <div className="form-item">
            <div>
            <h2 style={{fontSize:"20px",marginBottom:"40px"}}>Are you sure ? {status=="approve"&& "You want to approve"}</h2>
            <div className="buttonAlign">
            <button onClick={()=>approveHandler(1)} className="sub-btn right">
            <CheckIcon/>
          </button>
          <button onClick={()=>open()} type="submit" className="sub-btn right">
            <CloseIcon/>
          </button>
            </div>
            </div>         
          </div>
        </div>
      </Box>
      ):(
        <Box className="varify" >
    <div className="form_group">
    <div className="form-item">
      <form onSubmit={handleSubmit((data) => onSubmit(data, 2))}>
        {status === "approve" ? (
          <label htmlFor="reason">Message</label>
        ) : (
          <label htmlFor="reason">Reason to reject</label>
        )}
        <input
          type="text"
          id="reason"
          name="reason"
          {...register("reason")}
          className={`form-control first-caps ${
            errors.reason ? "is-invalid" : ""
          }`}
        />
        <button type="submit" className="sub-btn right">
          Send
        </button>
      </form>
    </div>
  </div>
   </Box>
      )
    }
    
  
   
    </>
  );
};

export default DriverOuth;

// import React from 'react'

// const ravi = () => {
//   return (
//     <div>[...driverOuth]</div>
//   )
// }

// export default ravi





  {
    /*<Box className="varify">
    <div className="form_group">
      <div className="form-item">
        <form onSubmit={handleSubmit(onSubmit)}> 
        <div>
        <h2 style={{fontSize:"25px",marginBottom:"40px"}}>Are you sure ? {status=="approve"&& "You want to approve"}</h2>
        <div className="buttonAlign">
        <button type="submit" className="sub-btn right">
        <CheckIcon/>
      </button>
      <button type="submit" className="sub-btn right">
        <CloseIcon/>
      </button>
        </div>
        </div>      
        
         
        </form>
      </div>
    </div>
  </Box>*/
  }      
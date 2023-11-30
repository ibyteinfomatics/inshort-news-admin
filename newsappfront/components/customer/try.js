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


  // const style = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: 400,
  //   bgcolor: "background.paper",
  //   border: "2px solid #000",
  //   boxShadow: 24,
  //   pt: 2,
  //   px: 4,
  //   pb: 3,
  // };

  const router = useRouter();
  console.log(router.query);

  const validationSchema = Yup.object().shape({
    reason: Yup.string().required("reason is required").min(5).max(100),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);

  const { errors } = formState;


 async function onSubmit (status) {
    open();
  
   let res=await userService.verifyDriver(id,status);
  if(res.driver_status=="Accepted"){
     setDriverStatus(1)
   }
  if(res.driver_status=="Rejected"){
    setDriverStatus(2)
   }
  }

  console.log(status,"status")
  
if(status!=="approve"){
  return(
     <Box className="varify">
    <div className="form_group">
      <div className="form-item">
      
        <div>
        <h2 style={{fontSize:"20px",marginBottom:"40px"}}>Are you sure ? {status=="approve"&& "You want to approve"}</h2>
        <div className="buttonAlign">
        <button onClick={()=>onSubmit(1)} type="submit" className="sub-btn right">
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
  )
}else{
  return (
    <>
    <Box className="varify" >
     <div className="form_group">
    <div className="form-item">
      <form onSubmit={handleSubmit(onSubmit(2))}>
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
    </>
  );
}
 
};

export default DriverOuth;




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
        </div>approve
        </div>      
        
         
        </form>
      </div>
    </div>
  </Box>*/
  }      import React from "react";
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
  
  
    // const style = {
    //   position: "absolute",
    //   top: "50%",
    //   left: "50%",
    //   transform: "translate(-50%, -50%)",
    //   width: 400,
    //   bgcolor: "background.paper",
    //   border: "2px solid #000",
    //   boxShadow: 24,
    //   pt: 2,
    //   px: 4,
    //   pb: 3,
    // };
  
    const router = useRouter();
    console.log(router.query);
  
    const validationSchema = Yup.object().shape({
      reason: Yup.string().required("reason is required").min(5).max(100),
    });
  
    const formOptions = { resolver: yupResolver(validationSchema) };
  
    const { register, handleSubmit, formState } = useForm(formOptions);
  
    const { errors } = formState;
  
  
   async function onSubmit (status) {
      open();
    
     let res=await userService.verifyDriver(id,status);
    if(res.driver_status=="Accepted"){
       setDriverStatus(1)
     }
    if(res.driver_status=="Rejected"){
      setDriverStatus(2)
     }
    }
  
    console.log(status,"status")
    
  if(status!=="approve"){
    return(
       <Box className="varify">
      <div className="form_group">
        <div className="form-item">
        
          <div>
          <h2 style={{fontSize:"20px",marginBottom:"40px"}}>Are you sure ? {status=="approve"&& "You want to approve"}</h2>
          <div className="buttonAlign">
          <button onClick={()=>onSubmit(1)} type="submit" className="sub-btn right">
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
    )
  }else{
    return (
      <>
      <Box className="varify" >
       <div className="form_group">
      <div className="form-item">
        <form onSubmit={handleSubmit(onSubmit(2))}>
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
      </>
    );
  }
   
  };
  
  export default DriverOuth;
  
  
  
  
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
          </div>approve
          </div>      
          
           
          </form>
        </div>
      </div>
    </Box>*/
    }      
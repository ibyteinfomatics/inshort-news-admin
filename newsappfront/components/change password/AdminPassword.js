import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { userService } from "../../services";


const AdminPassword = () => {
  const [btnStatus, setBtnStatus] = useState(false);
  const [email, setEmail] = useState();

  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .matches(
        /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        "Please provide a valid Email"
      )
      .required("Email is required"),
    old_password: Yup.string()
      .required("Previous Password is required")
      ,
    new_password: Yup.string()
      .required("New Password is required")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Must 8 characters, one uppercase, one number and one special case character"
      ),
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .oneOf(
        [Yup.ref("new_password")],
        "Password and confirm password does not same"
      ),
  });

 
  useEffect(()=>{
    getAdminProfile();
  },[])

 

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit,reset, formState } = useForm(formOptions);

  const { errors } = formState;

  const getAdminProfile = async() =>{
    const res = await userService.getAdmin();
    if(res.success){
      setEmail(res?.profile?.email);
      reset({
        email : res?.profile?.email
      })
    }
  }

  const onSubmit = (data) => {
  
    setBtnStatus(true);
    userService
      .changeAdminPassword(data)
      .then((res) => {
        console.log(res);
        if (res.success === true) {
          console.log(res.message);
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            router.push("/admin/dashboard");
          }, 2000);
        } else {
          res.message.EN
            ? toast.error(res.message.EN, {
                position: toast.POSITION.TOP_RIGHT,
              })
            : toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
              });

          setBtnStatus(false);
        }
      })
      .catch((error) => {
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="tabLogin">
          <div className="tabDataWrapper" style={{ width: "50%" }}>
            <div className="form_group">
              <div className="form-item">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <label htmlFor="email">Email</label>
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  {...register("email")}
                  className={`form-control first-caps ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  disabled
                />
              </div>
            </div>

            <div className="form_group">
              <div className="form-item">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <label htmlFor="old_password">Previous Password</label>
                  <div className="invalid-feedback">
                    {errors.old_password?.message}
                  </div>
                </div>
                <input
                  type="password"
                  id="old_password"
                  name="old_password"
                  {...register("old_password")}
                  className={`form-control first-caps ${
                    errors.old_password ? "is-invalid" : ""
                  }`}
                />
              </div>
            </div>

            <div className="form_group">
              <div className="form-item">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <label htmlFor="new_password">New Password</label>
                  <div className="invalid-feedback">
                    {errors.new_password?.message}
                  </div>
                </div>
                <input
                  type="password"
                  id="new_password"
                  name="new_password"
                  {...register("new_password")}
                  className={`form-control first-caps ${
                    errors.new_password ? "is-invalid" : ""
                  }`}
                />
              </div>
            </div>

            <div className="form_group">
              <div className="form-item">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <label htmlFor="password">Confirm Password</label>
                  <div className="invalid-feedback">
                    {errors.confirm_password?.message}
                  </div>
                </div>
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  {...register("confirm_password")}
                  className={`form-control first-caps ${
                    errors.confirm_password ? "is-invalid" : ""
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="sub-btn split-form-btn"
              disabled={btnStatus}
            >
              {btnStatus ? (
                <CircularProgress color="inherit" size="3vh" />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AdminPassword;

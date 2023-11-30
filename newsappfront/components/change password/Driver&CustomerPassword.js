import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { userService } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerDetail, setDriverDetail } from "../../reducers/users-reducer";

const DriverCustomerPassword = ({id}) => {
  const [user_type, setUser_type] = useState();
  const [btnStatus, setBtnStatus] = useState(false);
 

  const router = useRouter();
  const dispatch = useDispatch();

  const { customerDetail } = useSelector((state) => state?.users);
  const { driverDetail } = useSelector((state) => state?.users);

  useEffect(() => {
    getCustomer();
    getDriver();
  }, [id]);

  const getCustomer = async() => {
    const res = await userService.getSingleCustomer(id);
    console.log(res);
    if (res.success) {
      await dispatch(setCustomerDetail(res?.customer));
      setUser_type("customer");
    } else {
      console.log(res.msg);
    }
  }
 
  const getDriver = async() => {
    const res = await userService.getSingleDriver(id);
    console.log(res);
    if (res.success) {
      await dispatch(setDriverDetail(res?.driver));
      setUser_type("driver");
    } else {
      console.log(res.msg);
    }
  };
  

  const validationSchema = Yup.object().shape({
    new_password: Yup.string()
      .required("Password is required")
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

  const formOptions = { resolver: yupResolver(validationSchema) };
  
    const { register, handleSubmit, formState } =
      useForm(formOptions);
  
    const { errors } = formState;
  
  const onSubmit = ({new_password}) => {
    
    setBtnStatus(true);
    userService
      .changeUserPasswords(user_type, id, new_password)
      .then((res) => {
        console.log(res);
        if (res.success === true) {
          console.log(res.message);
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            router.push("/admin/customers");
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
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={customerDetail?.email || driverDetail?.email}
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
                  <label htmlFor="new_password">Password</label>
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

export default DriverCustomerPassword;

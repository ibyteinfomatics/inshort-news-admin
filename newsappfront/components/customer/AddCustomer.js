import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { userService } from "../../services";
import { useDispatch } from "react-redux";
import { setCustomerDetail } from "../../reducers/users-reducer";
import PhoneInput from "react-phone-input-2";

const AddCustomer = ({ id }) => {
  const [btnStatus, setBtnStatus] = useState(false);
  const [countryCode, setCountryCode] = useState("IN");
  const [phoneNumber, setPhoneNumber] = useState();

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    id && getSingleCustomerDetail();
  }, [id]);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required").min(3).max(30),
    last_name: Yup.string().required("Last name is required").min(3).max(30),
    email: Yup.string()
      .email()
      .matches(
        /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        "Please provide a valid Email"
      )
      .required("Email is required"),
    phone_number: Yup.string().when("countryCode", {
      is: (countryCode) => countryCode?.length > 0,
      then: Yup.string()
        .phone(countryCode, true, "Please enter a valid number")
        .required("Number is required"),
      otherwise: Yup.string().required("Number is required"),
    }),
    service_provider: Yup.string().required("Service Provider is required"),
    password: Yup.string().when("id", {
      is: (id) => id === null,
      then: Yup.string(),
      otherwise: Yup.string()
        .required("Password is required")
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Must 8 characters, one uppercase, one number and one special case character"
        ),
    }),
    confirm_password: Yup.string().when("id", {
      is: (id) => id === null,
      then: Yup.string(),
      otherwise: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref('password')], 'Passwords must match')
    }),
    company_name: Yup.string()
      .required("Company Name name is required")
      .min(3)
      .max(30),
    service_provider_password: Yup.string()
      .required("Servce Provider Password is required")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Must 8 characters, one uppercase, one number and one special case character"
      ),
    service_provider_username: Yup.string().required(
      "Service Provide Username is required"
    ),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, control, handleSubmit, watch, reset, formState } =
    useForm(formOptions);

  const { errors } = formState;
  const watchAll = watch();
  console.log(watchAll);

  const getSingleCustomerDetail = async () => {
    const res = await userService.getSingleCustomer(id);
    if (res.success) {
      await dispatch(setCustomerDetail(res));
      reset({
        first_name: res?.customer?.first_name,
        last_name: res?.customer?.last_name,
        email: res?.customer?.email,
        phone_number: res?.customer?.phone_number,
        company_name: res?.customer?.company_name,
        service_provider: res?.customer?.service_provider,
      });
    } else {
      console.log(res.msg);
    }
  };

  const phoneChangeHandler = (phone, country, field) => {
    setCountryCode(country.countryCode);
    if (phone.startsWith(country.dialCode)) {
      const ph = phone.slice(country.dialCode.length);
      setPhoneNumber(phone);
      field.onChange(ph);
    }
  };
  function onSubmit(data) {
    delete data.confirm_password;
    setBtnStatus(true);
    (id
      ? userService.updateCustomer(id, data)
      : userService.createCustomer(data)
    )
      .then((res) => {
        if (res.success === true) {
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
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="tabLogin">
          <div className="tabDataWrapper">
            <div className="grid_1">
              <div className="form-item">
                <div className="flex_between">
                  <label htmlFor="first_name">First Name</label>
                  <div className="invalid-feedback">
                    {errors.first_name?.message}
                  </div>
                </div>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  {...register("first_name")}
                  className={`form-control first-caps ${
                    errors.first_name ? "is-invalid" : ""
                  }`}
                />
              </div>

              <div className="form-item">
                <div className="flex_between">
                  <label htmlFor="last_name">Last Name</label>
                  <div className="invalid-feedback">
                    {errors.last_name?.message}
                  </div>
                </div>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  {...register("last_name")}
                  className={`form-control first-caps ${
                    errors.last_name ? "is-invalid" : ""
                  }`}
                />
              </div>
            </div>

            <div className="grid_1">
              <div className="form-item">
                <div className="flex_between">
                  <label htmlFor="email">Email</label>
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  {...register("email")}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                />
              </div>

              <div className="form-item">
                <div className="flex_between">
                  <div className="invalid-feedback">
                    {errors.phone_number?.message}
                  </div>
                </div>
                {/* <input
                  type="number"
                  id="phone_number"
                  name="phone_number"
                  {...register("phone_number")}
                  className={`form-control ${
                    errors.phone_number ? "is-invalid" : ""
                  }`}
                /> */}
                <Controller
                  name="phone_number"
                  control={control}
                  className={`form-control phone_input${
                    errors.phone_number ? "is-invalid" : ""
                  }`}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      value={phoneNumber}
                      // country={"in"}
                      // onChange={(phone, country) => {setCountryCode(country.countryCode); if(phone.startsWith(country.countryCode)){setPhoneNumber(phone.slice(country.dialCode.length))}else{console.log(country.dialCode);setPhoneNumber(phone)}; field.onChange(phoneNumber)}}
                      onChange={(phone, country) =>
                        phoneChangeHandler(phone, country, field)
                      }
                    />
                  )}
                />
              </div>
            </div>

            {!id && (
              <div className="grid_1">
                <div className="form-item">
                  <div className="flex_between">
                    <label htmlFor="password">Password</label>
                    <div className="invalid-feedback">
                      {errors.password?.message}
                    </div>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    {...register("password")}
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                  />
                </div>

                <div className="form-item">
                  <div className="flex_between">
                    <label htmlFor="phone_number">Confirm Password</label>
                    <div className="invalid-feedback">
                      {errors.confirm_password?.message}
                    </div>
                  </div>
                  <input
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    {...register("confirm_password")}
                    className={`form-control ${
                      errors.confirm_password ? "is-invalid" : ""
                    }`}
                  />
                </div>
              </div>
            )}
            <div className="grid_1">
              <div className="form-item">
                <div className="flex_between">
                  <label htmlFor="company_name">Company Name</label>
                  <div className="invalid-feedback">
                    {errors.company_name?.message}
                  </div>
                </div>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  {...register("company_name")}
                  className={`form-control first-caps ${
                    errors.company_name ? "is-invalid" : ""
                  }`}
                />
              </div>
            </div>
                  <hr style={{borderTop: "1px dotted black", margin:"10px 0"}}/>
            <div className="form-item">
              <div className="flex_between">
                <label htmlFor="service_provider">Service Provider</label>
                <div className="invalid-feedback">
                  {errors.service_provider?.message}
                </div>
              </div>
              <select
                type="text"
                id="service_provider"
                name="service_provider"
                {...register("service_provider")}
                className={`form-control ${
                  errors.service_provider ? "is-invalid" : ""
                }`}
              >
                <option value="">--select one--</option>
                <option value="yodel">yodel</option>
                <option value="evri">evri</option>
              </select>
            </div>
            <div className="grid_1">
              <div className="form-item">
                <div className="flex_between">
                  <label htmlFor="service_provider_username">
                    Service Provider Username
                  </label>
                  <div className="invalid-feedback">
                    {errors.service_provider_username?.message}
                  </div>
                </div>
                <input
                  type="text"
                  id="service_provider_username"
                  name="service_provider_username"
                  {...register("service_provider_username")}
                  className={`form-control first-caps ${
                    errors.service_provider_username ? "is-invalid" : ""
                  }`}
                />
              </div>
              <div className="form-item">
                <div className="flex_between">
                  <label htmlFor="service_provider_password">
                    Service Provider Password
                  </label>
                  <div className="invalid-feedback">
                    {errors.service_provider_password?.message}
                  </div>
                </div>
                <input
                  type="text"
                  id="service_provider_password"
                  name="service_provider_password"
                  {...register("service_provider_password")}
                  className={`form-control first-caps ${
                    errors.service_provider_password ? "is-invalid" : ""
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
              ) : id ? (
                "Update"
              ) : (
                "Create"
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddCustomer;

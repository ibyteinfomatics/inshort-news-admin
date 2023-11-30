import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { userService } from "../../services";
import Select from "react-select";
import uploadFile from "../../public/images/uploadFile.png";
import {
  priceCondition,
  jobTypeOptions,
  vehicle,
  itemTypeOptions,
  validationSchema,
} from "./jobassets";
import MapSearch from "./MapSearch";

const Job = () => {
  const [btnStatus, setBtnStatus] = useState(false);
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(uploadFile.src);
  const [pricePerMile, setPricePerMile] = useState(1);
  const [pricePerDelivery, setPricePerDelivery] = useState(1);
  const [pickupField, setPickupField] = useState(null);
  const [deliveryField, setDeliveryField] = useState(null);
  const [pickupText, setPickupText] = useState(null);
  const [deliveryText, setDeliveryText] = useState(null);
  const [err, setErr] = useState("");
  const [err1, setErr1] = useState("");
  console.log(pickupText, deliveryText);
  const router = useRouter();

  const { pickupCords, pickupAddress, deliveryCords, deliveryAddress } =
    useSelector((state) => state.jobs);

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, control, watch, handleSubmit, reset, formState } =
    useForm(formOptions);

  const { errors } = formState;
  const watchAllFields = watch();
  console.log(watchAllFields);

  useEffect(() => {
    if (watchAllFields.image?.length > 0) {
      setPicture(watchAllFields.image[0]);
      setImgData(URL.createObjectURL(watchAllFields.image[0]));
    } else if (watchAllFields.price_per_mile?.value == 1) {
      setPricePerMile(1);
      setPricePerDelivery(0);
    } else {
      setPricePerMile(0);
      setPricePerDelivery(1);
    }
  }, [watchAllFields.image, watchAllFields.price_per_mile]);

  useEffect(() => {
    varifyAddress();
  }, [pickupField, deliveryField, pickupText, deliveryText]);

  const varifyAddress = () => {
    typeof pickupField === "undefined"
      ? setErr("Please enter a valid address")
      : setErr("");
    typeof deliveryField === "undefined"
      ? setErr1("Please enter a valid address")
      : setErr1("");
  };

  function onSubmit(data) {
    const jobType = data?.job_type.value;
    const vehicle_choice = data?.preferred_vehicle_choice.value;
    const itemType = data?.item_type.value;

    const submitData = {
      ...data,
      pick_up_address: pickupAddress?.full_address,
      pick_up_latitude: pickupCords?.lattitude,
      pick_up_longitude: pickupCords?.longitude,
      delivery_address: deliveryAddress?.full_address,
      delivery_latitude: deliveryCords?.lattitude,
      delivery_longitude: deliveryCords?.longitude,
      job_type: jobType,
      preferred_vehicle_choice: vehicle_choice,
      item_type: itemType,
      price_per_mile: pricePerMile,
      price_per_delivery_parcel: pricePerDelivery,
      image: picture,
    };
    console.log(submitData);
    pickupText == "" ? setPickupText("sdf") : null;
    deliveryText == "" ? setDeliveryText("sdf") : null;

    if (pickupField && deliveryField !== "undefined") {
      setBtnStatus(true);
      userService
        .createJob(submitData)
        .then((res) => {
          if (res.data.success === true) {
            console.log(res.data.message);
            toast.success(res.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
            setTimeout(() => {
              router.push("/admin/jobs");
            }, 0);
          } else {
            res.data.message.EN
              ? toast.error(res.data.message.EN, {
                  position: toast.POSITION.TOP_RIGHT,
                })
              : toast.error(res.data.message, {
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
    } else {
      return;
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="tabLogin" style={{ display: "flex" }}>
          <div className="tabDataWrapper" style={{ width: "50%" }}>
            <h1>Pick up Details</h1>

            <div className="form_group">
              <div className="form-item">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <label htmlFor="pick_up_address">Pickup Address</label>
                  <div className="invalid-feedback">
                    {pickupText == null ? "" : err}
                  </div>
                </div>
                <MapSearch
                  name="pick_up_address"
                  id="pick_up_address"
                  pickup={setPickupField}
                  text={setPickupText}
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
                  <label htmlFor="pick_up_address_details">
                    Pickup Address Details
                  </label>
                  <div className="invalid-feedback">
                    {errors.pick_up_address_details?.message}
                  </div>
                </div>
                <input
                  type="text"
                  id="pick_up_address_details"
                  name="pick_up_address_details"
                  {...register("pick_up_address_details")}
                  className={`form-control first-caps ${
                    errors.pick_up_address_details ? "is-invalid" : ""
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
                  <label htmlFor="pick_up_name">Pick up Name</label>
                  <div className="invalid-feedback">
                    {errors.pick_up_name?.message}
                  </div>
                </div>
                <input
                  type="text"
                  id="pick_up_name"
                  name="pick_up_name"
                  {...register("pick_up_name")}
                  className={`form-control first-caps ${
                    errors.pick_up_name ? "is-invalid" : ""
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
                  <label htmlFor="pick_up_mobile">Phone</label>
                  <div className="invalid-feedback">
                    {errors.pick_up_mobile?.message}
                  </div>
                </div>
                <input
                  type="number"
                  id="pick_up_mobile"
                  name="pick_up_mobile"
                  {...register("pick_up_mobile")}
                  className={`form-control ${
                    errors.pick_up_mobile ? "is-invalid " : ""
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
                  <label htmlFor="pick_up_instruction">
                    Pickup Instructions
                  </label>
                  <div className="invalid-feedback">
                    {errors.pick_up_instruction?.message}
                  </div>
                </div>
                <input
                  type="text"
                  id="pick_up_instruction"
                  name="pick_up_instruction"
                  {...register("pick_up_instruction")}
                  className={`form-control first-caps ${
                    errors.pick_up_instruction ? "is-invalid" : ""
                  }`}
                />
              </div>
            </div>

            <h1 style={{ padding: "20px 0" }}>Delivery Details</h1>

            <div className="form_group">
              <div className="form-item">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <label htmlFor="delivery_address">Delivery Address</label>
                  <div className="invalid-feedback">
                    {deliveryText == null ? "" : err1}
                  </div>
                </div>

                <MapSearch
                  name="delivery_address"
                  delivery={setDeliveryField}
                  text={setDeliveryText}
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
                  <label htmlFor="delivery_address_details">
                    Delivery Address Details
                  </label>
                  <div className="invalid-feedback">
                    {errors.delivery_address_details?.message}
                  </div>
                </div>
                <input
                  type="text"
                  id="delivery_address_details"
                  name="delivery_address_details"
                  {...register("delivery_address_details")}
                  className={`form-control first-caps ${
                    errors.delivery_address_details ? "is-invalid" : ""
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
                  <label htmlFor="delivery_name">Name</label>
                  <div className="invalid-feedback">
                    {errors.delivery_name?.message}
                  </div>
                </div>
                <input
                  type="text"
                  id="delivery_name"
                  name="delivery_name"
                  {...register("delivery_name")}
                  className={`form-control first-caps ${
                    errors.delivery_name ? "is-invalid" : ""
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
                  <label htmlFor="delivery_mobile">Phone</label>
                  <div className="invalid-feedback">
                    {errors.delivery_mobile?.message}
                  </div>
                </div>
                <input
                  type="number"
                  id="delivery_mobile"
                  name="delivery_mobile"
                  {...register("delivery_mobile")}
                  className={`form-control ${
                    errors.delivery_mobile ? "is-invalid " : ""
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
                  <label htmlFor="delivery_instruction">
                    Delivery Instructions
                  </label>
                  <div className="invalid-feedback">
                    {errors.delivery_instruction?.message}
                  </div>
                </div>
                <input
                  type="text"
                  id="delivery_instruction"
                  name="delivery_instruction"
                  {...register("delivery_instruction")}
                  className={`form-control first-caps ${
                    errors.delivery_instruction ? "is-invalid" : ""
                  }`}
                />
              </div>
            </div>
            <button
              type="submit"
              className="sub-btn split-form-btn"
              // disabled={btnStatus}
            >
              {btnStatus ? (
                <CircularProgress color="inherit" size="3vh" />
              ) : (
                "Create"
              )}
            </button>
          </div>

          <div className="tabDataWrapper" style={{ width: "50%" }}>
            <h1>Package Details</h1>
            <div className="form_group">
              <div className="form-item">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <label htmlFor="job_type">Job Type</label>
                  <div className="invalid-feedback">
                    {errors.job_type?.message}
                  </div>
                </div>
                <Controller
                  control={control}
                  name="job_type"
                  id="job_type"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      options={jobTypeOptions}
                      value={value}
                      onChange={(selectedType) => {
                        // setRoles(selectedRoles);
                        onChange(selectedType);
                      }}
                    />
                  )}
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
                  <label htmlFor="delivery_date">Delivery Date</label>
                  <div className="invalid-feedback">
                    {errors.delivery_date?.message}
                  </div>
                </div>
                <input
                  type="date"
                  id="delivery_date"
                  name="delivery_date"
                  {...register("delivery_date")}
                  className={`form-control first-caps ${
                    errors.delivery_date ? "is-invalid" : ""
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
                  <label htmlFor="delivery_time">Delivery Time</label>
                  <div className="invalid-feedback">
                    {errors.delivery_time?.message}
                  </div>
                </div>
                <input
                  type="time"
                  id="delivery_time"
                  name="delivery_time"
                  {...register("delivery_time")}
                  className={`form-control first-caps ${
                    errors.delivery_time ? "is-invalid" : ""
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
                  <label htmlFor="preferred_vehicle_choice">
                    Vehicle Choice
                  </label>
                  <div className="invalid-feedback">
                    {errors.preferred_vehicle_choice?.message}
                  </div>
                </div>
                <Controller
                  control={control}
                  name="preferred_vehicle_choice"
                  id="preferred_vehicle_choice"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      options={vehicle}
                      value={value}
                      onChange={(selectedCar) => {
                        // setRoles(selectedRoles);
                        onChange(selectedCar);
                      }}
                    />
                  )}
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
                  <label htmlFor="item_type">Item Type</label>
                  <div className="invalid-feedback">
                    {errors.item_type?.message}
                  </div>
                </div>
                <Controller
                  control={control}
                  name="item_type"
                  id="item_type"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      options={itemTypeOptions}
                      value={value}
                      onChange={(selectedType) => {
                        // setRoles(selectedRoles);
                        onChange(selectedType);
                      }}
                    />
                  )}
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
                  <label htmlFor="no_of_items">Number of Items</label>
                  <div className="invalid-feedback">
                    {errors.no_of_items?.message}
                  </div>
                </div>
                <input
                  type="number"
                  id="no_of_items"
                  name="no_of_items"
                  {...register("no_of_items")}
                  className={`form-control ${
                    errors.no_of_items ? "is-invalid" : ""
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
                  <label htmlFor="price_per_mile">Price Type</label>
                  <div className="invalid-feedback">
                    {errors.price_per_mile?.message}
                  </div>
                </div>
                <Controller
                  control={control}
                  name="price_per_mile"
                  id="price_per_mile"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      options={priceCondition}
                      value={value}
                      onChange={(selectedPriceType) => {
                        // setRoles(selectedRoles);
                        onChange(selectedPriceType);
                      }}
                    />
                  )}
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
                  <label htmlFor="price_per_mile_parcel">Price in Euro (&euro;)</label>
                  <div className="invalid-feedback">
                    {errors.price_per_mile_parcel?.message}
                  </div>
                </div>
                <input
                  type="number"
                  id="price_per_mile_parcel"
                  name="price_per_mile_parcel"
                  {...register("price_per_mile_parcel")}
                  className={`form-control ${
                    errors.price_per_mile_parcel ? "is-invalid" : ""
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
                  <label htmlFor="notes">Notes</label>
                  <div className="invalid-feedback">
                    {errors.notes?.message}
                  </div>
                </div>
                <input
                  type="text"
                  id="notes"
                  name="notes"
                  {...register("notes")}
                  className={`form-control first-caps ${
                    errors.notes ? "is-invalid" : ""
                  }`}
                />
              </div>
            </div>

            <div className="form_group">
              <div className="form-item">
                <label htmlFor="image">
                  Upload Image
                  <img
                    src={imgData}
                    alt="logo"
                    className="service-icon-lable"
                  />
                </label>
                <input
                  type="file"
                  id="image"
                  style={{ display: "none" }}
                  name="image"
                  {...register("image")}
                  className={`form-control ${errors.image ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback ">{errors.image?.message}</div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Job;

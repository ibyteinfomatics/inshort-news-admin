import * as Yup from "yup";

export const priceCondition = [
  { value: 1, label: "Price Per Mile" },
  { value: 0, label: "Price Per Delivery Parcel" },
];

export const jobTypeOptions = [
  { value: "Single Package", label: "Single Package" },
  { value: "Multiple Package", label: "Multiple Package" },
];
export const itemTypeOptions = [
  { value: "Small", label: "Small" },
  { value: "Medium", label: "Medium" },
  { value: "Large", label: "Large" },
  { value: "Letter", label: "Letter" },
];

export const vehicle = [
  { value: "Small Cars", label: "Small Cars" },
  { value: "Hatchback", label: "Hatchback" },
  { value: "MPV", label: "MPV" },
  { value: "Estate", label: "Estate" },
  { value: "Car / Van", label: "Car / Van" },
  { value: "Small Van", label: "Small Van" },
  { value: "Large Van", label: "Large Van" },
];

export const validationSchema = Yup.object().shape({
  pick_up_address_details: Yup.string()
    .required("Address Detail is required")
    .min(10, "Address Detail must required 10 characters"),
  pick_up_name: Yup.string()
    .required("Name is required")
    .min(3, "At least 3 digits are required"),
  pick_up_mobile: Yup.string()
    .required("Number is required")
    .matches(/^\+?(?:\d\s?){10,11}$/, "Please enter a valid number"),
  pick_up_instruction: Yup.string()
    .required("Please provide some Instructions")
    .min(10, "At least 10 digits are required"),
  delivery_address_details: Yup.string()
    .required("Address Detail is required")
    .min(10, "At least 10 digits are required"),
  delivery_name: Yup.string()
    .required("Name is required")
    .min(3, "At least 3 digits are required"),
  delivery_mobile: Yup.string()
    .required("Number is required")
    .matches(/^\+?(?:\d\s?){10,11}$/, "Please enter a valid number"),
  delivery_instruction: Yup.string()
    .required("Please provide some Instructions")
    .min(10, "At least 10 digits are required"),
  job_type: Yup.object().required("Please Select at least one job type"),
  delivery_date: Yup.date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required("Delivery date is required")
    .min(new Date(), "Date cannot be this early")
    .test(
      "format",
      "Date is invalid",
      (date) => (date?.getFullYear() ?? 0) <= 9999
    ),
  delivery_time: Yup.string().required("Time is required"),
  preferred_vehicle_choice: Yup.object().required(
    "Please Select at least one vehicle"
  ),
  item_type: Yup.object().required("Please Select at least one item type"),
  no_of_items: Yup.string().required("At leaset One item is required").min(1),

  price_per_mile: Yup.object().required("Please Select at least one option"),
  price_per_mile_parcel: Yup.string().required("Please Provide price").min(1),
  notes: Yup.string().required("Notes is required").min(10),
  image: Yup.mixed()
    .required("Image is required")
    .test("filesize", "The file is required", (value) => {
      return value && value[0];
    }),
});

export const validationSchema2 = Yup.object().shape({
  pick_up_address_details: Yup.string()
    .required("Address Detail is required")
    .min(10, "Address Detail must required 10 characters"),
  pick_up_name: Yup.string()
    .required("Name is required")
    .min(3, "At least 3 digits are required"),
  pick_up_mobile: Yup.string()
    .required("Number is required")
    .matches(/^\+?(?:\d\s?){10,11}$/, "Please enter a valid number"),
  pick_up_instruction: Yup.string()
    .required("Please provide some Instructions")
    .min(10, "At least 10 digits are required"),
  delivery_address_details: Yup.string()
    .required("Address Detail is required")
    .min(10, "At least 10 digits are required"),
  delivery_name: Yup.string()
    .required("Name is required")
    .min(3, "At least 3 digits are required"),
  delivery_mobile: Yup.string()
    .required("Number is required")
    .matches(/^\+?(?:\d\s?){10,11}$/, "Please enter a valid number"),
  delivery_instruction: Yup.string()
    .required("Please provide some Instructions")
    .min(10, "At least 10 digits are required"),
  job_type: Yup.object().required("Please Select at least one job type"),
  delivery_date: Yup.date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required("Delivery date is required")
    .min(new Date(), "Date cannot be this early")
    .test(
      "format",
      "Date is invalid",
      (date) => (date?.getFullYear() ?? 0) <= 9999
    ),
  delivery_time: Yup.string().required("Time is required"),
  preferred_vehicle_choice: Yup.object().required(
    "Please Select at least one vehicle"
  ),
  item_type: Yup.object().required("Please Select at least one item type"),
  no_of_items: Yup.string().required("At leaset One item is required").min(1),

  price_per_mile: Yup.object().required("Please Select at least one option"),
  price_per_mile_parcel: Yup.string().required("Please Provide price").min(1),
  notes: Yup.string().required("Notes is required").min(10),
  image: Yup.mixed()
});

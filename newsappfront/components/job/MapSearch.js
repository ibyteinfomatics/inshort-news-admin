import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setPickupCords,
  setDeliveryCords,
  setPickupAddress,
  setDeliveryAddresss,
} from "../../reducers/job-reducer";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";

const MapSearch = ({ id, pickup, delivery, value, text }) => {
  const inputRef = useRef();
  const [addressFields, setAddressFields] = useState();
  const [guestCoordinates, setGuestCoordinates] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    setPickup();
    id
      ? pickup(addressFields?.delivery_address)
      : delivery(addressFields?.delivery_address);
  }, [guestCoordinates, addressFields]);

  const setPickup = async () => {
    id
      ? (await dispatch(setPickupCords(guestCoordinates))) &&
        (await dispatch(setPickupAddress(addressFields)))
      : (await dispatch(setDeliveryCords(guestCoordinates))) &&
        (await dispatch(setDeliveryAddresss(addressFields)));
  };

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      let data = {
        delivery_address: place.formatted_address,
        address_type: "HOME",
        city: "",
        country: "",
        district: "",
        full_address: place.formatted_address,
        landmark: "",
        zip_code: "",
      };
      place?.address_components?.map((i) => {
        if (i.types[0] == "locality") {
          data.city = i?.long_name || "";
        }

        if (i.types[0] == "administrative_area_level_3") {
          data.district = i?.long_name || "";
        }
        if (i.types[0] == "country") {
          data.country = i?.long_name || "";
        }
        if (i.types[0] == "postal_code") {
          data.zip_code = i?.long_name || "";
        }
      });

      const guestAddress = place.formatted_address;
      setGuestCoordinates({
        ...guestCoordinates,
        lattitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      });
      guestAddress = place.formatted_address;
      setAddressFields({
        ...addressFields,
        ...data,
      });
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAdwF9cF9d7B6MIov5rw4JVUfXEST2TS9w"
      libraries={["places"]}
      region="GB"
    >
      <div className="addressSearch">
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={handlePlaceChanged}
        >
          <input
            type="text"
            placeholder="Enter the address"
            value={value}
            onChange={(e) => {
              text(e.target.value);
            }}
          />
        </StandaloneSearchBox>
      </div>
    </LoadScript>
  );
};

export default MapSearch;

import React from "react";
import GoogleMapReact from "google-map-react";

import "./about.css";
import { BiStoreAlt } from "react-icons/bi";
const AnyReactComponent = ({ text }) => (
  <div className="store-location">
    <p>
      <BiStoreAlt />
      {text}
    </p>
    <span> Đại Từ, Thái Nguyên, Việt Nam</span>
  </div>
);

export default function AboutUs() {
  const defaultProps = {
    center: {
      lat: 21.571654,
      lng: 105.65364,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div className="pt-127">
      <div className="container">
        <div className="row">
          <h3 className="col-12 my-3">Location</h3>
          <div className="col-12" style={{ height: "50vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
              yesIWantToUseGoogleMapApiInternals
            >
              <AnyReactComponent
                lat={21.571654}
                lng={105.65364}
                text="Minh Sang Store"
              />
            </GoogleMapReact>
          </div>
        </div>
      </div>
    </div>
  );
}

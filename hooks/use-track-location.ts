"use client";

import { useState } from "react";

type positionType = {
  coords: { latitude: number; longitude: number };
};

const UseTrackLocation = () => {
  //   const [longLat, setLongLat] = useState<positionType>();
  const [longLat, setLongLat] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const [errorLocation, setErrorLocation] = useState("");

  function success(position: positionType) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLongLat(`${longitude},${latitude}`);
    // console.log("LONGLAT SET:", longLat);
    setIsFindingLocation(false);
    setErrorLocation("");

    console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
  }

  function error() {
    console.error("Unable to retrieve your location");
    setIsFindingLocation(false);
    setErrorLocation("Unable to retrieve your location");
  }

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser");
      setErrorLocation("Geolocation is not supported by your browser");
    } else {
      setIsFindingLocation(true);
      navigator.geolocation.getCurrentPosition(success, error);
      setErrorLocation("");
    }
  };

  return {
    handleTrackLocation,
    isFindingLocation,
    longLat,
    errorLocation,
  };
};

export { UseTrackLocation };

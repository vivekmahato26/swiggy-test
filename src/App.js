import { useState } from "react";
import Menu from "./componenets/menu";
import Restraunts from "./componenets/restraunts";
import logo from "./logo.svg";

function App() {
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    console.log(
      "Latitude: " +
        position.coords.latitude +
        "Longitude: " +
        position.coords.longitude
    );
  }
  getLocation();


  return (
    <div className="App">
      <Restraunts />
      <Menu />
    </div>
  );
}

export default App;

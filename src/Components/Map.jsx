import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";

import "./Map.scss";
import { showDataOnMap } from "../utils";
const Map = ({ countries, casesType, center, zoom }) => {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
};

export default Map;

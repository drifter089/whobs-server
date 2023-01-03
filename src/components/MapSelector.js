import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer ,useMap,GeoJSON} from 'react-leaflet';
import './WorldMap.css';
import mapData from "./../assets/countries.json";

const WorldMap = () => {

  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountryClick = (event, country) => {
    setSelectedCountry(country);
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={true}>
    {/* <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    /> */}
    <GeoJSON data={mapData.features} />
  </MapContainer>
  );
};

export default WorldMap;

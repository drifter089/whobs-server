import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  GeoJSON,
} from "react-leaflet";
import "./WorldMap.css";
import mapData from "../../assets/countries.json";
import latlongData from "../../assets/latlong.json";

const WorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    console.log(latlongData);
  }, []);

  const handleCountryClick = (event, country) => {
    setSelectedCountry(country);
  };

  const countryStyle = {
    backgroundColor: "pink",
    fillColor: "#800626",
    weight: 0.2,
    opacity: 1,
    color: "black",
    dashArray: "1",
    fillOpacity: 0.7,
  };

  function onEachCountry(country, layer) {
    const countryName = country.properties.ADMIN;
    // if (Array.isArray(country.geometry.coordinates[0][0][0])) {
    //   console.log(country.geometry.coordinates[0][0][0], countryName);
    // } else {
    //   console.log(country.geometry.coordinates[0][0], countryName);
    // }
    layer.bindPopup(countryName);
    const coordinates = country.geometry.coordinates[0];
    const centerLat =
      coordinates.reduce((sum, coord) => sum + coord[1], 0) /
      coordinates.length;
    const centerLng =
      coordinates.reduce((sum, coord) => sum + coord[0], 0) /
      coordinates.length;
    // console.log(country, centerLat, centerLng, coordinates);
    // const latLng = GeoJSON.coordsToLatLng(coordinates[0]);

    // console.log(`Latitude: ${latLng.lat}, Longitude: ${latLng.lng}`);
  }

  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={2}
        minZoom={1.6}
        scrollWheelZoom={true}
      >
        {/* <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    /> */}
        <GeoJSON
          style={countryStyle}
          data={mapData.features}
          onEachFeature={onEachCountry}
          closePopupOnClick={false}
        />
        {latlongData.ref_country_codes.map((country) => {
          // const countryName = country.properties.ADMIN;
          let pos = [country.latitude, country.longitude];

          return (
            <Marker
              position={pos}
              style={{
                fontSize: "20px",
              }}
            >
              sdegew
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default WorldMap;

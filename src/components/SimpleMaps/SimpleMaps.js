import React, { useEffect, useState } from "react";
import {
  Geographies,
  Geography,
  ComposableMap,
  geoEqualEarth,
  Annotation,
  Marker,
} from "react-simple-maps";
import mapData from "../../assets/features.json";
// import mapData2 from "../../assets/countries.json";

const SimpleMaps = () => {
  const [countryData, setCountryData] = useState(null);

  function getData() {
    fetch(
      "https://gist.githubusercontent.com/erdem/8c7d26765831d0f9a8c62f02782ae00d/raw/248037cd701af0a4957cce340dabb0fd04e38f4c/countries.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setCountryData(data);
      });
  }

  useEffect(() => {
    // console.log(mapData);
    getData();
    console.log(countryData);
  }, []);

  return (
    <ComposableMap
      //   projection={geoEqualEarth}
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147,
      }}
      width={900}
      height={400}
    >
      <Geographies geography={mapData}>
        {({ geographies }) =>
          geographies.map((geo) => {
            // console.log(geo);
            return (
              <>
                <Geography
                  style={{
                    default: {
                      outline: "none",
                    },
                    hover: {
                      outline: "none",
                    },
                    pressed: {
                      outline: "none",
                    },
                  }}
                  key={geo.id}
                  geography={geo}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(e);
                  }}
                />
              </>
            );
          })
        }
      </Geographies>
      {countryData &&
        countryData.map((obj) => (
          <Marker key={obj.country_code} coordinates={obj.latlng}>
            {/* <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} /> */}
            <text
              textAnchor="middle"
              // y={markerOffset}
              style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
            >
              {obj.name}
            </text>
          </Marker>
        ))}
    </ComposableMap>
    // <></>
  );
};

export default SimpleMaps;

import { geoJSON } from "leaflet";
import React, { useEffect, useState } from "react";
import {
  Geographies,
  Geography,
  ComposableMap,
  geoEqualEarth,
  Annotation,
  Marker,
  ZoomableGroup,
  Graticule,
  Sphere,
} from "react-simple-maps";
// import mapData from "../../assets/features.json";
import mapData2 from "../../assets/countries.json";
import { geoCentroid, geoArea } from "d3-geo";

const SimpleMaps = (props) => {
  useEffect(() => {
    // console.log(mapData2);
  }, []);

  const handleClick = (geo) => () => {
    // console.log(geo);
    if (props.selectedCountry === geo.properties.ADMIN) {
      props.setSelectedCountry("");
    } else {
      props.setSelectedCountry(geo.properties.ADMIN);
    }
  };

  return (
    <ComposableMap fill={"yellow"} height={400}>
      <ZoomableGroup zoom={1} center={[0, 0]}>
        <Geographies geography={mapData2}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => {
                const temp = React.createRef();
                // console.log(geo);
                return (
                  <Geography
                    style={{
                      default: {
                        outline: "none",
                        width: 0.1,
                      },
                      hover: {
                        outline: "none",
                        fill:
                          props.selectedCountry === geo.properties.ADMIN
                            ? "green"
                            : "orange",
                      },
                      pressed: {
                        outline: "none",
                        fill: "green",
                      },
                    }}
                    fill={
                      props.selectedCountry === geo.properties.ADMIN
                        ? "green"
                        : "grey"
                    }
                    geography={geo}
                    onClick={handleClick(geo)}
                    key={geo.rsmKey}
                    ref={temp}
                    // re
                  />
                );
              })}
              {geographies.map((geo) => {
                const centroid = geoCentroid(geo);
                const area = geoArea(geo);
                const countryName = geo.properties.ADMIN;
                let fontSize = area * 200;
                if (fontSize > 13) {
                  fontSize = 13;
                }
                if (fontSize < 1) {
                  fontSize = 1;
                }
                return (
                  <>
                    <g key={geo.rsmKey}>
                      <Marker coordinates={centroid}>
                        <text
                          fontSize={fontSize}
                          alignmentBaseline="middle"
                          style={{
                            fontFamily: "system-ui",
                            fill:
                              props.selectedCountry === geo.properties.ADMIN
                                ? "green"
                                : "orange",
                          }}
                        >
                          {countryName}
                        </text>
                      </Marker>
                    </g>
                  </>
                );
              })}
            </>
          )}
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
    // <></>
  );
};

export default SimpleMaps;

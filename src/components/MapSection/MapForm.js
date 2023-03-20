import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SimpleMaps from "./SimpleMaps";
import ISO_format from "../../assets/ISO_format.json";
import { Chart } from "chart.js";
import { Line } from "react-chartjs-2";

const MapForm = () => {
  const defaults = {
    version: 190929,
    location: "country:DE",
    location_name: "Germany",
    job_type: "weather",
    year: 2011,
    frequency: 3,
    cf_exponent: 2,
    load: 100,
    hydrogen_load: 0,
    wind_min: 0,
    solar_min: 0,
    wind_max: 10000000,
    solar_max: 10000000,
    wind_discount: 5,
    solar_discount: 5,
    battery_energy_discount: 5,
    battery_power_discount: 5,
    hydrogen_energy_discount: 5,
    hydrogen_electrolyser_discount: 5,
    hydrogen_turbine_discount: 5,
    dispatchable1_discount: 10,
    dispatchable2_discount: 10,
    co2_emissions: 100,
    wind: true,
    solar: true,
    battery: true,
    hydrogen: true,
    dispatchable1: false,
    dispatchable2: false,
    co2_limit: false,
    wind_cost: 1040,
    wind_fom: 3,
    wind_lifetime: 25,
    solar_cost: 300,
    solar_fom: 3,
    solar_lifetime: 25,
    battery_energy_cost: 142,
    battery_energy_fom: 3,
    battery_energy_lifetime: 15,
    battery_power_cost: 160,
    battery_power_fom: 3,
    battery_power_lifetime: 15,
    battery_power_efficiency_charging: 95,
    battery_power_efficiency_discharging: 95,
    hydrogen_energy_cost: 0.7,
    hydrogen_energy_fom: 14,
    hydrogen_energy_lifetime: 25,
    hydrogen_electrolyser_cost: 600,
    hydrogen_electrolyser_efficiency: 62,
    hydrogen_electrolyser_fom: 3,
    hydrogen_electrolyser_lifetime: 20,
    hydrogen_turbine_cost: 830,
    hydrogen_turbine_efficiency: 58,
    hydrogen_turbine_fom: 3,
    hydrogen_turbine_lifetime: 25,
    dispatchable1_cost: 400,
    dispatchable1_marginal_cost: 50,
    dispatchable1_emissions: 500,
    dispatchable1_fom: 3,
    dispatchable1_lifetime: 25,
    dispatchable2_cost: 6000,
    dispatchable2_marginal_cost: 10,
    dispatchable2_emissions: 0,
    dispatchable2_fom: 3,
    dispatchable2_lifetime: 25,
  };
  const [selectedCountry, setSelectedCountry] = useState("");

  const requestObj = useRef(null);

  const [recivedData, setRecivedData] = useState(null);

  const data = {
    // labels: recivedData.snapshots,
    // labels: [
    //   "2011-01-01 00:00:00",
    //   "2011-01-01 01:00:00",
    //   "2011-01-01 02:00:00",
    //   "2011-01-01 03:00:00",
    //   "2011-01-01 04:00:00",
    //   "2011-01-01 05:00:00",
    // ],
    datasets: [
      {
        label: "My First dataset",
        // data: recivedData.onwind_pu,
        data: [0.243, 0.248, 0.249, 0.244, 0.23, 0.214],
        borderColor: "red",
        backgroundColor: "red",
        fill: true,
      },
      {
        label: "My Second dataset",
        data: [0.016, 0.065, 0.141, 0.215, 0.284, 0.318],
        borderColor: "blue",
        backgroundColor: "blue",
        fill: true,
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Month",
          },
        },
        y: {
          stacked: true,
          title: {
            display: true,
            text: "Value",
          },
        },
      },
    },
  };

  useEffect(() => {
    console.log(recivedData);
  }, [recivedData]);

  useEffect(() => {
    if (selectedCountry !== "") {
      for (let i = 0; i < ISO_format.length; i++) {
        if (ISO_format[i].name === selectedCountry) {
          requestObj.current = {
            name: selectedCountry,
            ISO: ISO_format[i]["alpha-2"],
          };
          break;
        }
      }
    }
    console.log(requestObj);
  }, [selectedCountry]);

  async function requestSender() {
    console.log(requestObj);
    defaults.location_name = requestObj.current.name;
    defaults.location = `country:${requestObj.current.ISO}`;

    const requestOptions = {
      Accept: "*/*",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(defaults),
    };
    await fetch("https://model.energy/jobs", requestOptions)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        // console.log(data);
        setRecivedData(JSON.parse(data));
        return data;
      });
  }

  return (
    <>
      <Grid container spacing={1} paddingBottom={3}>
        <Grid item xs={12}>
          <Typography variant="h3" component="div" paddingTop={4}>
            Step 1: Select location and weather year
          </Typography>
        </Grid>
        <Grid item xs={12} padding={4}>
          <SimpleMaps
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined"
            label="Location"
            value={selectedCountry}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined"
            helperText="If exponent is 0 generators are distributed evenly across the region, if it is 1 they are distributed proportional to capacity factor, if it is x they are distributed proportional to (capacity factor)^x."
            label="Capacity factor exponent for spatial distribution of wind and solar"
            value={selectedCountry}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined"
            helperText="Only the years 2011 and 2012 are available with more on the way."
            label="Weather Year"
            value={selectedCountry}
            fullWidth
          />
        </Grid>

        {/* <Line config={config}></Line> */}
        <Grid item xs={12} padding={4}></Grid>
      </Grid>
      <Button onClick={() => requestSender()}>send</Button>
    </>
  );
};

export default MapForm;

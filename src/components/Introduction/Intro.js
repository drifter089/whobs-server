import { Typography } from "@mui/material";
import React from "react";

const Intro = () => {
  return (
    <>
      <Typography component={"h1"} fontSize={28} padding={2}>
        Introduction
      </Typography>
      <Typography fontSize={20} component={"div"}>
        <Typography variant={"p"} padding={1} component="div">
          This tool calculates the cost of meeting a constant electricity demand
          from a combination of wind power, solar power and storage for
          different regions of the world.
        </Typography>
        <Typography variant={"p"} padding={1} component="div">
          First choose your location to determine the weather data for the wind
          and solar generation. Then choose your cost and technology assumptions
          to find the solution with least cost. Storage options are batteries
          and hydrogen from electrolysis of water.
        </Typography>
        <Typography variant={"p"} padding={1} component="div">
          <Typography variant={"p"} padding={1} component="div">
            Fun things to try out:
          </Typography>
          <Typography variant={"p"} padding={1} component="div">
            remove technologies with the checkboxes, e.g. hydrogen gas storage
            or wind, and see system costs rise
          </Typography>
          <Typography variant={"p"} padding={1} component="div">
            set solar or battery costs very low, to simulate breakthroughs in
            manufacturing
          </Typography>
        </Typography>
        {/* ADD LINKS */}
        <Typography component={"p"} padding={1}>
          See also this Twitter thread for an overview of the model's features
          and capabilities.
        </Typography>
        <Typography component={"p"} padding={1}>
          This is a toy model with a strongly simplified setup. Please read the
          warnings below.
        </Typography>
      </Typography>
    </>
  );
};

export default Intro;

import "./App.css";
import WorldMap from "./components/LeafLet/MapSelector";
import SimpleMaps from "./components/MapSection/SimpleMaps";
import { Grid } from "@mui/material";
import NavMenu from "./components/NavMenu/NavMenu";
import Intro from "./components/Introduction/Intro";
import MapForm from "./components/MapSection/MapForm";

function App() {
  return (
    <>
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <div
              style={{
                backgroundColor: "green",
                height: "120px",
              }}
            >
              Build your own zero-emission electricity supply
            </div>
          </Grid>
          <Grid item xs={12} md={3} lg={2}>
            <div
              style={{
                backgroundColor: "blue",
              }}
            >
              <NavMenu />
            </div>
          </Grid>
          <Grid item xs={12} md={9} lg={10}>
            <div
              style={{
                backgroundColor: "white",
              }}
            >
              <Intro />
              <MapForm />
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;

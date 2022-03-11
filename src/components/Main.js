import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";
function Main() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <div className="main-navbar">
        <Box sx={{ borderRadius: "5px", bgcolor: "#2C3333", color: "white" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            textColor="inherit"
          >
            <Tab label="Home" />
            <Tab label="Virus" />
            <Tab label="worm" />
            <Tab label="Trojan" />
            <Tab label="Ransomware" />
            <Tab label="Bots or botnets" />
            <Tab label="Adware" />
            <Tab label="Spyware" />
            <Tab label="Rootkits" />
            <Tab label="Fileless" />
            <Tab label="Malvertising" />
          </Tabs>
        </Box>
      </div>
      <TabPanel value={value} />
    </div>
  );
}
export default Main;

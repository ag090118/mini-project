import React, { useState, useEffect } from "react";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";
import { Cookies } from "react-cookie";
import MalwareTab from "./MalwareTab";
import { useCookies } from "react-cookie";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
function Main() {
  const [value, setValue] = React.useState(0);
  const [isLoading, setLoading] = useState(true);
  const [cookies, setCookie] = useCookies({});
  const [postinfo, setPostinfo] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getPosts = async () => {
    await fetch("https://dry-crag-93232.herokuapp.com/getposts", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setPostinfo(resp);
        setLoading(false);
      });
  };
  const [searchField, setSearchField] = useState("");

  const filteredData = postinfo.filter((person) => {
    return (
      person.title.toLowerCase().includes(searchField.toLowerCase()) ||
      person.description.toLowerCase().includes(searchField.toLowerCase())
    );
  });
  console.log(filteredData);
  const handleChangeSearch = (e) => {
    setSearchField(e.target.value);
    //console.log(searchField);
  };
  const clearInput = () => {
    setSearchField("");
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      <div className="main-navbar">
        <Box
          className="malware-types"
          sx={{ borderRadius: "5px", bgcolor: "teal", color: "white" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            textColor="inherit"
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 0.3 },
              },
            }}
          >
            <Tab label="All" />
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
        <div className="search-bar">
          <div className="searchInputs">
            <input
              type="text"
              placeholder="Search"
              value={searchField}
              onChange={handleChangeSearch}
            />
            <div className="searchIcon">
              {searchField.length === 0 ? (
                <SearchIcon />
              ) : (
                <CloseIcon id="clearBtn" onClick={clearInput} />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <TabPanel value={value} /> */}
      <div className="tabpanel-div">
        <MalwareTab index={value} data={filteredData} isLoading={isLoading} />
      </div>
    </div>
  );
}
export default Main;

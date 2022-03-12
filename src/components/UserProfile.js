import React, { useState, useEffect } from "react";
import Header from "./Header";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import PersonalInfo from "./PersonalInfo";
import PersonalPosts from "./PersonalPosts";
import PersonalRequests from "./PersonalRequests";

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.85)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#635ee7",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-selected": {
      color: "#fff",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

function UserProfile() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const renderComponent = () => {
      if (value==0) {
        return <PersonalInfo/>;
      } else if(value==1) {
        return <PersonalPosts/>;;
      }
      else{
        return <PersonalRequests/>;;
      }
    }
  return (
    <div >
      <div className="header">
        <Header />
      </div>
      <div className="userprofile-main">
        <Box sx={{ width: "100%", bgcolor: "#006064" }}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
            centered
          >
            <StyledTab label="Personal Information" />
            <StyledTab label="Posts" />
            <StyledTab label="Requests" />
          </StyledTabs>
          <Divider/>
          <div className="userprofile-info">
          {renderComponent()}
          </div>
        </Box>
      </div>
    </div>
  );
}
export default UserProfile;
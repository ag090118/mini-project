import React from "react";
import MalwareTab from "./MalwareTab";

function TabPanel(props) {
  const { value } = props;
  return (
    <div>
      {value === 0 && <MalwareTab index={value} data={props.data} />}
      {value !== 0 && <MalwareTab index={value} />}
    </div>
  );
}
export default TabPanel;

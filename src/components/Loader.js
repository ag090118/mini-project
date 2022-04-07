import React from "react";
import FillingBottle from "react-cssfx-loading/lib/FillingBottle";
function Loader() {
  return (
    <div className="loader-wrapper">
      {/* <FillingBottle color="#FF0000" width="min(10vh,10vw)" height="min(10vh,10vw)"/> */}
      <div class="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
export default Loader;

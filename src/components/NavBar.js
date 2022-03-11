import React from "react";

function NavBar({ handleLoginClick1, handleLoginClick2 }) {
  const handleClick1 = () => {
    handleLoginClick1();
  };
  const handleClick2 = () => {
    handleLoginClick2();
  };
  return (
    <div>
      <div>
        <button onClick={handleClick2} className="signupicon">
          Sign Up
        </button>
        <button onClick={handleClick1} className="loginicon">
          Sign In
        </button>
      </div>
    </div>
  );
}

export default NavBar;

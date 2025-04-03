import React from "react";
import loader from "../assets/loader-2.gif";

const Loader = () => {
  return (
    <div className="w-full h-lvh flex justify-center items-center">
      <img src={loader} className="md:w-56 w-40" alt="" />
    </div>
  );
};

export default Loader;

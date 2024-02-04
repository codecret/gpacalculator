import React from "react";
import MyTable from "../components/MyTable";
import { useEffect } from "react";
import ReactGA from "react-ga4";

const HomePage = () => {
  ReactGA.send({
    hitType: "pageview",
    page: "/learnMore",
    title: "Learn More",
  });
  return (
    <>
      <MyTable />
    </>
  );
};

export default HomePage;

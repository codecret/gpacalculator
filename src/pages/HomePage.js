import React from "react";
import MyTable from "../components/MyTable";
import { useEffect } from "react";
import ReactGA from "react-ga";

const HomePage = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <>
      <MyTable />
    </>
  );
};

export default HomePage;

import React from "react";
import { learnMoreLinks } from "../utils/links";
import One from "../assets/1.jpg";
import { Link } from "react-router-dom";
import ReactGA from "react-ga4";
import { useEffect } from "react";

const LearnMore = () => {
  ReactGA.send({
    hitType: "learnmore",
    page: "/learnMore",
    title: "Learn More",
  });

  return (
    <main className="learnMoreContainer">
      <h1>
        <mark>How to use ?</mark>
      </h1>
      <Link to={"/gpacalculator"}>Back</Link>
      {learnMoreLinks &&
        learnMoreLinks.map((link, key) => {
          const isLastItem = key === learnMoreLinks.length - 1;

          return (
            <div key={key} className="learnMoreSubContainer">
              <p>{link.title}</p>
              <img src={link.imgLink} alt={link.title} width={400} />

              {!isLastItem && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="currentColor"
                    d="M8.037 11.166L14.5 22.36c.825 1.43 2.175 1.43 3 0l6.463-11.195c.826-1.43.15-2.598-1.5-2.598H9.537c-1.65 0-2.326 1.17-1.5 2.6z"
                  />
                </svg>
              )}
            </div>
          );
        })}
    </main>
  );
};

export default LearnMore;

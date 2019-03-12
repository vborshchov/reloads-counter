import React from "react";
import timingInfo from "../../img/timing-overview.png";
import "../../css/about.scss";

const About = () => (
    <div className="about">
        <h2>Navigation Timing</h2>
        <p>
            <a href="http://www.w3.org/TR/navigation-timing/" target="_blank">
                Navigation Timing 
            </a>{" "}
            gives access to timing and navigation information for
            the overall document. Thus one can easily calculate
            where time is spent between the start of the navigation
            in the user agent until the end of the load event
            processing. The Web application can access timings for
            unloading the previous document, various HTTP redirects,
            domain lookup, connection to the server, etc.:
        </p>
        <img className="timing-info" src={timingInfo} />
    </div>
);

export default About;
 import React from "react";

const Footer = () => {
  var d = new Date();
  return (
    <div className="footer">
      <div className="copyright">
        <p>
          Copyright © Designed &amp; Developed by{" "}
          <a href="https://www.linkedin.com/in/saqib-rasheed/" target="_blank" rel="noreferrer">
            Saqib Rasheed
          </a>{" "}
          {d.getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Footer;

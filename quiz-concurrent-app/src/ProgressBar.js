import React from "react";

const ProgressBar = (props) => {
  const { bgcolor, completed, restartAnimation } = props;

  const containerStyles = {
    height: 20,
    width: "90%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    transition: restartAnimation ? "none" : "width 5s ease-in-out",
    borderRadius: "inherit",
    textAlign: "right",
    position: "relative",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  const gifImgStyle = {
    width: 70,
    height: 70,
    borderRadius: 50,
    // marginLeft: `${completed}%`,
    left: `${completed}%`,
    // transition: "width 5s ease-in-out",
    position: "absolute",
    top: -70,
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <img
          src="https://media4.giphy.com/media/3o7TKR1b2X2JqJ6JDW/giphy.gif?cid=ecf05e47uta5otpjdg2rwpfm2ko81ql63nxiepx1bxwmxqi3&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          style={gifImgStyle}
        />
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;

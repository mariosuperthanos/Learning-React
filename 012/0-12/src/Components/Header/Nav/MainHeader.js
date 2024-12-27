import Navigation from "./Navigation";
import classes from "./MainHeader.module.css";
import React from "react";
import Card from "../../UI/Card";

const MainHeader = ({}) => {
  return (
    <React.Fragment>
      <Navigation />
      <div className={classes["main-image"]}>
        <img src="meals.jpg" alt="Meal"></img>
      </div>
      <Card className={"card"}>The food is great</Card>
    </React.Fragment>
  );
};

export default MainHeader;

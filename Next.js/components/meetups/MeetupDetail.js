import { Fragment } from "react";
import classes from "./meetupDetails.module.css";

function MeetupDatials(props) {
  return (
    <Fragment>
      <img src={props.image} alt={props.title} className={classes.image} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </Fragment>
  );
}

export default MeetupDatials;

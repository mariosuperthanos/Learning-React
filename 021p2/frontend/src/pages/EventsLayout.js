import { Fragment, Suspense, React } from "react";
import EventsNavigation from './../components/EventsNavigation';
import { Outlet } from "react-router";

const EventsLayout = () => {
  return(
    <Fragment>
      <EventsNavigation />
        <Outlet />
    </Fragment>
  )
}

export default EventsLayout;
import { redirect } from "react-router";
import EventForm from "../components/EventForm"

const NewEventPage = () => {
  return (
    <EventForm method={'post'}/>
  )
}

export default NewEventPage;
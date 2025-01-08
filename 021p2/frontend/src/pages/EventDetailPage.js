import { Await, redirect, useRouteLoaderData } from "react-router";

import EventItem from './../components/EventItem';
import EventsList from "../components/EventsList";
import { Suspense } from "react";

const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent}/>}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents}/>}
        </Await>
      </Suspense>
    </>
  )
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch('http://localhost:8080/events/'+ id);

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;

  return {
    event: loadEvent(id),
    events:loadEvents()
  }
}

export const loaderDetails = async ({ request, params}) => {
  const id = params.eventId;

  const res = await fetch('http://localhost:8080/events/' + id);
  if(!res.ok) {
    throw new Response(JSON.parse({ message: 'Could not fetch details for selected event.'}), { status: 500 });
  } else{
    return res;
  }
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  const res = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method
  });

  if(!res.ok) {
    throw new Response(JSON.parse({ message: 'Could not delete event.'}), { status: 500 });
  }

  return redirect('/events');
}
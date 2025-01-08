// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditEventPage from "./pages/EditEventPage";
import NewEventPage from "./pages/NewEventPage";
// import EventsPage from "./pages/EventsPage";
import HomePage from "./pages/HomePage";
import EventDetailPage from "./pages/EventDetailPage";
import WrapperLayout from "./pages/WrapperLayout.js";
import EventsLayout from "./pages/EventsLayout.js";
import EventsPage from "./pages/Events.js";
// import { loaderFunction as eventsLoader } from "./pages/Events.js";
import ErrorPage from "./pages/Error.js";
import { action as updateAndAddAction } from "./components/EventForm.js";
import { action as deleteEventAction } from "./pages/EventDetailPage";
import NewsletterPage from "./pages/Newsletter.js";
import { action as newsletterAction } from "./pages/Newsletter.js";
import { loader } from "./pages/Events.js";
import { loader as loaderDetails } from "./pages/EventDetailPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WrapperLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "events",
          element: <EventsLayout />,
          children: [
            {
              index: true,
              element: <EventsPage />,
              loader: loader,
            },
            {
              path: ":eventId",
              id: "event-detail",
              loader: loaderDetails,
              children: [
                {
                  index: true,
                  element: <EventDetailPage />,
                  action: deleteEventAction,
                },
                {
                  path: "edit",
                  element: <EditEventPage />,
                  action: updateAndAddAction,
                },
              ],
            },
            {
              path: "new",
              element: <NewEventPage />,
              action: updateAndAddAction,
            },
          ],
        },
        {
          path: "newsletter",
          element: <NewsletterPage />,
          action: newsletterAction,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

// {
//   path: "events",
//   element: <EventsLayout />,
//   children: [
//     {
//       index: true,
//       async: true,
//       element: <EventsPage />,
//       loader: eventsLoader,
//     },

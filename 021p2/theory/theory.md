### Pre-fetching Data

Pre-fetching data refers to retrieving it before the page starts rendering, improving performance. This can be implemented by adding a function to the `loader` property of the specific route.

- React Router automatically parses the response that will be returned, so you don't have to use `await response.json()`.
- When you `throw` instead of `return`, the object won't be automatically parsed by React Router.

### Exemple:

```javascript
{
  index: true,
  element: <EventsPage />,
  loader: eventsLoader,
},

const eventsLoader = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return {isError: true, message: 'Could not fetch events.'}
    throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
      status: 500,
    });
  } else {
    return response;
  }
};
```

### `useLoaderData()` hook

`useLoaderData()` gets the data from the `loader function`. You can get the date from children or siblings with a `loader` function, but not from the parents!

### Error handling

### `Response` constructor vs normal object

`Response` constructor allows you to manipulate various aspects of the response, such as status, headers, and the body. A normal object, on the other hand, is a plain JavaScript object without these built-in methods and properties.

### Exemple:

I used Response constructor in order to be able to manually send an error when a wrong path is accesed(unlike 404, this error is not being handled by API).

```javascript
throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
  status: 500,
});
```

- by React Router, it's considered an error because it's being send with `throw`.
- it will buble up until the `first` errorElement

### Error handler component && `useRouteError()` hook

I made a function that get the error object using `useRouteError()` hook and, based on the error's status code it will chaange output data.

```javascript
// default values
let title = "An error occurred";
let message = "Something went wrong!";

if (error.status === 500) {
  // this is created manually by loader function
  message = JSON.parse(error.data).message;
}

if (error.status === 404) {
  // built-in React Router error
  title = "Not found!";
  message = "Could not find resource or page.";
}
```

I specified this component as error handler function inside of router:

```javascript
const router = createBrowserRouter([
{
  path: "/",
  element: <WrapperLayout />,
  errorElement: <ErrorPage />,
  children: [
    { index: true, element: <HomePage /> },
```

### `useRouteLoaderData(id)` hook

`useRouteLoaderData(id)` allows you to access a parent's `louder` function by specifing its `id`.

### Exemple:

```javascript
{
  path: ":eventId",
  id: 'event-detail',
  loader: loaderDetails,
  children: [
    {
      index: true,
      element: <EventDetailPage />,
    },
    { path: "edit", element: <EditEventPage /> },
  ],
},
```

In order to get loaderDetails:

```javascript
const EditEventPage = () => {
  const data = useRouteLoaderData('event-detail');
  //...
```

### `params` in loader function

In order to access `params` inside of loader function you have to destructure the object parameter into `request` and `params`.

```javascript
const loaderDetails = async({ request, params });
```

### `action`

The `action` property requires a function that makes a request to the server. Similar to how the `loader` function works, the `action` function can accept two parameters: `request` and `params`. The `request` parameter contains details such as the HTTP `method` and the request `body`.

```js
{
  index: true,
  element: <EventDetailPage />,
  action: deleteEventAction
},
```

### Sending a 'POST' request with form data:

To send a `POST` request, I replaced the standard `<form>` tag with the `<Form>` component from React Router and set the `method` attribute to 'POST'.

```js
<Form method='post' className={classes.form}>
```

To access the form data inside the `action` function, I used the `.formData()` method from the `request` object. I extracted each field using `.get()` and populated the `eventData` object with these values:

```js
const action = async ({ request, params }) => {
  const data = await request.formData();

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };
};
```

To redirect the user after the request is completed, I used:

```js
return redirect("/events");
```

### Sending a 'DELETE' request:

For the `DELETE` request, I attached the `deleteEventAction` function to the `action` property. Inside the component, I declared a `submit` function using the `useSubmit()` hook, which triggers the action.

```js
const submit = useSubmit();
submit(null, { method: "delete" });
```

- The `null` here represents the body of the request (empty in this case).

Inside the `action` function, I accessed the method specified in the request object:

```js
method: request.method;
```

### 1. Corrected PATCH Request Handling

In the following code, the URL is set dynamically based on the request method. If the method is `PATCH`, the URL is modified to target a specific event based on the event ID inside the `action` function that also add an event to the backend.

```js
let url = "http://localhost:8080/events";

if (method === "PATCH") {
  const eventId = params.eventId; // Ensure this exists in params
  url = `http://localhost:8080/events/${eventId}`; // Template literals for cleaner concatenation
}
```

### 2. Passing `method` as a Prop to Your React Component

Make sure to pass the `method` as a prop to the form. The form component should look like this:

```jsx
<Form method={method} className={classes.form}>
```

### `useActionData()` hook

useActionData() is a hook from React Router that allows you to access the data returned from an action (usually a mutation or form submission) associated with a route. By default, it's current route.

### `useFetcher()`;

In order to prevent the default route change associated with Form action I used `useFetcher()` hook.

```js
function NewsletterSignup() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(()=> {
    if(state === 'idle' && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state])

  return (
    <fetcher.Form method="post" action='/newsletter'
```

### Rendering component before data arrives:
This function return a `promise`(because loadEvents is async and i didn't `await` it).
```js
export function loader() {
  return {
    events: loadEvents(),
  };
}
```

In the EventsPage component, I used the useLoaderData() hook to access the returned promise. The `<Suspense>` component renders a fallback UI (in this case, a loading message) until the content inside it is ready. The `<Await>` component waits for the promise passed to its `resolve` prop to resolve, and then it renders the EventsList component with the resolved data.

```js
function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}
```
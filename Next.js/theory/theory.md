# Defining Routes in Next.js

Here are some short rules for defining routes in the `pages` folder:

## 1. File Name = Route Path
The file name inside the `pages` folder determines the route.  
- Example: `pages/about.js` → `/about`  

## 2. Dynamic Routes
Use square brackets for dynamic segments.  
- Example: `pages/blog/[id].js` → `/blog/:id`  

## 3. Nested Routes
Create subfolders to define nested routes.  
- Example: `pages/blog/posts.js` → `/blog/posts`  

## 4. Index Route
A file named `index.js` in a folder maps to the root of that folder.  
- Example: `pages/index.js` → `/`  
- Example: `pages/blog/index.js` → `/blog`  

## 5. API Routes
Files in `pages/api` are treated as API endpoints.  
- Example: `pages/api/hello.js` → `/api/hello`  

## 6. Catch-All Routes
Use `[...name].js` for catch-all segments.  
- Example: `pages/blog/[...slug].js` → `/blog/*`  

## 7. Optional Catch-All
Use `[[...name]].js` for optional catch-all segments.  
- Example: `pages/blog/[[...slug]].js` → `/blog` or `/blog/*`  

## Folder Structure Example

```bash
/pages
  /index.js
  /about.js
  /blog
    /index.js
    /[id].js
    /[...slug].js
  /api
    /hello.js
```

### URL information such as query
Getting access to URL informations:
```js
const router = useRouter();
console.log(router.query);
```

### Navigate between pages
```js
<Link href="/path"
```
Another way of doing this is by using `useRouter()`:
```js
const router = useRouter();

function onClickHandler() {
  router.push('/' + props.id)
}
```

### Adding a wrapper layout:
To add a wrapper layout, I wrap the `<Layout />` component around the component from `_app.js`:
```js
function MyApp({ Component, pageProps }) {
  return( 
  <Layout>
    <Component {...pageProps} />
  </Layout>
  )
}
```

### Next.js and render cylces
During the first render cycle, Next.js generates only an HTML page, without waiting for the query to finish. As a result, the array will be empty. In the second render cycle, the page will rerender with the data from the query. This can make a bad UX
```js
const HomePage = () => {
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  const getMeetups = useQuery({
    queryKey: ['meetups'],
    queryFn: () => {
      setLoadedMeetups(DUMMY_MEETUPS);
    }
  })

  return(
    <MeetupList meetups={DUMMY_MEETUPS} />
  )
}
```

### Pre-rendering the page
To address the bad UX issue, there are two solutions:
  - `SSG` by using `getStaticProps()`: This is a function that runs before the first render cycle and returns an object. The returned object is then passed to a specific component as the `props` parameter, allowing it to access the data. You can make it `ISR` by usign revalidate property inside `getStaticProps()` function. This represents the number of seconds after the data will be updated on the server.
  - dynamic data fetching by using `getServerSideProps(context)`. This function will be called dynamically whenever the user make a req. `req` and `res` objects can be accesed like this:

  ```js
  export async function getServerSideProps(context) {
    const { req, res } = context;
    
    // fetch data from API(this is the res)
    return {
      props: {
        meetups: DUMMY_MEETUPS
      },
    }
  }
  ```

### `getStaticProps()` on dynamic pages
When using `getStaticProps()` on a dynamic page, you may encounter an error because Next.js does not know which pages with specific `meetupId` values should be pre-generated.

```js
export async function getStaticProps(context) {
  // Fetch data for a single meetup

  const meetupId = context.params.meetupId;

  console.log(meetupId);

  return {
    props: {
      meetupData: {
        // some data
      },
    },
  };
}
```

In order to solve this problem, I added `getStaticPaths()` where I specified 2 things:
  - `paths` property, it specifies what paths will be pre-generated
  - `fallback` boolean property, decides if the user access a unspecified dynamic route, it will show a `404` error or it should generate it dynamically.
  ```js
  export async function getStaticPaths() {
    return {
      fallback: 'blocking',
      paths: [
        {
          params: {
            meetupId: "m1",
          },
        },
        {
          params: {
            meetupId: "m2",
          },
        },
      ],
    };
  }
  ```

### API routes
I created a folder `app/api` where I stored subfolders with path's name that contain `route.js` file. This allows me to have function names that correspons with the HTTP method(GET, POST, etc.). The response was send with `return NextResponse.json({ data },{ status })`.
I access the body by using `req.json()`

```js
export async function POST(req) {
  const data = await req.json();
  
  // const { title, image, address, description } = data;

  const client = await MongoClient.connect('mongodb+srv://david1bargianu:IZSNk4qSavwqaCKE@cluster0.a6hho.mongodb.net/meetups?retryWrites=true&w=majority');
  
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const result = await meetupsCollection.insertOne({data});

  client.close();

  return NextResponse.json(
    { data: result},
    { status: 200 }
  );
}
```

### API routes vs pre-rendering
The code that retrieves data from the database for pre-rendering should be placed inside getStaticProps() for better performance, rather than using an API route. Next.js won't show the credentials, so it's safe.

### Metadata: title & description
This can be done by adding the built-in `Head` component
``` js
<Head>
  <title>React Meetups</title>
  <meta
    name="description"
    content="Browse a huge list of highly active React meetups!"
  />
</Head>
```

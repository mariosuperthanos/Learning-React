### What I Did

I created a router for a React app using `createBrowserRouter` from `react-router-dom`. 

- **Root Route (`/`)**: Wrapped with `RootLayout`, which provides the main navigation.
- **Child Routes**:
  - `/`: Renders `HomePage`.
  - `/products`: Renders `ProductsPage`.

### Code
```javascript
const router = createBrowserRouter([
  { 
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/products', element: <ProductsPage /> }
    ]
  },
]);

```

### What is `<Outlet />`?

`<Outlet />` from `react-router-dom` is a placeholder that renders child routes inside a parent layout.

### How It Works
- In the `RootLayout`, `<Outlet />` determines where the content from child routes will appear.
- It allows the parent layout (e.g., navigation and consistent structure) to stay the same while dynamically displaying child components based on the current route.

### Example:
In the wrapper layout component:
```javascript
const RootLayout = () => {
  return (
    <Fragment>
      <MainNavigation />
      <main className={classes.content}>
        <Outlet />
      </main>
    </Fragment>
  )
}
```

### `<Link />` tag
`<Link />` is a component from `react-router-dom` used to create navigational links in React applications. It allows users to navigate between routes without reloading the page, enabling seamless single-page application (SPA) behavior.

### Key Features
- **Prevents Full Page Reloads:** Uses client-side routing to update the URL and render components without refreshing the browser.
- **Dynamic Navigation:** Automatically matches the `to` prop to a route defined in your router configuration.
- **SEO-Friendly:** Supports proper URLs for bookmarking and sharing.

### Example
```javascript
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
    </nav>
  );
};
```

### `errorElement` property
It enables rendering an error page when the path is unavailable.

### Exemple:

``` javascript
const router = createBrowserRouter([
  { 
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/products', element: <ProductsPage /> }
    ]
  },
])
```

### `<NavLink />` tag
`<NavLink />` is a component from `react-router-dom` that works like `<Link />` but adds styling or classes automatically based on whether the link is active. It’s useful for highlighting the current page in navigation menus. The `end` attribute used with a NavLink makes the link active only when the exact path matches the current route.

``` javascript
<NavLink to='/' className={({isActive}) => isActive ? classes.active: undefined} end>Home</NavLink>
```

### Dynamic routes
Dynamic routes in React allow you to define paths with variables, enabling the rendering of components based on changing values in the URL, such as user IDs or product names.

``` javascript
{ path: '/products/:productId', element: <ProductDetailPage />}
```

Accessing the `productId` value:

``` javascript
const params = useParams();
```
`params` is an object that contains all of the URL dynamic parameters.

### `useNavigate()` hook
This hook can be use to change to a specific path
### Exemple:
``` javascript
const navigate = useNavigate();

const navigateHandler = () => {
  navigate('products');
}
```

### Absolute vs Relative paths
- **Absolute paths** contain `/`, indicating that they are rooted at the base of the website or application. These paths always start from the root directory, regardless of the current location in the app

- **Relative paths** are defined in relation to the current path or the parent route. They do not start from the root directory but instead navigate based on the current location of the app

### Paths attributes
- `to='..'` change the URL, deleting the current route.
### Exemple:
``` javascript
{ 
  path: '/',
  element: <RootLayout />,
  errorElement: <ErrorPage />,
  children: [
    { path: '', element: <HomePage /> },
    { path: 'products', element: <ProductsPage /> },
    { path: 'products/:productId', element: <ProductDetailPage />}
  ]
}
```

If the current path is `products/:productId`, using `to='..'` will navigate you to the root. To remove only `:productId`, I set the `relative='path'` attribute. By default, the `relative` attribute is set to `'route'`.

### Index route
- An index route in React Router is a special type of route that serves as the default child route for a parent route.

### Exemple:
``` javascript
{ index: true, element: <HomePage /> },
```
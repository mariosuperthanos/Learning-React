
# Redux Thunk Logic in `sendCartData`

## Overview

This example demonstrates the use of Redux Thunk to handle asynchronous actions in a Redux-based application. The `sendCartData` function is designed to send cart data to a Firebase backend, update the Redux store with notifications about the request status, and handle potential errors.

---

## Key Concepts

### What is Redux Thunk?
Redux Thunk is a middleware for Redux that allows you to:
- Dispatch functions instead of plain objects.
- Perform asynchronous operations (e.g., HTTP requests).
- Dispatch multiple actions at different stages of a process.

In this example, Redux Thunk enables `sendCartData` to handle an asynchronous HTTP request while managing different states (`pending`, `success`, `error`).

---

## `sendCartData` Logic

### Function Signature
```javascript
export const sendCartData = (cart) => {
  return async (dispatch) => { ... };
};
```

### Step-by-Step Logic

1. **Dispatch Initial Notification (`pending`):**
   ```javascript
   dispatch(
     showActions.showNotification({
       staus: "pending",
       title: "Sending...",
       message: "Sending cart data!",
     })
   );
   ```
   - Sends a notification to inform the user that the request is in progress.

2. **Define the Request Logic:**
   ```javascript
   const sendRequest = async () => {
     const response = await fetch(
       "https://redux-e4b30-default-rtdb.europe-west1.firebasedatabase.app/car.json",
       { method: "PUT", body: JSON.stringify(cart) }
     );

     if (!response.ok) {
       throw new Error("Sending data failed!");
     }
   };
   ```
   - Prepares an asynchronous function to send the HTTP `PUT` request to the Firebase backend.
   - Throws an error if the request fails.

3. **Handle the Request in a `try-catch` Block:**
   - **On Success:**
     ```javascript
     await sendRequest();
     dispatch(
       showActions.showNotification({
         status: "success",
         title: "Success!",
         message: "Sent cart data successfully!",
       })
     );
     ```
     - Executes the request and dispatches a success notification if it succeeds.

   - **On Error:**
     ```javascript
     catch (err) {
       dispatch(
         showActions.showNotification({
           status: "error",
           title: "Error!",
           message: "Sending cart data failed!",
         })
       );
     }
     ```
     - Catches any errors and dispatches a failure notification.

---

## Advantages of Using Redux Thunk

1. **Asynchronous Flow Management:**
   - Handles HTTP requests directly in the Redux action.
   - Manages different states (`pending`, `success`, `error`) seamlessly.

2. **Separation of Concerns:**
   - Keeps components clean by delegating business logic to Redux actions.
   - UI components only need to dispatch the action.

3. **Flexible Dispatch:**
   - Enables multiple `dispatch` calls at different stages of the operation.

---

## How to Use
Call the action like this:
```javascript
dispatch(sendCartData(cart));
```

---

## Summary
The `sendCartData` function utilizes Redux Thunk to handle:
1. Dispatching multiple actions.
2. Performing an asynchronous request.
3. Managing success and error states.

This approach keeps the application organized, efficient, and easy to maintain.

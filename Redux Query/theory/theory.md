### `thunk` async functions in redux toolkit

A thunk is a mechanism for handling asynchronous operations. Since asynchronous operations cannot be directly executed within reducers, thunks provide a way to manage these operations outside of them. In this example, createAsyncThunk accepts three parameters:
  - The name: `'data/fetchData'`, which is the action's type.
  - An asynchronous function that receives the following parameters:
    - `arg`: represent the argument will be passed when the thunk is being dispatched.
    - `condition`: condition: Allows access to the condition, which will be defined as `another parameter`.


```js
export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (arg, { rejectWithValue, condition }) => {
    if (condition()) {
       const response = await axios.get(`/api/data/${arg}`);
       return response.data;
    }
    return rejectWithValue('Condition failed');
  },
  {
    condition: (arg, { getState }) => {
      const state = getState();
      return !state.data.loading;
    }
  }
);
```

### Calling the thunks:
```js
import { useDispatch } from 'react-redux';
import { fetchData } from './actions'; // Aici este importat thunk-ul

const MyComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData(123));
  }, [dispatch]);

  //...
};
```

### Handling the thunk state using `extraReducers`:
Managing thunk state can be done by chaining `addCase` methods on the builder object. The 4 states are: `pending`, `fulfilled`, `rejected`, `idle`(no ongoing async opperation).
```js
const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    loading: false,
    error: null,
    status: '',
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendData.pending, (state) => {
        state.status = 'sending';
        state.error = null;
      })
      .addCase(sendData.fulfilled, (state, action) => {
        state.status = 'success';
      })
      .addCase(sendData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
```

### Redux Toolkit Query

```js
export const postsApiSlice = createApi({
  // the name
  reducerPath: "posts",
  // the base url
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => {
    return {
      getPosts: builder.query({
        // the route that will be added to baseUrl
        query: () => "/posts",
      }),
      getPostById: builder.query({
        query: (id) => `/posts/${id}`,
      }),
    };
  },
});

export const { useGetPostsQuery, useGetPostByIdQuery } = postsApiSlice;
```

Connect it to storage:
```js
export const store = configureStore({
  reducer: {
    [postsApiSlice.reducerPath]: postsApiSlice.reducer
  },
  middleware: (getDefaultMiddlewere) => {
    return getDefaultMiddlewere().concat(postsApiSlice.middleware);
  }
});
```

Calling it in a component:
```js
import { useGetPostsQuery } from "../state/posts/postsApiSlice";

const PostsLists = () => {
  const {data: posts, isLoading, isError} = useGetPostsQuery({});

  if(isLoading) {
    return <div>isLoading</div>
  }

  if(isError) {
    return <div>Error...</div>
  }

  //...
}
```


### Mutation
Creating a mutation

```js
createPost: builder.mutation<Post, Omit<Post, 'id'>>({
  query: (post) => ({
    url: '/posts',
    method: 'POST',
    body: post,
  })
})
```

Defining and calling it inside the component:

```js
const PostsLists = () => {
  const [createPostMutation, {isLoading: isCreatingPost}] = useCreatePostMutation();

  return (
    <button onClick={() => {
      const post = {title: 'My new post'};
      createPostMutation(post);
    }}>{isCreatingPost ? "Creating" : "Create Post"}</button>
  )
}
```
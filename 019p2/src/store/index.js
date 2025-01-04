import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const redux = require('redux');
const initialState= {counter:0, showCounter: true};

createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment() {},
    decrement() {},
    increase() {},
    toggleCounter() {}

  }
})

const reducer = (state= initialState, action) =>{
  if(action.type === 'increment'){
    return{
      counter: state.counter + 1,
      showCounter: state.showCounter
    }
  }
  if(action.type==='increase'){
    return{
      counter: state.counter + action.amount,
      showCounter: state.showCounter
    }
  }
  if(action.type === 'decrement'){
    return{
      counter: state.counter - 1,
      showCounter: state.showCounter
    }
  }
  if(action.type==='toggle'){
    return{
      showCounter: !state.showCounter,
      counter: state.counter
    }

  }
  return state;
}

const store = configureStore({reducer});

export default store;
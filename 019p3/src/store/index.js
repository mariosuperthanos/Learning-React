import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

import counterSlice from './counter';
import authSlice  from './auth';
import counterReducer from './counter';
import authReducer from './auth';


// const reducer = (state= initialState, action) =>{
//   if(action.type === 'increment'){
//     return{
//       counter: state.counter + 1,
//       showCounter: state.showCounter
//     }
//   }
//   if(action.type==='increase'){
//     return{
//       counter: state.counter + action.amount,
//       showCounter: state.showCounter
//     }
//   }
//   if(action.type === 'decrement'){
//     return{
//       counter: state.counter - 1,
//       showCounter: state.showCounter
//     }
//   }
//   if(action.type==='toggle'){
//     return{
//       showCounter: !state.showCounter,
//       counter: state.counter
//     }

//   }
//   return state;
// }



const store = configureStore({
  reducer: {
    // 'counter' is the key name used to reference the reducer from counterSlice. This name is also used to acces this specific slice data from store.
    counter: counterReducer,
    auth: authReducer
  }
});


export default store;
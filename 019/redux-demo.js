const redux = require('redux');

const counterReducer = (state = { counter: 0 }, action) => {
  if(action.type==='increment' ){
    return{
      counter: state.counter + 1
    }
  } else if(action.type==='decrement' ){
    return{
      counter: state.counter - 1
    }
  }

  return state;
}

// counterReducer is being called
const store = redux.createStore(counterReducer)

console.log(store.getState())

const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState)
}

store.subscribe(counterSubscriber);

// it needs a type property
store.dispatch({ type: 'increment' })
store.dispatch({ type: 'decrement' })
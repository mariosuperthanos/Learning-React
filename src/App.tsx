import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import TodosContextProvider from './store/todos-context';

function App() {
  // const todos: Todo[] = [
  //   {
  //     id:'i1',
  //     text: 'Learning React'
  //   },
  //   {
  //     id:'i2',
  //     text: 'Learning Typescript'
  //   }
  // ];

  return (
    <TodosContextProvider>
      <NewTodo/>
      <Todos/>
    </TodosContextProvider>
  );
}

export default App;

import React from "react";
import Item from "./Item";
import classes from './Todos.module.css'
import { useContext } from "react";
import { TodosContext } from "../store/todos-context";



const Todos: React.FC = () => {
  const todosCtx = useContext(TodosContext);

  // I have used the bind method because I didn't have access to id prop in Item component, but I had access in this component
  return (
    <ul className={classes.todos}>
      {todosCtx.items.map((item) => (
        <Item key={item.id} text={item.text} onDeleteHandler={todosCtx.removeTodo.bind(null, item.id)} />
      ))}
    </ul>
  );
};


export default Todos;

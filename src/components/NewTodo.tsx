import React, { useRef, useContext } from "react";
import classes from './NewTodo.module.css'
import { TodosContext } from "../store/todos-context";

const NewTodo: React.FC = () => {
  const todosCtx = useContext(TodosContext);

  // the ref has to specify the HTML interface and the default value
  const todoTextInputRef = useRef<HTMLInputElement>(null);
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = todoTextInputRef.current!.value;

    if(enteredText.trim().length === 0) {
      // throw an error
      return;
    }

    todosCtx.addTodo(enteredText);
  }

  return(
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor="text">Todo text</label>
      <input type="text" id='text' ref={todoTextInputRef}/>
      <button>Add Todo</button>
    </form>
  )
}

export default NewTodo;
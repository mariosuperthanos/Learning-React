import Todo from "../models/todo";
import React, { useState } from "react";

interface TodosContextObj {
  items: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
}

export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  addTodo: () => {},
  removeTodo: (id: string) => {},
});

const TodosContextProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const onAddTodoHandler = (todoText: string) => {
    const newTodo: Todo = {
      id: Math.random().toString(36).substr(2, 9),
      text: todoText,
    };

    setTodos((prevState) => [...prevState, newTodo]);
  };

  const deleter = (todoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };

  const contextValue: TodosContextObj = {
    items: todos,
    addTodo: onAddTodoHandler,
    removeTodo: deleter,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider
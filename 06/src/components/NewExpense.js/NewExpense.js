import { useState } from "react";
import './NewExpense.css';
import ExpenseForm from "./ExpenseForm";
import ExpenseDate from "../Expenses/ExpenseDate";

const NewExpense = ({ onAddExpense }) => {
  const saveExpenseDataHandler = (entredExpenseData) => {
    const expenseData = {
      ...entredExpenseData,
      id: Math.random().toString()
    };

    // pasing the data up pattern:
    //  1) create a funciton inside the parent component and pass into child via props
    //  2) call the function
    // the function is called inside the child component but it is executed inside the parent component 
    onAddExpense(expenseData);
    // console.log(expenseData)
  }

  return (
    <div className="new-expense">
      <ExpenseForm onSaveExpenseData={saveExpenseDataHandler}/>
    </div>
  )
}

export default NewExpense;
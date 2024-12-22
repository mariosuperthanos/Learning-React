import { use, useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = ({ onSaveExpenseData }) => {
  // onChange calls a function that update state based on the current input value
  // value is an attribute to modify the behaviour of the form -> reset & prevent invalid data

  // onSubmit is a form handler that is triggered when WHOLE the form is submitted(all the inputs)

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState(new Date());

  // const [userInput, setUserInput] = useState({
  //   enteredTitle: '',
  //   enteredAmount: '',
  //   enteredDate: ''
  // })

  const titleChangeHandler = (event) => {
    // setUserInput({
    //   ...userInput,
    //   enteredTitle: event.target.value,
    // })

    // setUserInput((prevState)=>{  // if the state update depends on the previous date:
    //   return {
    //     ...prevState,
    //     enteredTitle: event.target.value
    //   }
    // })
    setEnteredTitle(event.target.value); // the current value of the input
  };
  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value); // the current value of the input
    // setUserInput({
    //   ...userInput,
    //   enteredAmount: event.target.value,
    // })
  };
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value); // the current value of the input
    // setUserInput({
    //   ...userInput,
    //   enteredDate: event.target.value,
    // })
  };

  // const inputChangeHandler = (identifier, value) => {
  //   if(identifier ==='title'){
  //     setEnteredTitle(value)
  //   } else if(identifier==='date'){
  //     setEnteredDate(value)
  //   } else{
  //     setEnteredAmount(value)
  //   }
  // }

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
    }

    onSaveExpenseData(expenseData);

    // reset the state, then the field via value attribute
    setEnteredAmount('');
    setEnteredDate('');
    setEnteredTitle('');
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            onChange={titleChangeHandler}
            value={enteredTitle}
          ></input>
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          {/* onChange is a way of getting input data */}
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2023-12-31"
            onChange={dateChangeHandler}
          ></input>
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;

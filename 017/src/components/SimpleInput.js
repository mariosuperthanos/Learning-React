import { useEffect, useState } from "react";

import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  // implementation using custom hook
  const {
    value: enteredName,
    valueIsValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameField
  } = useInput((val) => {
    return val.trim() !== "";
  });

  const {
    value: enteredEmail,
    valueIsValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailField
  } = useInput((val) => {
    return val.includes('@');
  });

  // const [enteredName, setEnteredName] = useState(""); // input current value
  // const [enteredNameTouched, setEnteredNameTouched] = useState(false); // verify if the input was touched

  // // if the state can be calculated with a var, avoid it and store it in a var
  // const enteredNameIsValid = enteredName.trim() !== "";
  // const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const formIsValid = enteredNameIsValid && enteredEmailIsValid;

  // // DON'T DO THAT, the changes to local vars inside useEffect will be lost, because it is applied after rerender
  // useEffect(() => {
  //   console.log(enteredNameIsValid);
  //   console.log(enteredNameIsValid === true)
  //   if(enteredNameIsValid === true) {
  //     formIsValid = true;
  //   } else{
  //     formIsValid = false;
  //   }
  // }, [enteredName]);

  // const nameInputChangeHandler = (event) => {
  //   setEnteredName(event.target.value);
  // };

  // const nameInputBlurHandler = (event) => {
  //   // setEnteredName(event.target.value);
  //   setEnteredNameTouched(true);
  // };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid) {
      nameBlurHandler();
    } else {
      resetNameField();
      resetEmailField();
    }
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          value={enteredName}
          onBlur={nameBlurHandler}
        />
      </div>
      {nameInputHasError && (
        <p className="error-text">Name must not be empty.</p>
      )}
      <div className={nameInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="text"
          id="email"
          onChange={emailChangeHandler}
          value={enteredEmail}
          onBlur={emailBlurHandler}
        />
      </div>
      {emailInputHasError && (
        <p className="error-text">Email must contain '@'.</p>
      )}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

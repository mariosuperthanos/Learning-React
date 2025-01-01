import useInput from "../hooks/inputHook"
import useHTTP from "../hooks/HTTPhook";

import classes from './form.module.css';
import { useEffect } from "react";

const Form = ({ statusSetter }) => {
  const {
    currentValue: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    updateCurrentValue: nameChangeHandler,
    blurHandler: nameBlurHandler,
    reset: resetNameField
  } = useInput((val) => {
    return val.trim() !== "";
  });

  const {
    currentValue: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    updateCurrentValue: streetChangeHandler,
    blurHandler: streetBlurHandler,
    reset: resetStreetField
  } = useInput((val) => {
    return val.trim() !== "";
  });

  const {
    currentValue: enteredPostal,
    isValid: enteredPostalIsValid,
    hasError: postalInputHasError,
    updateCurrentValue: postalChangeHandler,
    blurHandler: postalBlurHandler,
    reset: resetPostalField
  } = useInput((val) => {
    return /^\d+$/.test(val.trim());
  });

  const allInputsAreValid = enteredNameIsValid && enteredPostalIsValid && enteredStreetIsValid;

  const buttonClass = allInputsAreValid ? classes.active : '';
  const isLoadingText = <p>Sending the order...</p>
  const successText = <p>Successfully sent the order!</p>

  const {isLoading, error, sendRequestes} = useHTTP();

  useEffect(()=> {
    console.log(isLoading);
    if(isLoading){
      statusSetter(isLoadingText)
    }
  }, [isLoading])

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    sendRequestes({
      url: 'https://practice-project-018-default-rtdb.europe-west1.firebasedatabase.app/.json',
      method: 'POST',
      body: {
        name: enteredName,
        street: enteredStreet,
        postalCode: enteredPostal
      },
      test: false
    }, () => statusSetter(successText))

    resetNameField();
    resetStreetField();
    resetPostalField();
  }
  

  return(
    <form onSubmit={formSubmissionHandler}>
      <div className={classes.control} >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          value={enteredName}
          onBlur={nameBlurHandler}
        />
      </div>
      {nameInputHasError && (
        <p className="error-text">Name must not be empty!</p>
      )}
      <div className={classes.control}>
        <label htmlFor="email">Street</label>
        <input
          type="text"
          id="email"
          onChange={streetChangeHandler}
          value={enteredStreet}
          onBlur={streetBlurHandler}
        />
      </div>
      {streetInputHasError && (
        <p className="error-text">Street must not be empty!</p>
      )}
      <div className={classes.control}>
        <label htmlFor="email">Postal code</label>
        <input
          type="text"
          id="email"
          onChange={postalChangeHandler}
          value={enteredPostal}
          onBlur={postalBlurHandler}
        />
      </div>
      {postalInputHasError && (
        <p className="error-text">Postal code must not be empty!</p>
      )}
      {error !== '' && <p>{error}</p>}
      <div className={classes.actions}>
        <button disabled={!allInputsAreValid || isLoading} >Confirm</button>
      </div>
    </form>
  )
}

export default Form;
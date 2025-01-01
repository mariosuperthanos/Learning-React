import useInputTest from "../hooks/use-inputTest";
import "./../index.css";

const BasicForm = (props) => {
  const {
    currentValue: enteredFirstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    updateCurrentValue: updateFirstName,
    blurHandler: blurFirstName,
    reset: resetFirstName,
  } = useInputTest((val) => val.trim() !== "");

  const {
    currentValue: enteredLastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    updateCurrentValue: updateLastName,
    blurHandler: blurLastName,
    reset: resetLastName,
  } = useInputTest((val) => val.trim() !== "");

  const {
    currentValue: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    updateCurrentValue: updateEmail,
    blurHandler: blurEmail,
    reset: resetEmail,
  } = useInputTest((val) => val.includes("@"));

  const allInputsAreValid = emailIsValid && lastNameIsValid && firstNameIsValid;

  const submitHandler = (e) => {
    e.preventDefault();

    if(allInputsAreValid) {
      resetEmail();
      resetFirstName();
      resetLastName();
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className="form-control">
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            value={enteredFirstName}
            onChange={updateFirstName}
            onBlur={blurFirstName}
            id="name"
          />
          {firstNameHasError && <p className="error-text">This field must not be empty!</p>}
        </div>
        <div className="form-control">
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            value={enteredLastName}
            onChange={updateLastName}
            onBlur={blurLastName}
            id="name"
          />
          {lastNameHasError && <p className="error-text">This field must not be empty!</p>}
        </div>
      </div>
      <div className="form-control">
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          value={enteredEmail}
          onChange={updateEmail}
          onBlur={blurEmail}
          id="name"
        />
        {emailHasError && <p className="error-text">This field must not be empty!</p>}
      </div>
      <div className="form-actions">
        <button className="button" disabled={!allInputsAreValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;

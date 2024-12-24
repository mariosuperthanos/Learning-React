import { useState } from "react";

import styles from "./AddUser.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModel from "../UI/ErrorModal";
import validator from "../UI/validatorFunction";

const AddUser = ({ addUserHandler }) => {
  const [inputData, setInputData] = useState({
    'username': '',
    'age': ''
  });
  const [error, setError] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    const errorObj = validator(inputData);
    // verify inputed data
    if(Object.keys(errorObj).length !== 0){
      setError(errorObj);
      return; // the data won't be send to app => won't be updated
    }
    addUserHandler(inputData["username"], inputData["age"]);
    setInputData({
      username: "",
      age: "",
    });
  };

  const changeHandler = (e) => {
    const id = e.target.id === undefined ? "" : e.target.id;
    const value = e.target.value;
    setInputData((prev) => {
      return { ...prev, [id]: value };
    });
  };

  const errorHandlerReseter = () => {
    setError({});
  };

  return (
    <>
      {/* we dont have to implement a hide class in css to hide the button because 
      of the conditional rerender */}
      {Object.keys(error).length !== 0
        && (
        <ErrorModel
          title={error.title}
          message={error.message}
          onConfirm={errorHandlerReseter} // attach a reset function to error model with passing data up pattern
        />
      )}
      <Card className={styles["input"]}>
        <form onSubmit={onSubmit} className={styles["custom-form"]}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={changeHandler}
              value={inputData["username"] || ""}
            />
          </div>
          <div>
            <label htmlFor="age">Age (years)</label>
            <input
              type="number"
              id="age"
              onChange={changeHandler}
              value={inputData["age"] || ""}
            />
          </div>
          <Button type="submit" className={styles["custom-button"]}>
            Add User{" "}
          </Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;

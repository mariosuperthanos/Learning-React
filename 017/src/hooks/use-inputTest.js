import { useState } from "react"

const useInputTest = (validatorFunc) => {
  const [currentValue, setCurrentValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validatorFunc(currentValue);
  const hasError = !isValid && isTouched;

  const updateCurrentValue = (event) => {
    setCurrentValue(event.target.value);
  }

  const blurHandler = () => {
    // i want to tell the user that his input is wrong after he had the change to focus on the input
    setIsTouched(true);
  }

  const reset = () => {
    setCurrentValue('');
    setIsTouched(false);
  }

  return{
    currentValue,
    isValid,
    hasError,
    updateCurrentValue,
    blurHandler,
    reset
  }
}

export default useInputTest;
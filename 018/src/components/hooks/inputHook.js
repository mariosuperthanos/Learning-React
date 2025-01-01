import { useState } from "react"

const useInput = (validatorFunc) => {
  const [currentValue, setCurrentValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validatorFunc(currentValue);
  const hasError = !isValid && isTouched;

  const blurHandler = () => {
    setIsTouched(true);
  }

  const updateCurrentValue = (event) => {
    setCurrentValue(event.target.value);
  }

  const reset = () => {
    setCurrentValue('');
    setIsTouched(false);
  }

  return {
    currentValue,
    isValid,
    hasError,
    blurHandler,
    updateCurrentValue,
    reset
  }
}

export default useInput;
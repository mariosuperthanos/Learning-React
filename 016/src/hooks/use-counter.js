import { useState, useEffect } from "react";

const useCounter = (forwards = true) => {
  const [counter, setCounter] = useState(0);
  
  // setInterval continues to run and executes the function multiple times at regular intervals, even if the component re-renders even with useEffect. 
  // It must be cleared with clearInterval on unmount to prevent memory leaks. 
  // setTimeout executes the function only once after a specified delay. If the component re-renders, the timer won't reset.
  // It should be cleared with clearTimeout if the component unmounts before the time expires.
  useEffect(() => {
    const interval = setInterval(() => {
      if(forwards) {
        setCounter((prevCounter) => prevCounter + 1);
      } else{
        setCounter((prevCounter) => prevCounter - 1)
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [forwards]);

  return counter;
}

export default useCounter;
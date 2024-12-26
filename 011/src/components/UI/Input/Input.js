import React, { useEffect, useRef, useImperativeHandle } from 'react';

import classes from './Input.module.css';


// React.forwardRef allows using ref as an argument
// in this case, the ref represents:  ref={emailInputRef}  from Login.js
const Input = React.forwardRef((props, ref) => {
  // you need useRef to set the focus on an input dynamicaly
  const inputRef = useRef(); 

  const activate = () => {
    inputRef.current.focus();
  }

  // customizes what the parent component can access via the ref passed to this child component.
  useImperativeHandle(ref, () => {
    // This object defines the methods or properties available through the ref
    return {
      focus: activate  // Expose `focus` method, which calls `activate`
    };
  })

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{ props.label }</label>
      <input
        ref={inputRef}  // it modify the value of the inputRef based on the current input DOM object's data
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
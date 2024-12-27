import React from "react";

import MyParagraph from "./MyParagraph";

const DemoOutput = ({ show }) =>{
  console.log('DemoOutput RUNNING')
  return(
    <MyParagraph>{show ? 'This is new' : ''}</MyParagraph>
  )
}

export default React.memo(DemoOutput);

// React.memo compare: props.show === props.previous.show ( primitive values)
// for primitive values it works, but not for reference ones(functions, arrays and objects)
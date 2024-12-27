import React, { useState, useCallback, useMemo } from 'react';

import './App.css';
import Button from './components/UI/Button/Button';
// import DemoOutput from './components/Demo1/DemoOutput';
import DemoList from './components/Demo/DemoList';


function App() {
  // First part of the chapter
  // const [showParagraph, setShowParagraph] = useState(false);
  // const [allowToggle, setAllowToggle] = useState(false);


  // console.log('App running ');

  // // When the re-render is triggered, the function is not the same
  // // as the previous one (even if both perform the same task).
  // const toggleParagraphHandler = useCallback(() => {
  //   if(allowToggle){
  //     setShowParagraph(prev => !prev);
  //   }
  // }, [allowToggle])  // dependencies = when to recreate the function

  // const allowToggleHandler = () => {
  //   setAllowToggle(true);
  // }

  // return (
  //   <div className="app">
  //     <h1>Hi there!</h1>
  //     <DemoOutput show={showParagraph} />
  //     <Button onClick={allowToggleHandler}>Allow Toggling</Button>
  //     <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
  //   </div>
  // );

  // 2nd part of the chapter - useMemo
  const [listTitle, setListTitle] = useState('My List');

  const changeTitleHandler = useCallback(() => {
    setListTitle('New Title');
  }, []);

  // it will return the same array(so passing it as prop won't trigger any rerender)
  // if the dependencies doesn't change
  const listItems = useMemo(() => [5, 3, 1, 10, 9], [])

  return (
    <div className='app'>
      <DemoList title={listTitle} items={listItems} />
      <Button onClick={changeTitleHandler}>Change List Title</Button>
    </div>
  );
}

export default App;

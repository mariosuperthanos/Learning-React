import { useEffect, useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHTTPS from '../../custome-hooks/https-hook';

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest} = useHTTPS();

  const createTask = (taskTest, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskTest };

    props.onAddTask(createdTask);
  }

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest({
      url: "https://react-http-74362-default-rtdb.europe-west1.firebasedatabase.app/.json",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { text: taskText }
      // the 1st argument will be taskText
      // the 2nd argument will be applyData argument from custom hook
    }, createTask.bind(null, taskText));
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;

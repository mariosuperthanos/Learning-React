import Card from './Card';
import useCounter from '../hooks/use-counter';

const ForwardCounter = () => {
  // custome hook also trigger rerenders
  const counter = useCounter();

  return <Card>{counter}</Card>;
};

export default ForwardCounter;

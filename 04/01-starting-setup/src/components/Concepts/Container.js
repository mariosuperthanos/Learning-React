import Content from "./Content";
import Card from "../UI/Card";

import componentsImage from './../../assets/images/components.png';
import stateImage from './../../assets/images/state.png';
import eventsImage from './../../assets/images/events.png';


const Container = ({ id, data }) => {
  return (
    <ul id={id}>
      {data.map((element) => (
        // add the className property
        <Card className={"concept"}> 
          <Content
            image={element.image}
            title={element.title}
            description={element.description}
          />
        </Card>
      ))}
    </ul>
  );
};

export default Container;

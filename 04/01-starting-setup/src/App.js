import keyConceptsImage from './assets/images/key-concepts.png';
import componentsImage from './assets/images/components.png';
import stateImage from './assets/images/state.png';
import eventsImage from './assets/images/events.png';
import Header from './components/UI/header';
import Container from './components/Concepts/Container';


const concepts = [
  {
    title: 'Components',
    image: componentsImage,
    description:
      'Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. Components can receive data via props, and they can render dynamic output using JSX.',
  },
  {
    title: 'State',
    image: stateImage,
    description:
      'State is data that may change over time. As it changes, the UI should be updated to reflect the updated data. Each component can maintain its own state and multiple components can share state.',
  },
  {
    title: 'Events',
    image: eventsImage,
    description:
      'Event handlers are added via props to (built-in) components. You pass functions as values to such event handlers to control which functions gets executed for which event.',
  },
];

function App() {
  return (
    <div>
      <Header image={keyConceptsImage}/>
      <Container id={'concepts'} data={concepts} />
    </div>
  );
}

export default App;

{/* <ul id="concepts">
        <li className="concept">
          <img src="TODO: IMAGE" alt="TODO: TITLE" />
          <h2>TODO: TITLE</h2>
          <p>TODO: DESCRIPTION</p>
        </li>
      </ul>
    </div> */}
import { Link } from "react-router";
import classes from './../components/MainNavigation.module.css'

const EventsPage = () => {
  const DUMMY_DATA = [
    { id: 1, name: 'Concert Rock Night' },
    { id: 2, name: 'Tech Conference 2025' },
    { id: 3, name: 'Marathon City Run' },
    { id: 4, name: 'Art Exhibition Gala' },
    { id: 5, name: 'Stand-up Comedy Night' },
  ];

  return(
    <ul>
      {DUMMY_DATA.map((item) => (
        <h1 key={item.id}><Link to={`/events/${item.id}`}>{item.name}</Link></h1>
      ))}
    </ul>
  )
}

export default EventsPage;



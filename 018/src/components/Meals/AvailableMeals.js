import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import useHTTP from '../hooks/HTTPhook';
import { useEffect, useState } from 'react';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const { isLoading, error, sendRequestes } = useHTTP();
  
  const [meals, setMeals] = useState([]);

  useEffect(()=> {
    const getData = (data) => {
      let list = [];

      for (let key in data.meals) {
        const meal = data.meals[key]; 
        meal.id = key;
        list.push(meal);
      }
      setMeals(list);
    };

    sendRequestes({
      url: 'https://practice-project-018-default-rtdb.europe-west1.firebasedatabase.app/.json'
    }, getData)
  }, [])

  console.log(meals);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const foods = [
    {
      title: 'Margherita Pizza',
      price: 12.99,
      description: 'Traditional Italian pizza with tomatoes, mozzarella, and basil.'
    },
    {
      title: 'Burger',
      price: 8.49,
      description: 'Beef burger with cheese, lettuce, tomatoes, and special sauce.'
    },
    {
      title: 'Sushi',
      price: 15.99,
      description: 'Sushi with salmon, avocado, and rice, served with soy sauce.'
    },
    {
      title: 'Spaghetti Carbonara',
      price: 10.49,
      description: 'Spaghetti with creamy egg sauce and pancetta, sprinkled with parmesan.'
    },
    {
      title: 'Caesar Salad',
      price: 7.99,
      description: 'Green salad, grilled chicken, croutons, and Caesar dressing.'
    }
  ];

  

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {foods.map(food => (
          <ProductItem
          key={Math.random().toString(36).toString(2, 9)}
          title={food.title}
          price={food.price}
          description={food.description}
        />
        ))}
      </ul>
    </section>
  );
};

export default Products;

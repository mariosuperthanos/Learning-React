import MainHeader from "./Components/Header/Nav/MainHeader";
import React from "react";
import Products from "./Components/Products/Products";
import { FoodDataProvider } from "./Components/ModalDataContext";

const menuItems = [
  {
    name: "Pizza Margherita",
    description:
      "Classic pizza with tomatoes, mozzarella, basil, and olive oil.",
    price: 25.99,
  },
  {
    name: "Spaghetti Carbonara",
    description:
      "Italian pasta with a creamy sauce made from eggs, pancetta, and parmesan.",
    price: 18.5,
  },
  {
    name: "Sushi Set",
    description:
      "Sushi set with salmon, tuna, and vegetables, served with soy sauce and ginger.",
    price: 35.75,
  },
  {
    name: "Beef Burger",
    description:
      "Juicy beef burger with cheddar cheese, lettuce, and tomatoes, served with French fries.",
    price: 22.0,
  },
];

function App() {
  return (
    <FoodDataProvider>
      <React.Fragment>
        <MainHeader />
        <Products data={menuItems} />
      </React.Fragment>
    </FoodDataProvider>
  );
}

export default App;

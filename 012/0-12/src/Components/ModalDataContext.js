import React, { act, useReducer, useState } from "react"

export const FoodData = React.createContext({
  foodList:[],
});

/* eslint-disable */
const foodReducer = (state, action) => {
  // Calculăm index-ul alimentului doar o singură dată
  console.log(action.payload.name);
  const foodIndex = state.findIndex(food => food.name === action.payload.name);

  switch (action.type) {
    case 'ADD_FOOD':
      // Verifică dacă alimentul există deja
      if (foodIndex === -1) {
        // Dacă nu există, adaugă-l în listă
        return [...state, { ...action.payload, quantity: Number(action.payload.quantity) }];
      } else {
        // Dacă există, actualizează cantitatea
        const updatedState = [...state];
        updatedState[foodIndex].quantity += Number(action.payload.quantity);
        return updatedState;
      }

    case 'UPDATE_FOOD_QUANTITY':
      // Verifică dacă alimentul există înainte de a modifica cantitatea
      const updatedStateUpdate = [...state]; // Variabilă diferită
      updatedStateUpdate[foodIndex].quantity += 1; // Actualizează cantitatea complet
      return updatedStateUpdate;

    case 'DECREASE_FOOD_QUANTITY':
      // Verifică dacă alimentul există înainte de a modifica cantitatea
      const updatedStateDecrease = [...state]; // Variabilă diferită
      updatedStateDecrease[foodIndex].quantity -= 1; // Scade cantitatea
      return updatedStateDecrease;

    default:
      return state;
  }
};


// This is a wrapper component that wraps another component 
export const FoodDataProvider = ({ children }) => {
  const [foodList, dispatch] = useReducer(foodReducer, []);

  const addFood = (food) => {
    dispatch({ type: 'ADD_FOOD', payload: food });
  };

  const updateFoodQuantity = (food) => {
    dispatch({ type: 'UPDATE_FOOD_QUANTITY', payload: food });
  };

  const decreaseFoodQuantity = (food) => {
    console.log(food);
    dispatch({ type: 'DECREASE_FOOD_QUANTITY', payload: food });
  };

  return (
    <FoodData.Provider value={{ foodList, addFood, updateFoodQuantity, decreaseFoodQuantity }}>
      {children}
    </FoodData.Provider>
  );
};
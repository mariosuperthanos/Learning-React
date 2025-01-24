import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const recipes = [
  {
    id: 1,
    name: "Spaghetti Bolognese",
    ingredients: [
      "200g spaghetti",
      "100g ground beef",
      "1 onion",
      "2 garlic cloves",
      "400g canned tomatoes",
      "1 tbsp olive oil",
      "Salt",
      "Pepper",
      "Parmesan cheese (optional)"
    ],
    instructions: "Cook spaghetti according to package instructions. In a pan, heat olive oil, sauté onion and garlic, add ground beef, and cook until browned. Add canned tomatoes, salt, and pepper. Simmer for 15 minutes. Serve sauce over spaghetti, garnish with Parmesan cheese."
  },
  {
    id: 2,
    name: "Chicken Caesar Salad",
    ingredients: [
      "1 chicken breast",
      "2 cups romaine lettuce",
      "50g croutons",
      "30g Parmesan cheese",
      "Caesar dressing",
      "Salt",
      "Pepper"
    ],
    instructions: "Season chicken breast with salt and pepper, grill until cooked through, and slice. In a bowl, combine lettuce, croutons, Parmesan cheese, and Caesar dressing. Top with sliced chicken and serve."
  },
  {
    id: 3,
    name: "Pancakes",
    ingredients: [
      "1 cup all-purpose flour",
      "1 tbsp sugar",
      "1 tsp baking powder",
      "1/2 tsp salt",
      "1 cup milk",
      "1 egg",
      "2 tbsp melted butter",
      "Butter or oil for cooking"
    ],
    instructions: "In a bowl, mix flour, sugar, baking powder, and salt. In another bowl, whisk milk, egg, and melted butter. Combine wet and dry ingredients. Heat a non-stick pan, grease with butter or oil, and pour batter to form pancakes. Cook until bubbles form, flip, and cook until golden. Serve with syrup or toppings of choice."
  },
  {
    id: 4,
    name: "Vegetable Stir-Fry",
    ingredients: [
      "1 red bell pepper",
      "1 carrot",
      "1 zucchini",
      "1 broccoli floret",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "1 tsp garlic (minced)",
      "1 tsp ginger (grated)"
    ],
    instructions: "Slice all vegetables. Heat sesame oil in a wok, add garlic and ginger, and sauté for 1 minute. Add vegetables and stir-fry over high heat for 5-7 minutes. Add soy sauce, mix well, and serve hot."
  },
  {
    id: 5,
    name: "Beef Tacos",
    ingredients: [
      "200g ground beef",
      "1 taco seasoning packet",
      "6 taco shells",
      "1 cup shredded lettuce",
      "1 tomato (diced)",
      "1/2 cup shredded cheese",
      "Sour cream (optional)"
    ],
    instructions: "Cook ground beef in a pan until browned. Add taco seasoning and cook according to package instructions. Fill taco shells with beef, lettuce, tomato, and cheese. Top with sour cream if desired."
  },
  {
    id: 6,
    name: "Caprese Salad",
    ingredients: [
      "2 large tomatoes",
      "200g fresh mozzarella",
      "Fresh basil leaves",
      "2 tbsp olive oil",
      "1 tbsp balsamic glaze",
      "Salt",
      "Pepper"
    ],
    instructions: "Slice tomatoes and mozzarella. Arrange on a plate, alternating slices of tomato and mozzarella. Add basil leaves, drizzle with olive oil and balsamic glaze, and season with salt and pepper."
  },
  {
    id: 7,
    name: "Grilled Salmon",
    ingredients: [
      "2 salmon fillets",
      "1 lemon",
      "2 tbsp olive oil",
      "1 tsp garlic (minced)",
      "Salt",
      "Pepper",
      "Fresh dill (optional)"
    ],
    instructions: "Preheat grill to medium heat. Mix olive oil, garlic, salt, and pepper. Brush salmon fillets with the mixture. Grill for 4-6 minutes per side. Squeeze lemon juice over salmon and garnish with dill before serving."
  },
  {
    id: 8,
    name: "Chocolate Chip Cookies",
    ingredients: [
      "1/2 cup butter (softened)",
      "1/2 cup sugar",
      "1/2 cup brown sugar",
      "1 egg",
      "1 tsp vanilla extract",
      "1 1/2 cups all-purpose flour",
      "1/2 tsp baking soda",
      "1/2 tsp salt",
      "1 cup chocolate chips"
    ],
    instructions: "Preheat oven to 180°C (350°F). Cream butter, sugar, and brown sugar together. Add egg and vanilla, then mix in dry ingredients. Fold in chocolate chips. Drop spoonfuls onto a baking sheet and bake for 10-12 minutes until golden."
  },
  {
    id: 9,
    name: "Tomato Soup",
    ingredients: [
      "1 tbsp olive oil",
      "1 onion (chopped)",
      "2 garlic cloves (minced)",
      "800g canned tomatoes",
      "2 cups vegetable stock",
      "1 tsp sugar",
      "Salt",
      "Pepper",
      "Fresh basil (for garnish)"
    ],
    instructions: "Heat olive oil in a pot. Sauté onion and garlic until soft. Add canned tomatoes, vegetable stock, and sugar. Simmer for 15 minutes. Blend the soup until smooth. Season with salt and pepper, and garnish with basil before serving."
  }
];


export default function Home() {
  return (
    <main className="grid grid-cols-6 gap-4">
      {recipes.map((recipe, index) => (
        <Card 
          key={recipe.id} 
          className={`
            ${index % 2 === 0 ? 'col-span-4' : 'col-span-2'}
            bg-white shadow-md rounded-lg
          `}
        >
          <CardHeader className="p-2">
            <CardTitle>{recipe.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{recipe.ingredients[1]}</p>
          </CardContent>
        </Card>
      ))}
    </main>
  );
}


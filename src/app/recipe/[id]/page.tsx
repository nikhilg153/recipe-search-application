import axios from "axios";

type RecipeDetailProps = {
  params: { id: string };
};

const fetchRecipe = async (id: string) => {
  const response = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  return response.data.meals[0];
};

const RecipeDetail = async ({ params }: RecipeDetailProps) => {
  const recipe = await fetchRecipe(params.id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">{recipe.strMeal}</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full rounded"
          />
        </div>
        <div className="md:w-1/2 md:ml-8">
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside mb-4">
            {Object.keys(recipe)
              .filter((key) => key.startsWith("strIngredient") && recipe[key])
              .map((key) => (
                <li key={key}>
                  {recipe[key]} - {recipe[`strMeasure${key.match(/\d+/)[0]}`]}
                </li>
              ))}
          </ul>
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <p>{recipe.strInstructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;

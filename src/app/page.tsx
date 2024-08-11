"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const Home = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();

  // Fetch all recipes on page load
  useEffect(() => {
    const fetchAllRecipes = async () => {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=`
      );
      setRecipes(response.data.meals || []);
    };

    fetchAllRecipes();
  }, []);

  const searchRecipes = async () => {
    if (!query) return;
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    setRecipes(response.data.meals || []);
  };

  const handleCardClick = (id: string) => {
    router.push(`/recipe/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Recipe Search</h1>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded p-2 w-full md:w-1/2 text-black"
          placeholder="Search for a meal..."
        />
        <button
          onClick={searchRecipes}
          className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-800"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recipes.map((recipe: Recipe) => (
          <div
            key={recipe.idMeal}
            className="border rounded overflow-hidden shadow-lg cursor-pointer hover:opacity-55"
            onClick={() => handleCardClick(recipe.idMeal)}
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{recipe.strMeal}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

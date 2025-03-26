import {letters} from "../utils/letters.ts";
import {CategoriesResponse, Category, Meal} from "../types.ts";

export const fetchMealsByLetter = async (letter: string) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    if (!response.ok) throw new Error(`Failed to fetch meals for letter ${letter}`);
    return response.json();
}

export const fetchAllMeals = async ():Promise<Meal[]> => {
    const responses = await Promise.all(letters.map(fetchMealsByLetter));
    return responses.flatMap((res) => (Array.isArray(res.meals) ? res.meals : []));
};


export const searchMealById = async (id: string) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if (!response.ok) throw new Error("Failed to fetch meals");
    const data = await response.json();
    return data.meals;
};


export const searchMeals = async (query: string) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    const data = await response.json();
    return Array.isArray(data.meals) ? data.meals : [];

};

export const fetchCategories = async ():Promise<Category[]> => {
    const response= await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    if (!response.ok) throw new Error("Failed to fetch categories");
    const data: CategoriesResponse = await response.json();
    return data.categories;
};


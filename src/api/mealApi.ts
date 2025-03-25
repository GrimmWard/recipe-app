import {letters} from "../utils/letters.ts";

export const fetchMealsByLetter = async (letter: string) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch meals for letter ${letter}`);
    }
    return response.json();
}

export const fetchAllMeals = async () => {
    const responses = await Promise.all(letters.map(fetchMealsByLetter));
    return responses.flatMap((res) => res.meals || []);
};


export const searchMealById = async (id: string) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}
`);
    if (!response.ok) throw new Error("Failed to fetch meals");
    return response.json();
};

export const fetchCategories = async () => {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
};

export const searchMeals = async (query: string) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();

};

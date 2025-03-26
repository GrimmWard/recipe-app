export interface Category {
    strCategory: string;
}

export interface CategoriesResponse {
    categories: Category[];
}

export interface Meal {
    idMeal: string;
    strMeal: string;
    strArea: string;
    strMealThumb: string;
    strCategory: string;
}
export type RecipeCardProps = {
    id: string
    image: string;
    name: string;
    category: string;
    area: string;
};

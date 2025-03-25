import {useParams} from "react-router-dom";
import {searchMealById} from "../../api/mealApi.ts";
import {useQuery} from "@tanstack/react-query";

const RecipeDetails = () => {
    const {id} = useParams<{ id: string }>();
    console.log(id)
    const {data, isLoading, isError} = useQuery({
        queryKey: ["mealInfo", id],
        queryFn:() =>  searchMealById(id!),
        enabled: !!id,
        staleTime: 100 * 60 * 10,
    });
    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error fetching meals</p>

    const meal = data?.meals?.[0];
    console.log(meal);
    return (
        <div>
            <h1>Recipe Details</h1>
            <h1>{meal.strMeal}</h1>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <p>{meal.strInstructions}</p>
        </div>
    );
};

export default RecipeDetails;

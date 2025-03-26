import {useParams} from "react-router-dom";
import {searchMealById} from "../../api/mealApi.ts";
import {useQuery} from "@tanstack/react-query";
import {Card, CardMedia, Typography, Box, Paper} from "@mui/material";

const RecipeDetails = () => {
    const {id} = useParams<{ id: string }>();
    const {data: meals, isLoading, isError} = useQuery({
        queryKey: ["mealInfo", id],
        queryFn: () => searchMealById(id!),
        enabled: !!id,
        staleTime: 100 * 60 * 10,
    });

    const meal = meals?.[0];

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching meal</p>;
    if (!meal) return <p>Meal not found</p>;

    const ingredients = Object.keys(meal)
        .filter((key) => key.startsWith("strIngredient") && meal[key])
        .map((key) => meal[key]);

    const measures = Object.keys(meal)
        .filter((key) => key.startsWith("strMeasure") && meal[key])
        .map((key) => meal[key]);

    return (
        <Box>
            <Typography variant="h3" gutterBottom>
                {meal.strMeal}
            </Typography>
            <Box sx={{padding: 3, display: 'flex'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 500, marginRight: 1}}>
                    <Box >
                        <Card>
                            <CardMedia
                                component="img"
                                alt={meal.strMeal}
                                height="300"
                                image={meal.strMealThumb}
                            />
                        </Card>
                    </Box>
                    <Box sx={{marginTop: 1}}>
                        <Paper sx={{padding: 2}}>
                            <Typography variant="h5" gutterBottom>
                                Ingredients
                            </Typography>
                            {ingredients.map((ingredient, index) => (
                                <Typography key={index} variant="body1">
                                    {ingredient} - {measures[index]}
                                </Typography>
                            ))}
                        </Paper>
                    </Box>

                </Box>

                <Box sx={{flexGrow: 1}}>
                    <Box>
                        <Paper sx={{padding: 2}}>
                            <Typography variant="h5" gutterBottom>
                                Instructions
                            </Typography>
                            <Typography variant="body1">
                                {meal.strInstructions}
                            </Typography>
                        </Paper>
                    </Box>

                </Box>
            </Box>
        </Box>
    );
};

export default RecipeDetails;

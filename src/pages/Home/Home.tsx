import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {fetchAllMeals, fetchCategories, searchMeals} from "../../api/mealApi.ts";
import RecipeCard from "../../components/RecipeCard.tsx";
import "./Home.css";
import {
    Pagination,
    Stack,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import { usePagination } from "../../hooks/usePagination.ts";
import {useDebounce} from "../../hooks/useDebounce.ts";


function Home() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const debouncedSearch = useDebounce(search, 500);


    const { data: meals = [], isLoading, isError } = useQuery({
        queryKey: debouncedSearch ? ["searchMeals", debouncedSearch] : ["allMeals"],
        queryFn: () => (debouncedSearch ? searchMeals(debouncedSearch) : fetchAllMeals()),
        staleTime: 100 * 60 * 10,
    });


    const { data, isLoading: isCategoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
        staleTime: 100 * 60 * 10,
    });
    const categories = data?.categories || [];

    const itemsPerPage = 6;

    const filteredMeals = selectedCategory
        ? meals.filter((meal) => meal.strCategory === selectedCategory)
        : meals;

    const { currentItems, page, handlePageChange, totalPages } = usePagination(filteredMeals, itemsPerPage);

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        setSelectedCategory(event.target.value as string);
    };

    if (isLoading || isCategoriesLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching meals</p>;

    return (
        <>
            <h1 className="header-text">Recipe Book</h1>

            <TextField
                fullWidth
                label="Search for meals..."
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: "20px" }}
            />

            <FormControl fullWidth style={{ marginBottom: "20px" }}>
                <InputLabel>Category</InputLabel>
                <Select
                    value={selectedCategory}
                    label="Category"
                    onChange={handleCategoryChange}
                >
                    <MenuItem value="">All Categories</MenuItem>
                    {Array.isArray(categories) &&
                        categories.map((category) => (
                        <MenuItem key={category.strCategory} value={category.strCategory}>
                            {category.strCategory}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <div className="gridContainer">
                {currentItems.length ? (
                    currentItems.map((meal) => (
                        <RecipeCard
                            key={meal.idMeal}
                            id={meal.idMeal}
                            image={meal.strMealThumb}
                            name={meal.strMeal}
                            category={meal.strCategory}
                            area={meal.strArea}
                        />
                    ))
                ) : (
                    <p>No meals found</p>
                )}
            </div>

            <Stack spacing={2} alignItems="center" style={{ marginTop: "20px" }}>
                <Pagination
                    variant="outlined"
                    shape="rounded"
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => handlePageChange(value)}
                    color="primary"
                    size="large"
                    siblingCount={2}
                />
            </Stack>
        </>
    );
}

export default Home;

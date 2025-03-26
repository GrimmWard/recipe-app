import {Card, CardActionArea, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useNavigate} from "react-router-dom";
import {RecipeCardProps} from "../types.ts";
import {useState} from "react";
import {Favorite} from "@mui/icons-material";

const RecipeCard = ({id, image, name, category, area}: RecipeCardProps) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    const handleNavigate = () => {
        navigate(`/recipe/${id}`);
    };

    const toggleFavorite = () => {
        setIsFavorite(prevState => !prevState); // Перемикаємо стан
    };
    return (
        <Card sx={{maxWidth: 345}}>
            <CardActionArea onClick={handleNavigate}>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div"
                                sx={{
                                    display: 'block',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                    >
                        {name}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        {area} | {category}
                    </Typography>

                </CardContent>
            </CardActionArea>
            <IconButton aria-label="add to favorites" onClick={toggleFavorite}>
                {isFavorite ? (
                    <Favorite fontSize="large" sx={{ color: 'red' }} />
                ) : (
                    <FavoriteBorderIcon fontSize="large" />
                )}
            </IconButton>
        </Card>
    );
}

export default RecipeCard;
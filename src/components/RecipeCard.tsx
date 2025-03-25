import {Card, CardActionArea, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useNavigate} from "react-router-dom";

type RecipeCardProps = {
    id: string
    image: string;
    name: string;
    category: string;
    area: string;
};


const RecipeCard = ({id, image, name, category, area}: RecipeCardProps) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/recipe/${id}`);
    };
    return (
        <Card sx={{maxWidth: 345, minHeight: 345}}>
            <CardActionArea onClick={handleNavigate}>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        {category}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        {area}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <IconButton aria-label="add to favorites">
                <FavoriteBorderIcon fontSize="large"/>
            </IconButton>
        </Card>
    );
}

export default RecipeCard;
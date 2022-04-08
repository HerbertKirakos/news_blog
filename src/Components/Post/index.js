import {
  CardActionArea,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
export const Post = ({ id, height, imgUrl, description, title, }) => {

  return (
    <Card key={id} sx={{height: '100%'}}   >
      <CardActionArea>
        <CardMedia
          component="img"
          height={height}
          image={imgUrl}
        />
        <CardContent>
          <Typography variant="h5" component="div" sx={{ mb: 1}} >
            {title}
          </Typography>
          <Typography variant="body2" color="grey[600]" >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


function MediaCard({ img, alt, title, text }) {
    return (
        <Card sx={{ width: 280, marginTop: 4 }}>
            <CardMedia
                sx={{ height: 180 }}
                image={img}
                title={alt}
            />
            <CardContent>
                <Typography className="oveTitle" gutterBottom variant="h5" component="div" >
                    {title}
                </Typography>
                <Typography className="title" variant="body2" color="text.secondary">
                    {text}
                </Typography>
            </CardContent>

        </Card >
    );
}

export default MediaCard;

import { Divider } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


function MediaCard({ img, alt, title, text }) {
    return (
        <Card sx={{ width: 280, marginTop: 4 }}>
            <CardMedia
                sx={{ height: 180 }}
                image={img}
                title={alt}
            />
            <CardContent>
                <div  >
                    <h5 className="overTitle">{title}</h5>
                </div>
                <Divider className="short-divider mb-2" />
                <div>
                    <span>{text}</span>
                </div>
            </CardContent>

        </Card >
    );
}

export default MediaCard;

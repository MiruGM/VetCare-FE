import { Divider } from "@mui/material";
import { Box } from "@mui/system";

function LandPageToken({ img, alt, title, text }) {
    return (
        <div className="token-container">
            <img src={img} alt={alt} />
            <h4 className="mt-2 title">{title}</h4>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 3 }}>
                <Divider className="short-divider" />
            </Box>
            <p className="text-left px-4">{text}</p>
        </div>
    );
}
export default LandPageToken;
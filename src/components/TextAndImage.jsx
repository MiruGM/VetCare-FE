import { Divider, Box } from "@mui/material";



function TextAndImage({ overTitle, title, text, img, alt, buttonText, buttonClick, orderFirst, orderSecond }) {

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center mb-5">
            <div className="row center">
                <div className={`col ${orderFirst} d-flex flex-column align-items-left ms-5`}>
                    <h3 className="overTitle">{overTitle}</h3>
                    <h1 className="title">{title}</h1>

                    <Box sx={{ display: 'flex', justifyContent: 'start', marginY: 3 }}>
                        <Divider className="short-divider" />
                    </Box>
                    {text}
                    <div className="mt-3">
                        <button className="custom-btn custom-btn__clear" onClick={buttonClick}>{buttonText}</button>
                    </div>
                </div>
                <div className={`col ${orderSecond} d-none d-none d-lg-flex justify-content-center`}>
                    <img className="intro-img" src={img} alt={alt} />
                </div>
            </div>
        </div>
    );
}

export default TextAndImage;
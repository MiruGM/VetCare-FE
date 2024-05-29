function CardServicesSmall({ title, img, alt, textOrder, imgOrder }) {

    return (
        <div className="d-flex border justify-content-between align-items-center rounded-3 bg-white m-2" >
            <div className={`order= ${textOrder}`}>
                <h5 className="mx-3">{title}</h5>
            </div>
            <div className={`order= ${imgOrder}`}>
                <img className="rounded-3" src={img} alt={alt} width={50} />
            </div>
        </div>
    );
}

export default CardServicesSmall;

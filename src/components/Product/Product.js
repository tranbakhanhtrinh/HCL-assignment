const Product = ({title, brand, price, rating, thumbnail, description}) => {
    return (
        <div className="row">
            <div className="col-12 col-xl-4">
                <img src={thumbnail} alt={title} className="img-fluid d-block w-100"/>
            </div>
            <div className="col-12 col-xl-8">
                <h1>{title}</h1>
                <h5>Price: ${price}</h5>
                <h5>Rating: {rating}</h5>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Product;
import React, { useEffect, useState } from "react";
import Products from "../../components/Products/Products";
import Button from "../../components/Button/Button";
import { deleteProduct, setProducts } from "../../redux/actions";
import "./Products.scss";
import Loading from "../../components/Loading/Loading";
import Modal from "../../components/Modal/Modal";
import { api } from "../../helpers/axios";
import useToast from "../../hooks/useToast";
import ErrorComponent from "../../common/ErrorComponent/ErrorComponent";
import { useAppDispatch, useAppSelector } from "../../hooks/react-redux";

function ProductsPage() {
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [productId, setProductId] = useState(0);
    const [error, setError] = useState("");
    const { success } = useToast();
    const dispatch = useAppDispatch();

    const products = useAppSelector((state) => state.product.products);
    
    useEffect(() => {
        setLoading(true);
        api.get(`/products?skip=${skip}&limit=${limit}`)
            .then(({ data }) => {
                setLoading(false);
                dispatch(setProducts(data?.products));
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [limit, skip]);

    const onDelete = (id) => {
        setShowModal(true);
        setProductId(id);
    };

    const onAcceptDelete = async () => {
        try {
            await api.delete(`/products/${productId}`).then(() => {
                setShowModal(false);
                setProductId(0);
                success("Successfully deleted!");
                dispatch(deleteProduct(productId));
            });
        } catch (error) {
            setError(error.message);
        }
    };

    const productsList = () => products?.map((product) => <Products key={product.title} product={product} onDelete={() => onDelete(product.id)} />);

    // const onPrevious = () => {};
    // const onNext = () => {};

    const onCloseModal = () => {
        setShowModal(false);
    };

    return (
        <section className="home-product mt-4" data-testid="home-product">
            <div className="container">
                <div className="row">
                    <div className="col-12 position-relative">
                        <Modal onAccept={onAcceptDelete} onCloseModal={onCloseModal} show={showModal}>
                            <h4>Do you want to delete this product?</h4>
                        </Modal>
                        {error ? (
                            <ErrorComponent message={error} />
                        ) : (
                            <>
                                <h2 className="text-center title">
                                    <span>Products</span>
                                </h2>
                                <div className="d-flex flex-wrap justify-content-around justify-content-xl-start mt-4">{loading ? <Loading /> : productsList()}</div>
                            </>
                        )}

                        {/* <div className="home-product__navigator">
              <Button
                className="btn-prev position-relative"
                onClick={onPrevious}
              ></Button>
              <Button
                className="btn-next position-relative"
                onClick={onNext}
              ></Button>
            </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductsPage;

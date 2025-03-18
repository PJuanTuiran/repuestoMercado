import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { toggleDrawer } from "~/store/app/action";
import useEcomerce from "~/hooks/useEcomerce";
import { Modal } from "antd";

const ModuleDetailShoppingActions = ({ product, cart, ecomerce }) => {

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const { loading, addItem } = useEcomerce();
    const [masProductos, setMasProductos] = useState(true);

    useEffect(() => {
        if (quantity >= product.numerounidades) {
            setMasProductos(false);
        }else{
            setMasProductos(true);
        }
    }, [quantity]);

    const handleAddItemToCart = (e) => {
        e.preventDefault();
        const dat = [{
            id : 9,
            quantity: 3
        }];
        console.log("AGREGAR ITEM AL CARRITO : ", ecomerce.cartItems);
        addItem({ id: product.id, quantity: 1 }, dat, "cart");
        dispatch(toggleDrawer(true));
    };

    const handleAddItemToCompare = (e) => {
        e.preventDefault();
        addItem({ id: product.id }, ecomerce.compareItems, "compare");
        const modal = Modal.success({
            centered: true,
            title: "Success!",
            content: `This product has been added to your compare listing!`,
        });
        modal.update;
    };

    const handleAddItemToWishlist = (e) => {
        e.preventDefault();
        const { product } = this.props;
        addItem({ id: product.id }, ecomerce.wishlistItems, "wishlist");
        const modal = Modal.success({
            centered: true,
            title: "Success!",
            content: `This item has been added to your wishlist`,
        });
        modal.update;
    };

    const handleIncreaseItemQty = (e) => {
        e.preventDefault();
        setQuantity(quantity + 1);
    };

    const handleDecreaseItemQty = (e) => {
        e.preventDefault();
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="ps-product__shopping">
            <div className="ps-product__add-cart">
                <label className="ps-product__label">
                    Unidades seleccionadas
                </label>
                <figure>
                    <div>
                        <div className="form-group--number">
                            {masProductos ? (
                                <button
                                    className="up"
                                    onClick={(e) =>
                                        handleIncreaseItemQty(e)
                                    }></button>
                            ) : null}

                            <button
                                className="down"
                                onClick={(e) =>
                                    handleDecreaseItemQty(e)
                                }></button>
                            <input
                                className="form-control"
                                type="text"
                                placeholder={quantity}
                                disabled
                            />
                        </div>
                    </div>
                    <div>
                        <a
                            className="ps-btn"
                            href="#"
                            onClick={(e) => handleAddItemToCart(e)}>
                            {!loading ? "Agregar al carrito" : "loading"}
                        </a>
                    </div>
                </figure>

                <div className="ps-product__ecomerce-actions">
                    <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
                        Agregar a lista de deseos
                    </a>
                    <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
                        Agregar al comparador
                    </a>
                </div>
            </div>
        </div>
    );
};
export default connect((state) => state)(ModuleDetailShoppingActions);

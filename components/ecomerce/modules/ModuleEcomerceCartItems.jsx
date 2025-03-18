import React from "react";
import { connect } from "react-redux";
import ProductOnCart from "~/components/elements/products/ProductOnCart";
import useEcomerce from "~/hooks/useEcomerce";
import { Result } from "antd";

const ModuleEcomerceCartItems = ({ ecomerce, cartItems }) => {
    const { increaseQty, decreaseQty, removeItem } = useEcomerce();

    function handleRemoveItem(e, productId) {
        e.preventDefault();
        removeItem({ id: productId }, ecomerce.cartItems, "cart");
    }

    function handleIncreaseItemQty(e, productId) {
        e.preventDefault();
        increaseQty({ id: productId }, ecomerce.cartItems);
    }

    function handleDecreaseItemQty(e, productId) {
        e.preventDefault();
        decreaseQty({ id: productId }, ecomerce.cartItems);
    }

    // View
    let cartItemsViews;
    if (cartItems.length > 0) {
        const items = cartItems.map((item) => (
            <tr key={item.id}>
                <td>
                    <a
                        className="ps-icon ps-cart-item__remove"
                        href="#"
                        onClick={(e) => handleRemoveItem(e, item.id)}>
                        <i className="icon-cross mr-2"></i>
                    </a>
                    <ProductOnCart product={item} />
                </td>
                <td data-label="price">
                    <strong>${item.price}</strong>
                </td>
                <td data-label="quantity">
                    <span className="form-group--number">
                        <button
                            className="up"
                            onClick={(e) =>
                                handleIncreaseItemQty(e, item.id)
                            }></button>
                        <button
                            className="down"
                            onClick={(e) =>
                                handleDecreaseItemQty(e, item.id)
                            }></button>
                        <input
                            className="form-control"
                            type="text"
                            placeholder={item.quantity}
                            disabled={true}
                        />
                    </span>
                </td>
                <td data-label="total">
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </td>
            </tr>
        ));

        cartItemsViews = (
            <>
                <table className="table ps-table ps-table--shopping-cart ps-table--responsive">
                    <thead>
                        <tr>
                            <th>Producto(s)</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>{items}</tbody>
                </table>
            </>
        );
    } else {
        cartItemsViews = (
            <Result status="warning" title="No hay productos en el carrito." />
        );
    }
    return <>{cartItemsViews}</>;
};

export default connect((state) => state)(ModuleEcomerceCartItems);

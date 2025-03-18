import React, { useState } from "react";
import { Modal } from "antd";
import { useDispatch, connect } from "react-redux";
import useEcomerce from "~/hooks/useEcomerce";
import { toggleDrawer } from "~/store/app/action";
import DetailQuickView from "~/components/elements/detail/DetailQuickView";

const ModuleProductActionsRelated = ({
    product,
    type = "vertical",
    cart,
    ecomerce,
}) => {
    const dispatch = useDispatch();
    const [isQuickView, setIsQuickView] = useState(false);
    //alert("ITEMSALCARRO")
    const { addItem } = useEcomerce();

    function handleAddItemToCart(e) {
        e.preventDefault();
        addItem({ id: product.id, quantity: 1 }, ecomerce.cartItems, "cart");
        dispatch(toggleDrawer(true));
    }

    function handleAddItemToWishlist(e) {
        e.preventDefault();
        addItem({ id: product.id }, ecomerce.wishlistItems, "wishlist");
        const modal = Modal.success({
            centered: true,
            title: "Success!",
            content: `Este artículo ha sido agregado a tu lista de deseos.`,
        });
        modal.update;
    }

    function handleAddItemToCompare(e) {
        e.preventDefault();
        addItem({ id: product.id }, ecomerce.compareItems, "compare");
        const modal = Modal.success({
            centered: true,
            title: "Success!",
            content: `Este producto ha sido agregado a su lista de comparación!`,
        });
        modal.update;
    }

    function handleShowQuickView(e) {
        e.preventDefault();
        setIsQuickView(true);
    }

    function handleHideQuickView(e) {
        e.preventDefault();
        setIsQuickView(false);
    }

    if (type === "vertical") {
        return (
            <>
                <div className="ps-product__actions">
                    <a
                        href="#"
                        className="ps-product__action"
                        title="Lista de deseos"
                        onClick={(e) => handleAddItemToWishlist(e)}>
                        <i className="fa fa-heart-o"></i>
                    </a>
                    <a
                        href="#"
                        className="ps-product__action"
                        title="Vista rápida"
                        onClick={(e) => handleShowQuickView(e)}>
                        <i className="fa fa-search"></i>
                    </a>
                    <a
                        href="#"
                        className="ps-product__action"
                        title="Agregar al carrito"
                        onClick={(e) => handleAddItemToCart(e)}>
                        <i className="fa fa-shopping-basket"></i>
                    </a>
                </div>
                <Modal
                    centered
                    footer={null}
                    width={1024}
                    onCancel={(e) => handleHideQuickView(e)}
                    visible={isQuickView}
                    zIndex={9999}
                    closeIcon={<i className="icon icon-cross2"></i>}>
                    <DetailQuickView product={product} />
                </Modal>
            </>
        );
    } else {
        return (
            <>
                <div className="ps-product__actions-horizontal">
                    <div className="ps-product__btn-add-cart">
                        <a
                            href="#"
                            className="ps-btn"
                            onClick={(e) => handleAddItemToCart(e)}>
                            Agregar al carrito
                        </a>
                    </div>
                    <div className="ps-product__other-actions">
                        <a onClick={(e) => handleAddItemToWishlist(e)}>
                            <i className="icon-heart"></i>
                        </a>
                        <a onClick={(e) => handleAddItemToWishlist(e)}>
                            <i className="icon-signal"></i>
                        </a>
                    </div>
                </div>
            </>
        );
    }
};
export default connect((state) => state)(ModuleProductActionsRelated);

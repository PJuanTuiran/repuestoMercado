import React from "react";
import useEcomerce from "~/hooks/useEcomerce";
import { connect, useDispatch } from "react-redux";
import { toggleDrawer } from "~/store/app/action";
import ProductOnCart from "~/components/elements/products/ProductOnCart";
import SkeletonTable from "~/components/elements/skeletons/SkeletonTable";
import Link from "next/link";

const EcomerceCompareTables = ({ ecomerce, products }) => {
    const { addItem, removeItem } = useEcomerce();
    
    const dispatch = useDispatch();

    function handleRemoveItem(e, productId) {
        e.preventDefault();
        removeItem({ id: productId }, ecomerce.wishlistItems, "compare");
    }

    function handleAddItemToCart(e, product) {
        e.preventDefault();
        addItem({ id: product.id, quantity: 1 }, ecomerce.cartItems, "cart");
        dispatch(toggleDrawer(true));
    }

    // View
    let tableView;
    if (products && products.length > 0) {
        const items = products.map((item) => (
            <tr key={item.id}>
                <td>
                    <Link href="/product/[pid]" as={`/product/${item.id}`}>
                        <strong>
                            <a>{item.name}</a>
                        </strong>
                    </Link>
                </td>

                <td>
                    <div className="ps-status instock">
                        <i className="fa fa-check mr-2"></i>
                        In Stock
                    </div>
                </td>
                <td>10 kg</td>
                <td>10 × 10 × 10 cm</td>
                <td>Red, Navy</td>
                <td>MED-2021</td>
                <td>${item.price}</td>
                <td>
                    <a
                        className="ps-btn ps-btn--orange ps-btn--sm mb-1"
                        href="#"
                        onClick={(e) => handleAddItemToCart(e, item)}>
                        Agregar al carrito
                    </a>{" "}
                    <a
                        className="ps-btn ps-btn--primary ps-btn--sm"
                        href="#"
                        onClick={(e) => handleRemoveItem(e, item.id)}>
                        Eliminar
                    </a>
                </td>
            </tr>
        ));
        tableView = <>{items}</>;
    }
    return (
        <>
            <table className="table table-striped ps-table--compare ps-table--with-border">
                <thead>
                    <tr>
                        <th></th>
                        <th>Availability</th>
                        <th>Weight</th>
                        <th>Dimensions</th>
                        <th>Color</th>
                        <th>Sku</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{tableView}</tbody>
            </table>
        </>
    );
};
export default connect((state) => state)(EcomerceCompareTables);

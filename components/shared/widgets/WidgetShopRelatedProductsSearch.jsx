import React, { useEffect, useState } from "react";
import ProductRelatedSearchInteractive from "../../elements/products/ProductRelatedSearchInteractive";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";
import axios from "axios";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../../helpers/Constants";
import { useSelector } from "react-redux";

const WidgetShopRelatedProductsSearch = ({ collectionSlug }) => {
    const [productItems, setProductItems] = useState(null);
    const [loading, setLoading] = useState(false);

    let gripselect = 1;
    gripselect = useSelector((state) => state.gripselect.gripselect);

    useEffect(() => {
        const obtenerDatos = async () => {
            let params = {
                usuario: 0,
            };
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "17",
                    params,
                });

                setProductItems(res.data);
            } catch (error) {
                console.error("Error al leer los datos del usuario", error);
                // Maneja el error según tus necesidades
            }
        };
        obtenerDatos();
    }, []);

    let productItemsView;

    if (!loading) {
        if (productItems && productItems.length > 0) {
     
            let numberPrd = 3;
            if (gripselect == 1) numberPrd = 0;
            else if (gripselect == 2) numberPrd = 3;
            else if (gripselect == 3) numberPrd = 5;

            const products = productItems.map((item, index) => {
                if (index < numberPrd) {
                    return (
                        <div key={item.id}>
                            <ProductRelatedSearchInteractive product={item} />
                        </div>
                    );
                }
            });

            productItemsView = <div className="row">{products}</div>;
        } else {
            productItemsView = <p>No hay resultados para tu busqueda.</p>;
        }
    } else {
        const tempArr = [1, 2, 3, 4];
        const skeletonItems = tempArr.map((item) => (
            <div className="col-xl-3 col-lg-4 col-sm-3 col-6" key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletonItems}</div>;
    }
    return (
        <div className="ps-related-products">
            <div className="tamañotextoprdrelatedsearch">
                Productos relacionados
            </div>
            {productItemsView}
        </div>
    );
};

export default WidgetShopRelatedProductsSearch;

import React, { useEffect, useState } from "react";
import ProductRelatedSearchMain from "../../elements/products/ProductRelatedSearchMain";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";
import axios from "axios";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../../helpers/Constants";

const WidgetShopRelatedProducts = ({ collectionSlug }) => {
    const [productItems, setProductItems] = useState(null);
    const [loading, setLoading] = useState(false);

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
            const products = productItems.map((item, index) => {
                if (index < 3) {
                    return (
                        <div key={item.id}>
                            <ProductRelatedSearchMain product={item} />
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
        <div className="cajaproductrelateddos">
            <a className="tamañotextoprdsearchrelated">Productos relacionados</a>
            {productItemsView}
        </div>
    );
};

export default WidgetShopRelatedProducts;
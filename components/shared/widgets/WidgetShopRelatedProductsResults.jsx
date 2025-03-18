import React, { useEffect, useState } from "react";
import ProductRelatedSearchMain from "../../elements/products/ProductRelatedSearchMain";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";
import axios from "axios";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../../helpers/Constants";
import { useSelector } from "react-redux";

let numberPrd = 6;

const WidgetShopRelatedProductsResults = ({ collectionSlug }) => {
    const [productItems, setProductItems] = useState(null);
    const [loading, setLoading] = useState(false);

    let gripselect = 1;
    gripselect = useSelector((state) => state.gripselect.gripselect);

    const numberprdselect = useSelector(
        (state) => state.numberprdselect.numberprdselect
    );

    //console.log("NUMBERPRD : ", numberprdselect);

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
            numberPrd = 6;
            if (gripselect == 1 && numberprdselect < 20) numberPrd = 0;
            else if (gripselect == 1 && numberprdselect > 21) numberPrd = 1;
            else if (gripselect == 2 && numberprdselect < 15) numberPrd = 1;
            else if (
                gripselect == 2 &&
                numberprdselect >= 15 &&
                numberprdselect <= 25
            )
                numberPrd = 3;
            else if (gripselect == 2 && numberprdselect > 25) numberPrd = 4;
            else if (gripselect == 3) numberPrd = 5;

            const products = productItems.map((item, index) => {
                if (index < numberPrd) {
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
        <div className="ps-related-products">
            {numberprdselect < 20 && gripselect == 1 ? (
                null
            ) : numberPrd > 0 || gripselect == 2 ? (
                <a className="tamañotextoprdsearchrelated">
                    Productos relacionados
                </a>
            ) : numberprdselect > 8 || gripselect == 3 ? (
                <a className="tamañotextoprdsearchrelated">
                    Productos relacionados
                </a>
            ) : null}

            {productItemsView}
        </div>
    );
};

export default WidgetShopRelatedProductsResults;

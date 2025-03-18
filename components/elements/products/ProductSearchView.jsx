import React from "react";
import Link from "next/link";
import ModuleProductActions from "~/components/elements/products/modules/ModuleProductActions";
import useProduct from "~/hooks/useProduct";
import ModuleProductRating from "~/components/elements/products/modules/ModuleProductRating";
import ModuleProductImagesResults from "~/components/elements/products/modules/ModuleProductImagesResults";
import axios from "axios";
//Constantes
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../../helpers/Constants";
import { getLeeIra } from "../../../store/leeira/action";
import { useDispatch, useSelector } from "react-redux";
import { getViewSearch } from "../../../store/viewsearch/action";
import { getSelectViewPrd } from "../../../store/selectviewprd/action";
import { getViewCheckout } from "../../../store/viewcheckout/action";
import { useRouter } from "next/router";

const ProductSearchView = ({ product }) => {
    const router = useRouter();
    const { price, badges } = useProduct();
    const dispatch = useDispatch();
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    const onClickImagen = () => {
        dispatch(getViewSearch(true));
        dispatch(getSelectViewPrd(product.id));
        dispatch(getViewCheckout(false));
        dispatch(getLeeIra(6));
        localStorage.setItem("ira", JSON.stringify(6));
        localStorage.setItem("rutaira", JSON.stringify(router.pathname));

        const addItemVisita = async () => {
            let params = {
                idproducto: product.id,
                usuario: datosusuarios.uid,
                compatible: product.compatible,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "70",
                params,
            })
                .then((res) => {
                    if (res.data > 0) {
                        console.log("LEER : ", res.data);
                    } else console.log("ERROR : ", res.data);
                })
                .catch(function (error) {
                    console.log("ERROR : ", res.data);
                    return;
                });
        };
        addItemVisita();

        const addItemHistoryPrd = async () => {
            let datauser = JSON.parse(localStorage.getItem("datauser"));

            let params = {
                idproducto: product.id,
                usuario: datauser.uid,
                compatible: product.compatible,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "87",
                params,
            })
                .then((res) => {
                    if (res.data > 0) {
                        console.log("LEER : ", res.data)
                    } else console.log("ERROR : ", res.data)
                })
                .catch(function (error) {
                    console.log("ERROR : ", res.data)
                    return;
                });
        };
        addItemHistoryPrd();
    };

    return (
        <div className="ps-product ps-product--grid">
            <div className="cajaimagesresult">
                <div className="ps-product__thumbnail"
                    onClick={() => onClickImagen()}>
                    <a className="ps-product__overlay"></a>
                    <ModuleProductImagesResults product={product} />
                    {badges(product)}
                </div>
            </div>
            <div className="ps-product__content mt-60">
                <div
                    className="textoimagenesresult"
                    onClick={() => onClickImagen()}>
                    {product.name}
                </div>
                {price(product)}
            </div>
        </div>
    );
};

export default ProductSearchView;

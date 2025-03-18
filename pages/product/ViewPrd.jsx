import React, { useEffect, useState, useRef } from "react";
import Router, { useRouter } from "next/router";
import ProductRepository from "~/repositories/ProductRepository";
import SkeletonProductDetail from "~/components/elements/skeletons/SkeletonProductDetail";
import BreadCrumb from "~/components/elements/BreadCrumb";
import ContainerViewPrd from "../../components/layouts/ContainerViewPrd";
import InfoViewPrdSingle from "~/components/shared/widgets/InfoViewPrdSingle";
import SingleProductView from "~/components/elements/detail/SingleProductView";
import WidgetShopRelatedProducts from "~/components/shared/widgets/WidgetShopRelatedProducts";
import axios from "axios";
import { URL_BD_MR } from "../../helpers/Constants";
import { useSelector, useDispatch } from "react-redux";
import { getViewSearch } from "../../store/viewsearch/action";
import { getSelectViewPrd } from "../../store/selectviewprd/action";

function ViewPrd({ producto, optionSelect, setOptionSelect, setMaximizarOption, maximizarOption }) {
    const Router = useRouter();
    const { id } = Router.query;
    const irA = useRef(null);
    
    console.log("DATOS PRODUCTO : ", producto);
    //console.log("OPTION SELECT : ", optionSelect, " - ", maximizarOption);
    
    const [nombreProducto, setNombreProducto] = useState("Productos");
    const [irInicio, setIrInicio] = useState(false);
    let product = producto;
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem("ctrview", JSON.stringify(false));
        
        if (optionSelect == 1 && maximizarOption == 1)
            localStorage.setItem("activargrilla", JSON.stringify(1));
        else
            if (optionSelect == 2 && maximizarOption == 2)
                localStorage.setItem("activargrilla", JSON.stringify(2));
            else
                if (optionSelect == 3 && maximizarOption == 3)
                    localStorage.setItem("activargrilla", JSON.stringify(3));
                else
                    localStorage.setItem("activargrilla", JSON.stringify(3));
    }, [optionSelect, maximizarOption]);

    // View area
    let productView;

    if (product === null) {
        productView = (
            <div className="container">
                <SkeletonProductDetail />
            </div>
        );
    } else {
        productView = <SingleProductView product={product} />;
    }

    //console.log("PROASAS: ", product);

    const closeViewPrd = () => {
        dispatch(getViewSearch(false));
    }

    const breadcrumb = [
        {
            id: 1,
            text: "Inicio",
            url: "/",
        },
        {
            id: 2,
            text: "Tienda",
            url: "/shop",
        },
        {
            id: 3,
            text: nombreProducto,
        },
    ];

    const returnViewPrd = () => {
        localStorage.setItem("returnviewprd", JSON.stringify(true));
        dispatch(getViewSearch(true));
    }

    useEffect(() => {
        irA?.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    return (
        <div className="searchviewprd" ref={irA}>
            <div className="ps-page__header ml-51">
                <BreadCrumb breacrumb={breadcrumb} />
            </div>

            <div className="ps-layout--with-sidebar ps-reverse">
                <div className="ps-layout__left">
                    <InfoViewPrdSingle />
                    <div className="ml-40">
                        <WidgetShopRelatedProducts />
                    </div>
                </div>
                <div className="ps-layout__right"
                    onClick={() => returnViewPrd()}
                >
                    {productView}
                </div>
            </div>
        </div>
    );
}

export default ViewPrd;
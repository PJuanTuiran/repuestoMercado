import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getEditData } from "../../../store/editdata/action";
import Link from "next/link";
import { getAddEdToCart } from "../../../store/addedtocart/action";
import { getDataSearchInteractive } from "../../../store/datasearchinteractive/action";
import { getDataSelectSearch } from "../../../store/dataselectsearch/action";
import { getUserMenuPrimary } from "../../../store/usermenuprimary/action";
import { getSelectViewPrd } from "../../../store/selectviewprd/action";
import { getViewSearch } from "../../../store/viewsearch/action";

function InteractiveShopping(props) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [classBuscador, setClassBuscador] = useState("header__categories-toggle sinborder");

    const datosbuscarproductos = useSelector(
        //(state) => state.datafindproducts.datafindproducts
        (state) => state.datosgenerales.datosgenerales
    );
    //console.log("DATOS BUSCAR PRODUCTOS : ", datosbuscarproductos);
    const onSelecciono = () => {
        setClassBuscador("header__categories-toggle subrayartexto sinborder")
    }

    const outSelecciono = () => {
        setClassBuscador("header__categories-toggle sinborder")
    }

    const enviadatoslocalstorage = () => {
        localStorage.setItem("aadditemcar", JSON.stringify(false));
        localStorage.setItem("editdata", JSON.stringify(false));
        localStorage.setItem("editVehHistory", JSON.stringify(false));

        dispatch(getSelectViewPrd(0));
        dispatch(getViewSearch(false));
        dispatch(getUserMenuPrimary(false));
        let item = {
            idproducto: 0,
            nombreimagen1: "",
            titulonombre: "",
            cantidad: 0,
        };

        dispatch(
            getAddEdToCart(item)
        );
        localStorage.setItem(
            "addedtocart",
            JSON.stringify(item)
        );
        //localStorage.setItem('datostiposvehiculos', JSON.stringify(datosbuscarproductos.vgl_tiposvehiculos));
        //localStorage.setItem('datosmarcasvehiculos', JSON.stringify(datosbuscarproductos.vgl_marcasvehiculos));
        //localStorage.setItem('datoscarroceriasvehiculos', JSON.stringify(datosbuscarproductos.vgl_carroceriasvehiculos));
        //localStorage.setItem('datosannosvehiculos', JSON.stringify(datosbuscarproductos.vgl_annosvehiculos));
        //localStorage.setItem("placeholdersearch", JSON.stringify(""));
        comprainteractiva();
    };

    const comprainteractiva = () => {
        let editdata = {
            editar: false
        }

        dispatch(getEditData(editdata));
        localStorage.setItem("editdata", JSON.stringify(false));
        localStorage.setItem("editVehHistory", JSON.stringify(false));

        dispatch(getDataSearchInteractive([]));
        localStorage.setItem("datasearchinteractive", JSON.stringify(""));

        if (router.pathname != "/searchinteractive/searchinteractive") {
            router.replace("/searchinteractive/searchinteractive")
            router.push("/searchinteractive/searchinteractive")
        } else {
            router.replace("/searchinteractive/searchinteractive")
            router.push("/searchinteractive/searchinteractive")
            location.reload();
        }

    };

    return (
        <div className="header__supplies ps-dropdown--fullscreen">
            <button className={classBuscador}
                onMouseOver={onSelecciono}
                onMouseOut={outSelecciono}
            >
                <span onClick={() => enviadatoslocalstorage()} >Buscador_Interactivo </span>
            </button>
        </div>
    );
}

export default InteractiveShopping;
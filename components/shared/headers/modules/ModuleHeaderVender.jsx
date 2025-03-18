import React, { useEffect, useState } from "react";
import header_supplies from "~/public/static/data/header_supplies.json";
import VehiclesTypesRepository from "~/repositories/VehicleTypesRepository";
import Users from "~/repositories/Users";
import { getUsers } from "~/store/users/action";
import useGetProducts from "~/hooks/useGetProducts";
import { useRouter } from "next/router";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getEditData } from "../../../../store/editdata/action";
import { getDuplicarPrd } from "../../../../store/duplicarprd/action";
import { getUserMenuPrimary } from "../../../../store/usermenuprimary/action";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

const ModuleHeaderVender = () => {
    //localStorage.setItem("accion", JSON.stringify("noaplica"));
    const router = useRouter();
    const dispatch = useDispatch();
    const { product, getProductById } = useGetProducts();
    const [loading, setLoading] = useState(true);
    const [datosUsuario, setDatosUsuario] = useState([]);

    const [classVender, setClassVender] = useState(
        "header__categories-toggle sinborder"
    );

    const onSelecciono = () => {
        setClassVender("header__categories-toggle subrayartexto sinborder");
    };

    const outSelecciono = () => {
        setClassVender("header__categories-toggle sinborder");
    };

    // Seteamos la variable para iniciar o reiniciar el UseEffect
    const [stateInf, setStateInf] = useState(Math.random());
    // Declaramos el Setter para los tipos de Vehiculos
    const [TiposVehiculos, setTiposVehiculos] = useState(
        header_supplies.header_supplies
    );
    const userlogged = useSelector((state) => state.userlogged.userlogged);
    //console.log("DATOS USUARIO LOGUEADO : ", userlogged);

    const datoscrearproductos = useSelector(
        //(state) => state.datafindproducts.datafindproducts
        (state) => state.datosgenerales.datosgenerales
    );
    //console.log("DATOS CREAR PRODUCTOS : ", datoscrearproductos);

    const enviadatoslocalstorage = () => {
        localStorage.setItem(
            "datostiposvehiculos",
            JSON.stringify(datoscrearproductos.vgl_tiposvehiculos)
        );
        localStorage.setItem(
            "datosmarcasvehiculos",
            JSON.stringify(datoscrearproductos.vgl_marcasvehiculos)
        );
        localStorage.setItem(
            "datoscarroceriasvehiculos",
            JSON.stringify(datoscrearproductos.vgl_carroceriasvehiculos)
        );
        localStorage.setItem(
            "datosannosvehiculos",
            JSON.stringify(datoscrearproductos.vgl_annosvehiculos)
        );
        //localStorage.setItem('datosmodelosvehiculos', JSON.stringify(datoscrearproductos.vgl_modelosvehiculos));
        //localStorage.setItem('datoscilindrajevehiculos', JSON.stringify(datoscrearproductos.vgl_cilindrajesvehiculos));
        crearProductos();
    };
    /*
    useEffect(() => {
        localStorage.setItem('datostiposvehiculos', JSON.stringify(datoscrearproductos.vgl_tiposvehiculos));
        localStorage.setItem('datosmarcasvehiculos', JSON.stringify(datoscrearproductos.vgl_marcasvehiculos));
        localStorage.setItem('datoscarroceriasvehiculos', JSON.stringify(datoscrearproductos.vgl_carroceriasvehiculos));
        localStorage.setItem('datosannosvehiculos', JSON.stringify(datoscrearproductos.vgl_annosvehiculos));
    }, []);
*/
    //datoscrearproductos

    const crearProductos = () => {
        router.push("/CreateProduct/createproduct");
    };

    useEffect(() => {
        getProductById(2);
    }, []);

    const closeSwal = () => {
        Swal.close();
    }

    //Valida si el usuario esta logueado o debe Registrarse 
    const vender = () => {
        localStorage.setItem("placeholdersearch", JSON.stringify(""));
        dispatch(getUserMenuPrimary(false));
        if (userlogged.idinterno === 0 && userlogged.activo === "S") {
            swal(
                "Mercado Repuesto",
                "Primero debes ingresar datos del vendedor!",
                "warning",
                { button: "Aceptar" }
            );
            router.push("/my-additionaldata");
        } else {
            if (userlogged.logged) {
                enviadatoslocalstorage();
            } else {
                localStorage.setItem("ira", JSON.stringify(10));
                localStorage.setItem("rutaira", JSON.stringify("/CreateProduct/createproduct"));
                Swal.fire({
                    width: '450px',
                    borderRadius: '16px',
                    showCancelButton: false,
                    showConfirmButton: false,
                    html:
                        `               
                <div style="border-radius: 16px; padding: 2rem;">
                    <button id="closeButton" style="position: absolute; right: 2rem; top: 2rem; font-size: 25px; color: #2D2E83;">X</button>
                    <img src="/static/img/favicon_2.png" alt="Mercado Repuesto" style="width: 50%; height: auto; margin: 0 auto;"/>
           
                    <br />
                    <h4>Vive una experiencia diferente en la <br/> compra o venta de tu repuesto</h4>
          
                    <h4>Por favor ingresa a tu cuenta</h4>
           
                    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin-bottom: 1rem; width: 100%;">
                        <a href="/my-account" style="width: 100%; height: auto; margin: 0 auto; margin-top: .5rem; margin-bottom: 1.5rem;">
                            <button style="border-radius: 10px; color: #2D2E83; background-color: white; border: 3px solid #2D2E83; height: 41px; width: 185px; font-size: 16px; margin-top: 1rem;">Soy nuevo</button>
                        </a>
                        
                        <a href="/loginaccount" style="width: 100%; height: auto; margin: 0 auto;"> 
                            <button style="border-radius: 10px; color: white; background-color: #2D2E83; height: 41px; width: 185px; font-size: 16px; margin-top: 1rem;">Ya tengo una cuenta</button> 
                        </a>
                    </div>
                </div>
                `,
                    didOpen: () => {
                        document.getElementById('closeButton').addEventListener('click', () => {
                            Swal.close();
                        });
                    }
                });
            }
        }
    
        let editdata = {
            editar: false
        }
        dispatch(getEditData(editdata));
        let datprd = [];
        localStorage.setItem("duplicarprd", JSON.stringify(datprd));
        localStorage.setItem("vehvehicles", JSON.stringify(datprd));
        dispatch(getDuplicarPrd(0));
    
        if (router.pathname != "/CreateProduct/createproduct") {
            router.replace("/CreateProduct/createproduct");
            router.push("/CreateProduct/createproduct");
        } else {
            location.reload();
        }
    };

    // Lee de la base de datos de los tipos de Vehiculos desde la Base de Datos
    useEffect(() => {
        let queries;
        async function getTiposVehiculos(dat) {
            const TiposVehi = await VehiclesTypesRepository?.getVehicleTypes(0);
            //console.log("TIPOS VEHICULOS : ", TiposVehi[0].header_supplies)
            //console.log("SUPLIES : ", header_supplies.header_supplies)
            setTiposVehiculos(TiposVehi[0]?.header_supplies);
            setTimeout(function () {
                setLoading(false);
            }, 200);
        }
        getTiposVehiculos(queries);
    }, [stateInf]);

    return (
        <div className="header__supplies ps-dropdown--fullscreen">
            <button
                className={classVender}
                onMouseOver={onSelecciono}
                onMouseOut={outSelecciono}>
                <span onClick={() => vender()}>Vender</span>
            </button>
        </div>
    );
};

export default ModuleHeaderVender;
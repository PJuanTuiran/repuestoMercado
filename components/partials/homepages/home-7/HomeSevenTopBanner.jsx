import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { getEditData } from "../../../../store/editdata/action";
import { getAddEdToCart } from "../../../../store/addedtocart/action";
import { getDuplicarPrd } from "../../../../store/duplicarprd/action";
import { useRouter } from "next/router";

import { RiPoliceCarFill } from "react-icons/ri";
import { FaBusAlt } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5"; //electrico
import { BsBusFrontFill } from "react-icons/bs"; //camion
import { RiMotorbikeFill } from "react-icons/ri";

const HomeSevenTopBanner = (props) => {
    const router = useRouter();
    const { setSelectedForm } = props;
    const dispatch = useDispatch();
    const [datosUsuario, setDatosUsuario] = useState([]);

    const userlogged = useSelector((state) => state.userlogged.userlogged);

    const vender = () => {
        //console.log("DATOS USUARIO : ", userlogged)
        let item = {
            login: true,
        };
        localStorage.setItem("loginvender", JSON.stringify(item));
        //localStorage.setItem("accion", JSON.stringify("noaplica"));
        if (userlogged.idinterno === 0) {
            Swal.fire({
                width: "450px",
                borderRadius: "16px",
                showCancelButton: false,
                showConfirmButton: false,
                html: `  <div style="border-radius: 16px; padding: 2rem;">
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
                    document
                        .getElementById("closeButton")
                        .addEventListener("click", () => {
                            Swal.close();
                        });
                },
            });
        } else setSelectedForm("login");
    };

    const comprar = () => {
        let item = {
            login: false,
        };
        localStorage.setItem("loginvender", JSON.stringify(item));
        localStorage.setItem("placeholdersearch", JSON.stringify(""));
        setSelectedForm("login");
        localStorage.setItem("aadditemcar", JSON.stringify(false));
        localStorage.setItem("ira", JSON.stringify(0));
        localStorage.setItem("rutaira", JSON.stringify(""));

        let row = {
            idproducto: 0,
            nombreimagen1: "",
            titulonombre: "",
            cantidad: 0,
        };

        dispatch(getAddEdToCart(row));
        localStorage.setItem("addedtocart", JSON.stringify(row));
        let datprd = [];
        localStorage.setItem("duplicarprd", JSON.stringify(datprd));
        localStorage.setItem("vehproductos", JSON.stringify(datprd));
        dispatch(getDuplicarPrd(0));
    };

    const selectTipoVeh = (selectedOptions) => {
        router.push({
            pathname: "/searchinteractive/searchinteractive",
            query: {
                tipoVehiculoMain: JSON.stringify(selectedOptions),
            },
        });
    };

    return (
        <div className="ps-top-banners">
            <div
                className="newContHomepage"
                style={{
                    backgroundImage:
                        'url("https://i.postimg.cc/mDg6RjS7/Fondoinicio2.png")',
                }}>
                <div className="leftContainerHome">
                    <div className="leftContainerHomeLogo">
                        <img
                            src="/static/img/LogoBlancoMR/LogoBlancoMR.png"
                            alt=""
                        />
                    </div>
                    <div className="leftContainerHomeButtons">
                        <button onClick={comprar}>COMPRAR</button>
                        <button onClick={vender}>VENDER</button>
                    </div>
                    <div className="leftContainerHomeStock">
                        <p>REPUESTOS EN STOCK: 1234</p>
                        <p>REPUESTOS CARGANDOSE EN TIEMPO REAL: 1234</p>
                    </div>
                </div>

                <div className="RightContainerHome">
                    <div className="middleRightContainerHome">
                        <div className="fisrTitleHomepage">
                            <p>ACCESORIOS Y REPUESTOS</p>
                        </div>
                        <div className="titleAmarillo">
                            <p>PARA TU VEHICULO</p>
                        </div>
                        <div className="iconosHome">
                            <div className="iconHomeMain">
                                <div className="icon1home"
                                onClick={() => selectTipoVeh(2)}>
                                    <img
                                        src="/static/img/LogoBlancoMR/CirculoAzul.png"
                                        alt=""
                                    />
                                    <RiPoliceCarFill />
                                </div>
                                <div
                                    className="textIconHome"
                                    >
                                    <p>
                                        CARROS Y <br />
                                        CAMIONETAS
                                    </p>
                                </div>
                            </div>

                            <div className="iconHomeMain">
                                <div
                                    className="icon1home"
                                    onClick={() => selectTipoVeh(1)}>
                                    <img
                                        src="/static/img/LogoBlancoMR/CirculoAzul.png"
                                        alt=""
                                    />
                                    <RiMotorbikeFill />
                                </div>
                                <div className="textIconHome">
                                    <p>MOTOS</p>
                                </div>
                            </div>

                            <div className="iconHomeMain">
                                <div
                                    className="icon1home"
                                    onClick={() => selectTipoVeh(3)}>
                                    <img
                                        src="/static/img/LogoBlancoMR/CirculoAzul.png"
                                        alt=""
                                    />
                                    <BsBusFrontFill />
                                </div>
                                <div className="textIconHome">
                                    <p>CAMIONES</p>
                                </div>
                            </div>

                            <div className="iconHomeMain">
                                <div
                                    className="icon1home"
                                    onClick={() => selectTipoVeh(6)}>
                                    <img
                                        src="/static/img/LogoBlancoMR/CirculoAzul.png"
                                        alt=""
                                    />
                                    <FaBusAlt />
                                </div>
                                <div className="textIconHome">
                                    <p>
                                        BUSES Y <br /> VANS
                                    </p>
                                </div>
                            </div>

                            <div className="iconHomeMain">
                                <div
                                    className="icon1home"
                                    onClick={() => selectTipoVeh(4)}>
                                    <img
                                        src="/static/img/LogoBlancoMR/CirculoAzul.png"
                                        alt=""
                                    />
                                    <IoCarSport />
                                </div>
                                <div className="textIconHome">
                                    <p>ELECTRICOS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeSevenTopBanner;

/*
 <Card style={{ width: "18rem" }}>
                            <Card.Img
                                variant="top"
                                src="/static/img/carritodecompra.jpg"
                            />
                            <Card.Body>
                                <Card.Title onClick={prueba}>
                                    Card Title
                                </Card.Title>
                                <Card.Text>
                                    ssss
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
*/

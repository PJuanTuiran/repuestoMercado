import React, { useState, useEffect } from "react";
import ModuleDetailTopInformation from "~/components/elements/detail/modules/ModuleDetailTopInformation";
import ModuleProductDetailDescription from "~/components/elements/detail/modules/ModuleProductDetailDescription";
import ModuleDetailShoppingActions from "~/components/elements/detail/modules/ModuleDetailShoppingActions";
import ModuleProductDetailSharing from "~/components/elements/detail/modules/ModuleProductDetailSharing";
import ModuleDetailThumbnail from "~/components/elements/detail/modules/ModuleDetailThumbnail";
import RatingPrdSingleView from "~/components/elements/products/modules/RatingPrdSingleView";
import axios from "axios";
import useProduct from "~/hooks/useProduct";
import useEcomerce from "~/hooks/useEcomerce";
import { connect, useDispatch } from "react-redux";
import ModuleDetailMeta from "~/components/elements/detail/modules/ModuleDetailMeta";
import ModuleDetailTabs from "~/components/elements/detail/modules/ModuleDetailTabs";
import FrequentlyBoughtTogether from "~/components/partials/products/FrequentlyBoughtTogether";
import { Box, Grid, Button } from "@mui/material";
import { FaShuttleVan } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa6";
import { PiTruckFill } from "react-icons/pi";
import { MdElectricCar } from "react-icons/md";

let clase = "0";

const SingleProductView = ({ product, status = "in-stock" }) => {
    const dispatch = useDispatch();
    const { loading, addItem } = useEcomerce();
    const { brand } = useProduct();
    const [classCompatbilidad, setclassCompatbilidad] = useState(
        "infovehiculoviewprdsingle apuntador"
    );
    const [classCompatbilidadDos, setclassCompatbilidadDos] = useState(
        "infovehiculoviewprdsingle apuntador"
    );
    const [vehCompatibles, setVehCompatibles] = useState([]);
    const [posicionPrdVeh, setPosicionPrdVeh] = useState(null);
    const [openClosePosPrdVeh, setOpenClosePosPrdVeh] = useState(null);

    //console.log(" PRODUCTODETAIL : ", product);
    let statusView;

    if (status !== "out-stock") {
        statusView = (
            <p className="ps-product__log-status">
                Unidades Disponibles : {product && product.numerounidades}
            </p>
        );
    } else {
        statusView = (
            <p className="ps-product__log-status outstock">Out of stock</p>
        );
    }

    const handleAddItemToCart = (e) => {
        e.preventDefault();

        const dat = [
            {
                id: 9,
                quantity: 3,
            },
        ];
        //console.log("AGREGAR ITEM AL CARRITO : ", ecomerce.cartItems);
        return;

        addItem({ id: product.id, quantity: 1 }, dat, "cart");
        dispatch(toggleDrawer(true));
    };

    const handleCompatibilidad = () => {
        //alert(product.idproductovehiculo)

        if (vehCompatibles.length > 0)
            setclassCompatbilidadDos("infovehiculoviewprdsingle apuntador");
        else setclassCompatbilidadDos("infovehiculoviewprdsingledos apuntador");

        //console.log("vehCompatibles : ", vehCompatibles);
        //console.log("Idproductovehiculo : ", product.idproductovehiculo);

        if (vehCompatibles.length > 0) {
            setVehCompatibles([]);
        } else {
            const leeVehiculosCompatibles = async () => {
                let params = {
                    idproducto: '"' + product.idproductovehiculo + '"',
                };

                await axios({
                    method: "post",
                    url: "https://gimcloud.com.co/mrp/api/45",
                    params,
                })
                    .then((res) => {
                        //console.log("COMPATIBLES : ", res.data)
                        let arraycompatibilidad = [];
                        res.data.vehiculoscomp &&
                            res.data.vehiculoscomp.map((item) => {
                                let combustibleveh = "Gasolina";

                                if (item.combustible == 1)
                                    combustibleveh = "Gasolina";
                                else if (item.combustible == 2)
                                    combustibleveh = "Diesel";
                                else if (item.combustible == 3)
                                    combustibleveh = "Gasolina - Gas";
                                else if (item.combustible == 4)
                                    combustibleveh = "Gasolina – Eléctrico";

                                let traccionveh = "Tracción Delantera";

                                if (item.traccion == 1)
                                    traccionveh = "Tracción Delantera";
                                else if (item.traccion == 2)
                                    traccionveh = "Tracción Trasera";
                                else if (item.traccion == 3)
                                    traccionveh = "Tracción 4x4";

                                let transmisionveh = "Automática";

                                if (item.transmision == 1)
                                    transmisionveh = "Automática";
                                else if (item.transmision == 2)
                                    transmisionveh = "Manual";

                                let row = {
                                    marcaveh: item.marcaveh,
                                    modeloveh: item.modeloveh,
                                    anovehiculo: item.anovehiculo,
                                    cilindraje: item.cilindraje,
                                    combustible: combustibleveh,
                                    traccion: traccionveh,
                                    transmision: transmisionveh,
                                };
                                arraycompatibilidad.push(row);
                            });

                        setVehCompatibles(arraycompatibilidad);
                    })
                    .catch(function (error) {
                        console.log("Error leyendo productos Compatibles");
                    });
            };
            leeVehiculosCompatibles();
        }
    };

    const handlePosicionPrd = () => {
        const leePosicionPrd = async () => {
            let compara = product.posicionproducto;

            await axios({
                method: "post",
                url: "https://gimcloud.com.co/mrp/api/46",
            })
                .then((res) => {
                    let posicionprd = "";
                    res.data.listarposicionprd &&
                        res.data.listarposicionprd.map((item) => {
                            if (parseInt(item.codigo) == compara) {
                                posicionprd = item.nombre;
                            }
                        });
                    //console.log("POSPRD : ", posicionprd)
                    setPosicionPrdVeh(posicionprd);
                    setOpenClosePosPrdVeh(!openClosePosPrdVeh);
                })
                .catch(function (error) {
                    console.log("Error leyendo productos Compatibles");
                });
        };
        leePosicionPrd();
    };

    useEffect(() => {
        if (product && product.productogenerico == "Si")
            setclassCompatbilidad(
                "infovehiculoviewprdsingle apuntador deshabilitardiv"
            );
        else setclassCompatbilidad("infovehiculoviewprdsingle apuntador");
    }, []);

    return (
        <div className="product--detail ps-product--detail">
            <div className="ps-product__header">
                <div className="cajamoduledetailthumbnail">
                    <ModuleDetailThumbnail product={product} />
                </div>
                <div className="cajainfoproducto">
                    <ModuleDetailTopInformation product={product} />

                    {// product && product.numerounidades > 0 ? (
                    }
                        <Grid container spacing={1}>
                            <Grid item xs={6} md={6} lg={6}>
                                <ModuleDetailShoppingActions
                                    product={product}
                                />
                            </Grid>
                            {/*
                            <Grid item xs={6} md={6} lg={6}>
                                <label className="ml-20 ps-product__label mt-3">
                                    Unidades disponibles:{" "}
                                    {product.numerounidades}
                                </label>
                            </Grid>
                                */}
                        </Grid>
                    {//) : null
                    }
                    <div className="mtmenos15">
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                <a className="textoubicacionprd">
                                    ID producto:
                                    <a className="tamañotextoubicacioninfoproducto pl-70">
                                        {product && product.compatible}
                                    </a>
                                </a>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="">
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                <a className="textoubicacionprd">
                                    Marca del repuesto:
                                    <a className="tamañotextoubicacioninfoproducto pl-16">
                                        {product && product.marcarepuesto}
                                    </a>
                                </a>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="mt-2">
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                <a className="textoubicacionprd">
                                    Condición:
                                    <a className="tamañotextoubicacioninfoproducto pl-80">
                                        {product && product.condicion}
                                    </a>
                                </a>
                            </Grid>
                        </Grid>
                    </div>

                    {product && product.estadoproducto > 0 ? (
                        <div className="mt-2">
                            <Grid container spacing={1}>
                                <Grid item xs={5} md={5} lg={5}>
                                    <a className="textoubicacionprd">
                                        Estado del producto:
                                    </a>
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    md={6}
                                    lg={6}
                                    className="mlmenos80">
                                    <RatingPrdSingleView
                                        estadoproducto={product && product.estadoproducto}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    ) : null}

                    <div className="mt-2">
                        <Grid container spacing={1}>
                            <Grid item xs={5} md={5} lg={5}>
                                <a className="textoubicacionprd">
                                    Ubicación del producto:
                                </a>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                md={6}
                                lg={6}
                                className="mlmenos60 textomostrarcantidadresult">
                                    {product?.nombredepartamento}{" - "}{product?.nombreciudad}
                            </Grid>
                        </Grid>
                    </div>
                    {
                        console.log("PRODUCT : ", product)
                    }

                    {product && product.productogenerico == "No" ? (
                        <div className="mt-4">
                            <Grid container spacing={1} className="mbmenos7">
                                <Grid item xs={12} md={12} lg={12}>
                                    <div
                                        className={classCompatbilidad}
                                        onClick={() => handleCompatibilidad()}>
                                        Compatibilidad con vehículos
                                        {vehCompatibles.length == 0 ? (
                                            <i
                                                className="ml-320 fa fa-chevron-down"
                                                aria-hidden="true"></i>
                                        ) : (
                                            <i
                                                className="ml-320 fa fa-chevron-up"
                                                aria-hidden="true"></i>
                                        )}
                                    </div>
                                </Grid>
                            </Grid>

                            {vehCompatibles.length > 0
                                ? vehCompatibles &&
                                vehCompatibles.map((itemselect) => {
                                    let texto =
                                        itemselect.marcaveh +
                                        ", " +
                                        itemselect.modeloveh +
                                        ", " +
                                        itemselect.anovehiculo +
                                        ", " +
                                        itemselect.cilindraje +
                                        ", " +
                                        itemselect.combustible +
                                        ", " +
                                        itemselect.traccion +
                                        ", " +
                                        itemselect.transmision;

                                    texto.length > 80
                                        ? (clase = "vehcompatiblesprddos")
                                        : (clase = "vehcompatiblesprd");

                                    return (
                                        <Grid container spacing={1} className={clase}>
                                            {product && product.tipovehiculo == 2 ||
                                                product && product.tipovehiculo == 0 ? (
                                                <a>
                                                    <i>
                                                        <FaCar
                                                            className="iconposicionprd"
                                                        />
                                                    </i>
                                                </a>
                                            ) : product && product.tipovehiculo == 1 ? (
                                                <a>
                                                    <i>
                                                        <FaMotorcycle
                                                            className="iconposicionprd"
                                                        />
                                                    </i>
                                                </a>
                                            ) : product && product.tipovehiculo == 3 ? (
                                                <a>
                                                    <i>
                                                        <PiTruckFill
                                                            className="iconposicionprd"
                                                        />
                                                    </i>
                                                </a>
                                            ) : product && product.tipovehiculo == 4 ? (
                                                <a>
                                                    <i>
                                                        <MdElectricCar
                                                            className="iconposicionprd"
                                                        />
                                                    </i>
                                                </a>
                                            ) : product && product.tipovehiculo == 6 ? (
                                                <a>
                                                    <i>
                                                        <FaShuttleVan
                                                            className="iconposicionprd"
                                                        />
                                                    </i>
                                                </a>
                                            ) : null}{" "}
                                            {texto.length > 80 ? (
                                                <a className="textocompatibilidad cursordisable">
                                                    {itemselect.marcaveh}
                                                    {", "}
                                                    {itemselect.modeloveh}
                                                    {", "}
                                                    {itemselect.anovehiculo}
                                                    {", "}
                                                    {itemselect.cilindraje}
                                                    {", "}
                                                    {itemselect.combustible}
                                                    <h2 className="vehcompatiblesprdextension">
                                                        {itemselect.traccion}
                                                        {", "}
                                                        {
                                                            itemselect.transmision
                                                        }
                                                    </h2>
                                                </a>
                                            ) : (
                                                <a className="cursordisable">
                                                    {itemselect.marcaveh}
                                                    {", "}
                                                    {itemselect.modeloveh}
                                                    {", "}
                                                    {itemselect.anovehiculo}
                                                    {", "}
                                                    {itemselect.cilindraje}
                                                    {", "}
                                                    {itemselect.combustible}
                                                    {", "}
                                                    {itemselect.traccion}
                                                    {", "}
                                                    {itemselect.transmision}
                                                </a>
                                            )}
                                        </Grid>
                                    );
                                })
                                : null}

                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <div
                                        className={classCompatbilidadDos}
                                        onClick={() => handlePosicionPrd()}>
                                        Posición del producto
                                        {!openClosePosPrdVeh ? (
                                            <i
                                                className="ml-375 fa fa-chevron-down"
                                                aria-hidden="true"></i>
                                        ) : (
                                            <i
                                                className="ml-375 fa fa-chevron-up"
                                                aria-hidden="true"></i>
                                        )}
                                        {openClosePosPrdVeh ? (
                                            <div className="posicionprdveh">
                                                {posicionPrdVeh}
                                            </div>
                                        ) : null}
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    ) : null}
                </div>
            </div>
            <div className="mtmenos250">
                <ModuleDetailTabs product={product} />
            </div>
        </div>
    );
};

export default SingleProductView;

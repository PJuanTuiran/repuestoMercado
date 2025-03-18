import React, { useEffect, useState, useRef } from "react";
import Container from "~/components/layouts/Container";
import ShopSearch from "~/components/partials/shop/ShopSearch";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroup from "~/hooks/useProductGroup";
import { getCancelCondition } from "../../store/cancelcondition/action";
import { useRouter } from "next/router";
import axios from "axios";
import { Box, Grid, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ModuleDetailTabsPosts from "../../components/elements/detail/modules/ModuleDetailTabsPosts";

//Constantes
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";

let controlcond = false;
let holder = 0;
let valdata = 0;

const ViewStats = (props) => {
    const irA = useRef(null);
    const Router = useRouter();
    const [visitasPrd, setVisitasPrd] = useState([]);
    const [historialCarritoX, setHistorialCarritoX] = useState(0);
    const [historialCarritoY, setHistorialCarritoY] = useState(0);

    const [histrorialDeseosX, setHistrorialDeseosX] = useState(0);
    const [histrorialDeseosY, setHistrorialDeseosY] = useState(0);

    // Asignamos Datos al arreglo de Usuarios desde el state
    let addedtocart = useSelector((state) => state.addedtocart.addedtocart);
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const cancelcondition = useSelector(
        (state) => state.cancelcondition.cancelcondition
    );

    useEffect(() => {
        let visitasproducto = JSON.parse(
            localStorage.getItem("visitasproducto")
        );
        //console.log("YYYYYZZZZASASAS: ",visitasproducto)
        setVisitasPrd(visitasproducto);

        const leerHistorialCarrito = async () => {
            let params = {
                idproducto: visitasproducto[0].idproducto
            };
            //console.log("PROD : ", params);

            await axios({
                method: "post",
                url: URL_BD_MR + "582",
                params,
            })
                .then((res) => {

                    if (res.data.type == 1) {
                        //setHistorialCarrito(res.data.historialcarritocompra);

                        let itemcarritox = [];
                        let itemcarritoy = [];

                        res.data.historialcarritocompra &&
                            res.data.historialcarritocompra.map((row, index) => {
                                let nombremes = "";

                                if (row.mes == "1") nombremes = "Enero";
                                else if (row.mes == "2") nombremes = "Febrero";
                                else if (row.mes == "3") nombremes = "Marzo";
                                else if (row.mes == "4") nombremes = "Abril";
                                else if (row.mes == "5") nombremes = "Mayo";
                                else if (row.mes == "6") nombremes = "Junio";
                                else if (row.mes == "7") nombremes = "Julio";
                                else if (row.mes == "8") nombremes = "Agosto";
                                else if (row.mes == "9") nombremes = "Septiembre";
                                else if (row.mes == "10") nombremes = "Octubre";
                                else if (row.mes == "11") nombremes = "Noviembre";
                                else if (row.mes == "12") nombremes = "Diciembre";

                                itemcarritox.push(nombremes);
                                itemcarritoy.push(row.cantidad);
                            });

                        setHistorialCarritoX(itemcarritox)
                        setHistorialCarritoY(itemcarritoy)

                        console.log(
                            "OK item  add carrito de compra : ", res.data.historialcarritocompra
                        );
                    }
                })
                .catch(function (error) {
                    console.log(
                        "Error item add carrito de compra"
                    );
                });
        };
        leerHistorialCarrito();

        const leerHistorialListaDeseos = async () => {
            let params = {
                idproducto: visitasproducto[0].idproducto
            };
            //console.log("PROD : ", params);

            await axios({
                method: "post",
                url: URL_BD_MR + "532",
                params,
            })
                .then((res) => {

                    if (res.data.type == 1) {
                        //setHistorialCarrito(res.data.historialcarritocompra);

                        let itemlistadeseosx = [];
                        let itemlistadeseosy = [];

                        res.data.historywishlist &&
                            res.data.historywishlist.map((row, index) => {
                                let nombremes = "";

                                if (row.mes == "1") nombremes = "Enero";
                                else if (row.mes == "2") nombremes = "Febrero";
                                else if (row.mes == "3") nombremes = "Marzo";
                                else if (row.mes == "4") nombremes = "Abril";
                                else if (row.mes == "5") nombremes = "Mayo";
                                else if (row.mes == "6") nombremes = "Junio";
                                else if (row.mes == "7") nombremes = "Julio";
                                else if (row.mes == "8") nombremes = "Agosto";
                                else if (row.mes == "9") nombremes = "Septiembre";
                                else if (row.mes == "10") nombremes = "Octubre";
                                else if (row.mes == "11") nombremes = "Noviembre";
                                else if (row.mes == "12") nombremes = "Diciembre";

                                itemlistadeseosx.push(nombremes);
                                itemlistadeseosy.push(row.cantidad);
                            });

                        setHistrorialDeseosX(itemlistadeseosx)
                        setHistrorialDeseosY(itemlistadeseosy)

                        console.log(
                            "OK item  add lista desos : ", res.data.data.historywishlist);
                    }
                })
                .catch(function (error) {
                    console.log(
                        "Error item add carrito de compra"
                    );
                });
        };
        leerHistorialListaDeseos();

    }, []);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [visitasPrd]);

    return (
        <div ref={irA}>
            <Container title="Product">
                <div className="cajaverestadisticasprd">
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12} lg={12}>
                            <ModuleDetailTabsPosts
                                visitasPrd={visitasPrd}
                                historialCarritoX={historialCarritoX}
                                historialCarritoY={historialCarritoY}
                                histrorialDeseosX={histrorialDeseosX}
                                histrorialDeseosY={histrorialDeseosY}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
};

export default ViewStats;

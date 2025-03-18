import React, { useState, useEffect } from "react";
import ModulePublicationVisits from "~/components/elements/detail/modules/ModulePublicationVisits";
import ModuleSalesGrossPosts from "~/components/elements/detail/modules/ModuleSalesGrossPosts";
import ModuleSoldUnits from "~/components/elements/detail/modules/ModuleSoldUnits";
import ModuleNetSales from "./ModuleNetSales";
import ModuleAddShoppingCart from "./ModuleAddShoppingCart";
import ModuleAddWishList from "./ModuleAddWishList";
import { useDispatch, connect, useSelector } from "react-redux";
import axios from "axios";
import Moment from "moment";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../../../helpers/Constants";

import { Tab, Tabs } from "react-bootstrap";

const ModuleDetailTabsPosts = (props) => {
    const [value, setValue] = React.useState(0);
    const [dataVisitas, setDataVisita] = useState([]);
    const [dataX, setDataX] = useState([]);
    const [dataY, setDataY] = useState([]);

    const { visitasPrd, historialCarritoX, historialCarritoY, histrorialDeseosX, histrorialDeseosY } = props;

//console.log("PRODUCT : ", historialCarrito);

const handleChange = (event, newValue) => {
    setValue(newValue);
};

// Asignamos Datos al arreglo de Usuarios desde el state
const datosusuarios = useSelector((state) => state.userlogged.userlogged);
//console.log("PRODUCT : ", product.id);
useEffect(() => {
    let nvoprod = [];
    let ordenar = [];
    let datmeses = [];
    let datitemx = [];
    let datitemy = [];

    let ordenmes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    visitasPrd &&
        visitasPrd.map((row, index) => {
            let mes = Moment(row.fechacreacion).format("MM");
            let validar;
            validar = ordenar.includes(mes);
            if (!validar) {
                ordenar.push(mes);
            }
        });

    ordenmes &&
        ordenmes.map((row, index) => {
            ordenar &&
                ordenar.map((item, index) => {
                    if (parseInt(row) == parseInt(item)) {
                        nvoprod.push(item);
                    }
                });
        });

    nvoprod &&
        nvoprod.map((row, index) => {
            let contador = 0;
            let nombremes = "";
            visitasPrd &&
                visitasPrd.map((item, index) => {
                    let mes = Moment(item.fechacreacion).format("MM");
                    if (row == mes) {
                        contador = contador + 1;
                    }
                });

            if (row == "01") nombremes = "Enero";
            else if (row == "02") nombremes = "Febrero";
            else if (row == "03") nombremes = "Marzo";
            else if (row == "04") nombremes = "Abril";
            else if (row == "05") nombremes = "Mayo";
            else if (row == "06") nombremes = "Junio";
            else if (row == "07") nombremes = "Julio";
            else if (row == "08") nombremes = "Agosto";
            else if (row == "09") nombremes = "Septiembre";
            else if (row == "10") nombremes = "Octubre";
            else if (row == "11") nombremes = "Noviembre";
            else if (row == "12") nombremes = "Diciembre";

            let dat = {
                mes: row,
                nombremes: nombremes,
                visitas: contador,
            };

            let datx = {
                nombremes: nombremes,
            };

            let daty = {
                visitas: contador,
            };

            datitemx.push(nombremes);
            datitemy.push(contador);
            datmeses.push(dat);
        });

    setDataVisita(datmeses);
    setDataX(datitemx);
    setDataY(datitemy);
}, [visitasPrd]);



return (
    <div className="ml-10 mb-10 mt-10">
        <Tabs
            defaultActiveKey="1"
            id="uncontrolled-tab-example"
            className="textotitulotabposts mb-3">
            <Tab eventKey="1" title="Visitas">
                <ModulePublicationVisits
                    visitasPrd={dataVisitas}
                    dataX={dataX}
                    dataY={dataY}
                />
            </Tab>
            <Tab eventKey="2" title="Ventas brutas">
                <ModuleSalesGrossPosts
                    visitasPrd={dataVisitas}
                    dataX={dataX}
                    dataY={dataY}
                />
            </Tab>
            <Tab eventKey="3" title="Unidades vendidas">
                <ModuleSoldUnits
                    visitasPrd={dataVisitas}
                    dataX={dataX}
                    dataY={dataY}
                />
            </Tab>

            <Tab eventKey="4" title="Cantidad de venta">
                <ModuleNetSales
                    visitasPrd={dataVisitas}
                    dataX={dataX}
                    dataY={dataY}
                />
            </Tab>

            <Tab eventKey="5" title="Carrito de compras">
                <ModuleAddShoppingCart
                    visitasPrd={0}
                    dataX={historialCarritoX}
                    dataY={historialCarritoY}
                />
            </Tab>

            <Tab eventKey="6" title="Lista deseos">
                <ModuleAddWishList
                    visitasPrd={0}
                    dataX={histrorialDeseosX}
                    dataY={histrorialDeseosY}
                />
            </Tab>
        </Tabs>

    </div>
);
};

export default ModuleDetailTabsPosts;

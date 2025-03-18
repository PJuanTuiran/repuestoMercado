import React, { useState, useEffect, useRef } from "react";
import Container from "~/components/layouts/Container";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { URL_BD_MR } from "../helpers/Constants";


function BDMRVehiculos(props) {
    const datosmarcasvehiculos = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_marcasvehiculos
    );
    const datosmodelosvehiculos = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_modelosvehiculos
    );
    const datoscilindrajevehiculos = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_cilindrajesvehiculos
    );

    useEffect(() => {
        //console.log("datosmarcasvehiculos : ", datosmarcasvehiculos);
        let array = [];
        datosmarcasvehiculos &&
            datosmarcasvehiculos.map((row, index) => {
                //console.log("ROW : ", row)
                /*
                carroceria: 123
                estado: 1
                fechacreacion: null
                id: 47622
                label: "AUMARK BJ1039V3JD3 [FL] PLATON"
                marca: 198
                modelo: "AUMARK BJ1039V3JD3 [FL] PLATON"
                tipovehiculo: 3
                value: */
                let valida = false;

                let marca = null;
                let carroceria = null;
                let tipovehiculo = null;

                datosmodelosvehiculos &&
                    datosmodelosvehiculos.map((item, index) => {
                        if (parseInt(item.marca) === parseInt(row.id) &&
                            parseInt(item.carroceria) === parseInt(row.carroceria) &&
                            parseInt(item.tipovehiculo) === parseInt(row.tipovehiculo)) {
                            //console.log("Existe : ", item)
                            valida = true;  
                        }
                    });

                if (!valida) {

                    array.push(row)

                    const deleteModelo = async () => {
                        let params = row;
                        //    idmarca: row.id
                        //};
                        await axios({
                            method: "post",
                            url: URL_BD_MR + "255",
                            params,
                        })
                            .then((res) => {
                                console.log("Borrando marca veh : ", res.data)
                            })
                            .catch(function (error) {
                                console.log("Error borrando marca : ", row.id);
                            });
                    };
                    deleteModelo();

                    //if (row.tipovehiculo == 3)
                        array.push(row);
                }

            });

        console.log("Modelos : ", array)
        /*
    carroceria: 5
    estado: 1
    fechacreacion: null
    id: 74
    imagenmarca: null
    label: "ZQ MOTORS"
    text: "ZQ MOTORS"
    tipovehiculo: 1
    url: "motos"
    value: 74
        */

    }, [datosmarcasvehiculos])

    return (
        <div>
            <Container>
                <di>
                    Organizar BD Mercado repuesto
                </di>
            </Container>
        </div>
    );
}

export default BDMRVehiculos;
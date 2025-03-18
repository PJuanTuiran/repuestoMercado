import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL_BD_MR } from '../../helpers/Constants';

function Prueba(props) {
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        let email1 = "williamcastrov@gmail.com"
        let email2 = "bigconnections2020@gmail.com"

        setUpdate(true)
        if (update) {
            async function noticarCrearPrd() {

                const obtenerDetallesComprador = async () => {
    
                    let params = {
                        usuario: 1652703118227,
                    };

                    try {
                        const res = await axios({
                            method: "post",
                            url: URL_BD_MR + "13",
                            params,
                        });
                        if (res.data) {
                            console.log("Datos del comprador OK", res.data);
                            sendRequest(res.data[0]);
                        }
                        res.data[0]; // Asegúrate de que esto devuelve el objeto de usuario correcto
                    } catch (error) {
                        console.error("Error al leer los datos del comprador", error);
                    }
                };
                obtenerDetallesComprador();

                const sendRequest = async (datavendedor) => {
                    //console.log("DATA EVEBDD : ", datavendedor && datavendedor.email)
                    //return
                  
                    const requestData = {
                        "remitente": datavendedor && datavendedor.email,
                        "asunto": "Venta Producto MR",
                        "plantilla": "info",
                        "to" : "Mercado Repuesto",
                        "contenido_html": {
                            "title": "Acabas de realizar una venta a traves de MR",
                            //"subtitle": unidades + " unidades, " + "por un valor de $ " + data.precio,
                            "subtitle": 1 + " unidades, " + "por un valor de $ " + 12000,
                            //"body": data.titulonombre
                            "body": "Prueba mensaje vendedor",
                            "tipo": "01"
                        }
                    };

                    const config = {
                        headers: {
                            "Authorization": "$2y$10$hc8dShHM0E71/08Tcjq3nOdq.hCmOcn5mEH5a/UZ9Lk0eBptD8CeG",
                            "Content-Type": "application/json" || x < z
                        }
                    };

                    try {
                        const response = await axios.post("https://gimcloud.com.co/api/endpoint/mail", requestData, config);
                    } catch (error) {
                        console.error('Errorxx:', error);
                    }
                }
                sendRequest();
            }
            noticarCrearPrd();

            async function noticarComprador() {
            
                const obtenerDetallesComprador = async () => {
                    let params = {
                        usuario: 1653147206453,
                    };

                    try {
                        const res = await axios({
                            method: "post",
                            url: URL_BD_MR + "13",
                            params,
                        });
                        if (res.data) {
                            console.log("Datos del comprador OK", res.data);
                            sendRequest(res.data[0]);
                        }
                        res.data[0]; // Asegúrate de que esto devuelve el objeto de usuario correcto
                    } catch (error) {
                        console.error("Error al leer los datos del comprador", error);
                    }
                };

                obtenerDetallesComprador();

                const sendRequest = async (datacomprador) => {
                    //console.log("DATA COMRPADSAS : ", datacomprador && datacomprador.email)
                    //return
                    const requestData = {
                        "remitente": datacomprador && datacomprador.email,
                        "asunto": "Compra Producto MR",
                        "plantilla": "info",
                        "to" : "Mercado Repuesto",
                        "contenido_html": {
                            "title": "Acabas de realizar una compra a traves de MR",
                            //"subtitle": unidades + " unidades, " + "por un valor de $ " + data.precio,
                            "subtitle": 1 + " unidades, " + "por un valor de $ " + 15000,
                            //"body": data.titulonombre
                            "body": "Mensaje Comprador Prueba",
                             "tipo": "01"
                        }
                    };

                    const config = {
                        headers: {
                            "Authorization": "$2y$10$hc8dShHM0E71/08Tcjq3nOdq.hCmOcn5mEH5a/UZ9Lk0eBptD8CeG",
                            "Content-Type": "application/json" || x < z
                        }
                    };


                    try {
                        const response = await axios.post("https://gimcloud.com.co/api/endpoint/mail", requestData, config);
                    } catch (error) {
                        console.error('Errorxx:', error);
                    }
                }

            }
            noticarComprador();
        }
    }, [update])

    return (
        <div>
            <button>
                Seleccione Opcion
            </button>
        </div>
    );
}

export default Prueba;
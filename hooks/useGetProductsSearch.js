import { useState, useEffect } from "react";
import axios from "axios";
import { getProductsByCollectionHelper } from "~/utilities/strapi-fetch-data-helpers";
import ProductRepository from "~/repositories/ProductRepository";
//export const baseDomain = "https://api.aal-estate.com/mrp/api";
export const baseDomain = "https://gimcloud.com.co/mrp/api/";

export default function useGetProductsSearch() {
    const [loading, setLoading] = useState(false);
    const [productItems, setProductItems] = useState(null);
    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);
    const [datosConectores, setDatosConectores] = useState([]);
    const [datBuscar, setDatBuscar] = useState([]);
    const [restData, setRestData] = useState([]);

    useEffect(() => {
        let conectores = JSON.parse(localStorage.getItem("dataconectores"));
        setDatosConectores(conectores);
    }, []);

    return {
        loading,
        product,
        productItems,
        category,
        setLoading: (payload) => {
            setLoading(payload);
        },

        getProductsByCollection: async (payload, pageSize = 8) => {
            setLoading(true);
            const responseData = await getProductsByCollectionHelper(
                payload,
                pageSize
            );
            if (responseData) {
                setProductItems(responseData.items);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getUsers: async (payload) => {
            console.log("PAYLOAD : ", payload)

            setLoading(true);
            let responseData;
            let url = 'https://gimcloud.com.co/mrp/api/api/4/'

            if (payload) {
                responseData = await axios(
                    {
                        method: 'post',
                        url: url,
                        params: payload
                    })
            } else {
                console.log("ERROR CREANDO USUARIO")
            }

            if (responseData) {
                console.log("RESPONSEDATA : ", responseData)
            }
        },

        getProducts: async (payload) => {
            //alert("PRODUCTo")
            setLoading(true);
            let responseData;
            let cadena = "";
            let palabrasseparadas = 0;
            let separatewords = [];
            let datfind = "0";

            if (payload) {
                if (payload.name_contains)
                    cadena = payload.name_contains;

                datfind = JSON.parse(localStorage.getItem("placeholdersearch"));
                if (!datfind)
                    datfind = "";
                //setDatBuscar(datfind);
                console.log("DATA FIND : ", datfind)
                console.log("CONECTORES : ", datosConectores)

                if (datfind.length > 1)
                    palabrasseparadas = datfind.split(' ')
                else
                    if (cadena.length > 1)
                        palabrasseparadas = cadena.split(' ')

                let longconectors = datosConectores.length;

                palabrasseparadas &&
                    palabrasseparadas.map((row) => {
                        let continuar = true;
                        for (var i = 0; i < longconectors; i++) {
                            //if(datosConectores[i].conector == 'de')
                            //alert("DE") 
                            
                            let item = datosConectores[i].conector.toLowerCase()
                            console.log("LONG : ", item)
                            if (item == row.toLowerCase() || "" == row.toLowerCase()) {
                                alert(row.toLowerCase())
                                continuar = false;
                                break;
                            }
                        }
                        if (continuar)
                            separatewords.push(row.toLowerCase());
                    });

                //console.log("SEPARATE WORD : ", separatewords)

                responseData = await ProductRepository.getProducts(payload);
                setRestData(responseData);
                //console.log("RESPUESTA API 17 GETPRD : ", responseData)
            } else {
                const queries = {
                    _limit: 12,
                };
                responseData = await ProductRepository.getProducts(queries);
                setRestData(responseData);
            }

            if (responseData) {
                console.log("responseData : ", responseData)
                console.log("Palabras Separadas : ", separatewords)

                let resultado = [];
                let control = [];

                separatewords &&
                    separatewords.map((row) => {
                        responseData &&
                            responseData.map((item, index) => {
                                let una = item.name.toLowerCase() + " " + item.condicion.toLowerCase() + " " +
                                    item.descripcionproducto.toLowerCase();
                                //console.log("COMPRA : ", una)
                                let dos = row.toLowerCase();

                                let respuesta = una.includes(dos)
                                if (respuesta) {
                                    let it = {
                                        index: index,
                                        id: item.id
                                    }
                                    control.push(it);
                                    resultado.push(item);
                                }
                            });
                    });

                let resprod = [];
                let unico = [];
                let validar;

                resultado &&
                    resultado.map((item, index) => {
                        validar = unico.includes(item.name);
                        if (!validar) {
                            unico.push(item.name);
                            resprod.push(item);
                        }
                    });

                let validapalabras = [];
                let contarpalabras = [];
                let datosbase = [];
                let datosordenados = [];

                let long = datosConectores.length;
                //console.log("DAT XX : ", resprod)
                //console.log("COMPAR XX : ", separatewords)

                if (resprod.length > 0) {
                    console.log("1")
                    datosbase = resprod;
                    //console.log("RESPROD : ", resprod)
                    //console.log("PALSEPAR: ", separatewords)
                    resprod &&
                        resprod.map((item) => {
                            let contador = 0;
                            separatewords &&
                                separatewords.map((palabra) => {

                                    //console.log("RESPROD : ", item)
                                    let compara = item.marca + " " + item.modelos + " " + item.name + " " + item.condicion + " " + item.descripcionproducto;
                                    validapalabras = compara.split(' ');

                                    let wordunique = [];
                                    let wordselect = [];

                                    let valid;
                                    validapalabras &&
                                        validapalabras.map((row) => {
                                            let palabraunique = item.id + row;
                                            valid = wordunique.includes(palabraunique);
                                            if (!valid) {
                                                wordunique.push(palabraunique);
                                                wordselect.push(row);
                                            }
                                        });
                                    //console.log("PALAB : ", wordselect);

                                    wordselect &&
                                        wordselect.map((row) => {
                                            let continuar = true;
                                            for (var i = 0; i < long; i++) {
                                                if (datosConectores[i].conector == row.toLowerCase()) {
                                                    continuar = false;
                                                    break;
                                                }
                                            }

                                            if (continuar) {
                                                //console.log("LONG : ", palabra, " - ", palabra.length)
                                                //if (palabra.toLowerCase() == row.toLowerCase())
                                                if (row.toLowerCase().includes(palabra.toLowerCase()))
                                                    contador = contador + 1;
                                            }
                                        });
                                });
                            let cont = {
                                id: item.id,
                                cantidad: contador
                            }
                            contarpalabras.push(cont);
                        });
                } else {
                    datosbase = responseData;
                    console.log("2")
                    responseData &&
                        responseData.map((item) => {
                            let contador = 0;
                            separatewords &&
                                separatewords.map((palabra) => {
                                    validapalabras = item.name.split(' ');
                                    validapalabras &&
                                        validapalabras.map((row) => {
                                            let continuar = true;
                                            for (var i = 0; i < long; i++) {
                                                if (datosConectores[i].conector == row.toLowerCase()) {
                                                    continuar = false;
                                                    break;
                                                }
                                            }

                                            if (continuar) {
                                                if (palabra.toLowerCase() == row.toLowerCase())
                                                    contador = contador + 1;
                                            }
                                        });
                                });
                            let cont = {
                                id: item.id,
                                cantidad: contador
                            }
                            contarpalabras.push(cont);
                        });
                }

                let orden = contarpalabras.sort((x, y) => y.cantidad - x.cantidad);

                console.log("CONTAR WORD : ", contarpalabras)

                long = datosbase.length;

                orden &&
                    orden.map((item) => {
                        for (var i = 0; i < long; i++) {
                            if (datosbase[i].id == item.id) {
                                datosordenados.push(datosbase[i]);
                                break;
                            }
                        }
                    });

                setProductItems(datosordenados);

                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getProductById: async (payload) => {
            //console.log("PAYLOAD PRODUCTBYID : ", payload)
            setLoading(true);
            const responseData = await ProductRepository.getProductsById(
                payload
            );
            //console.log("RESPONSE DATA : ", responseData[0])
            if (responseData) {
                setProduct(responseData[0]);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getPublicatById: async (payload) => {
            //console.log("PAYLOAD PRODUCTBYID : ", payload)
            setLoading(true);
            const responseData = await ProductRepository.getPublicationById(
                payload
            );
            //console.log("RESPONSE DATA : ", responseData[0])
            if (responseData) {
                setProduct(responseData[0]);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getCategoryBySlug: async (payload) => {
            setLoading(true);
            const response = await ProductRepository.getPrductCategoryBySlug(
                payload
            );
            if (response) {
                setCategory(response);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },
    };
}

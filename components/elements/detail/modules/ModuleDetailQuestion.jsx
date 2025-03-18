import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Button } from "@mui/material";
import ModalMensajesQuestionSeller from "../../../../pages/mensajes/ModalMensajesQuestionSeller";
import axios from "axios";
import ModalMensajesSoyNuevo from "../../../../pages/mensajes/ModalMensajesSoyNuevo";
import { getLeeIra } from "../../../../store/leeira/action";
import { useRouter } from "next/router";
import { IoMdReturnRight } from "react-icons/io";
import moment from "moment";

let validaword = [
    { word: "www" },
    { word: "carrera" },
    { word: "avenida" },
    { word: "#" },
    { word: "N°" },
    { word: "@" },
    { word: ".com" },
    { word: ".co" },
    { word: ".net" },
    { word: "contactanos" },
    { word: "contacto" },
    { word: "llama" },
    { word: "llamar" },
    { word: "telefono" },
    { word: "celular" },
    { word: "movil" },
];

// Change your description content here
const ModuleDetailQuestion = ({ product }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [mostrarMas, setMostrarMas] = useState(false);
    const [preguntaVendedor, setPreguntaVendedor] = useState(null);
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);
    const [actualiza, setActualiza] = useState(false);
    const [listaPreguntasVendedor, setListaPreguntasVendedor] = useState([]);

    const [showModalMensajesSoyNuevo, setShowModalMensajesSoyNuevo] =
        useState(false);
    const [tituloMensajesSoyNuevo, setTituloMensajesSoyNuevo] = useState(false);
    const [textoMensajesSoyNuevo, setTextoMensajesSoyNuevo] = useState(false);

    const datosusuario = useSelector((state) => state.userlogged.userlogged);

    useEffect(() => {
        const leerPreguntaVendedor = async () => {
            let params = {
                idprd: product.id,
            };

            await axios({
                method: "post",
                url: "https://gimcloud.com.co/mrp/api/5212",
                params,
            })
                .then((res) => {
                    let array = [];
                    res.data.listpreguntacompra &&
                        res.data.listpreguntacompra.map((item, index) => {
                            if (item.estado == 81) {
                                let respuesta = "No hay respuesta";
                                let fecha = null;
                                res.data.listpreguntacompra &&
                                    res.data.listpreguntacompra.map((row) => {
                                        if (
                                            row.idpregunta == item.idpregunta &&
                                            row.estado == 83
                                        ) {
                                            respuesta = row.comentario;
                                            fecha = row.fechacreacion;
                                        }
                                    });

                                let data = {
                                    pregunta: item.comentario,
                                    respuesta: respuesta,
                                    fecha: fecha,
                                };
                                array.push(data);
                            }
                        });

                    setActualiza(false);
                    setListaPreguntasVendedor(array);
                })
                .catch(function (error) {
                    console.log("Error leyendo preguntas al vendedor");
                });
        };
        leerPreguntaVendedor();
    }, [actualiza]);

    const verMas = () => {
        setMostrarMas(true);
    };

    const verMenos = () => {
        setMostrarMas(false);
    };

    const saveQuestion = () => {
        if (!datosusuario.uid || datosusuario.uid == 0) {
            /* Guarda datos del producto que se debe agregar al localstorage */
            localStorage.setItem("ira", JSON.stringify(8));
            //localStorage.setItem("rutaira", JSON.stringify(router.pathname));
            localStorage.setItem("prdira", JSON.stringify(product.id));
            dispatch(getLeeIra(8));

            setShowModalMensajesSoyNuevo(true);
            setTituloMensajesSoyNuevo(
                "¡Bienvenido! Para ir a historial debes ingresar a tu cuenta"
            );
            let texto = "";
            setTextoMensajesSoyNuevo(texto);
            //setLogin(true);
            return;
        }
        if (datosusuario.uid == product.usuario) {
            setShowModalMensajes(true);
            setTituloMensajes("Tu pregunta no cumple con nuestras politicas");
            setTextoMensajes(
                "Eres el vendedor de este producto, no puedes enviar la pregunta..."
            );
            return;
        }

        if (!preguntaVendedor) {
            setShowModalMensajes(true);
            setTituloMensajes("Tu pregunta no cumple con nuestras politicas");
            setTextoMensajes(
                "Por tu seguridad y la de tu compra, te recomendamos no incluir datos de contacto en tus preguntas."
            );
            return;
        }

        let control = false;

        validaword &&
            validaword.map((item, index) => {
                let texto = preguntaVendedor.toLowerCase();
                let valid = texto.includes(item.word);
                if (valid) {
                    control = true;
                    setShowModalMensajes(true);
                    setTituloMensajes(
                        "Tu pregunta no cumple con nuestras politicas"
                    );
                    setTextoMensajes(
                        "Por tu seguridad y la de tu compra, te recomendamos no incluir datos de contacto en tus preguntas."
                    );
                    return;
                }
            });

        let validacaracteres;
        let haycaracterid = false;
        let valornum = "";
        let pagina = "";

        for (var i = 0; i < preguntaVendedor.length; i++) {
            validacaracteres = preguntaVendedor.substr(i, 1);

            //console.log("VALIDA : ", validacaracteres);
            if (
                validacaracteres == 0 ||
                validacaracteres == 1 ||
                validacaracteres == 2 ||
                validacaracteres == 3 ||
                validacaracteres == 4 ||
                validacaracteres == 5 ||
                validacaracteres == 6 ||
                validacaracteres == 7 ||
                validacaracteres == 8 ||
                validacaracteres == 9
            ) {
                console.log("CARACTER : ", validacaracteres);
                valornum = valornum + validacaracteres;
            }

            let limpiarblancos = valornum.replace(/ /g, "");

            if (limpiarblancos.length > 5) {
                control = true;
                setShowModalMensajes(true);
                setTituloMensajes(
                    "Tu pregunta no cumple con nuestras politicas"
                );
                setTextoMensajes(
                    "Por tu seguridad y la de tu compra, te recomendamos no incluir datos de contacto en tus preguntas."
                );
                return;
            }

            if (validacaracteres == "@") {
                control = true;
                setShowModalMensajes(true);
                setTituloMensajes(
                    "Tu pregunta no cumple con nuestras politicas"
                );
                setTextoMensajes(
                    "Por tu seguridad y la de tu compra, te recomendamos no incluir datos de contacto en tus preguntas."
                );
                return;
            }
        }

        //console.log("PRODC: ", product);
        //console.log("DATOS USUARIO: ", datosusuario);
        //return;

        if (!control) {
            const grabarPreguntaVendedor = async () => {
                const idpregunta = Math.floor(Math.random() * 10000000); // Genera un número aleatorio de hasta 7 dígitos

                let params = {
                    idprd: product.id,
                    uidcomprador: datosusuario.uid,
                    uidvendedor: product.usuario,
                    idpregunta: idpregunta.toString(),
                    comentario: preguntaVendedor,
                    estado: 80,
                };

                await axios({
                    method: "post",
                    url: "https://gimcloud.com.co/mrp/api/51",
                    params,
                })
                    .then((res) => {
                        //console.log("DAT: ", res.data);
                        if (res.data.type == 1) {
                            setShowModalMensajes(true);
                            setTituloMensajes("Información del vendedor");
                            setTextoMensajes(
                                "Tu Pregunta ha sido enviada al vendedor"
                            );
                        }
                        setActualiza(true);
                    })
                    .catch(function (error) {
                        console.log("Error grabando pregunta vendedor");
                    });
            };
            grabarPreguntaVendedor();
        }
    };

    const handleChange = (dat) => {
        setPreguntaVendedor(dat);
    };

    return (
        <div className="mlmenos8 mtmenos15">
            <ModalMensajesQuestionSeller
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            <ModalMensajesSoyNuevo
                shown={showModalMensajesSoyNuevo}
                close={setShowModalMensajesSoyNuevo}
                titulo={tituloMensajesSoyNuevo}
                mensaje={textoMensajesSoyNuevo}
                setSoyNuevo={0}
                setTengoCuenta={0}
                tipo="1"
            />
            <Grid container alignItems="center" spacing={1}>
                <Grid item xs={12} md={12} lg={12}>
                    <a className="ml-10 tamañofuentetab colorbase">
                        Escribe tu pregunta para el vendedor aquí
                    </a>
                </Grid>
            </Grid>

            <Grid container alignItems="center" spacing={1}>
                <Grid item xs={8} md={8} lg={8}>
                    <input
                        className="inputquestionseller"
                        onChange={(e) => handleChange(e.target.value)}
                    />
                </Grid>
                <Grid item xs={2} md={2} lg={2}>
                    <div
                        className="botonsendquestionseller"
                        onClick={() => saveQuestion()}>
                        <a className="textoenviar">Enviar</a>
                    </div>
                </Grid>
            </Grid>

            <Grid container alignItems="center" spacing={1}>
                <Grid item xs={12} md={12} lg={12}>
                    <div className="textorecuerda">
                        * Recuerda que para poder seguir siendo tu apoyo en el
                        proceso de compra debes abstenerte de escribir
                        información de contacto como telefono, direcciones,
                        correos electrónicos, entre otros.
                    </div>
                </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={1} className="mt-10">
                <Grid item xs={12} md={12} lg={12}>
                    <a className="ml-10 tamañofuentetab colorbase">
                        Preguntas ya realizadas
                    </a>
                </Grid>
            </Grid>

            {listaPreguntasVendedor.length > 0 ? (
                listaPreguntasVendedor &&
                listaPreguntasVendedor.map((item, index) => {
                    return (
                        <div>
                            <div>
                                {index < 2 ? (
                                    <Grid container spacing={1}>
                                        <Grid item xs={2} md={2} lg={2}>
                                            <a className="textopreguntavendedor">
                                                <a className="titulopreguntar">
                                                    Pregunta:{" "}
                                                </a>
                                            </a>
                                        </Grid>
                                        <Grid item xs={10} md={10} lg={10}>
                                            <div className="textoprgvendedorviewsingle">
                                                {item.pregunta}
                                            </div>
                                        </Grid>
                                        <Grid item xs={2} md={2} lg={2}>
                                            <IoMdReturnRight className="returnIcondos" />
                                        </Grid>
                                        <Grid item xs={4} md={4} lg={4}>
                                            <div className="textorespuestavendedorviewsingle">
                                                {item.respuesta}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <div className="textofecharespuestavendedor">
                                                {item.fecha
                                                    ? moment(item.fecha).format(
                                                          "YYYY-MM-DD"
                                                      )
                                                    : null}
                                            </div>
                                        </Grid>
                                    </Grid>
                                ) : null}
                            </div>
                            <div>
                                {index > 1 && mostrarMas ? (
                                    <Grid container spacing={1}>
                                        <Grid item xs={2} md={2} lg={2}>
                                            <a className="textopreguntavendedor">
                                                <a className="titulopreguntar">
                                                    Pregunta:{" "}
                                                </a>
                                            </a>
                                        </Grid>
                                        <Grid item xs={10} md={10} lg={10}>
                                            <div className="textoprgvendedorviewsingle">
                                                {item.pregunta}
                                            </div>
                                        </Grid>
                                        <Grid item xs={2} md={2} lg={2}>
                                            <IoMdReturnRight className="returnIcondos" />
                                        </Grid>
                                        <Grid item xs={4} md={4} lg={4}>
                                            <div className="textorespuestavendedorviewsingle">
                                                {item.respuesta}
                                            </div>
                                        </Grid>
                                    </Grid>
                                ) : null}
                            </div>
                        </div>
                    );
                })
            ) : (
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12} lg={12}>
                        <a className="titulonohayprguntas">
                            No hay preguntas realizadas
                        </a>
                    </Grid>
                </Grid>
            )}

            {!mostrarMas ? (
                <p
                    className="mt-10 ml-10 subrayartextoclicaqui apuntador"
                    onClick={() => verMas()}>
                    {listaPreguntasVendedor.length > 2 ? (
                        <a>Ver mas...</a>
                    ) : null}
                </p>
            ) : (
                <div>
                    <Grid
                        container
                        alignItems="center"
                        spacing={1}
                        className="ml-1 mt-1">
                        <Grid item xs={12} md={12} lg={12}>
                            <p
                                className="subrayartextoclicaqui apuntador"
                                onClick={() => verMenos()}>
                                Ver menos...
                            </p>
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    );
};

export default ModuleDetailQuestion;

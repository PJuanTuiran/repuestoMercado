import React, { useState, useEffect, useRef } from "react";
import Container from "~/components/layouts/Container";
import { useRouter } from "next/router";
import { Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { URL_BD_MR } from "../../helpers/Constants";
import { useSelector } from "react-redux";

function terminapublicacion(props) {
    // Lee modelos de los Vehiculos del state
    const router = useRouter();
    const irA = useRef(null);
    const [publicacion, setPublicacion] = useState("");
    const [tituloPublicacion, setTituloPublicacion] = useState("");
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    let estadopublicacion = 0;
    let estadotitulo = "";
    let idprd = 0;

    if (typeof window !== "undefined") {
        if (router.query.estadopublicacion != 2) {
            if (router.query.estadopublicacion == 1) {
                estadopublicacion = 1;
                estadotitulo = router.query.titulopublicacion;
                idprd = router.query.idprd;
            } else {
                estadopublicacion = 0;
                estadotitulo = "";
                idprd = 0;
            }
        }
    }

    useEffect(() => {
        const leerVentas = async () => {
            //console.log("USUARIO : ", datosusuarios);
            let params = {
                uidvendedor: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "160",
                params,
            })
                .then((res) => {
                    if (res.data.listarmisventas.length > 0) {
                        //console.log("DATOS VENTA : ", res.data.listarmisventas[0]);

                        if (estadopublicacion == 1) {
                            setPublicacion(idprd);
                            setTituloPublicacion(estadotitulo);
                        } else {
                            setPublicacion(res.data.listarmisventas[0].id);
                            setTituloPublicacion(
                                res.data.listarmisventas[0].titulonombre
                            );
                        }
                    } else
                        console.log("ERROR : ", "Error leyendo datos ventas");
                })
                .catch(function (error) {
                    console.log("ERROR : ", res.data);
                    return;
                });
        };
        leerVentas();
    }, [datosusuarios, estadopublicacion]);

    const irAlInicio = async () => {
        router.push("/");
    };

    const leerPublicacion = async () => {
        //alert(publicacion);
        //alert(tituloPublicacion);
        let dato = publicacion;
        router.push("/product/" + dato);
    };

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    return (
        <div ref={irA}>
            <Container title="Mi Cuenta">
                <div className="container">
                    <div className="cuadropublicacionproducto mt-20 mb-30">
                        <div className="ml-50 mt-20">
                            <Row>
                                <Col xl={1} lg={1} md={1} sd={1}>
                                    <i
                                        className="tamañoiconoterminarpublicacion fa fa-check-circle"
                                        aria-hidden="true"></i>
                                </Col>
                                <Col xl={11} lg={11} md={11} sd={11}>
                                    <h1 className="mlmenos50 textoterminapublicacion mt-10 mb-20">
                                        ¡ Publicación realizada con exito !
                                    </h1>
                                </Col>
                            </Row>
                            <div className="cuadrointernopublicacionproducto">
                                <h1 className="textoterminapublicacion mb-20">
                                    Tu publicación ha sido creada y publicada.
                                    <br />
                                    Puede tardar algunos minutos en aparecer en
                                    los resultados de búsquedas.
                                    <br />
                                    <br />
                                    Recuerda que el titulo de la publicacion es:{" "}
                                    {tituloPublicacion}
                                    <br />
                                    <br />
                                    {/*
                                    <h2 className="textoalert">
                                        Link de la publicacion es : .
                                    </h2>
                                */}
                                    <br />
                                    {/*publicacion.titulo*/}
                                </h1>
                            </div>

                            <div className="mt-20">
                                <Row>
                                    <Col xl={7} lg={7} md={7} xs={7}></Col>
                                    <Col xl={2} lg={2} md={2} xs={2}>
                                        <Button
                                            className="ps-btn ml-25 colordelfondo redondearborde colorbase"
                                            onClick={() => irAlInicio()}
                                            variant="outline-light">
                                            {" "}
                                            Ir al inicio
                                        </Button>
                                    </Col>
                                    <Col xl={2} lg={2} md={2} xs={2}>
                                        <Button
                                            className="ps-btn ml-25 redondearborde"
                                            onClick={leerPublicacion}>
                                            {" "}
                                            Ver publicación
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default terminapublicacion;

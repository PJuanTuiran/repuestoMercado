import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";

function ModalComentariosCategorias({ shown, close, categoria, listaCategoriasGen }) {
    //console.log("CATEGORIAXXXX : ", listaCategoriasGen);

    const [textoLubricantesFluidos, setTextoLubricantesFluidos] = useState(listaCategoriasGen ? listaCategoriasGen[5]?.descripcion : "");
    const [textoEsteticos, setTextoEsteticos] = useState(listaCategoriasGen ? listaCategoriasGen[0]?.descripcion : "");
    const [textoIluminacion, setTextoIluminacion] = useState(listaCategoriasGen ? listaCategoriasGen[4]?.descripcion : "");
    const [textoLlantasRines, setTextoLlantasRines] = useState(listaCategoriasGen ? listaCategoriasGen[6]?.descripcion : "");
    const [textoKitCarretera, setTextoKitCarretera] = useState(listaCategoriasGen ? listaCategoriasGen[9]?.descripcion : "");
    const [textoBaterias, setTextoBaterias] = useState(listaCategoriasGen ? listaCategoriasGen[7]?.descripcion : "");
    const [textoPlumillas, setTextoPlumillas] = useState(listaCategoriasGen ? listaCategoriasGen[8]?.descripcion : "");
    const [textoAccesoriosInterior, setTextoAccesoriosInterior] = useState(listaCategoriasGen ? listaCategoriasGen[1]?.descripcion : "");
    const [textoAccesoriosExterior, setTextoAccesoriosExterior] = useState(listaCategoriasGen ? listaCategoriasGen[2]?.descripcion : "");
    const [textoSonido, setTextoSonido] = useState(listaCategoriasGen ? listaCategoriasGen[3]?.descripcion : "");

    const [mostrarTexto, setMostrarTexto] = useState("");
    const [titulo, setTitulo] = useState("");

    const [tempo, settempo] = useState("");

    useEffect(() => {
        setTextoLubricantesFluidos(listaCategoriasGen ? listaCategoriasGen[5]?.descripcion : "");
        setTextoEsteticos(listaCategoriasGen ? listaCategoriasGen[0]?.descripcion : "");
        setTextoIluminacion(listaCategoriasGen ? listaCategoriasGen[4]?.descripcion : "");
        setTextoLlantasRines(listaCategoriasGen ? listaCategoriasGen[6]?.descripcion : "");
        setTextoKitCarretera(listaCategoriasGen ? listaCategoriasGen[9]?.descripcion : "");
        setTextoBaterias(listaCategoriasGen ? listaCategoriasGen[7]?.descripcion : "");
        setTextoPlumillas(listaCategoriasGen ? listaCategoriasGen[8]?.descripcion : "");
        setTextoAccesoriosInterior(listaCategoriasGen ? listaCategoriasGen[1]?.descripcion : "");
        setTextoAccesoriosExterior(listaCategoriasGen ? listaCategoriasGen[2]?.descripcion : "");
        setTextoSonido(listaCategoriasGen ? listaCategoriasGen[3]?.descripcion : "");
    }, [listaCategoriasGen]);

    useEffect(() => {
        let subcategenericos = JSON.parse(localStorage.getItem("subcategenericos"));
        if (categoria == 1) {
            setMostrarTexto(textoEsteticos);
            setTitulo(subcategenericos[0].nombre);
        } else if (categoria == 2) {
            setMostrarTexto(textoAccesoriosInterior);
            setTitulo(subcategenericos[1].nombre);
        } else if (categoria == 3) {
            setMostrarTexto(textoAccesoriosExterior);
            setTitulo(subcategenericos[2].nombre);
        } else if (categoria == 4) {
            setMostrarTexto(textoSonido);
            setTitulo(subcategenericos[3].nombre);
        } else if (categoria === 5) {
            setMostrarTexto(textoIluminacion);
            setTitulo(subcategenericos[4].nombre);
        } else if (categoria === 6) {
            setMostrarTexto(textoLubricantesFluidos);
            setTitulo(subcategenericos[5].nombre);
        } else if (categoria === 7) {
            setMostrarTexto(textoLlantasRines);
            setTitulo(subcategenericos[6].nombre);
        } else if (categoria === 8) {
            setMostrarTexto(textoBaterias);
            setTitulo(subcategenericos[7].nombre);
        } else if (categoria === 9) {
            setMostrarTexto(textoPlumillas);
            setTitulo(subcategenericos[8].nombre);
        } else if (categoria === 10) {
            setMostrarTexto(textoKitCarretera);
            setTitulo(subcategenericos[9].nombre);
        } else {
            setMostrarTexto("por definir");
            setTitulo("Pendiente");
        }
    }, [categoria]);

    return shown ? (
        <div
            className="modal-fondo"
            onClick={() => {
                close();
            }}>
            <div
                className="modal-contenido redondearventamensajes"
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div>
                    <Row>
                        <Col xl={11} lg={11} md={11} sm={11} className="mb-10">
                            <div className="tamañotextotitulocategorias">
                                {titulo}
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <div
                                className="closemodalcategorias"
                                onClick={() => close()}
                            >
                                X
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="ml-20 mr-30">
                    <h3 className=" textomodalinfpocategorias">
                        {mostrarTexto}
                    </h3>
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalComentariosCategorias;

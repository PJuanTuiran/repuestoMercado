import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
import { getEditData } from "../../store/editdata/action";
import { getEditDataFind } from "../../store/editdatafind/action";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import SearchInteractiveEdit from "../searchinteractive/searchinteractiveedit";

function ModalMensajesBuscar(props) {
    const router = useRouter();
    const dispatch = useDispatch();
    const {
        shown,
        close,
        titulo,
        mensaje,
        setEditarBuscador,
        editarDatos,
        setIsLoading,
        setHabilitarIcono,
        setDatosFaltantes,
    } = props;
    const [clicAqui, setClicAqui] = useState(false);

    useEffect(() => {
        setEditarBuscador("col-md-1 posiciontres");
        dispatch(getEditDataFind(editarDatos));
        let editdata = {
            editar: true,
        };
        //setEditarBuscador("col-md-1 posicionuno");
        dispatch(getEditData(editdata));
    }, [editarDatos]);

    const regresarAlBuscador = () => {
        //localStorage.setItem("editardatosbuscador", JSON.stringify(editarDatos));
        dispatch(getEditDataFind(editarDatos));
        let editdata = {
            editar: true,
        };
        setEditarBuscador("col-md-1 posicionuno");
        dispatch(getEditData(editdata));
        router.push("/searchinteractive/searchinteractive");
        //location.reload();
    };

    useEffect(() => {
        if (clicAqui) {
            setEditarBuscador("col-md-1 posiciontres");
            dispatch(getEditDataFind(editarDatos));
            let editdata = {
                editar: true,
            };
            setClicAqui(false);
            dispatch(getEditData(editdata));
            router.push("/searchinteractive/searchinteractive");
        }
    }, [clicAqui]);

    const cerrar = () => {
        let editar = {
            editarCombustible: false,
            editarTraccion: false,
            editarTransmision: false,
            editarCilindraje: false,
        };

        dispatch(getEditDataFind(editar));
        close(false);
    };

    return shown ? (
        <div
            className="modal-fondo"
            //onClick={() => {close(false);}}
            >
            <div
                className="modal-mensajes-buscar redondearventamensajes "
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div>
                    <Row>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <div className="iconoventanamensajesbuscar">
                                <InfoIcon style={{ fontSize: 40 }} />
                            </div>
                        </Col>
                        <Col xl={9} lg={9} md={9} sm={9}>
                            <div className="titulodetaildescription">
                                {titulo}
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <button
                                type="button"
                                className="cerrarmodaledit ml-120 sinborder colorbase"
                                data-dismiss="modal"
                                onClick={() => cerrar(false)}>
                                {" "}
                                X{" "}
                            </button>
                        </Col>
                    </Row>
                </div>
                <div className="mt-20 mb-10 ml-10 textoventanamensajesedit">
                    <div>{mensaje}</div>
                </div>
                <SearchInteractiveEdit
                    close={close}
                    setIsLoading={setIsLoading}
                    setClicAqui={setClicAqui}
                    setHabilitarIcono={setHabilitarIcono}
                    setDatosFaltantes={setDatosFaltantes}
                />
            </div>
        </div>
    ) : null;
}

export default ModalMensajesBuscar;

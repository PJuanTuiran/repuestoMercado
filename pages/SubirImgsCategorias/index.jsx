import Container from "../../components/layouts/Container";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { URL_BD_MR } from "../../helpers/Constants";
import axios from "axios";
import { URL_IMAGES_RESULTSSMS } from "../../helpers/Constants";
import ModalMensajes from "../mensajes/ModalMensajes";
import ModalMensajesConfirmarMsj from "../mensajes/ModalMensajesConfirmarMsj";
import shortid from "shortid";

export default function index() {
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    const irA = useRef(null); //PosiciónTopPage
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [showModal, setShowModal] = useState(false); //Estado de modal
    const [selectedImages, setSelectedImages] = useState({});
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("");
    const [previewImages, setPreviewImages] = useState({});
    const [nameCategoria, setNameCategoria] = useState(null);
    const [estadoCategoria, setEstadoCategoria] = useState(0);
    const [idCategoria, setIdCategoria] = useState(0);

    const [tituloMensajesConfirmar, setTituloMensajesConfirmar] = useState(false);
    const [textoMensajesConfirmar, setTextoMensajesConfirmar] = useState(false);
    const [showModalMensajesConfirmar, setShowModalMensajesConfirmar] =
        useState(false);
    const [continuarConfirmar, setContinuarConfirmar] = useState(false);
    const [abandonarConfirmar, setAbandonarConfirmar] = useState(false);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleImagen = (e, id) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
            const extension =
                "." +
                reader.result.substring(
                    reader.result.indexOf("/") + 1,
                    reader.result.indexOf(";base64")
                );
            setImageName(shortid.generate().substring(0, 11) + extension);
            setPreviewImages(prevState => ({
                ...prevState,
                [id]: URL.createObjectURL(file)
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleName = (e) => {
        setNameCategoria(e)
    };

    const [Imagenes, setImagenes] = useState(null);

    useEffect(() => {
        const obtenerImagenes = async () => {
            try {
                const res = await axios({
                    method: "POST",
                    url: URL_BD_MR + "210",
                });
                setImagenes(res.data.listimgcategorias);
            } catch (error) {
                console.error("Error al leer las imágenes", error);
                // Maneja el error según tus necesidades
            }
        };
        obtenerImagenes();
    }, []);

    useEffect(() => {
        console.log("Imagenes lista:", Imagenes);
    }, [Imagenes]);

    const handleActualizar = async (id) => {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("imagen", image);
        formData.append("nombreimagen", imageName);
        formData.append("nombrecategoria", nameCategoria);
        formData.append("numeroimagenes", 1);

        const grabarImg = async () => {
            await fetch(`${URL_BD_MR}211`, {
                method: "POST",
                body: formData,
                //headers: headers,
            }).then((response) => {
                //setIsLoading(false);
                if (response) {
                    console.log("OK INGRESO FOTOS : ", response);
                    setTituloMensajes('Confirmación de envío');
                    setTextoMensajes('La imagen se ha enviado correctamente.');
                    setShowModalMensajesConfirmar(true);
                } else {
                    console.log("ERROR, INGRESO FOTOS : ", response);
                    setTituloMensajes('Error de envío');
                    setTextoMensajes('Ha ocurrido un error al enviar la imagen. Por favor, contacta con el soporte para solucionar el problema.');
                    setShowModalMensajesConfirmar(true);
                }
            });
        };
        grabarImg();
    };

    const handleEliminar = (id) => {
        setPreviewImages(prevState => {
            const newState = { ...prevState };
            delete newState[id];
            return newState;
        });
    };

    const ocultarMostrarCategoria = (estado, id) => {
        setIdCategoria(id);
        if (estado == 31) {
            setShowModalMensajesConfirmar(true);
            setTituloMensajesConfirmar("Inactiva Categoría");
            setTextoMensajesConfirmar("¿Estas seguro de querer inactivar la categoría?");
            setEstadoCategoria(35);
        } else {
            setShowModalMensajesConfirmar(true);
            setTituloMensajesConfirmar("Activar Categoría");
            setTextoMensajesConfirmar("¿Estas seguro de querer activar la categoría?");
            setEstadoCategoria(31)
        }
    };

    useEffect(() => {
        if (abandonarConfirmar) {
            setShowModalMensajesConfirmar(false);
        }

        if (continuarConfirmar) {
            const actualizarEstado = async () => {

                let params = {
                    id: idCategoria,
                    estado: estadoCategoria
                }

                try {
                    const res = await axios({
                        method: "POST",
                        url: URL_BD_MR + "214", params
                    });

                    if (res.data.type == 1) {
                        setTituloMensajes('Estado Categoría');
                        setTextoMensajes('Estado categoría actualizado.');
                        setShowModal(true);
                    } else {
                        setTituloMensajes('Estado Categoría');
                        setTextoMensajes('Error actualizando estado categoría.');
                        setShowModal(true);
                    }
                } catch (error) {
                    console.error("Error al leer las imágenes", error);
                    // Maneja el error según tus necesidades
                }
            };
            actualizarEstado();

            setShowModalMensajesConfirmar(false);
        }

    }, [continuarConfirmar, abandonarConfirmar])

    return (
        <>
            <div ref={irA}>
                <ModalMensajesConfirmarMsj
                    shown={showModalMensajesConfirmar}
                    setContinuarEliminar={setContinuarConfirmar}
                    setAbandonarEliminar={setAbandonarConfirmar}
                    titulo={tituloMensajesConfirmar}
                    mensaje={textoMensajesConfirmar}
                    tipo="confirmación"
                    buttonText="Enviar" // Aquí pasas el texto del botón
                />
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account" style={{ marginBottom: "18rem" }}>
                                <Grid
                                    className="contMainOpiniones"
                                    container
                                    style={{ width: isMdDown ? "100%" : "89%" }}
                                    display={"flex"}
                                    flexDirection={"column"}>
                                    <div className="TitleOpVend">
                                        <p>Subir imagenes categorias</p>
                                        <p>*Recomendación, subir imagenes de 900px por alto y 500px ancho para que se vea bien</p>
                                    </div>

                                    <div className="SubirImagenesCarruselBanner">
                                        {Imagenes && Imagenes.sort((a, b) => a.id - b.id).map((imagen, index) => (
                                            <div key={index} className="SubirImagenesCarruselBannerDiv">
                                                <div className="textocategorias">
                                                    <input
                                                        id={imagen.marca}
                                                        defaultValue={imagen.nombrecategoria}
                                                        style={{ color: '#2D2E83' }}
                                                        onChange={(e) => handleName(e.target.value)}
                                                    />
                                                </div>
                                                <img src={previewImages[imagen.id] || `${URL_IMAGES_RESULTSSMS}${imagen.nombreimagen}`} alt={`Imagen ${index + 1}`} />
                                                <div className="SeleccionarImagenIndex">
                                                    <span>
                                                        <input type="file" id={`fileInput-${imagen.id}`} style={{ display: 'none' }} onChange={(e) => handleImagen(e, imagen.id)} />
                                                        <button onClick={() => document.getElementById(`fileInput-${imagen.id}`).click()}>
                                                            Seleccionar imagen
                                                        </button>
                                                    </span>
                                                    <span>
                                                        <button
                                                            onClick={() => ocultarMostrarCategoria(imagen.estado, imagen.id)}
                                                            className="botoncategorias"
                                                        >
                                                            {imagen.estado == 31 ?
                                                                "Inactivar categoría"
                                                                :
                                                                "Activar categoría"
                                                            }
                                                        </button>
                                                    </span>
                                                    <div className="buttonsEliminarImgs">
                                                        <button onClick={() => handleActualizar(imagen.id)} disabled={!previewImages[imagen.id]} className="ActImgButton">Actualizar imagen</button>
                                                        {previewImages[imagen.id] && <button onClick={() => handleEliminar(imagen.id)} className="ElimImgButton">Eliminar imagen seleccionada</button>}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <ModalMensajes
                                        shown={showModal}
                                        close={handleModalClose}
                                        titulo={tituloMensajes}
                                        mensaje={textoMensajes}
                                        tipo="error"
                                    />
                                </Grid>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}

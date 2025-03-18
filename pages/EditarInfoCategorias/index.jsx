import Container from "../../components/layouts/Container";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { URL_BD_MR } from "../../helpers/Constants";
import axios from "axios";
import { URL_IMAGES_RESULTSSMS } from "../../helpers/Constants";
import ModalMensajes from "../mensajes/ModalMensajes";
import shortid from "shortid";
import { LuImagePlus } from "react-icons/lu";

export default function index() {

    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    const irA = useRef(null); //PosiciónTopPage
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [showModal, setShowModal] = useState(false); //Estado de modal
    const [subcategorias, setSubcategorias] = useState(null);
    const [subcategoriasFiltradas, setSubcategoriasFiltradas] = useState([]);
    const [subcategoriasFiltradas2, setSubcategoriasFiltradas2] = useState([]);
    const [subcategoriasFiltradas3, setSubcategoriasFiltradas3] = useState([]);
    const [subcategoriasFiltradas4, setSubcategoriasFiltradas4] = useState([]);
    const [contenedorActivo, setContenedorActivo] = useState(null);
    const [contenedorActivo2, setContenedorActivo2] = useState(null);
    const [selectedImages, setSelectedImages] = useState({});

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


    useEffect(() => {
        const leerSubcategorias = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "138",
                });
                // Filtramos las subcategorías con id_categorias igual a 1
                const subcategoria1 = res.data.listsubcategorias.filter(subcategoria => subcategoria.id_categorias === 1);
                console.log("Subcategorías filtradas con id_categoria 1:", subcategoria1);
                // Almacenamos las subcategorías filtradas en el estado
                setSubcategoriasFiltradas(subcategoria1);

                // Filtramos las subcategorías con id_categorias igual a 2
                const subcategoria2 = res.data.listsubcategorias.filter(subcategoria => subcategoria.id_categorias === 2);
                console.log("Subcategorías filtradas con id_categoria 2:", subcategoria2);
                // Almacenamos las subcategorías filtradas en el nuevo estado
                setSubcategoriasFiltradas2(subcategoria2);

                const subcategoria3 = res.data.listsubcategorias.filter(subcategoria => subcategoria.id_categorias === 3);
                console.log("Subcategorías filtradas con id_categoria 3:", subcategoria3);
                setSubcategoriasFiltradas3(subcategoria3);

                const subcategoria4 = res.data.listsubcategorias.filter(subcategoria => subcategoria.id_categorias === 4);
                console.log("Subcategorías filtradas con id_categoria 4:", subcategoria4);
                setSubcategoriasFiltradas4(subcategoria4);

                setSubcategorias(res.data.listsubcategorias);
            } catch (error) {
                console.error("Error al leer las subcategorías", error);
            }
        };
        leerSubcategorias();
    }, []);


    const actualizarSubcategoria = async (id, nombre, descripcion) => {
        if (!nombre || !descripcion) {
            alert('Por favor, no dejes ningún campo vacío.');
            return;
        }

        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "139",
                params: {
                    id,
                    nombre,
                    descripcion
                }
            });
            console.log('Actualización exitosa:', res);
            setTituloMensajes('Actualización exitosa');
            setTextoMensajes('La SubCategoría se ha actualizado correctamente.');
            setShowModal(true);
        } catch (error) {
            console.error('Error al actualizar la subcategoría', error);
            setTituloMensajes('Error de envío');
            setTextoMensajes('Ha ocurrido un error al actualizar la subcategoría. Por favor, contacta con el soporte para solucionar el problema.');
            setShowModal(true);
        }
    };



    // Definimos el estado para la imagen, el nombre de la imagen y las imágenes de vista previa
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("");
    const [previewImages, setPreviewImages] = useState({});
    const [imagenesSubcategorias, setImagenesSubcategorias] = useState([]);


    // Manejamos la carga de la imagen 
    const handleImagen = (e, id) => {
        const file = e.target.files[0];
        if (!file) {
            // No se seleccionó ningún archivo
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            const image = reader.result;
            const extension =
                "." +
                reader.result.substring(
                    reader.result.indexOf("/") + 1,
                    reader.result.indexOf(";base64")
                );
            const imageName = shortid.generate().substring(0, 11) + extension;
            setSelectedImages(prevState => ({
                ...prevState,
                [id]: { image, imageName }
            }));
            setPreviewImages(prevState => ({
                ...prevState,
                [id]: URL.createObjectURL(file)
            }));
        };
        reader.readAsDataURL(file);
    };

    // Enviamos la imagen al servidor 
    const handleCrearImagen = async (id_subcategoria, id_categorias) => {
        // Obtenemos la imagen y el nombre de la imagen del estado selectedImages
        const selectedImage = selectedImages[id_subcategoria];
        if (!selectedImage) {
            alert("Por favor, selecciona una imagen antes de intentar enviar.");
            return;
        }
        const { imageName, image } = selectedImage;

        const formData = new FormData();
        formData.append("id_subcategoria", id_subcategoria);
        formData.append("id_categorias", id_categorias);
        formData.append("nombreimagen", imageName);
        formData.append("imagen", image);
        formData.append("numeroimagenes", 1);

        // Mostramos los datos que se van a enviar
        console.log("Datos a enviar:", {
            id_subcategoria: id_subcategoria,
            id_categorias: id_categorias,
            nombreimagen: imageName,
            imagen: image,
            numeroimagenes: 1
        });

        const grabarImg = async () => {
            await fetch(`${URL_BD_MR}140`, {
                method: "POST",
                body: formData,
            }).then((response) => {
                if (response.ok) {
                    console.log("OK INGRESO FOTOS : ", response);
                    alert("La imagen se ha enviado correctamente.");
                } else {
                    console.log("ERROR, INGRESO FOTOS : ", response);
                    alert("Ha ocurrido un error al enviar la imagen.");
                }
            });
        };
        grabarImg();
    };

    // Obtenemos las imágenes de las subcategorías del servidor
    useEffect(() => {
        const leerImagenesSubcategorias = async () => {
            try {
                const res = await axios({
                    method: "get",
                    url: URL_BD_MR + "141",
                });
             //   console.log("Imágenes de las subcategorías:", res.data.listimgsubcategorias);
                setImagenesSubcategorias(res.data.listimgsubcategorias);
            } catch (error) {
                console.error("Error al leer las imágenes de las subcategorías", error);
            }
        };
        leerImagenesSubcategorias();
    }, []);


    // Actualizamos la imagen en el servidor 
    const handleActualizarImagen = async (id_imagen, id_subcategoria) => {
        // Obtenemos la imagen y el nombre de la imagen del estado selectedImages
        const selectedImage = selectedImages[id_subcategoria];
        if (!selectedImage) {
            alert("Por favor, selecciona una imagen antes de intentar actualizar.");
            return;
        }
        const { imageName, image } = selectedImage;

        const formData = new FormData();
        formData.append("id", id_imagen);
        formData.append("nombreimagen", imageName);
        formData.append("imagen", image);
        formData.append("numeroimagenes", 1);

        // Mostramos los datos que se van a enviar
        console.log("Datos a enviar:", {
            id: id_imagen,
            nombreimagen: imageName,
            imagen: image,
            numeroimagenes: 1
        });

        const actualizarImg = async () => {
            await fetch(`${URL_BD_MR}143`, {
                method: "POST",
                body: formData,
            }).then((response) => {
                if (response.ok) {
                    console.log("OK ACTUALIZACIÓN FOTOS : ", response);
                    alert("La imagen se ha actualizado correctamente.");
                } else {
                    console.log("ERROR, ACTUALIZACIÓN FOTOS : ", response);
                    alert("Ha ocurrido un error al actualizar la imagen.");
                }
            });
        };
        actualizarImg();
    };
    // Eliminamos la imagen seleccionada
    const handleEliminarImagenSeleccionada = (id) => {
        // Eliminamos la imagen del estado selectedImages
        setSelectedImages(prevState => {
            const newState = { ...prevState };
            delete newState[id];
            return newState;
        });

        // Eliminamos la imagen previsualizada del estado previewImages
        setPreviewImages(prevState => {
            const newState = { ...prevState };
            delete newState[id];
            return newState;
        });

        alert("La imagen seleccionada se ha eliminado correctamente.");
    };


    return (
        <>
            <div ref={irA}>
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


                                    <div className="EditarInfoCategorias">
                                        <div className="TitleOpVend">
                                            <p>Editar información Subcategorías</p>
                                        </div>

                                        <div className="ButtonsCatEstados">
                                            <button className={contenedorActivo === 1 ? 'BotónCatActivo' : 'BotónCatInact'} onClick={() => setContenedorActivo(1)}>Categoría exterior</button>
                                            <button className={contenedorActivo === 2 ? 'BotónCatActivo' : 'BotónCatInact'} onClick={() => setContenedorActivo(2)}>Categoría interior</button>
                                            <button className={contenedorActivo === 3 ? 'BotónCatActivo' : 'BotónCatInact'} onClick={() => setContenedorActivo(3)}>Categoría tren motriz</button>
                                            <button className={contenedorActivo === 4 ? 'BotónCatActivo' : 'BotónCatInact'} onClick={() => setContenedorActivo(4)}>Categoría genericos</button>
                                            <div className="CerrarTodoCategoriasEdit">
                                                {contenedorActivo !== null && <button onClick={() => setContenedorActivo(null)}>Cerrar todos</button>}
                                            </div>
                                        </div>

                                        {contenedorActivo === 1 && (
                                            <div className="SubEditarInfoCategorias">
                                                <span className="titleCategoriaEditar">Categoría exterior</span>
                                                {subcategorias && subcategorias.filter(subcategoria => subcategoria.id_categorias === 1).map(subcategoria => (
                                                    <div key={subcategoria.id} className="contSubcat">
                                                        <input
                                                            type="text"
                                                            defaultValue={subcategoria.nombre}
                                                            onChange={e => subcategoria.nombre = e.target.value}
                                                        />
                                                        <textarea
                                                            type="text"
                                                            defaultValue={subcategoria.descripcion}
                                                            onChange={e => subcategoria.descripcion = e.target.value}
                                                        />

                                                        <button className="actInfoCatButton" onClick={() => actualizarSubcategoria(subcategoria.id, subcategoria.nombre, subcategoria.descripcion)}>
                                                            Actualizar
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {contenedorActivo === 2 && (
                                            <div className="SubEditarInfoCategorias">
                                                <span className="titleCategoriaEditar">Categoría interior</span>
                                                {subcategorias && subcategorias.filter(subcategoria => subcategoria.id_categorias === 2).map(subcategoria => (
                                                    <div key={subcategoria.id} className="contSubcat">
                                                        <input
                                                            type="text"
                                                            defaultValue={subcategoria.nombre}
                                                            onChange={e => subcategoria.nombre = e.target.value}
                                                        />
                                                        <textarea
                                                            type="text"
                                                            defaultValue={subcategoria.descripcion}
                                                            onChange={e => subcategoria.descripcion = e.target.value}
                                                        />
                                                        <button className="actInfoCatButton" onClick={() => actualizarSubcategoria(subcategoria.id, subcategoria.nombre, subcategoria.descripcion)}>
                                                            Actualizar
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {contenedorActivo === 3 && (
                                            <div className="SubEditarInfoCategorias">
                                                <span className="titleCategoriaEditar">Categoría tren motriz</span>
                                                {subcategorias && subcategorias.filter(subcategoria => subcategoria.id_categorias === 3).map(subcategoria => (
                                                    <div key={subcategoria.id} className="contSubcat">
                                                        <input
                                                            type="text"
                                                            defaultValue={subcategoria.nombre}
                                                            onChange={e => subcategoria.nombre = e.target.value}
                                                        />
                                                        <textarea
                                                            type="text"
                                                            defaultValue={subcategoria.descripcion}
                                                            onChange={e => subcategoria.descripcion = e.target.value}
                                                        />
                                                        <button className="actInfoCatButton" onClick={() => actualizarSubcategoria(subcategoria.id, subcategoria.nombre, subcategoria.descripcion)}>
                                                            Actualizar
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {contenedorActivo === 4 && (
                                            <div className="SubEditarInfoCategorias">
                                                <span className="titleCategoriaEditar">Categoría genéricos</span>
                                                {subcategorias && subcategorias.filter(subcategoria => subcategoria.id_categorias === 4).map(subcategoria => (
                                                    <div key={subcategoria.id} className="contSubcat">
                                                        <input
                                                            type="text"
                                                            defaultValue={subcategoria.nombre}
                                                            onChange={e => subcategoria.nombre = e.target.value}
                                                        />
                                                        <textarea
                                                            type="text"
                                                            defaultValue={subcategoria.descripcion}
                                                            onChange={e => subcategoria.descripcion = e.target.value}
                                                        />
                                                        <button className="actInfoCatButton" onClick={() => actualizarSubcategoria(subcategoria.id, subcategoria.nombre, subcategoria.descripcion)}>
                                                            Actualizar
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>


                                    <div className="EditarInfoCategorias">
                                        <div className="TitleOpVend">
                                            <p>Editar imagenes Subcategorías</p>
                                        </div>

                                        <div className="ButtonsCatEstados">
                                            <button className={contenedorActivo2 === 1 ? 'BotónCatActivo' : 'BotónCatInact'} onClick={() => setContenedorActivo2(1)}>Categoría exterior</button>
                                            <button className={contenedorActivo2 === 2 ? 'BotónCatActivo' : 'BotónCatInact'} onClick={() => setContenedorActivo2(2)}>Categoría interior</button>
                                            <button className={contenedorActivo2 === 3 ? 'BotónCatActivo' : 'BotónCatInact'} onClick={() => setContenedorActivo2(3)}>Categoría tren motriz</button>
                                            <button className={contenedorActivo2 === 4 ? 'BotónCatActivo' : 'BotónCatInact'} onClick={() => setContenedorActivo2(4)}>Categoría genericos</button>
                                            <div className="CerrarTodoCategoriasEdit">
                                                {contenedorActivo2 !== null && <button onClick={() => setContenedorActivo2(null)}>Cerrar todos</button>}
                                            </div>
                                        </div>

                                        {contenedorActivo2 === 1 && (
                                            <div className="ImagenesCategoríasCont">
                                                <div className="TitleImgTitleCategoria">
                                                    <p>Categoría exterior</p>
                                                </div>

                                                <div className="ContImgCat">
                                                    {subcategoriasFiltradas.map(subcategoria => {
                                                        // Buscamos todas las imágenes de la subcategoría en las imágenes de las subcategorías
                                                        const imagenesSubcategoria = imagenesSubcategorias.filter(imagen => imagen.id_subcategoria === subcategoria.id);
                                                        const selectedImage = selectedImages[subcategoria.id];

                                                        return (
                                                            <div key={subcategoria.id} className="MainCategoriaIMagen">
                                                                <div className="TitleSubcatImagenCat">
                                                                    <p>Subcategoria {subcategoria.nombre}</p>
                                                                </div>
                                                                {imagenesSubcategoria.length > 0 ? (
                                                                    <div className="ImgsContainerCategorias">
                                                                        {imagenesSubcategoria.map((imagen, index) => (
                                                                            <div key={index} className="SubImgsContainerCategorias">
                                                                                <img src={`${URL_IMAGES_RESULTSSMS}${imagen.nombreimagen}`} />
                                                                                <div className="ButtonActImgCat">
                                                                                    <button disabled={!selectedImage} onClick={() => handleActualizarImagen(imagen.id, subcategoria.id)}>Actualizar imagen</button>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        <p>No hay imágenes para esta subcategoría.</p>
                                                                    </div>
                                                                )}
                                                                <div className="PrevImgeInput">
                                                                    <input type="file" id={`fileInput${subcategoria.id}`} onChange={(e) => handleImagen(e, subcategoria.id)} style={{ display: 'none' }} />
                                                                    {previewImages[subcategoria.id] ? <img src={previewImages[subcategoria.id]} alt="Vista previa" /> : <LuImagePlus onClick={() => document.getElementById(`fileInput${subcategoria.id}`).click()} />}
                                                                </div>
                                                                <div className="DeleteButtonImgCat">
                                                                    {selectedImage && <button onClick={() => handleEliminarImagenSeleccionada(subcategoria.id)}>Eliminar imagen</button>}
                                                                </div>
                                                                <div className="CrearButtonImgCat">
                                                                    {imagenesSubcategoria.length < 2 && <button disabled={!selectedImage} onClick={() => handleCrearImagen(subcategoria.id, subcategoria.id_categorias)}>Crear imagen</button>}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                        )}
                                        {contenedorActivo2 === 2 && (
                                            <div className="ImagenesCategoríasCont">
                                                <div className="TitleImgTitleCategoria">
                                                    <p>Categoría interior</p>
                                                </div>
                                                <div className="ContImgCat">
                                                    {subcategoriasFiltradas2.map(subcategoria => {
                                                        // Buscamos todas las imágenes de la subcategoría en las imágenes de las subcategorías
                                                        const imagenesSubcategoria = imagenesSubcategorias.filter(imagen => imagen.id_subcategoria === subcategoria.id);
                                                        const selectedImage = selectedImages[subcategoria.id];

                                                        return (
                                                            <div key={subcategoria.id} className="MainCategoriaIMagen">
                                                                <div className="TitleSubcatImagenCat">
                                                                    <p>Subcategoria {subcategoria.nombre}</p>
                                                                </div>
                                                                {imagenesSubcategoria.length > 0 ? (
                                                                    <div className="ImgsContainerCategorias">
                                                                        {imagenesSubcategoria.map((imagen, index) => (
                                                                            <div key={index} className="SubImgsContainerCategorias">
                                                                                <img src={`${URL_IMAGES_RESULTSSMS}${imagen.nombreimagen}`} />
                                                                                <div className="ButtonActImgCat">
                                                                                    <button disabled={!selectedImage} onClick={() => handleActualizarImagen(imagen.id, subcategoria.id)}>Actualizar imagen</button>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        <p>No hay imágenes para esta subcategoría.</p>
                                                                    </div>
                                                                )}
                                                                <div className="PrevImgeInput">
                                                                    <input type="file" id={`fileInput${subcategoria.id}`} onChange={(e) => handleImagen(e, subcategoria.id)} style={{ display: 'none' }} />
                                                                    {previewImages[subcategoria.id] ? <img src={previewImages[subcategoria.id]} alt="Vista previa" /> : <LuImagePlus onClick={() => document.getElementById(`fileInput${subcategoria.id}`).click()} />}
                                                                </div>
                                                                <div className="DeleteButtonImgCat">
                                                                    {selectedImage && <button onClick={() => handleEliminarImagenSeleccionada(subcategoria.id)}>Eliminar imagen</button>}
                                                                </div>
                                                                <div className="CrearButtonImgCat">
                                                                    {imagenesSubcategoria.length < 2 && <button disabled={!selectedImage} onClick={() => handleCrearImagen(subcategoria.id, subcategoria.id_categorias)}>Crear imagen</button>}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                        {contenedorActivo2 === 3 && (
                                            <div className="ImagenesCategoríasCont">
                                                <div className="TitleImgTitleCategoria">
                                                    <p>Categoría tren motriz</p>
                                                </div>

                                                <div className="ContImgCat">
                                                    {subcategoriasFiltradas3.map(subcategoria => {
                                                        // Buscamos todas las imágenes de la subcategoría en las imágenes de las subcategorías
                                                        const imagenesSubcategoria = imagenesSubcategorias.filter(imagen => imagen.id_subcategoria === subcategoria.id);
                                                        const selectedImage = selectedImages[subcategoria.id];

                                                        return (
                                                            <div key={subcategoria.id} className="MainCategoriaIMagen">
                                                                <div className="TitleSubcatImagenCat">
                                                                    <p>Subcategoria {subcategoria.nombre}</p>
                                                                </div>
                                                                {imagenesSubcategoria.length > 0 ? (
                                                                    <div className="ImgsContainerCategorias">
                                                                        {imagenesSubcategoria.map((imagen, index) => (
                                                                            <div key={index} className="SubImgsContainerCategorias">
                                                                                <img src={`${URL_IMAGES_RESULTSSMS}${imagen.nombreimagen}`} />
                                                                                <div className="ButtonActImgCat">
                                                                                    <button disabled={!selectedImage} onClick={() => handleActualizarImagen(imagen.id, subcategoria.id)}>Actualizar imagen</button>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        <p>No hay imágenes para esta subcategoría.</p>
                                                                    </div>
                                                                )}
                                                                <div className="PrevImgeInput">
                                                                    <input type="file" id={`fileInput${subcategoria.id}`} onChange={(e) => handleImagen(e, subcategoria.id)} style={{ display: 'none' }} />
                                                                    {previewImages[subcategoria.id] ? <img src={previewImages[subcategoria.id]} alt="Vista previa" /> : <LuImagePlus onClick={() => document.getElementById(`fileInput${subcategoria.id}`).click()} />}
                                                                </div>
                                                                <div className="DeleteButtonImgCat">
                                                                    {selectedImage && <button onClick={() => handleEliminarImagenSeleccionada(subcategoria.id)}>Eliminar imagen</button>}
                                                                </div>
                                                                <div className="CrearButtonImgCat">
                                                                    {imagenesSubcategoria.length < 2 && <button disabled={!selectedImage} onClick={() => handleCrearImagen(subcategoria.id, subcategoria.id_categorias)}>Crear imagen</button>}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {contenedorActivo2 === 4 && (
                                            <div className="ImagenesCategoríasCont">
                                                <div className="TitleImgTitleCategoria">
                                                    <p>Categoría generales</p>
                                                </div>

                                                <div className="ContImgCat">
                                                    {subcategoriasFiltradas4.map(subcategoria => {
                                                        // Buscamos todas las imágenes de la subcategoría en las imágenes de las subcategorías
                                                        const imagenesSubcategoria = imagenesSubcategorias.filter(imagen => imagen.id_subcategoria === subcategoria.id);
                                                        const selectedImage = selectedImages[subcategoria.id];

                                                        return (
                                                            <div key={subcategoria.id} className="MainCategoriaIMagen">
                                                                <div className="TitleSubcatImagenCat">
                                                                    <p>Subcategoria {subcategoria.nombre}</p>
                                                                </div>
                                                                {imagenesSubcategoria.length > 0 ? (
                                                                    <div className="ImgsContainerCategorias">
                                                                        {imagenesSubcategoria.map((imagen, index) => (
                                                                            <div key={index} className="SubImgsContainerCategorias">
                                                                                <img src={`${URL_IMAGES_RESULTSSMS}${imagen.nombreimagen}`} />
                                                                                <div className="ButtonActImgCat">
                                                                                    <button disabled={!selectedImage} onClick={() => handleActualizarImagen(imagen.id, subcategoria.id)}>Actualizar imagen</button>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        <p>No hay imágenes para esta subcategoría.</p>
                                                                    </div>
                                                                )}
                                                                <div className="PrevImgeInput">
                                                                    <input type="file" id={`fileInput${subcategoria.id}`} onChange={(e) => handleImagen(e, subcategoria.id)} style={{ display: 'none' }} />
                                                                    {previewImages[subcategoria.id] ? <img src={previewImages[subcategoria.id]} alt="Vista previa" /> : <LuImagePlus onClick={() => document.getElementById(`fileInput${subcategoria.id}`).click()} />}
                                                                </div>
                                                                <div className="DeleteButtonImgCat">
                                                                    {selectedImage && <button onClick={() => handleEliminarImagenSeleccionada(subcategoria.id)}>Eliminar imagen</button>}
                                                                </div>
                                                                <div className="CrearButtonImgCat">
                                                                    {imagenesSubcategoria.length < 2 && <button disabled={!selectedImage} onClick={() => handleCrearImagen(subcategoria.id, subcategoria.id_categorias)}>Crear imagen</button>}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>


                                </Grid>
                                <ModalMensajes
                                    shown={showModal}
                                    close={handleModalClose}
                                    titulo={tituloMensajes}
                                    mensaje={textoMensajes}
                                    tipo="error"
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}
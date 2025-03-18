import React, { useEffect, useState, useRef } from "react";
//import Menu from "~/components/elements/menu/Menu";
import { useRouter } from "next/router";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import Popover from "@mui/material/Popover";
import {
    URL_BD_MR,
    URL_IMAGES_RESULTSSMS,
} from "../../../../helpers/Constants";
import { HiOutlineInformationCircle } from "react-icons/hi";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { IoIosArrowUp } from "react-icons/io";
import { getFilterGarage } from "../../../../store/filtergarage/action";
import { getResetInput } from "../../../../store/resetinput/action";
import { useSelector, useDispatch } from "react-redux";
import { getCtlrInput } from "~/store/ctlrinput/action";

const ModuleHeaderSupplies = ({ opencategorias }) => {
    const irA = useRef(null);
    const dispatch = useDispatch();
    const router = useRouter();
    const [classCategorias, setClassCategorias] = useState(
        "header__categories-toggle sinborder"
    );
    // Supongamos que tus datos de usuario están en el estado
    const [categorias, setCategorias] = useState(null);
    const [subcategorias, setSubcategorias] = useState(null);
    const [categoriaActiva, setCategoriaActiva] = useState(1); // Inicialmente mostramos la categoría 1
    const [descripcionActiva, setDescripcionActiva] = useState(""); // Inicialmente no mostramos ninguna descripción
    const [nombreSubcategoriaActiva, setNombreSubcategoriaActiva] =
        useState(""); //
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [imagenesSubcategorias, setImagenesSubcategorias] = useState([]); // Inicialmente no mostramos ninguna imagen
    const [subcategoriaActiva, setSubcategoriaActiva] = useState();
    const resetinput = useSelector((state) => state.resetinput.resetinput);

    const [open, setOpen] = useState(false);
    const [classCagetoria, setClassCagetoria] = useState("divcategorias");

    const id = open ? "simple-popover" : undefined;

    //console.log("VIEW CATEGORIAS : ", opencategorias, " --", open, " -", categoriaActiva)

    const onSelecciono = () => {
        setClassCategorias("header__categories-toggle subrayartexto sinborder");
    };

    const outSelecciono = () => {
        setClassCategorias("header__categories-toggle sinborder");
    };

    const handleClick = (event) => {
        if (open) {
            handleClose();
        } else {
            if (!opencategorias) {
                setOpen(true);
                setAnchorEl(true);
            }
        }
    };

    useEffect(() => {
        if (opencategorias) {
            setOpen(true);
            dispatch(getCtlrInput(false));
        }
    }, [opencategorias])

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    useEffect(() => {
        const leerCategorias = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "135",
                });

                //  console.log("Categorías por console:", res.data.listcategorias);
                setCategorias(res.data.listcategorias);
            } catch (error) {
                console.error("Error al leer las categorías", error);
            }
        };

        const leerSubcategorias = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "138",
                });

                console.log(
                    "Subcategorías por console:",
                    res.data.listsubcategorias
                );
                setSubcategorias(res.data.listsubcategorias);
            } catch (error) {
                console.error("Error al leer las subcategorías", error);
            }
        };

        leerCategorias();
        leerSubcategorias();
    }, []);

    useEffect(() => {
        const leerImagenesSubcategorias = async () => {
            try {
                const res = await axios({
                    method: "get",
                    url: URL_BD_MR + "141",
                });
                //      console.log("Imágenes de las subcategorías:", res.data.listimgsubcategorias);
                setImagenesSubcategorias(res.data.listimgsubcategorias);
            } catch (error) {
                console.error(
                    "Error al leer las imágenes de las subcategorías",
                    error
                );
            }
        };
        leerImagenesSubcategorias();
    }, []);

    const handleMouseOver = (descripcion, nombre) => {
        setDescripcionActiva(descripcion);
        setNombreSubcategoriaActiva(nombre);
    };

    const selSubCategoria = (nombresub, codigoposicion) => {
        let texto = nombresub.split(" ");
        let datfind = "";
        let longdatfind = 0;
        let longmenosuno = 0;
        let cadenaExtraida = "";

        texto &&
            texto.map((palabra) => {
                longdatfind = palabra.length;
                longmenosuno = longdatfind - 1;
                cadenaExtraida = palabra.substring(longmenosuno, longdatfind);

                if (cadenaExtraida == "s" || cadenaExtraida == "S") {
                    let cadenaExtraidaDos = palabra.substring(0, longmenosuno);
                    datfind = datfind + " " + cadenaExtraidaDos;
                } else if (
                    cadenaExtraida == "a" ||
                    cadenaExtraida == "A" ||
                    cadenaExtraida == "o" ||
                    cadenaExtraida == "O"
                ) {
                    let cadenaExtraidaDos = palabra.substring(0, longmenosuno);
                    datfind = datfind + " " + cadenaExtraidaDos;
                } else datfind = datfind + " " + palabra;
            });

        let incremento = resetinput + 1;
        dispatch(getResetInput(incremento));
        localStorage.setItem("ctrlposicionprd", JSON.stringify(codigoposicion));
        localStorage.setItem("posicionprd", JSON.stringify(codigoposicion));
        localStorage.setItem("eraseplaceholder", JSON.stringify(1));
        localStorage.setItem("placeholdersearch", JSON.stringify(nombresub));
        //localStorage.setItem("inputdata", JSON.stringify(nombresub));
        handleClick();
        let string = `${datfind}`;
        router.push(`/search?keyword=${string}`);
        /*
        router.push({
            pathname: `/search?keyword=${string}`,
            query: {
                posicionprd: JSON.stringify(codigoposicion),
            },
        });
        */
    };

    useEffect(() => {
        if (categoriaActiva == 4 || categoriaActiva == 5) {
            setClassCagetoria("divcategorias");
        }
    }, [categoriaActiva]);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [open]);

    return (
        <div className="header__supplies" ref={irA}>
            <button className={classCategorias} onClick={handleClick}>
                <span onMouseOver={onSelecciono} onMouseOut={outSelecciono}>
                    <span>Categorías</span>
                    {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
            </button>
            <ClickAwayListener
                onClickAway={handleClose}
                mouseEvent="onMouseDown">
                <Popover
                    className={classCagetoria}
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    disableScrollLock={true}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                    BackdropProps={{ invisible: false }}
                    sx={{
                        "& .MuiBackdrop-root": {
                            // backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            //clipPath: 'inset(172px 0 0 0)'

                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                            // Ajusta o elimina esta línea según sea necesario
                            clipPath: "inset(0px 0 0 0)",
                        },
                        "& .MuiPaper-root": {
                            borderRadius: "8px", // Añade un borde redondeado al Popover
                            border: "2px solid #03037D",
                        },
                    }}>

                    <div className="ContainerCategoriasLeft">
                        <div className="CategoriasUno">
                            {categorias
                                ? categorias
                                    .sort((a, b) => a.id - b.id)
                                    .map((categoria, subcategoria, index) => (
                                        <button
                                            key={index}
                                            onMouseOver={() => {
                                                setCategoriaActiva(
                                                    categoria.id
                                                );
                                                setDescripcionActiva(""); // Borramos la descripción activa al cambiar de categoría
                                                setNombreSubcategoriaActiva(
                                                    ""
                                                ); // Borramos el nombre de la subcategoría activa al cambiar de categoría
                                                setSubcategoriaActiva(
                                                    subcategoria.id
                                                ); // Aquí actualizamos la subcategoría activa
                                            }}
                                            style={{
                                                backgroundColor:
                                                    categoriaActiva ===
                                                        categoria.id
                                                        ? "#e0e2eb"
                                                        : "initial",
                                            }}>
                                            {categoria.nombre}
                                        </button>
                                    ))
                                : "Cargando categorías..."}
                        </div>
                        <div className="subCategoriasLeft">
                            <div className="contInfoCategoriasLeft contInfoCategoriasLeftOne">
                                {subcategorias
                                    ? subcategorias
                                        .filter(
                                            (subcategoria) =>
                                                subcategoria.id_categorias ===
                                                categoriaActiva
                                        )
                                        .slice(0, 10)
                                        .map((subcategoria, index) => (
                                            <div
                                                key={index}
                                                className="textSubcategorias"
                                                onClick={() =>
                                                    selSubCategoria(
                                                        subcategoria.nombre,
                                                        subcategoria.codigoposicion
                                                    )
                                                }>
                                                <div className="ButtonSubCategorias">
                                                    <p>
                                                        {" "}
                                                        {subcategoria.nombre}
                                                    </p>
                                                    <HiOutlineInformationCircle
                                                        onMouseOver={() => {
                                                            handleMouseOver(
                                                                subcategoria.descripcion,
                                                                subcategoria.nombre
                                                            );
                                                            setSubcategoriaActiva(
                                                                subcategoria.id
                                                            ); // Aquí actualizamos la subcategoría activa
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    : "Cargando subcategorías..."}
                            </div>

                            <div
                                style={{
                                    width: "415px",
                                    marginLeft:
                                        categoriaActiva === 4 ? "2rem" : "5rem",
                                }}>
                                {subcategorias &&
                                    subcategorias.filter(
                                        (subcategoria) =>
                                            subcategoria.id_categorias ===
                                            categoriaActiva
                                    ).length > 10 ? (
                                    <div className="MainContainerCategoriasRight">
                                        {subcategorias
                                            .filter(
                                                (subcategoria) =>
                                                    subcategoria.id_categorias ===
                                                    categoriaActiva
                                            )
                                            .slice(10)
                                            .map((subcategoria, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() =>
                                                        selSubCategoria(
                                                            subcategoria.nombre,
                                                            subcategoria.codigoposicion
                                                        )
                                                    }
                                                    className="textSubcategorias textSubcategoriasDerecha">
                                                    <div className="ButtonSubCategorias">
                                                        <p>
                                                            {" "}
                                                            {
                                                                subcategoria.nombre
                                                            }
                                                        </p>
                                                        <HiOutlineInformationCircle
                                                            onMouseOver={() => {
                                                                setDescripcionActiva(
                                                                    subcategoria.descripcion
                                                                );
                                                                setNombreSubcategoriaActiva(
                                                                    subcategoria.nombre
                                                                );
                                                                setSubcategoriaActiva(
                                                                    subcategoria.id
                                                                ); // Aquí actualizamos la subcategoría activa
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                ) : null}

                                <div className="contDescripcionSubCat">
                                    {descripcionActiva && (
                                        <div className="TopcontDescripcionSubCat">
                                            <div className="descripCategoriatxt">
                                                <p className="titleDescCat">
                                                    Información sobre "
                                                    {nombreSubcategoriaActiva}"
                                                </p>
                                                <p>{descripcionActiva} </p>
                                            </div>
                                        </div>
                                    )}

                                    {imagenesSubcategorias && subcategorias && (
                                        <div className="imgSubCategorias">
                                            {imagenesSubcategorias
                                                .filter((imagen) => {
                                                    const subcategoria =
                                                        subcategorias.find(
                                                            (subcategoria) =>
                                                                subcategoria.id ===
                                                                subcategoriaActiva
                                                        );
                                                    return (
                                                        subcategoria &&
                                                        imagen.id_subcategoria ===
                                                        subcategoria.id
                                                    );
                                                })
                                                .sort((a, b) => a.id - b.id) // Ordenamos las imágenes por "id"
                                                .slice(0, 2) // Seleccionamos las primeras dos imágenes
                                                .map((imagen, index) => (
                                                    <img
                                                        src={`${URL_IMAGES_RESULTSSMS}${imagen.nombreimagen}`}
                                                        alt={
                                                            imagen.nombreimagen
                                                        }
                                                    />
                                                ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Popover>
            </ClickAwayListener>
        </div>
    );
};

export default ModuleHeaderSupplies;

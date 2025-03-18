import React, { useEffect, useState } from "react";
import MegaMenu from "~/components/elements/menu/MegaMenu_vertical";
import menu from "~/public/static/data/menu.json";
import ModuleHeaderPartners from "~/components/shared/headers/modules/ModuleHeaderPartners";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../../store/categories/action";
import CategoryRepository from "~/repositories/CategoryRepository";
import MegaMenuVert from "~/components/elements/menu/CategoryMenu";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";
import { Row, Col, Modal, Button, ButtonGroup, Table } from "react-bootstrap";
import img1 from "../../../../public/imagescategorias/categorias1.jpg";
import img2 from "../../../../public/imagescategorias/categorias2.jpg";
import img3 from "../../../../public/imagescategorias/categorias3.jpg";
import img4 from "../../../../public/imagescategorias/categorias3.png";
import img5 from "../../../../public/imagescategorias/categorias5.jpg";
import img6 from "../../../../public/imagescategorias/categorias6.jpg";

const ModuleHeaderCategories = (props) => {
    const { categorias, setCategorias } = props;
    console.log("CATEGOPRIAS HEADER : ", categorias);

    const router = useRouter();
    // Inicializamos el arrego de Categorias con valores por defecto, para dejarlo en nulo
    //const [SPCategoria, setSPCategoria] = useState(menu.header_categories_menu);
    const categories = useSelector((state) => state.categories.categories);
    // Disparar procedimiento que lee Categorias
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [mostrarCategorias, setMostrarCategorias] = useState(false);

    // Se toma de Category Menus
    const [showModalSubCategorias, setShowModalSubCategorias] = useState(false);
    const [showModalEjemplos, setShowModalEjemplos] = useState(false);
    const [categoriasMenu, setCategoriasMenu] = useState([]);
    const [nombreCategoria, setNombreCategoria] = useState("");
    const [itemCategoria, setItemCategoria] = useState("");
    const [itemSubCategoria, setItemSubCategoria] = useState("");
    const [subcategorias, setSubcategorias] = useState([]);
    const [subcategoriasSeleccionada, setSubcategoriasSeleccionada] = useState(
        []
    );
    const [ejemplos, setEjemplos] = useState(false);
    const [textoEjemplos, setTextoEjemplos] = useState("");
    const [classUbicaEjemplos, setClassUbicaEjemplos] = useState(
        "divubicaejemplosuno"
    );

    //AQUI
    const onCloseModalCategorias = () => {
        setShowModal(false);
        //setShowCategorias(false);
        setShowModalSubCategorias(false);
    };

    const datosgenerales = useSelector(
        (state) => state.datosgenerales.datosgenerales
    );

    const data = datosgenerales[0];
    //console.log("DATOS GENERALES : ", data && data);

    useEffect(() => {
        let categorias = JSON.parse(localStorage.getItem("categorias"));
        let subcategorias = JSON.parse(localStorage.getItem("subcategorias"));
        //console.log("CATEGORIAS : ", categorias);
        //console.log("SUB CATEGORIAS : ", subcategorias);

        if (categorias) {
            setCategoriasMenu(categorias);
            setSubcategorias(subcategorias);
        }
    }, []);

    const activar = (categoria) => {
        //console.log("ACTIVAR : ", categoria);
        setNombreCategoria(categoria.nombre);
        setItemCategoria(categoria.id);
        setTextoEjemplos(categoria.descripcion);
        const newDet = [];
        const newDetImp = [];
        subcategorias &&
            subcategorias.forEach((row) => {
                if (
                    Number.parseInt(row.id_categorias) ===
                    Number.parseInt(categoria.id)
                ) {
                    //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                    let item = {
                        id: row.id,
                        id_categorias: row.id_categorias,
                        nombre: row.nombre,
                        descripcion: row.descripcion,
                        url: row.url,
                        estado: row.estado,
                        palabraclave: row.palabrasclaves,
                    };
                    newDet.push(item);
                }
            });

        let longitud = newDet.length;
        for (var i = 0; i < longitud; i = i + 2) {
            let siguiente = i + 1;
            let item = {
                id1: newDet[i].id,
                id2: newDet[siguiente].id,
                nombre1: newDet[i].nombre,
                nombre2: newDet[siguiente].nombre,
                palabraclaveuna: newDet[i].palabraclave,
                palabraclavedos: newDet[siguiente].palabraclave,
            };
            newDetImp.push(item);
        }
        setSubcategoriasSeleccionada(newDetImp);
        //console.log("IMPRIMIR SUB CATEGORIAS : ", newDetImp)
        setShowModalSubCategorias(true);
    };

    const activarsubcategoria = (id) => {
        //console.log("ID SUBCATEGORIAS : ", id)
        setItemSubCategoria(id);
    };

    const buscarProductos = (clave) => {
        let buscar = "/search?keyword=" + clave;
        //console.log("CLAVE : ", buscar);
        router.push(buscar);
        setShowModal(false);
        //setShowCategorias(false);
        setShowModalSubCategorias(false);
    };

    const mostrarEjemplos = () => {
        setEjemplos(true);

        if (itemCategoria < 3) {
            setClassUbicaEjemplos("divubicaejemplosuno");
        } else if (itemCategoria > 2) {
            setClassUbicaEjemplos("divubicaejemplosdos");
        } else setClassUbicaEjemplos("divubicaejemplosuno");
    };

    const cerrarEjemplos = () => {
        setEjemplos(false);
    };

    const activarEjemplos = () => {
        setShowModalEjemplos(true);
    };

    const desactivarEjemplos = () => {
        setShowModalEjemplos(false);
    };

    const close = () => {
        //setShowModal(false);
        setShowModalSubCategorias(false);
    };

    // Lee de la base de datos la tabla categorias
    useEffect(() => {
        async function leeCategorias(dat) {
            // Lee la función creada en repositories - CategoryRepository
            const Categories = await CategoryRepository.getCategory(0);
            // Coloca los datos en state arreglo de categorias
            dispatch(getCategories(Categories));
        }
        leeCategorias(0);
    }, []);

    const verCategorias = () => {
        setMostrarCategorias(!mostrarCategorias);
        setShowModal(true);
        setCategorias(true);
        //router.push("/#punto");
    };

    return (
        <div className="header__categories ps-dropdown--fullscreen">
            <div>
                <button className="header__categories-toggle">
                    <i className="fa fa-bars"></i>
                    <span onClick={verCategorias}>
                        <span>Categorías</span><IoIosArrowForward />
                    </span>
                </button>
                <div>
                    {mostrarCategorias ? (
                        <div>
                            <Row>
                                <div className="alturamodalcategorias">
                                    {categoriasMenu &&
                                        categoriasMenu.map((item) => (
                                            <Row>
                                                {item.id == itemCategoria ? (
                                                    <Col
                                                        xl={4}
                                                        lg={4}
                                                        md={4}
                                                        sm={4}
                                                        className="resaltaitemmodalcategoria"
                                                        onMouseOver={(e) =>
                                                            activar(item)
                                                        }>
                                                        {item.nombre}
                                                    </Col>
                                                ) : (
                                                    <Col
                                                        xl={4}
                                                        lg={4}
                                                        md={4}
                                                        sm={4}
                                                        className="itemscategorias"
                                                        onMouseOver={(e) =>
                                                            activar(item)
                                                        }>
                                                        {item.nombre}
                                                    </Col>
                                                )}
                                                <Col
                                                    xl={2}
                                                    lg={2}
                                                    md={2}
                                                    sm={2}>
                                                    {item.id ==
                                                    itemCategoria ? (
                                                        <IoIosArrowForward className="tamañoflechacategorias" />
                                                    ) : null}
                                                </Col>
                                            </Row>
                                        ))}
                                </div>
{/*
                                <div className="mtmenos20">
                                    <Row>
                                        <Col xl={6} lg={6} md={6} sm={6}>
                                            <h2> {nombreCategoria} </h2>
                                        </Col>
                                        <Col xl={2} lg={2} md={2} sm={2}>
                                            <i
                                                onMouseOver={(e) =>
                                                    activarEjemplos()
                                                }
                                                onMouseOut={(e) =>
                                                    desactivarEjemplos()
                                                }
                                                className="fa fa-info d-flex infosubcategorias"
                                                aria-hidden="true"></i>
                                        </Col>
                                        <Col xl={2} lg={2} md={2} sm={2}>
                                            <button
                                                type="button"
                                                className="cerrarmodal mt-1 ml-5"
                                                data-dismiss="modal"
                                                onClick={
                                                    onCloseModalCategorias
                                                }>
                                                {" "}
                                                X{" "}
                                            </button>
                                        </Col>
                                    </Row>
                                </div>
                                            */}
                                            
                            

                                <h2 className="textoejemplossubcategorias">
                                    {textoEjemplos}
                                </h2>
                            </Row>
                        </div>
                    ) : (
                        console.log("CATEGORIAS : FALSE")
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModuleHeaderCategories;

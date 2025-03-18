import Container from "../../components/layouts/Container";
import {
    Grid,
    useMediaQuery,
    useTheme,
    InputAdornment,
    InputBase,
    Button,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import LateralMenu from "../../pages/LateralMenu";
import MenuIcon from "@material-ui/icons/Menu";
import { getUserMenuPrimary } from "../../store/usermenuprimary/action";
import { myNumber } from "../../utilities/ArrayFunctions";
import { getCloseMenu } from "../../store/closemenu/action";
import { getNumberPages } from "../../store/numberpages/action";
import { getPageSelect } from "../../store/pageselect/action";
import CustomPaginationCompras from "../../components/elements/basic/CustomPaginationCompras";
import ModalControlAcceso from "../mensajes/ModalControlAcceso";

let numeroCompras = 0;

export default function misComprasRedirigir() {
    const [UidUser, setUidUser] = useState("");
    const dispatch = useDispatch();
    const [DatosUser, setDatosUser] = useState([]);
    //const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    //console.log("DAT USER MIS COMPRAS : ", datosusuarios);
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const router = useRouter();
    const [compras, setCompras] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sombraOpen, setSombraOpen] = useState("");
    const [sombraOpenDos, setSombraOpenDos] = useState("contImgMisCompras");
    const [sombraOpenTres, setSombraOpenTres] = useState("productComprado");
    const [sombraOpenCuatro, setSombraOpenCuatro] = useState(
        "precioProductMisCompras"
    );

    const [showModalControlAcceso, setShowModalControlAcceso] = useState(false);
    const [tituloControlAcceso, setTituloControlAcceso] = useState(false);
    const [textoControlAcceso, setTextoControlAcceso] = useState(false);

    const [fondoInput, setFondoInput] = useState("#f1f2f6");
    const [controlImg, setControlImg] = useState("");
    const [sizeMenu, setSizeMenu] = useState("menulateralseis");
    const [disabledImg, setDisabledImg] = useState("menulateralseis");
    //PosiciónTopPage
    const irA = useRef(null);
    const [detallesProducto, setDetallesProducto] = useState(null);

    const [closeOpen, setcloseOpen] = useState(false);
    const activausermenu = useSelector((state) => state.usermenu.usermenu);
    const closemenu = useSelector((state) => state.closemenu.closemenu);

    const [paginaInicial, setPaginaInicial] = useState(1);
    const [paginaFinal, setPaginaFinal] = useState(10);
    const numpagina = useSelector((state) => state.pageselect.pageselect);

    //recibir los datos del producto comprado y guardar url para cuando reinicie seguir en el mismo
    let datosusuarios = null;
    let idcompra = null;

    if (typeof window !== "undefined") {
        if (router.query.usuario) {
            datosusuarios = JSON.parse(router.query.usuario);
            idcompra = JSON.parse(router.query.idcompra);
            console.log("datosusuarios  : ", datosusuarios);
        }
    }

    useEffect(() => {
        if (numpagina == 1) {
            setPaginaInicial(1);
            setPaginaFinal(10);
        } else if (numpagina == 2) {
            setPaginaInicial(11);
            setPaginaFinal(20);
        } else if (numpagina == 3) {
            setPaginaInicial(21);
            setPaginaFinal(30);
        } else if (numpagina == 4) {
            setPaginaInicial(31);
            setPaginaFinal(40);
        }
    }, [numpagina]);

    useEffect(() => {
        let numpag = (numeroCompras / 10 + 0.5).toFixed(0);
        let arraypg = [];
        for (var i = 1; i <= numpag; i++) {
            arraypg.push(i);
        }
        dispatch(getNumberPages(arraypg));
        dispatch(getPageSelect(1));
    }, [numeroCompras]);

    //Función para obtener el UID del Usuario que nos sirve para mapear sus historial
    useEffect(() => {
        const obtenerUidUsuario = async () => {
            let params = {
                usuario: datosusuarios,
            };
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "13",
                    params,
                });
                setDatosUser(res.data[0]);
                setUidUser(res.data[0].uid);
            } catch (error) {
                console.error("Error al leer los datos del usuario", error);
                // Maneja el error según tus necesidades
            }
        };
        obtenerUidUsuario();
    }, [datosusuarios]);

    const handleSelect = (eventKey) => {
        // Actualiza el estado para almacenar la opción seleccionada
        setSelectedSortOption(eventKey);

        // Ordena los productos según la opción seleccionada
        if (eventKey === "Más antiguo") {
            setCompras(
                [...compras].sort(
                    (a, b) => new Date(a.fechacompra) - new Date(b.fechacompra)
                )
            );
        } else if (eventKey === "Más reciente") {
            setCompras(
                [...compras].sort(
                    (a, b) => new Date(b.fechacompra) - new Date(a.fechacompra)
                )
            );
        }
    };

    const CustomDropdownButton = React.forwardRef(
        ({ children, onClick }, ref) => (
            <button
                ref={ref}
                onClick={onClick}
                className="dropdowncustomMiscomprasPersButton">
                {selectedSortOption ? `${selectedSortOption}` : "Ordenar por"}
            </button>
        )
    );
    //Obtener datos de mis compras

    useEffect(() => {
        const leerMisCompras = async () => {
            let params = {
                uidcomprador: UidUser,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "103",
                params,
            })
                .then(async (res) => {
                    if (res.data && res.data.listarmiscompras) {
                        const miscompras = await Promise.all(
                            res.data.listarmiscompras.map(
                                async (compra, index) => {

                                    if (compra.numerodeaprobacion == idcompra) {
                                        console.log("COMPRAS XXX : ", compra)
                                        // Obtén los detalles del producto
                                        //if (index <= 2) {
                                        const detallesProducto =
                                            await obtenerNombreProducto(
                                                compra.idproducto
                                            );
                                        setDetallesProducto(detallesProducto);

                                        // Obtén el nombre del vendedor
                                        //console.log("USUARIOFFFF : ", detallesProducto);
                                        const detallesVendedor =
                                            await obtenerNombreVendedor(
                                                detallesProducto.usuarioVendedor
                                            );

                                        return {
                                            ...compra,
                                            fechacompra: compra.fechacompra.slice(
                                                0,
                                                10
                                            ),
                                            fechaentrega: compra.fechaentrega.slice(
                                                0,
                                                10
                                            ),
                                            fechadespacho:
                                                compra.fechadespacho.slice(0, 10),
                                            fechadepago: compra.fechadepago.slice(
                                                0,
                                                10
                                            ),
                                            nuevoValor:
                                                compra.preciodeventa +
                                                compra.precioenvio,
                                            nombreProducto:
                                                detallesProducto.nombreProducto,
                                            UsuarioVendedor:
                                                detallesProducto.usuarioVendedor,
                                            salePrice: detallesProducto.salePrice,
                                            nombreImagen:
                                                detallesProducto.nombreImagen,
                                            nombreVendedor:
                                                detallesVendedor.nombreVendedor,
                                            apellidoVendedor:
                                                detallesVendedor.apellidoVendedor,
                                        };
                                        //}
                                    }
                                }
                            )
                        );
                        // Almacena las miscompras en el estado de tu componente
                        setCompras(miscompras);
                        //console.log("COMPRAS xxxx ", miscompras);
                        // Imprime las miscompras en la consola
                        //console.log("miscompras:", miscompras);
                    } else {
                        console.error(
                            "Error: res.data o res.data.listarmiscompras es undefined"
                        );
                    }
                })
                .catch(function (error) {
                    console.error("Error al leer los datos del usuario", error);
                });
        };
        leerMisCompras();
    }, [UidUser]);
    //función para obtener datos del producto
    async function obtenerNombreProducto(idprd) {
        let params = {
            idarticulo: idprd,
        };

        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "18",
                params,
            });

            const nombreProducto = res.data[0].name;
            const salePrice = res.data[0].sale_price;
            const nombreImagen = res.data[0].images[0].name; // Asegúrate de que la imagen exista
            const usuarioVendedor = res.data[0].usuario;

            return { nombreProducto, salePrice, nombreImagen, usuarioVendedor };
        } catch (error) {
            console.error("Error al obtener el nombre del producto", error);
        }
    }

    //función para obtener el nombre del vendedor
    //función para obtener el nombre y apellido del vendedor
    async function obtenerNombreVendedor(uid) {
        let params = {
            usuario: uid,
        };

        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "13",
                params,
            });

            const nombreVendedor = res.data[0].primernombre;
            const apellidoVendedor = res.data[0].primerapellido;

            return { nombreVendedor, apellidoVendedor };
        } catch (error) {
            console.error("Error al obtener el nombre del vendedor", error);
        }
    }

    const filteredCompras = compras.filter(
        (producto) =>
            producto &&
            producto.nombreProducto &&
            producto.nombreProducto
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    numeroCompras = filteredCompras.length;

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    // Función para enviar mensajes
    useEffect(() => {
        setcloseOpen(false);
        setSombraOpen("");
        setSombraOpenDos("contImgMisCompras");
        setSombraOpenTres("productComprado");
        setSombraOpenCuatro("precioProductMisCompras");
        setDisabledImg("");
        setControlImg("");
        setFondoInput("#f1f2f6");
    }, [activausermenu]);

    useEffect(() => {
        if (closemenu) {
            setcloseOpen(false);
            setSombraOpen("");
            setSombraOpenDos("contImgMisCompras");
            setSombraOpenTres("productComprado");
            setSombraOpenCuatro("precioProductMisCompras");
            setFondoInput("#f1f2f6");
            setDisabledImg("");
            setControlImg("");
            dispatch(getCloseMenu(false));
        }
    }, [closemenu]);

    const closeOpenMenu = () => {
        setcloseOpen(true);
        if (filteredCompras.length == 0)
            setSombraOpen("disablemyaccountcuatro0");
        else setSombraOpen("disablemyaccountcuatro");
        // setSombraOpenDos("SubcontainerMisDatosDisabled");
        setSombraOpenDos("contImgMisComprasDisabled");
        setSombraOpenTres("productCompradoDisabled");
        setSombraOpenCuatro("precioProductMisComprasDisabled");
        setControlImg("disabledimg");
        setFondoInput("");
        dispatch(getUserMenuPrimary(false));
    };

    useEffect(() => {
        if (closeOpen) {
            setDisabledImg("menulateralcinco");
        } else {
            setDisabledImg(sizeMenu);
        }
    }, [closeOpen]);

    useEffect(() => {
        if (!closeOpen) {
            if (filteredCompras.length == 0) {
                setSizeMenu("menulateralseis");
                setDisabledImg("menulateralseis");
            } else if (filteredCompras.length == 1) {
                setSizeMenu("menulateralseis");
                setDisabledImg("menulateralseis");
            } else if (filteredCompras.length == 2) {
                setSizeMenu("menulateralseis2");
                setDisabledImg("menulateralseis2");
            } else if (filteredCompras.length == 3) {
                setSizeMenu("menulateralseis3");
                setDisabledImg("menulateralseis3");
            } else if (filteredCompras.length == 4) {
                setSizeMenu("menulateralseis4");
                setDisabledImg("menulateralseis4");
            } else if (filteredCompras.length == 5) {
                setSizeMenu("menulateralseis5");
                setDisabledImg("menulateralseis5");
            } else if (filteredCompras.length == 6) {
                setSizeMenu("menulateralseis6");
                setDisabledImg("menulateralseis6");
            } else if (filteredCompras.length == 7) {
                setSizeMenu("menulateralseis7");
                setDisabledImg("menulateralseis7");
            } else if (filteredCompras.length == 8) {
                setSizeMenu("menulateralseis8");
                setDisabledImg("menulateralseis8");
            } else if (filteredCompras.length == 9) {
                setSizeMenu("menulateralseis9");
                setDisabledImg("menulateralseis9");
            } else if (filteredCompras.length == 10) {
                setSizeMenu("menulateralseis10");
                setDisabledImg("menulateralseis10");
            } else if (filteredCompras.length == 11) {
                setSizeMenu("menulateralseis11");
                setDisabledImg("menulateralseis11");
            } else if (filteredCompras.length == 12) {
                setSizeMenu("menulateralseis12");
                setDisabledImg("menulateralseis12");
            } else if (filteredCompras.length == 13) {
                setSizeMenu("menulateralseis13");
                setDisabledImg("menulateralseis13");
            } else if (filteredCompras.length == 14) {
                setSizeMenu("menulateralseis14");
                setDisabledImg("menulateralseis14");
            }
        }
    }, [filteredCompras]);

    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <ModalControlAcceso
                            shown={showModalControlAcceso}
                            close={setShowModalControlAcceso}
                            titulo={tituloControlAcceso}
                            mensaje={textoControlAcceso}
                            tipo="1"
                        />
                        <div className="ml-57 mt-20">
                            <Grid container spacing={1}>
                                <Grid item xs={1} md={1} lg={1}>
                                    <Button
                                        variant="outline-light"
                                        onClick={() => closeOpenMenu()}
                                        style={{
                                            backgroundColor: "transparent",
                                        }}>
                                        <div className={disabledImg}>
                                            <MenuIcon className="menuproperty" />
                                        </div>
                                    </Button>
                                </Grid>
                                <Grid item xs={7} md={7} lg={7}>
                                    <div className="titlesformsUserstres mt-20">
                                        <p>Mis compras</p>
                                    </div>
                                </Grid>
                                <Grid item xs={4} md={4} lg={4}>
                                    <div className="numerocompras">
                                        Número de compras: {numeroCompras}
                                    </div>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <div className="mt-14">
                                            {closeOpen ? <LateralMenu /> : null}
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>

                        <div className={sombraOpen}>
                            <Grid
                                className="contDataUsers TopContMisCompras"
                                container
                                style={{
                                    width: isMdDown ? "90%" : "85%",
                                }}>
                                <Grid item xs={12} md={6}>
                                    <InputBase
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        placeholder="Buscar en mis compras"
                                        sx={{
                                            borderRadius: "10px",
                                            backgroundColor: fondoInput,
                                            padding: "8px",
                                            marginRight: "8px",
                                            width: "90%",
                                            height: "44px",
                                            padding: "10px",
                                            fontSize: "16px",
                                            paddingLeft: "3rem",
                                            color: "#2C2E82",
                                            fontWeight: "500",
                                            "&::placeholder": {
                                                color: "#3E4089",
                                                fontWeight: "600",
                                            },
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <SearchIcon
                                                    style={{
                                                        fontSize: 30,
                                                        color: "#3E4089",
                                                    }}
                                                />
                                            </InputAdornment>
                                        }
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}>
                                    <Dropdown
                                        style={{ width: "40%" }}
                                        onSelect={handleSelect}>
                                        <Dropdown.Toggle
                                            as={CustomDropdownButton}
                                            id="dropdown-basic">
                                            {selectedSortOption
                                                ? `Ordenar por ${selectedSortOption}`
                                                : "Ordenar por"}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="tamañocajaoptionsTdocPersona">
                                            <Dropdown.Item
                                                eventKey="Más antiguo"
                                                className="itemsdropdownTdocPersona">
                                                Más antiguo
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                eventKey="Más reciente"
                                                className="itemsdropdownTdocPersona">
                                                Más reciente
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Grid>
                            </Grid>

                            <Grid
                                className="contProdcOMPR"
                                container
                                style={{
                                    width: isMdDown ? "90%" : "85%",
                                    marginTop: "2rem",
                                }}>
                                {/* Mostrar productos */}
                                {filteredCompras.length > 0 ? (
                                    filteredCompras.map((producto, index) =>
                                        index + 1 >= paginaInicial &&
                                            index + 1 <= paginaFinal ? (
                                            <Grid
                                                key={index}
                                                className={sombraOpenTres}
                                                container>
                                                <Grid
                                                    key={producto.id}
                                                    item
                                                    xs={12}
                                                    md={9}
                                                    className="productCompradoSubCont">
                                                    <Grid
                                                        xs={5}
                                                        md={6}
                                                        className={
                                                            sombraOpenDos
                                                        }>
                                                        <img
                                                            className={
                                                                controlImg
                                                            }
                                                            src={`${URL_IMAGES_RESULTS}${producto.nombreImagen}`}
                                                        />
                                                    </Grid>
                                                    <Grid container>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={9}>
                                                            <Grid className="subContMiscompras">
                                                                <p className="estadoCompra">
                                                                    {
                                                                        producto.estadomiscompras
                                                                    }
                                                                </p>
                                                                <p className="nombreProductMiCompra">
                                                                    {
                                                                        producto.nombreProducto
                                                                    }
                                                                </p>
                                                                <div className="divCantCompradas">
                                                                    <p className="UnidCompradas">
                                                                        Unidades
                                                                        compradas:
                                                                    </p>
                                                                    <p className="numeroUnidsCompradas">
                                                                        {
                                                                            producto.cantidad
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="divNcompra">
                                                                    <p className="UnidCompradas">
                                                                        {" "}
                                                                        Número
                                                                        de
                                                                        compra:
                                                                    </p>
                                                                    <p className="numeroUnidsCompradas">
                                                                        {
                                                                            producto.numerodeaprobacion
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <p className="dateCompra">
                                                                    {
                                                                        producto.fechacompra
                                                                    }
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={3}
                                                            className={
                                                                sombraOpenCuatro
                                                            }>
                                                            <p>
                                                                $
                                                                {myNumber(
                                                                    1,
                                                                    producto.preciodeventa,
                                                                    2
                                                                )}
                                                            </p>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={3}
                                                    className="ContRightMisCompras">
                                                    <div className="SendMsjVendandName">
                                                        <p className="nameVendedorMiCompra">
                                                            {
                                                                producto.nombreVendedor
                                                            }{" "}
                                                            {
                                                                producto.apellidoVendedor
                                                            }{" "}
                                                        </p>
                                                        <p
                                                            className="buttonSendMsjVendedor"
                                                            onClick={() =>
                                                                router.push({
                                                                    pathname:
                                                                        "./msjVendedor",
                                                                    query: {
                                                                        producto:
                                                                            JSON.stringify(
                                                                                producto
                                                                            ),
                                                                    },
                                                                })
                                                            }>
                                                            Enviar mensaje al
                                                            vendedor
                                                        </p>
                                                    </div>
                                                    <div className="divButtonVercompra">
                                                        <button
                                                            onClick={() =>
                                                                router.push({
                                                                    pathname:
                                                                        "./verCompra",
                                                                    query: {
                                                                        producto:
                                                                            JSON.stringify(
                                                                                producto
                                                                            ),
                                                                        uidcomprador:
                                                                            JSON.stringify(
                                                                                datosusuarios
                                                                            ),
                                                                    },
                                                                })
                                                            }>
                                                            Ver Compra
                                                        </button>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        ) : null
                                    )
                                ) : (
                                    <p>No se encontraron resultados</p>
                                )}
                            </Grid>
                        </div>
                        <div className="margenpaginationcompras">
                            <CustomPaginationCompras />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}

import Container from "../../components/layouts/Container";
import {
    Grid,
    useMediaQuery,
    useTheme,
    Button,
    InputAdornment,
    InputBase,
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
import { getCloseMenu } from "../../store/closemenu/action";
import CustomPaginationVentas from "../../components/elements/basic/CustomPaginationVentas";
import { getNumberPages } from "../../store/numberpages/action";
import { getPageSelect } from "../../store/pageselect/action";
import ModalControlAcceso from "../mensajes/ModalControlAcceso";

let numeroVentas = 0;

export default function misVentas() {
    const dispatch = useDispatch();
    //NextRouter
    const router = useRouter();
    //Obtener mis datos de mis ventas
    const [UidUser, setUidUser] = useState("");
    const [DatosUser, setDatosUser] = useState([]);
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    //console.log("DAT USER MIS COMPRAS : ", datosusuarios);
    //Medidas contenedor
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    //PosiciónTopPage
    const irA = useRef(null);
    const [ventas, setVentas] = useState([]);

    const [fondoInput, setFondoInput] = useState("#f1f2f6");
    const [sombraOpen, setSombraOpen] = useState("");
    const [sombraOpenDos, setSombraOpenDos] = useState("contImgMisCompras");
    const [sombraOpenTres, setSombraOpenTres] = useState("productComprado");
    const [sombraOpenCuatro, setSombraOpenCuatro] = useState(
        "precioProductMisCompras"
    );

    const [showModalControlAcceso, setShowModalControlAcceso] = useState(false);
    const [tituloControlAcceso, setTituloControlAcceso] = useState(false);
    const [textoControlAcceso, setTextoControlAcceso] = useState(false);

    const [controlImg, setControlImg] = useState("");
    const [sizeMenu, setSizeMenu] = useState("menulateralseis");
    const [disabledImg, setDisabledImg] = useState("menulateralcuatro");
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const [closeOpen, setcloseOpen] = useState(false);
    const activausermenu = useSelector((state) => state.usermenu.usermenu);
    const closemenu = useSelector((state) => state.closemenu.closemenu);

    const [paginaInicial, setPaginaInicial] = useState(1);
    const [paginaFinal, setPaginaFinal] = useState(30);

    const numpagina = useSelector((state) => state.pageselect.pageselect);

    useEffect(() => {
        if (datosusuarios.activo == 30) {
            setShowModalControlAcceso(true);
            setTituloControlAcceso("Mis ventas");
            setTextoControlAcceso(
                "Tu cuenta se encuentra bloqueada, para saber más mira tu correo electrónico o contacta a soporte a través de nuestro correo soporte@mercadorepuesto.com.co"
            );
            return;
        }
    });

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
        let numpag = (numeroVentas / 10 + 0.5).toFixed(0);
        let arraypg = [];
        for (var i = 1; i <= numpag; i++) {
            arraypg.push(i);
        }
        dispatch(getNumberPages(arraypg));
        dispatch(getPageSelect(1));
    }, [numeroVentas]);

    const estadosDespacho = {
        40: "Alistando la venta",
        41: "Venta enviada",
        42: "Venta entregada",
        43: "Venta finalizada",
    };

    const estadosVenta = {
        50: "Alistando la venta",
        51: "Venta enviada",
        52: "Venta entregada",
        53: "Venta finalizada",
    };

    //Función para obtener el UID del Usuario que nos sirve para mapear sus historial
    useEffect(() => {
        const obtenerUidUsuario = async () => {
            let params = {
                usuario: datosusuarios.uid,
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

    //Obtenngo las ventas del usuario y mapeo tambien el producto, y tambien el usuario comprador
    useEffect(() => {
        const leerMensajes = async () => {
            let params = {
                estado: 42,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "843",
                params,
            })
                .then((res) => {
                    let array = res.data.listmensajevende;

                    console.log("Listmensajevende : ", res.data.listmensajevende)

                    let unico = [];
                    array &&
                        array.map((item) => {
                            let validar;
                            validar = unico.includes(item.idmicompra);
                            if (!validar) {
                                unico.push(item.idmicompra);
                            }
                        });

                    console.log("Unicoxxxx : ", unico)

                    let contmensajes = [];
                    unico &&
                        unico.map((item) => {
                            let contador = 0;
                            array &&
                                array.map((row) => {
                                    if (
                                        item == row.idmicompra &&
                                        row.mensajeleidovendedor == 0
                                    ) {
                                        contador = contador + 1;
                                    }
                                });
                            let det = {
                                idmicompra: item,
                                mensajes: contador,
                            };

                            contmensajes.push(det);
                        });

                    // Envia al localstorage datos para validar si tiene mensajes
                    localStorage.setItem("prdunicos", JSON.stringify(unico));
                    localStorage.setItem("arrayprd", JSON.stringify(array));

                    //console.log("XXXXXXXX : ", array," - ", unico);

                    if (UidUser) {
                        obtenerVentasUsuario(contmensajes);
                    }
                })
                .catch(function (error) {
                    console.log("Error leyendo direcciones");
                });
        };
        leerMensajes();

        const obtenerVentasUsuario = async (datx) => {
            let params = {
                uidvendedor: UidUser,
            };

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "106",
                    params,
                });

                //console.log("VTAS USER : ", res.data.listarmisventas);

                if (res.data && res.data.listarmisventas) {
                    const ventas = await Promise.all(
                        res.data.listarmisventas.map(async (venta, index) => {
                            //console.log("VENTA : ", venta);

                            let mensajes = 0;
                            datx &&
                                datx.map((item) => {
                                    if (
                                        item.idmicompra ==
                                        venta.numerodeaprobacion
                                    )
                                        mensajes = item.mensajes;
                                });

                            // Obtén los detalles del producto
                            const detallesProducto =
                                await obtenerNombreProducto(venta.idproducto);
                            // Obtén los detalles del comprador
                            const detallesComprador =
                                await obtenerDetallesComprador(
                                    venta.uidcomprador
                                );

                            //console.log("detallesComprador : ", detallesComprador, venta.uidcomprador)

                            const formattedSalePrice =
                                detallesProducto.salePrice.toLocaleString();
                            const total =
                                venta.cantidad * venta.preciodeventa -
                                venta.retencion -
                                venta.impuestos +
                                venta.precioenvio;

                            return {
                                ...venta,
                                estadodeldespacho:
                                    estadosDespacho[venta.estadodeldespacho],
                                estadodelaventa:
                                    estadosVenta[venta.estadodelaventa],
                                fechadeventa1: venta.fechacompra
                                    ? venta.fechacompra.slice(0, 10)
                                    : null,
                                fechadeventa: venta.fechacompra
                                    ? venta.fechacompra.slice(0, 10)
                                    : null,
                                fechaentrega: venta.fechaentrega
                                    ? venta.fechaentrega.slice(0, 10)
                                    : null,
                                fechadespacho: venta.fechadespacho
                                    ? venta.fechadespacho.slice(0, 10)
                                    : null,
                                fechadevolucion: venta.fechadevolucion
                                    ? venta.fechadevolucion.slice(0, 10)
                                    : null,
                                fechadepago: venta.fechadepago
                                    ? venta.fechadepago.slice(0, 10)
                                    : null,
                                nuevoValor:
                                    venta.preciodeventa + venta.precioenvio,
                                codigo_ciu: venta.codigo_ciu,
                                nombreProducto: detallesProducto.nombreProducto,
                                salePrice: formattedSalePrice,
                                idPrdoductRuta: detallesProducto.idPrdoductRuta,
                                nombreImagen: detallesProducto.nombreImagen,
                                nombreUsuario: detallesProducto.usuario,
                                nombreComprador: detallesComprador.primernombre,
                                mensajes,
                                apellidoComprador: detallesComprador.primerapellido,
                                total,
                            };
                        })
                    );
                    
                    const compare = (b, a) => {
                        if (a.numerodeaprobacion < b.numerodeaprobacion) {
                            return -1;
                        }
                        if (a.numerodeaprobacion > b.numerodeaprobacion) {
                            return 1;
                        }
                        return 0;
                    };

                    if (ventas.length > 0) ventas.sort(compare);

                    console.log("Mis ventas:", ventas);
                    setVentas(ventas);

                } else {
                    console.error(
                        "Error: res.data o res.data.listarvtasusuariovende es undefined"
                    );
                }
            } catch (error) {
                console.error("Error al leer las ventas:", error);
            }
        };
    }, [UidUser]);

    //función para obtener datos del producto
    async function obtenerNombreProducto(idproducto) {
        let params = {
            idarticulo: idproducto,
        };

        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "18",
                params,
            });
            const idPrdoductRuta = res.data[0].id;
            const nombreProducto = res.data[0].name;
            const salePrice = res.data[0].sale_price;
            const nombreImagen = res.data[0].images[0].name; // Asegúrate de que la imagen exista
            const usuario = res.data[0].usuario;

            return {
                nombreProducto,
                salePrice,
                nombreImagen,
                usuario,
                idPrdoductRuta,
            };
        } catch (error) {
            console.error("Error al obtener el nombre del producto", error);
        }
    }

    const obtenerDetallesComprador = async (uidcomprador) => {
        let params = {
            usuario: uidcomprador,
        };

        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "13",
                params,
            });
            return res.data[0]; // Asegúrate de que esto devuelve el objeto de usuario correcto
        } catch (error) {
            console.error("Error al leer los datos del comprador", error);
        }
    };

    // Programación de dropdown de mis ventas actual
    const handleSelect = (eventKey) => {
        // Actualiza el estado para almacenar la opción seleccionada
        setSelectedSortOption(eventKey);

        // Ordena las ventas según la opción seleccionada
        if (eventKey === "Más antiguo") {
            setVentas(
                [...ventas].sort(
                    (a, b) =>
                        new Date(a.fechadeventa1) - new Date(b.fechadeventa1)
                )
            );
        } else if (eventKey === "Más reciente") {
            setVentas(
                [...ventas].sort(
                    (a, b) =>
                        new Date(b.fechadeventa1) - new Date(a.fechadeventa1)
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

    const [busqueda, setBusqueda] = useState("");
    const [compras, setCompras] = useState([]);
    const palabrasBusqueda = busqueda.toLowerCase().split(" ");

    const handleChange = (event) => {
        setBusqueda(event.target.value);
    };

    const ventasFiltradas = ventas.filter(
        (venta) =>
            venta.nombreProducto &&
            palabrasBusqueda.every((palabra) =>
                venta.nombreProducto.toLowerCase().includes(palabra)
            )
    );

    numeroVentas = ventasFiltradas.length;

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    // Codigo menu lateral
    useEffect(() => {
        setcloseOpen(false);
        setSombraOpen("");
        setSombraOpenDos("contImgMisCompras");
        setSombraOpenTres("productComprado");
        setSombraOpenCuatro("precioProductMisCompras");
        setDisabledImg("");
        setFondoInput("#f1f2f6");
    }, [activausermenu]);

    useEffect(() => {
        if (closemenu) {
            setcloseOpen(false);
            setSombraOpen("");
            setSombraOpenDos("contImgMisCompras");
            setSombraOpenTres("productComprado");
            setSombraOpenCuatro("precioProductMisCompras");
            setDisabledImg("");
            setFondoInput("#f1f2f6");
            dispatch(getCloseMenu(false));
        }
    }, [closemenu]);

    const closeOpenMenu = () => {
        setcloseOpen(true);
        if (ventasFiltradas.length == 0)
            setSombraOpen("disablemyaccountcuatro0");
        else setSombraOpen("disablemyaccountcuatro");

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
            setDisabledImg("menulateralcuatro");
            setControlImg("");
        }
    }, [closeOpen]);

    useEffect(() => {
        if (!closeOpen) {
            if (ventasFiltradas.length == 0) {
                setSizeMenu("menulateralseis");
                setDisabledImg("menulateralseis");
            } else if (ventasFiltradas.length == 1) {
                setSizeMenu("menulateralseis");
                setDisabledImg("menulateralseis");
            } else if (ventasFiltradas.length == 2) {
                setSizeMenu("menulateralseis2");
                setDisabledImg("menulateralseis2");
            } else if (ventasFiltradas.length == 3) {
                setSizeMenu("menulateralseis3");
                setDisabledImg("menulateralseis3");
            } else if (ventasFiltradas.length == 4) {
                setSizeMenu("menulateralseis4");
                setDisabledImg("menulateralseis4");
            } else if (ventasFiltradas.length == 5) {
                setSizeMenu("menulateralseis5");
                setDisabledImg("menulateralseis5");
            } else if (ventasFiltradas.length == 6) {
                setSizeMenu("menulateralseis6");
                setDisabledImg("menulateralseis6");
            } else if (ventasFiltradas.length == 7) {
                setSizeMenu("menulateralseis7");
                setDisabledImg("menulateralseis7");
            } else if (ventasFiltradas.length == 8) {
                setSizeMenu("menulateralseis8");
                setDisabledImg("menulateralseis8");
            } else if (ventasFiltradas.length == 9) {
                setSizeMenu("menulateralseis9");
                setDisabledImg("menulateralseis9");
            } else if (ventasFiltradas.length == 10) {
                setSizeMenu("menulateralseis10");
                setDisabledImg("menulateralseis10");
            } else if (ventasFiltradas.length == 11) {
                setSizeMenu("menulateralseis11");
                setDisabledImg("menulateralseis11");
            } else if (ventasFiltradas.length == 12) {
                setSizeMenu("menulateralseis12");
                setDisabledImg("menulateralseis12");
            } else if (ventasFiltradas.length == 13) {
                setSizeMenu("menulateralseis13");
                setDisabledImg("menulateralseis13");
            } else if (ventasFiltradas.length == 14) {
                setSizeMenu("menulateralseis14");
                setDisabledImg("menulateralseis14");
            }
        }
    }, [ventasFiltradas]);

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
                        <div>
                            <div className="ml-57 mt-22">
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
                                        <div className="titlesformsUsersCuatro">
                                            <div className="textomisventas">
                                                Mis ventas
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} md={4} lg={4}>
                                        <div className="numeroVentas">
                                            Número de ventas: {numeroVentas}
                                        </div>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <div className="mt-7">
                                                {closeOpen ? (
                                                    <LateralMenu />
                                                ) : null}
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
                                            value={busqueda}
                                            onChange={handleChange}
                                            placeholder="Buscar en mis ventas"
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
                                        width: isMdDown ? "90%" : "84%",
                                        marginTop: "2rem",
                                    }}>
                                    {ventasFiltradas &&
                                        ventasFiltradas.length > 0 ? (
                                        ventasFiltradas.map((venta, index) =>
                                                <Grid
                                                    key={index}
                                                    className={sombraOpenTres}
                                                    container>
                                                    <Grid
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
                                                                src={`${URL_IMAGES_RESULTS}${venta.nombreImagen}`}
                                                                className={
                                                                    controlImg
                                                                }
                                                                onClick={() =>
                                                                    router.push(
                                                                        `/product/${venta.idPrdoductRuta}`
                                                                    )
                                                                }
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
                                                                            venta.estadodelaventa
                                                                        }
                                                                    </p>
                                                                    <p
                                                                        className="nombreProductMiCompra"
                                                                        onClick={() =>
                                                                            router.push(
                                                                                `/product/${venta.idPrdoductRuta}`
                                                                            )
                                                                        }>
                                                                        {
                                                                            venta.nombreProducto
                                                                        }
                                                                    </p>
                                                                    <div className="divCantCompradas">
                                                                        <p className="UnidCompradas">
                                                                            Unidades
                                                                            vendidas:
                                                                        </p>
                                                                        <p className="numeroUnidsCompradas">
                                                                            {
                                                                                venta.cantidad
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    <div className="divNcompra">
                                                                        <p className="UnidCompradas">
                                                                            {" "}
                                                                            Número
                                                                            de
                                                                            venta:
                                                                        </p>
                                                                        <p className="numeroUnidsCompradas">
                                                                            {
                                                                                venta.numerodeaprobacion
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    <p className="dateCompra">
                                                                        {
                                                                            venta.fechadeventa
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
                                                                {venta.preciodeventa !==
                                                                    null && (
                                                                        <p>
                                                                            $
                                                                            {venta.preciodeventa.toLocaleString(
                                                                                "en-US"
                                                                            )}
                                                                        </p>
                                                                    )}
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
                                                                    venta.nombreComprador
                                                                }{" "}
                                                                {
                                                                    venta.apellidoComprador
                                                                }{" "}
                                                            </p>
                                                        </div>
                                                        <div className="SendMsjVendandName">
                                                            {venta.mensajes >
                                                                0 ? (
                                                                <p
                                                                    className="nameVendedorMiCompra apuntador subrayartextoclicaqui"
                                                                    onClick={() =>
                                                                        router.push(
                                                                            {
                                                                                pathname:
                                                                                    "./msjComprador",
                                                                                query: {
                                                                                    venta: JSON.stringify(
                                                                                        venta
                                                                                    ),
                                                                                },
                                                                            }
                                                                        )
                                                                    }>
                                                                    Tienes{" "}
                                                                    {
                                                                        venta.mensajes
                                                                    }{" "}
                                                                    mensajes sin
                                                                    leer
                                                                </p>
                                                            ) : (
                                                                <p className="nameVendedorMiCompra">
                                                                    Tienes{" "}
                                                                    {
                                                                        venta.mensajes
                                                                    }{" "}
                                                                    mensajes sin
                                                                    leer
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="SendMsjVendandName">
                                                            <p
                                                                className="nameVendedorMiCompra nameVendedorMiCompra2"
                                                                onClick={() =>
                                                                    router.push(
                                                                        {
                                                                            pathname:
                                                                                "./msjComprador",
                                                                            query: {
                                                                                venta: JSON.stringify(
                                                                                    venta
                                                                                ),
                                                                            },
                                                                        }
                                                                    )
                                                                }>
                                                                Enviar mensaje
                                                                al comprador
                                                            </p>
                                                        </div>
                                                        <div className="divButtonVercompra2">
                                                            <button
                                                                onClick={() =>
                                                                    router.push(
                                                                        {
                                                                            pathname:
                                                                                "./verVenta",
                                                                            query: {
                                                                                venta: JSON.stringify(
                                                                                    venta
                                                                                ),
                                                                            },
                                                                        }
                                                                    )
                                                                }>
                                                                Ver venta
                                                            </button>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            
                                        )
                                    ) : (   
                                        <p>Ups, aún no tienes ventas!</p>
                                    )}
                                </Grid>
                            </div>
                        </div>
                        <div className="margenpaginationcompras">
                            <CustomPaginationVentas />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}

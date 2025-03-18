import Container from "../../components/layouts/Container"
import { Grid, useMediaQuery, useTheme, InputAdornment, InputBase, FormControl, InputLabel, Modal } from '@mui/material';
import { Input } from '@mui/material';

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import { Dropdown } from "react-bootstrap";
import { URL_BD_MR } from "../../helpers/Constants";
import { useSelector } from "react-redux";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { GrNext } from "react-icons/gr";
import shortid from "shortid";
import ModalMensajes from "../mensajes/ModalMensajes";

import ListarDocumentos from "./ListarDocumentos";
import ListarDctosTransaccion from "./ListarDctosTransaccion";
import RegistrarDctoTransaccion from "./RegistrarDctoTransaccion";
import ListarDetalleConcepto from "./ListarDetalleConcepto";

export default function SolicitudRetiro() {

  const router = useRouter();
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const irA = useRef(null);
  const fileInput = useRef(null);
  const [selectedSortOption, setSelectedSortOption] = useState(null);
  const datosusuarios = useSelector((state) => state.userlogged.userlogged);
  const [busqueda, setBusqueda] = useState(false);
  const [movimientos, setMovimientos] = useState([]);
  const [movimientosAll, setMovimientosAll] = useState([]);
  const [dataMov, setDataMov] = useState([]);
  const [dataPrecio, setDataPrecio] = useState([]);
  const [actualizar, setActualizar] = useState(false);
  const [actualizarPre, setActualizarPre] = useState(false);

  const [modalEditar, setModalEditar] = useState(false);
  const [modalGrabarDcto, setModalGrabarDcto] = useState(false);
  const [modalListarDcto, setModalListarDcto] = useState(false);
  const [modalDetalleConcepto, setModalDetalleConcepto] = useState(false);

  const [showModalMensaje, setShowModalMensajes] = useState(false);
  const [tituloMensajes, setTituloMensajes] = useState(false);
  const [textoMensajes, setTextoMensajes] = useState(false);

  const [clearInputIdTransaccion, setclearInputIdTransaccion] = useState("");
  const [clearInputNombre, setclearInputNombre] = useState("");
  const [clearInputIdentificacion, setclearInputIdentificacion] = useState("");
  const [clearInputIdCuenta, setclearInputIdCuenta] = useState("");

  const handleClosePdf = () => setModalEditar(false);
  const handleGrabarDcto = () => setModalGrabarDcto(false);
  const handleListarDcto = () => setModalListarDcto(false);
  const handleDetalleConcepto = () => setModalDetalleConcepto(false);

  const [ordenarPorFecha, setOrdenarPorFecha] = useState(0);
  const [ordenarPorPrecio, setOrdenarPorPrecio] = useState(0);
  const [estadoCuenta, setEstadoCuenta] = useState(null);
  const [dataSelectDctos, setDataSelectDctos] = useState([]);

  useEffect(() => {
    irA.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  let uidusuario = null;
  let idinterno = null;
  let tipousuario = null;

  const borrarIdTransaccion = (e, key) => {
    if (key == 8 && clearInputIdTransaccion.length == 1) {
      setclearInputIdTransaccion("");
      setMovimientos(movimientosAll);
    }
  }

  const filtrarIdTransaccion = (e) => {
    let nvoprod = [];
    if (e) {
      let find = e.toLowerCase();
      //console.log("DATXX : ", find.length)
      setclearInputIdTransaccion(e);
      movimientosAll &&
        movimientosAll.map((row, index) => {
          let compara = "" + (row.id);//.toLowerCase();
          //let nombre = row.name.toLowerCase();
          let validar;
          validar = compara.includes(find);
          if (validar) {
            nvoprod.push(row);
          }
          //console.log("DATOS FILTRAR : ", nvoprod)
        });
    }
    setMovimientos(nvoprod);
  }

  const borrarNombre = (e, key) => {
    if (key == 8 && clearInputNombre.length == 1) {
      setclearInputNombre("");
      setMovimientos(movimientosAll);
    }
  }

  const filtrarNombre = (e) => {
    let nvoprod = [];
    if (e) {
      let find = e.toLowerCase();
      //console.log("DATXX : ", find.length)
      setclearInputNombre(e);
      movimientosAll &&
        movimientosAll.map((row, index) => {
          let compara = "" + (row.nombretitular).toLowerCase();
          //let nombre = row.name.toLowerCase();
          let validar;
          validar = compara.includes(find);
          if (validar) {
            nvoprod.push(row);
          }
          //console.log("DATOS FILTRAR : ", nvoprod)
        });
    }
    setMovimientos(nvoprod);
  }

  const borrarIdentificacion = (e, key) => {
    if (key == 8 && clearInputIdentificacion.length == 1) {
      setclearInputIdentificacion("");
      setMovimientos(movimientosAll);
    }
  }

  const filtrarIdentificacion = (e) => {
    let nvoprod = [];
    if (e) {
      let find = e.toLowerCase();
      //console.log("DATXX : ", find.length)
      setclearInputIdentificacion(e);
      movimientosAll &&
        movimientosAll.map((row, index) => {
          let compara = "" + (row.identificacion); //.toLowerCase();
          //let nombre = row.name.toLowerCase();
          let validar;
          validar = compara.includes(find);
          if (validar) {
            nvoprod.push(row);
          }
          //console.log("DATOS FILTRAR : ", nvoprod)
        });
    }
    setMovimientos(nvoprod);
  }

  const borrarIdCuenta = (e, key) => {
    if (key == 8 && clearInputIdCuenta.length == 1) {
      setclearInputIdCuenta("");
      setMovimientos(movimientosAll);
    }
  }

  const filtrarIdCuenta = (e) => {
    let nvoprod = [];
    if (e) {
      let find = e.toLowerCase();
      //console.log("DATXX : ", find.length)
      setclearInputIdCuenta(e);
      movimientosAll &&
        movimientosAll.map((row, index) => {
          let compara = "" + (row.numerodecuenta); //.toLowerCase();
          //let nombre = row.name.toLowerCase();
          let validar;
          validar = compara.includes(find);
          if (validar) {
            nvoprod.push(row);
          }
          //console.log("DATOS FILTRAR : ", nvoprod)
        });
    }
    setMovimientos(nvoprod);
  }

  useEffect(() => {
    setBusqueda(false);
    const ListarMovimientosUsuario = async () => {

      let params = {
        uidvendedor: datosusuarios.uid,
      };

      //console.log("PARAMS : ", params)

      try {
        const res = await axios({
          method: "post",
          url: URL_BD_MR + "1551", params
        });

        if (res.data.type == 1) {
          setMovimientos(res.data.listarpqr);
          setMovimientosAll(res.data.listarpqr);

          let data = [];
          let dataprecio = [];
          res.data.listarpqr &&
            res.data.listarpqr.map((row, index) => {
              data.push(row.id)
              dataprecio.push(row.valortransferencia)
            });
          setDataMov(data);
          setDataPrecio(dataprecio);
        }
      } catch (error) {
        console.error("Error al leer los datos", error);
      }
    };
    ListarMovimientosUsuario();

    const listUsuarioImg = async () => {
      let params = {
        uidusuario: datosusuarios.uid,
      };

      //console.log("params : ", params)

      try {
        const res = await axios({
          method: "post",
          url: `${URL_BD_MR}236`,
          params,
        });

        const usuarioimg = res.data.listarcertiusuarios;

        setArchivoUser(usuarioimg);


      } catch (error) {
        console.error("Error al leer las transacciones del vendedor", error);
      }
    };
    listUsuarioImg();

  }, [uidusuario, busqueda]);

  const CustomDropdownButton = React.forwardRef(({ children, onClick }, ref) => (
    <button
      ref={ref}
      onClick={onClick}
      className="dropdowncustomMisFacturas"
    >
      {selectedSortOption ? `${selectedSortOption}` : "Ordenar por"}
    </button>
  ));

  useEffect(() => {
    irA.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const handleSelect = (eventKey) => {
    if (eventKey == 'Más antiguo')
      setOrdenarPorFecha(1)
    else
      if (eventKey == 'Más reciente')
        setOrdenarPorFecha(2)
      else
        if (eventKey === "Mayor precio") {
          setMovimientos(prevMovimientos =>
            [...prevMovimientos].sort((a, b) => b.valortransferencia - a.valortransferencia)
          );
        } else
          if (eventKey === "Menor precio") {
            setMovimientos(prevMovimientos =>
              [...prevMovimientos].sort((a, b) => a.valortransferencia - b.valortransferencia)
            );
          }
  }

  useEffect(() => {
    if (ordenarPorFecha == 2) {
      dataMov.reverse();
      setActualizar(true);
    }

    if (ordenarPorFecha == 1) {
      dataMov.sort();
      setActualizar(true);
    }
  }, [ordenarPorFecha]);


  useEffect(() => {
    let data = [];
    dataMov &&
      dataMov.map((mov, ind) => {
        movimientos &&
          movimientos.map((row, index) => {
            if (row.id == mov) {
              data.push(row)
            }
          });
      });
    setMovimientos(data);
    setActualizar(false);
  }, [actualizar]);

  useEffect(() => {
    let data = [];
    dataPrecio &&
      dataPrecio.map((mov, ind) => {
        movimientos &&
          movimientos.map((row, index) => {
            if (row.valortransferencia == mov) {
              data.push(row)
            }
          });
      });
    setMovimientos(data);
    setActualizarPre(false);
  }, [actualizarPre]);

  const limpiarFiltro = () => {
    localStorage.setItem("redirect", JSON.stringify(0));
    localStorage.setItem("ctlrnotificacion", JSON.stringify(0));
    localStorage.setItem("crearusuario", JSON.stringify(false));
    localStorage.setItem("loginvender", JSON.stringify(null));
    localStorage.setItem("orderbyprd", JSON.stringify(0));
    localStorage.setItem("textoorderbyprd", JSON.stringify("Ordenar por"));
    localStorage.setItem("ctrlposicionprd", JSON.stringify(0));
    localStorage.setItem("posicionprd", JSON.stringify(0));
    localStorage.setItem("rangoprecios", JSON.stringify([]));
    localStorage.removeItem("dataWords");
    localStorage.setItem("filtrocondicionprd", JSON.stringify(0));
    localStorage.setItem("filtrociudadprd", JSON.stringify([]));
    localStorage.setItem("filtroprecioprd", JSON.stringify([]));
    localStorage.setItem("idvehgarage", JSON.stringify(-1));
    localStorage.setItem("selectvehgarage", JSON.stringify(null));

    setMovimientos(movimientosAll);
    setclearInputIdTransaccion("");
    setclearInputNombre("");
    setclearInputIdentificacion("");
    setclearInputIdCuenta("");
  }

  return (
    <>
      <div ref={irA}>
        <Container title="Mi Cuenta">
          <Modal
            open={modalEditar}
            onClose={handleClosePdf}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ListarDocumentos
              dataSelectDctos={dataSelectDctos}
              idcertificado={dataSelectDctos.idcertificado}
              idinterno={idinterno}
              uidusuario={uidusuario}
              setModalEditar={setModalEditar}
              tipousuario={tipousuario}
            />
          </Modal>
          <Modal
            open={modalGrabarDcto}
            onClose={handleGrabarDcto}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <RegistrarDctoTransaccion
              dataSelectDctos={dataSelectDctos}
              idinterno={idinterno}
              setModalGrabarDcto={setModalGrabarDcto}
            />
          </Modal>
          <Modal
            open={modalListarDcto}
            onClose={handleListarDcto}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ListarDctosTransaccion
              dataSelectDctos={dataSelectDctos}
              idinterno={idinterno}
              setModalListarDcto={setModalListarDcto}
              tipousuario={tipousuario}
            />
          </Modal>
          <Modal
            open={modalDetalleConcepto}
            onClose={handleDetalleConcepto}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ListarDetalleConcepto
              dataSelectDctos={dataSelectDctos}
              idinterno={idinterno}
              setModalDetalleConcepto={setModalDetalleConcepto}
            />
          </Modal>


          <ModalMensajes
            shown={showModalMensaje}
            close={setShowModalMensajes}
            titulo={tituloMensajes}
            mensaje={textoMensajes}
            tipo="error"
          />
          <div className="ps-page ps-page--inner" id="myaccount">
            <div className="container" >
              <div className="ps-page__header" > </div>
              <div className="ps-page__content ps-account" style={{ marginBottom: '28rem' }}>

                <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '90%' }}>
                  <Breadcrumbs separator={<GrNext style={{ color: '#D9D9D9', marginBottom: '3rem' }} size={17} />} aria-label="breadcrumb" className="linkMisvResF">
                    <Link
                      className="linkMisv"
                      underline="none"
                      href="./"
                      onClick={(e) => { e.preventDefault(); router.push('./') }}

                    >
                      <p className="VerVentaLink VerVentaLinkPres">Mi billetera</p>
                    </Link>
                    <p className="VerVentaLink VerVentaLinkPres">Mis solicitudes</p>
                  </Breadcrumbs>
                </Grid>
                <Grid className="contMainMisFacturas contMainMisFacturas2" container style={{ width: isMdDown ? '110%' : '100%', marginTop: '-1rem' }}>
                  <div className="contTopMisFacturas">
                    {
                      /*
<Grid item xs={12} md={2} lg={2}>
                      <InputBase
                        value={searchTerm}
                        onChange={event => setSearchTerm(event.target.value)}
                        placeholder="Buscar en mis movimientos"
                        sx={{
                          borderRadius: '10px',
                          backgroundColor: '#f1f2f6',
                          padding: '8px',
                          width: '320px',
                          height: '44px',
                          padding: '10px',
                          fontSize: '16px',
                          paddingLeft: '3rem',
                          color: '#2C2E82',
                          fontWeight: '500',
                          '&::placeholder': {
                            color: '#3E4089',
                            fontWeight: '600',
                          },
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <SearchIcon style={{ fontSize: 30, color: '#3E4089' }} />
                          </InputAdornment>
                        }
                      />
                    </Grid>
                      */
                    }

                    <Grid item xs={12} md={2} lg={2}>
                      <input
                        className="filtrarsolidtransac"
                        placeholder="Filtrar Id solicitud"
                        onKeyDown={(e) => borrarIdTransaccion(e.target.value, e.keyCode)}
                        onChange={(e) => filtrarIdTransaccion(e.target.value)}
                        value={clearInputIdTransaccion}
                      />
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                      <input
                        className="filtrarsolinombre"
                        placeholder="Filtrar por nombre"
                        onKeyDown={(e) => borrarNombre(e.target.value, e.keyCode)}
                        onChange={(e) => filtrarNombre(e.target.value)}
                        value={clearInputNombre}
                      />
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                      <input
                        className="filtrarsolinombre"
                        placeholder="Filtrar identificación"
                        onKeyDown={(e) => borrarIdentificacion(e.target.value, e.keyCode)}
                        onChange={(e) => filtrarIdentificacion(e.target.value)}
                        value={clearInputIdentificacion}
                      />
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                      <input
                        className="filtrarsolinombre"
                        placeholder="Filtrar # de cuenta"
                        onKeyDown={(e) => borrarIdCuenta(e.target.value, e.keyCode)}
                        onChange={(e) => filtrarIdCuenta(e.target.value)}
                        value={clearInputIdCuenta}
                      />
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                      <div className="limpiarfiltrossolretiro"
                        onClick={() => limpiarFiltro()}
                      >
                        Limpiar filtros
                      </div>

                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                      <Dropdown onSelect={handleSelect} className="dropFactura">
                        <div className="ordenarbilletera">
                          <Dropdown.Toggle
                            as={CustomDropdownButton}
                            id="dropdown-basic"
                          >
                            {selectedSortOption ? `Ordenar por ${selectedSortOption}` : "Ordenar por"}

                          </Dropdown.Toggle>
                        </div>
                        <Dropdown.Menu className="tamañocajaoptionsVendedor">
                          <Dropdown.Item
                            eventKey="Más antiguo"
                            className="itemsdropdownVerVenta"
                          >
                            Más antiguo
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey="Más reciente"
                            className="itemsdropdownVerVenta"
                          >
                            Más reciente
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey="Mayor precio"
                            className="itemsdropdownVerVenta"
                          >
                            Mayor precio
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey="Menor precio"
                            className="itemsdropdownVerVenta"
                          >
                            Menor precio
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Grid>


                  </div>

                  <Grid container className="dataMainMovimientos" display={'flex'} flexDirection={'column'}>
                    <Grid item xs={12}>
                      <Grid container className="dataMovimientosTop">
                        <Grid item xs={12} md={0.8} lg={0.8}>
                          <p>ID solicitud</p>
                        </Grid>
                        <Grid item xs={12} md={1} lg={1}>
                          <p>Fecha solicitud</p>
                        </Grid>
                        <Grid item xs={12} md={1} lg={1}>
                          <p>Nombre titular</p>
                        </Grid>
                        <Grid item xs={12} md={0.8} lg={0.8}>
                          <p>Tipo dcto</p>
                        </Grid>
                        <Grid item xs={12} md={1.2} lg={1.2}>
                          <p className="ml-25">Identificación</p>
                        </Grid>
                        <Grid item xs={12} md={1.2} lg={1.2}>
                          <p className="ml-45">Tipo de cuenta</p>
                        </Grid>
                        <Grid item xs={12} md={1} lg={1}>
                          <p className="ml-25"># de cuenta</p>
                        </Grid>
                        <Grid item xs={12} md={1} lg={1}>
                          <p className="ml-80">Banco</p>
                        </Grid>
                        <Grid item xs={12} md={1} lg={1}>
                          <p className="ml-80">Fecha transferencia</p>
                        </Grid>
                        <Grid item xs={12} md={1} lg={1}>
                          <div className="single-line ml-100">Valor abono</div>
                        </Grid>
                        <Grid item xs={12} md={1} lg={1}>
                          <p className="ml-120">Estado</p>
                        </Grid>
                      </Grid>

                      {movimientos && movimientos
                        .map((movimiento, index) => (
                          <Grid container className="dataMovimientosM" key={index}>
                            <Grid item xs={12} md={0.8} lg={0.8}>
                              <p>{movimiento.id}</p>
                            </Grid>
                            <Grid item xs={12} md={1} lg={1}>
                              <p>{movimiento.fechacreacion}</p>
                            </Grid>
                            <Grid item xs={12} md={1} lg={1}>
                              <p className="">
                                {movimiento.nombretitular}
                              </p>
                            </Grid>
                            <Grid item xs={12} md={1} lg={1}>
                              <p className="">
                                {movimiento.tipodocumento}
                              </p>
                            </Grid>
                            <Grid item xs={12} md={1} lg={1}>
                              <p className="ml-10">
                                {movimiento.identificacion}
                              </p>
                            </Grid>
                            <Grid item xs={12} md={1} lg={1}>
                              <p className="mainSingle ml-45">
                                {movimiento.nombretipocuenta}
                              </p>
                            </Grid>
                            <Grid item xs={12} md={1} lg={1}>
                              <p className="ml-45">
                                {movimiento.numerodecuenta}
                              </p>
                            </Grid>
                            <Grid item xs={12} md={1} lg={1}>
                              <p className="ml-100">
                                {movimiento.entidadbancaria}
                              </p>
                            </Grid>
                            <Grid item xs={12} md={1} lg={1}>
                              <p className="fechatransferencia">
                                {movimiento.fechaactualizacion}
                              </p>
                            </Grid>
                            <Grid item xs={12} md={1} lg={1}>
                              <div className="valorsolretiro">
                                ${movimiento.valortransferencia.toLocaleString('en-US')}
                              </div>
                            </Grid>
                            <Grid item xs={12} md={1} lg={1}>
                              <p className="ml-140">
                                {movimiento.nombreestado}
                              </p>
                            </Grid>

                          </Grid>
                        ))}
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
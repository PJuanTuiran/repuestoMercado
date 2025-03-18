import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Button, ButtonGroup, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoIosMenu, IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import img1 from "../../../public/imagescategorias/categorias1.jpg";
import img2 from "../../../public/imagescategorias/categorias2.jpg";
import img3 from "../../../public/imagescategorias/categorias3.jpg";
import img4 from "../../../public/imagescategorias/categorias3.png";
import img5 from "../../../public/imagescategorias/categorias5.jpg";
import img6 from "../../../public/imagescategorias/categorias6.jpg";

const CategoryMenu = (props) => {
  const [categoryMenuExpandStatus, setCategoryMenuExpandStatus] = useState(
    true
  );
  const router = useRouter();
  const { setShowModal, showModal } = props;
  const [showModalSubCategorias, setShowModalSubCategorias] = useState(false);
  const [showModalEjemplos, setShowModalEjemplos] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [itemCategoria, setItemCategoria] = useState("");
  const [itemSubCategoria, setItemSubCategoria] = useState("");
  const [subcategorias, setSubcategorias] = useState([]);
  const [subcategoriasSeleccionada, setSubcategoriasSeleccionada] = useState([]);
  const [ejemplos, setEjemplos] = useState(false);
  const [textoEjemplos, setTextoEjemplos] = useState("");
  const [classUbicaEjemplos, setClassUbicaEjemplos] = useState("divubicaejemplosuno");

  const componentDidMount = () => {

    // Adding a click event listener
    document.addEventListener('click', this.handleOutsideClick);
  }

  const handleOutsideClick = (event) => {
    if (this.box && !this.box.current.contains(event.target)) {
      alert('you just clicked outside of box!');
    }
  }

  const [
    categoryMenuItemExpandStatus,
    setCategoryMenuItemExpandStatus
  ] = useState(false);

  const onCloseModalCategorias = () => {
    setShowModal(false);
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
      setCategorias(categorias);
      setSubcategorias(subcategorias);
    }
  }, []);

  /*
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("datosgenerales"));
    //console.log("DATOS GENERALES : ", data);

    setCategorias(data.vgl_categorias);
    setSubcategorias(data.vgl_subcategorias);
  }, []);
*/
  const activar = (categoria) => {
    //console.log("ACTIVAR : ", categoria);
    setNombreCategoria(categoria.nombre);
    setItemCategoria(categoria.id);
    setTextoEjemplos(categoria.descripcion);
    const newDet = [];
    const newDetImp = [];
    subcategorias && subcategorias.forEach((row) => {
      if (Number.parseInt(row.id_categorias) === Number.parseInt(categoria.id)) {
        //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
        let item = {
          id: row.id,
          id_categorias: row.id_categorias,
          nombre: row.nombre,
          descripcion: row.descripcion,
          url: row.url,
          estado: row.estado,
          palabraclave: row.palabrasclaves
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
  }

  const activarsubcategoria = (id) => {
    //console.log("ID SUBCATEGORIAS : ", id)
    setItemSubCategoria(id)
  }

  const buscarProductos = (clave) => {
    let buscar = "/search?keyword=" + clave;
    //console.log("CLAVE : ", buscar);
    router.push(buscar);
    setShowModal(false);
    setShowModalSubCategorias(false);
  }

  const mostrarEjemplos = () => {
    setEjemplos(true);

    if (itemCategoria < 3) {
      setClassUbicaEjemplos("divubicaejemplosuno")
    }
    else
      if (itemCategoria > 2) {
        setClassUbicaEjemplos("divubicaejemplosdos")
      }
      else
        setClassUbicaEjemplos("divubicaejemplosuno")
  }

  const cerrarEjemplos = () => {
    setEjemplos(false);
  }

  const activarEjemplos = () => {
    setShowModalEjemplos(true);
  }

  const desactivarEjemplos = () => {
    setShowModalEjemplos(false);
  }

  const close = () => {
    setShowModal(false);
    setShowModalSubCategorias(false);
  }

  return (
    <div id="modal"
      onClick={() => {
        close();
      }}
    >
      <div className="container ">
        <Modal className="modal-categorias" show={showModal}>
          <Modal.Body>
            <Row>
              <Col xl={3} lg={3} md={3} sm={3}>
                <h2 className="sinborder"> Categorías</h2>
              </Col>
              <Col xl={2} lg={2} md={2} sm={2}>
                <button
                  type="button"
                  className="cerrarmodal mt-1"
                  data-dismiss="modal"
                  onClick={onCloseModalCategorias}>
                  {" "}
                  X{" "}
                </button>
              </Col>
            </Row>
            <hr />
            <div className="alturamodalcategorias">
              {categorias && categorias.map((item) => (
                <Row>
                  {
                    item.id == itemCategoria ?
                      <Col xl={2} lg={2} md={2} sm={2}
                        className="resaltaitemmodalcategoria" onMouseOver={(e) => activar(item)}>
                        {item.nombre}
                      </Col>
                      :
                      <Col xl={2} lg={2} md={2} sm={2}
                        className="itemscategorias" onMouseOver={(e) => activar(item)} >
                        {item.nombre}
                      </Col>
                  }
                  <Col xl={2} lg={2} md={2} sm={2} >
                    {
                      item.id == itemCategoria ?
                        <IoIosArrowForward className="tamañoflechacategorias" />
                        :
                        null
                    }
                  </Col>
                </Row>
              ))}
            </div>
          </Modal.Body>
        </Modal>

        <Modal className="modal-subcatgegorias" show={showModalSubCategorias}>
          <Modal.Body>
            <Row>
              <Col xl={3} lg={3} md={3} sm={3}>
                <h2> {nombreCategoria} </h2>
              </Col>
              <Col xl={5} lg={5} md={5} sm={5}>
                <i onMouseOver={(e) => activarEjemplos()}
                  onMouseOut={(e) => desactivarEjemplos()}
                  className="fa fa-info d-flex infosubcategorias"
                  aria-hidden="true">
                </i>
              </Col>
              <Col xl={2} lg={2} md={2} sm={2}>
                <button
                  type="button"
                  className="cerrarmodal mt-1 ml-5"
                  data-dismiss="modal"
                  onClick={onCloseModalCategorias}>
                  {" "}
                  X{" "}
                </button>
              </Col>
            </Row>
            <hr />

            <div className="alturamodalcategorias">
              {subcategoriasSeleccionada && subcategoriasSeleccionada.map((item) => (
                <Row>
                  <Col xl={5} lg={5} md={5} sm={5}
                    className="itemssubcategorias"
                    onMouseOver={(e) => activarsubcategoria(item.id1)}
                  >
                    <Row>
                      <Col xl={7} lg={7} md={7} sm={7} onClick={(e) => buscarProductos(item.palabraclaveuna)}>
                        {item.nombre1}
                      </Col>
                      <Col xl={1} lg={1} md={1} sm={1} onMouseOver={(e) => mostrarEjemplos()} onMouseOut={cerrarEjemplos} >
                        {
                          item.id1 == itemSubCategoria ?
                            <i
                              className="fa fa-info d-flex justify-content-center"
                              aria-hidden="true"

                            >
                            </i>
                            :
                            null
                        }
                      </Col>
                    </Row>
                  </Col>
                  <Col xl={5} lg={5} md={5} sm={5}
                    className="itemssubcategorias"
                    onMouseOver={(e) => activarsubcategoria(item.id2)}
                  >
                    <Row>
                      <Col xl={7} lg={7} md={7} sm={7} onClick={(e) => buscarProductos(item.palabraclavedos)}>
                        {item.nombre2}
                      </Col>
                      <Col xl={1} lg={1} md={1} sm={1} onMouseOver={(e) => mostrarEjemplos()} onMouseOut={cerrarEjemplos} >
                        {
                          item.id2 == itemSubCategoria ?
                            <i
                              className="fa fa-info d-flex justify-content-center"
                              aria-hidden="true">
                            </i>
                            :
                            null
                        }
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ))}
              {
                ejemplos ?
                  (
                    <div className={classUbicaEjemplos}>
                      <Row>
                        <Col xl={2} lg={2} md={2} sm={2}>
                          <img src={img1.src} alt="" width="120px" height="120px" />
                        </Col>
                        <Col xl={2} lg={2} md={2} sm={2}>
                          <img src={img2.src} alt="" width="120px" height="120px" />
                        </Col>
                        <Col xl={2} lg={2} md={2} sm={2}>
                          <img src={img5.src} alt="" width="120px" height="120px" />
                        </Col>
                        <Col xl={2} lg={2} md={2} sm={2}>
                          <img src={img4.src} alt="" width="120px" height="120px" />
                        </Col>
                      </Row>
                    </div>
                  )
                  :
                  null
              }
            </div>
          </Modal.Body>
        </Modal>
        <Modal className="modalejemplossubcatgegorias" show={showModalEjemplos}>
          <Modal.Body>
            <h2 className="textoejemplossubcategorias">
              {textoEjemplos}
            </h2>

          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default CategoryMenu;

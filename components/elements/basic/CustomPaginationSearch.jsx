import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPageSelect } from "../../../store/pageselect/action";

const CustomPaginationSearch = (props) => {
    const dispatch = useDispatch();
    const [active, setActive] = useState("");
    const [numeroPaginas, setNumeroPaginas] = useState(0);
    const [paginaSel, setPaginaSel] = useState("");

    let numeropaginas = [];

    numeropaginas = useSelector(
        (state) => state.numberpages.numberpages
    );

    //console.log("NUM PAG : ", numeroPaginas)
    const SeleccionaPagina = (pag) => {
      alert(pag)
      dispatch(getPageSelect(pag));   
    };

    return (
        <div className="ps-pagination">
            <ul className="pagination">
                <li>
                    <a>
                        <i className="fa fa-angle-double-left"></i>
                    </a>
                </li>
                {
                    //Esta sección de codigo se utiliza para siempre cargar por defecto la pagina UNO,
                    //Si el numero de productos ocupa mas de una pagina se ejecuta el array de numeroPaginas
                }
                {paginaSel == 1 ? (
                    <li className="active">
                        <a onClick={() => SeleccionaPagina(1)}>1</a>
                    </li>
                ) : (
                    <li className="">
                        <a onClick={() => SeleccionaPagina(1)}>1</a>
                    </li>
                )}
                {
                    //Esta sección de codigo se utiliza para siempre cargar por defecto la pagina UNO,
                    //Si el numero de productos ocupa mas de una pagina se ejecuta el array de numeroPaginas
                 
                }
             
                {numeropaginas &&
                    numeropaginas.map((row, index) => {
                        let pag = index + 1;
                        return index > 0 ? (
                            pag == paginaSel ? (
                                <li className="active">
                                    <a onClick={() => SeleccionaPagina(row)}>
                                        {row}
                                    </a>
                                </li>
                            ) : (
                                <li className="">
                                    <a onClick={() => SeleccionaPagina(row)}>
                                        {row}
                                    </a>
                                </li>
                            )
                        ) : null;
                    })}
                <li>
                    <a href="#">
                        <i className="fa fa-angle-double-right"></i>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default CustomPaginationSearch;

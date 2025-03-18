import React, { useState, useEffect } from "react";

const CustomPagination = (props) => {
    const [active, setActive] = useState("");

    const {
        numeroPaginas,
        setPagInicia,
        setPagFin,
        itemsPaginas,
        paginaSel,
        setPaginaSel,
        setIrInicio,
        setitemIni,
        setItemFin,
    } = props;

    //console.log("NUM PAG : ", numeroPaginas)
    const SeleccionaPagina = (pag) => {
        setPaginaSel(pag);

        let ini = 0;
        let fin = 0;
        if (pag == 1) {
            ini = 1;
            fin = itemsPaginas;
        } else {
            ini = itemsPaginas * (pag - 1);
            fin = itemsPaginas * pag;
        }

        let inicia = ini;
        let final = fin;
        setPagInicia(inicia);
        setPagFin(final);
        setIrInicio(true);
        if (pag == 1) {
            setitemIni(1);
            setItemFin(40);
        } else if (pag == 2) {
            setitemIni(41);
            setItemFin(80);
        } else if (pag == 3) {
            setitemIni(81);
            setItemFin(120);
        } else if (pag == 4) {
            setitemIni(121);
            setItemFin(160);
        } else if (pag == 5) {
            setitemIni(161);
            setItemFin(200);
        } else if (pag == 6) {
            setitemIni(201);
            setItemFin(240);
        } else if (pag == 7) {
            setitemIni(241);
            setItemFin(280);
        } else if (pag == 8) {
            setitemIni(281);
            setItemFin(320);
        } else if (pag == 9) {
            setitemIni(321);
            setItemFin(360);
        } else if (pag == 9) {
            setitemIni(361);
            setItemFin(400);
        }
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
                    //console.log("Num paginas : ", numeroPaginas)
                }

                {numeroPaginas &&
                    numeroPaginas.map((row, index) => {
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

export default CustomPagination;

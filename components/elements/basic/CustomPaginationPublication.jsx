import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPageSelect } from "../../../store/pageselect/action";

const CustomPaginationPublication = (props) => {
    const dispatch = useDispatch();
    const [active, setActive] = useState("");
    const [numeroPaginas, setNumeroPaginas] = useState(0);
    const [paginaSel, setPaginaSel] = useState(1);

    let numeropaginas = [];
    numeropaginas = useSelector((state) => state.numberpages.numberpages);
    let longpage = useSelector((state) => state.longpage.longpage);

    //console.log("numeropaginas : ", longpage)
    // console.log("datafind : ", datafind.length)

    const SeleccionaPagina = (pag) => {
        setPaginaSel(pag)
        dispatch(getPageSelect(pag));
    };

    useEffect(() => {
        if (longpage < 10) {
            SeleccionaPagina(1)
        }
    }, [longpage])

    return (
        <div className="ps-pagination">
            <ul className="pagination">
                <li>
                    <a>
                        <i className="fa fa-angle-double-left"></i>
                    </a>
                </li>

                {numeropaginas.length > 0 ? (
                    numeropaginas &&
                    numeropaginas.map((row, index) => {
                        let pag = index + 1;

                        return pag == paginaSel ? (
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
                        );
                    })
                ) : (
                    <li className="active">
                        <a onClick={() => SeleccionaPagina(1)}>1</a>
                    </li>
                )}
                <li>
                    <a href="#">
                        <i className="fa fa-angle-double-right"></i>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default CustomPaginationPublication;

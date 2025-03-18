import React, {useState} from "react";
import { Button, Dropdown, Menu } from "antd";

const SortBySearchInteractiveSeller = (props) => {
    const { setOrdenarPor} = props;
    const [titulo, setTitulo] = useState("Ordenar por");

    const sortByItems = [
        {
            id: 1,
            text: "Más recientes",
        },
        {
            id: 2,
            text: "Más antiguas",
        },
        {
            id: 3,
            text: "Mayor a menor calificación",
        },
        {
            id: 4,
            text: "Menor a mayor calificación",
        },
    ];
    // <a href="#">{item.text}</a>
    const viewItems = sortByItems.map((item) => (
        <Menu.Item key={item.id} onClick={() => selectItem(item.id, item.text)}>
            <a className="textoitemscomentarioscompradores">{item.text}</a>
        </Menu.Item>
    ));

    const selectItem = (data, text) => {
        setOrdenarPor(data)
        setTitulo(text)
    };

    const view = <Menu className="ml-90 cajaitemsordenar">{viewItems}</Menu>;
    // textoordenarporrev
    return (
        <div className="mt-10 mb-10 ps-shop__sortby">
            <Dropdown
                overlay={view}
                placement="bottomLeft"
                className="ps-dropdown-toggle sinborder">
                <a className="flechaordenarpor">
                    <a className="textocomentarioscompradores">{titulo}</a>
                    <a className="ml-3 textocomentarioscompradores icon-chevron-down"></a>
                </a>
            </Dropdown>
        </div>
    );
};

export default SortBySearchInteractiveSeller;

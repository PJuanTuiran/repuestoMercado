import React, { useState } from "react";
import { Button, Dropdown, Menu } from "antd";
import MoreVertIcon from "@material-ui/icons/MoreVert";

let itemMenu = [];

const MenuPost = (props) => {
    const { selectOptions, setSelectOptions, estadoMyPost } = props;
    const [titulo, setTitulo] = useState("Ordenar por");

    const sortByItems = [
        {
            id: 1,
            text: "Editar",
        },
        {
            id: 2,
            text: "Ver publicación",
        },
        {
            id: 3,
            text: "Ver estadisticas",
        },
        {
            id: 4,
            text: "Pausar publicación",
        },
        {
            id: 5,
            text: "Duplicar",
        },
        {
            id: 6,
            text: "Eliminar",
        },
        {
            id: 7,
            text: "Ayuda",
        },
    ];

    // <a href="#">{item.text}</a>
    const viewItems = sortByItems.map((item) => (
        <div className="cajaopcionesmenupost">
            <Menu.Item
                key={item.id}
                onClick={() => selectItem(item.id, item.text)}>
                <div className="textomenuposts">{item.text}</div>
            </Menu.Item>
        </div>
    ));

    const selectItem = (data, text) => {
        setSelectOptions(data);
        setTitulo(text);
    };

    const view = <Menu className="mtmenos30">{viewItems}</Menu>;
    // textoordenarporrev
    return (
        <div className="mt-10 mb-10 ps-shop__sortby">
            <Dropdown
                overlay={view}
                placement="bottomLeft"
                className="ps-dropdown-toggle sinborder">
                <a className="flechaordenarpor">
                    <div>
                        <MoreVertIcon
                            className="tamanoiconomenu"
                            style={{ fontSize: 30 }}
                        />
                    </div>
                </a>
            </Dropdown>
        </div>
    );
};

export default MenuPost;

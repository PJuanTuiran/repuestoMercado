import React, { useState } from "react";
import { Button, Dropdown, Menu } from "antd";
import MoreVertIcon from "@material-ui/icons/MoreVert";

let itemMenu = [];

const MenuPost = (props) => {
    const {
        selectOptions,
        setSelectOptions,
        estadoMyPost,
    } = props;
    const [titulo, setTitulo] = useState("Ordenar por");

    const sortByItems = [
        {
            id: 8,
            text: "Activar publicación",
        }
    ];
    
    // <a href="#">{item.text}</a>
    const viewItems = sortByItems.map((item) => (
        <div className="cajaopcionesmenupostactivar">
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
        <div
            className="mt-10 mb-10 ps-shop__sortby">
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

import React, { useState } from "react";
import { Button, Dropdown, Menu } from "antd";
import { Box, Grid } from "@mui/material";

const SortByPosts = (props) => {
    const { orderPrice, setOrderPrice } = props;
    const [titulo, setTitulo] = useState("Ordenar por");

    const sortByItems = [
        {
            id: 1,
            text: "De menor a mayor precio",
        },
        {
            id: 2,
            text: "De mayor a menor precio",
        },
        {
            id: 3,
            text: "Fecha mas reciente",
        },
        {
            id: 4,
            text: "Fecha mas antigua",
        },
    ];
    // <a href="#">{item.text}</a>
    const viewItems = sortByItems.map((item) => (
        <div>
            <Menu.Item
                key={item.id}
                onClick={() => selectItem(item.id, item.text)}>
                <div className="textoordenarposts">{item.text}</div>
            </Menu.Item>
        </div>
    ));

    const selectItem = (data, text) => {
        setOrderPrice(data);
        setTitulo(text);
    };

    const view = <Menu >{viewItems}</Menu>;
    // textoordenarporrev
    return (
        <div className="mt-10 mb-10">
            <Dropdown
                overlay={view}
                placement="bottomLeft"
                className="ps-dropdown-toggle sinborder">
                <a className="flechaordenarpor">
                    <a className="textoordenarporposts">{titulo}</a>
                  
                    <a className="textocolorflechaposts icon-chevron-down"></a>
                  
                </a>
            </Dropdown>
        </div>
    );
};

export default SortByPosts;

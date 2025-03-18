import React, { useState } from "react";
import { Button, Dropdown, Menu } from "antd";

const SortByPrice = (props) => {
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
    ];
    // <a href="#">{item.text}</a>
    const viewItems = sortByItems.map((item) => (
        <div className="divsearchinteractiveselect">
            <Menu.Item
                className="searchinteractiveselect"
                key={item.id}
                onClick={() => selectItem(item.id, item.text)}>
                <a className="textoordenarpor">{item.text}</a>
            </Menu.Item>
        </div>
    ));

    const selectItem = (data, text) => {
        setOrderPrice(data);
        setTitulo(text);
    };

    const view = <Menu className="ml-90">{viewItems}</Menu>;
    // textoordenarporrev
    return (
        <div className="mt-10 mb-10 ps-shop__sortby">
            <Dropdown
                overlay={view}
                placement="bottomLeft"
                className="ps-dropdown-toggle sinborder">
                <a className="flechaordenarpor">
                    <a className="textoordenarpor">{titulo}</a>
                    <i className="ml-3  textocolorflecha icon-chevron-down"></i>
                </a>
            </Dropdown>
        </div>
    );
};

export default SortByPrice;

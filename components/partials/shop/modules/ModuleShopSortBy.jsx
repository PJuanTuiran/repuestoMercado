import React, { useState, useEffect } from "react";
import { Button, Dropdown, Menu } from "antd";
import { getFiltroOrderByPrd } from "../../../../store/filtroorderbyprd/action";
import { useDispatch, useSelector } from "react-redux";

const ModuleShopSortBy = (props) => {
    const dispatch = useDispatch();
    const { ordenarPor, setOrdenarPor, textoOrdenar, setTextoOrdenar } = props;

    const orderbyprd = useSelector(
        (state) => state.filtroorderbyprd.filtroorderbyprd
    );

    useEffect(() => {
        if (orderbyprd > 0) {
            let item = JSON.parse(localStorage.getItem("orderbyprd"));
            let texto = JSON.parse(localStorage.getItem("textoorderbyprd"));
            setOrdenarPor(item);
            setTextoOrdenar(texto);
            ordenar(item,texto);
        }
    }, [orderbyprd]);

    const sortByItems = [
        {
            id: 1,
            text: "Más reciente",
        },
        {
            id: 2,
            text: "De mayor a menor precio",
        },
        {
            id: 3,
            text: "De menor a mayor precio",
        },
    ];

    const viewItems = sortByItems.map((item) => (
        <Menu.Item className="textocolor" key={item.id}>
            <a onClick={() => ordenar(item.id, item.text)}>{item.text}</a>
        </Menu.Item>
    ));
    const view = <Menu>{viewItems}</Menu>;

    const ordenar = (item, texto) => {
        dispatch(getFiltroOrderByPrd(item));
        localStorage.setItem("orderbyprd", JSON.stringify(item));
        localStorage.setItem("textoorderbyprd", JSON.stringify(texto));
        setOrdenarPor(item);
        setTextoOrdenar(texto);
    };

    return (
        <div className="ps-shop__sortby">
            <span> </span>
            <Dropdown
                overlay={view}
                placement="bottomLeft"
                className="ps-dropdown-toggle">
                <Button>
                    {textoOrdenar}{" "}
                    <i className="icon-chevron-down textocolorflecha"></i>
                </Button>
            </Dropdown>
        </div>
    );
};

export default ModuleShopSortBy;

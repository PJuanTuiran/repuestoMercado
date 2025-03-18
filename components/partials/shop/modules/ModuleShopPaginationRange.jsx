import React, { useState } from "react";
import { Button, Dropdown, Menu } from "antd";

const ModuleShopPaginationRange = (props) => {
    const { itemsPaginas, setItemsPaginas } = props;

    let ranges = [10, 20, 30];

    const paginationRangeItems = ranges.map((item) => (
        <Menu.Item className="textocolor" key={item}>
            <a onClick={() => selectNumReg(item)}>{item}</a>
        </Menu.Item>
    ));

    const selectNumReg = (item) => {
        setItemsPaginas(item);
    };

    const view = <Menu>{paginationRangeItems}</Menu>;
    return (
        <div className="ps-shop__pagination-range">
            <span className="textomostrarcantidadresult">Mostrar</span>
            <Dropdown
                overlay={view}
                placement="bottomLeft"
                className="ps-dropdown-toggle">
                <Button>
                    <strong className="textocolor">{itemsPaginas}</strong>{" "}
                    <i className="icon-chevron-down"></i>
                </Button>
            </Dropdown>
        </div>
    );
};

export default ModuleShopPaginationRange;

import React, { useEffect, useState } from "react";
import { Row, Col, Dropdown, Form } from "react-bootstrap";

const SidebarShop = () => {
  
    const ordenar = [
        { label: "Menor precio", value: 1 },
        { label: "Mayor precio", value: 2 },
    ];
    const filtrar = [
        { label: "Opción uno", value: 1 },
        { label: "Opción dos", value: 2 },
        { label: "Opción tres", value: 3 },
    ];

    const handleChange = (option) => {
        alert(option);
    };

    return (
        <div className="ps-sidebar--shop ml-130 ">
            <Row>
                <Col xs={1} sm={1} md={3} lg={5}>
                    <Dropdown onSelect={handleChange}>
                        <Dropdown.Toggle
                            className="alinearizquierda dropdownorder"
                            variant="outline-light"
                            id="dropdown-basic">
                            Ordenar por
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                            variant="outline-light"
                            className="optionsdropdownorder">
                            {ordenar &&
                                ordenar.map((item) => {
                                    return (
                                        <Dropdown.Item
                                            className="itemsdropdowncustom"
                                            eventKey={item.value}
                                        >
                                            {item.label}
                                        </Dropdown.Item>
                                    );
                                })}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col xs={1} sm={1} md={2} lg={2}>
                    <Dropdown onSelect={handleChange}>
                        <Dropdown.Toggle
                            className="alinearizquierda dropdownorder"
                            variant="outline-light"
                            id="dropdown-basic">
                            Filtrar por
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                            variant="outline-light"
                            className="optionsdropdownorder">
                            {filtrar &&
                                filtrar.map((item) => {
                                    return (
                                        <Dropdown.Item
                                            className="itemsdropdowncustom"
                                            eventKey={item.value}
                                        >
                                            {item.label}
                                        </Dropdown.Item>
                                    );
                                })}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
        </div>
    );
};

export default SidebarShop;

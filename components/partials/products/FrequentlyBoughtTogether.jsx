import React from "react";

const FrequentlyBoughtTogether = () => {
    return (
        <section className="ps-bought">
            <h3 className="ps-bought__title">Comprados con mayor frecuencia</h3>
            <div className="ps-bought__wapper">
                <div className="ps-bought__thumbnail">
                    <ul>
                        <li>
                            <a href="#">
                                <img
                                    src="https://api.aal-estate.com/files/mercadorepuesto/nOcVtlGp1-1.jpeg"
                                    alt=""
                                />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img
                                    src="https://api.aal-estate.com/files/mercadorepuesto/p8eUtAWcm-3.jpeg"
                                    alt=""
                                />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img
                                    src="https://api.aal-estate.com/files/mercadorepuesto/p8eUtAWcm-4.jpeg"
                                    alt=""
                                />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img
                                    src="https://api.aal-estate.com/files/mercadorepuesto/P5xJgP848-4.jpeg"
                                    alt=""
                                />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="ps-bought__content">
                    <ul className="ps-bought__list">
                        <li>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="product0"
                                    defaultChecked={true}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="product0">
                                    <span className="ps-bought__name">
                                        Producto con alta demanda{" "}
                                    </span>
                                    –{" "}
                                    <span className="ps-bought__price">
                                        $ 856.000
                                    </span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="product1"
                                    defaultChecked={true}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="product1">
                                    <span className="ps-bought__name">
                                        Incluye un 50% de descuento {" "}
                                    </span>
                                    –{" "}
                                    <span className="ps-bought__del">
                                        $ 235.000
                                    </span>
                                    <span className="ps-bought__price sale">
                                        $ 117.500
                                    </span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="product2"
                                    defaultChecked={true}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="product2">
                                    <span className="ps-bought__name">
                                        Ultimas unidades disponibles {" "}
                                    </span>
                                    –{" "}
                                    <span className="ps-bought__price">
                                        $ 117.500
                                    </span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="product3"
                                    defaultChecked={true}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="product3">
                                    <span className="ps-bought__name">
                                        Luces porta placa con el 60% de descuento{" "}
                                    </span>
                                    –{" "}
                                    <span className="ps-bought__del">
                                        $ 125.000
                                    </span>
                                    <span className="ps-bought__price sale">
                                        $ 50.000
                                    </span>
                                </label>
                            </div>
                        </li>
                    </ul>
                    <div className="ps-bought__submit">
                        <label>Lleva todo por solo : </label>
                        <div className="ps-bought__total">$ 1.140.000</div>
                        <a className="ps-btn ps-btn--warning" href="#">
                            Añadir todo al carrito
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FrequentlyBoughtTogether;

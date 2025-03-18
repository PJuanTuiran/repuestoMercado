import React from "react";


const WidgetShopByLocation = () => {
    return (
        <aside className="widget widget_shop widget_rating">
            <h3 className="widget-title tamañotextofiltro">Por ubicación</h3>
            <div className="widget__content tamañotextoextrellas">
                <div className="form-group">
                    <div className="ps-checkbox">
                        <input
                            className="form-control"
                            type="checkbox"
                            id="five-star"
                            name="five-star"
                        />
                        <label htmlFor="five-star">
                            <span className="ps-rating">
                                <a>Bogotá </a>
                            </span>
                            <span className="total">(17)</span>
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="ps-checkbox">
                        <input
                            className="form-control"
                            type="checkbox"
                            id="three-star"
                            name="three-star"
                        />
                        <label htmlFor="three-star">
                            <span className="ps-rating">
                                <a>Medellín </a>
                            </span>
                            <span className="total">(11)</span>
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="ps-checkbox">
                        <input
                            className="form-control"
                            type="checkbox"
                            id="four-star"
                            name="four-star"
                        />
                        <label htmlFor="four-star">
                            <span className="ps-rating">
                               <a>Santiago de cali </a>
                            </span>
                            <span className="total">(9)</span>
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="ps-checkbox">
                        <input
                            className="form-control"
                            type="checkbox"
                            id="two-star"
                            name="two-star"
                        />
                        <label htmlFor="two-star">
                            <span className="ps-rating">
                                <a>Barranquilla </a>
                            </span>
                            <span className="total">(3)</span>
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="ps-checkbox">
                        <input
                            className="form-control"
                            type="checkbox"
                            id="one-star"
                            name="one-star"
                        />
                        <label htmlFor="one-star">
                            <span className="ps-rating">
                                <a>Manizales</a>
                            </span>
                            <span className="total">(2)</span>
                        </label>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default WidgetShopByLocation;

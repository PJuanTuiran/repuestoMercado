import React from "react";
import conditions from "~/public/static/data/conditions.json";

const WidgetShopFilterConditions = () => {
    //Views
    const conditionsView = conditions.conditions.map((item, index) => (
        <div className="form-group" key={index}>
            <div className="ps-checkbox">
                <input
                    className="form-control"
                    type="checkbox"
                    id={index}
                    name={index}
                />
                <label htmlFor={index}>{item.text}</label>
            </div>
        </div>
    ));

    return (
        <aside className="mt-10 widget widget_shop widget_filter-by-brands">
            <h3 className="widget-title tamañotextofiltrosearch">Condición</h3>
            <div className="widget__content tamañotextoitemsfiltrosearch">{conditionsView}</div>
        </aside>
    );
};

export default WidgetShopFilterConditions;

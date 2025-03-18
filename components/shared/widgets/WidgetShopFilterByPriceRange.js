import React, { useState } from "react";
import { Slider, Checkbox } from "antd";
import { useRouter } from "next/router";

const WidgetShopFilterByPriceRange = () => {
    const Router = useRouter();
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(2500);

    function handleChangeRange(value) {
        setMin(value[0]);
        price_lt: value[1], setMax(value[1]);

        Router.push(`/shop?price_gt=${value[0]}&price_lt=${value[1]}`);
    }

    return (
        <aside className="widget widget_shop">
            <figure>
                <h4 className="widget-title tamañotextofiltro">Por Precio</h4>
                <Slider
                    range
                    defaultValue={[0, 2500]}
                    max={2500}
                    onAfterChange={(e) => handleChangeRange(e)}
                />
                <p className="tamañotextofiltro">
                   Precio: ${min} - $ {max}
                </p>
            </figure>
        </aside>
    );
};

export default WidgetShopFilterByPriceRange;

import React from "react";
import WidgetShopFilterByPriceRange from "~/components/shared/widgets/WidgetShopFilterByPriceRange";
import WidgetShopByRating from "~/components/shared/widgets/WidgetShopByRating";
import WidgetShopFilterByConditions from "~/components/shared/widgets/WidgetShopFilterByConditions";

const SidebarShopInteractive = () => {

    return (
        <div className="ps-sidebar--shop sizesidebarinteractive">
            <a className="mb-10 tamañotextofiltro textocolor">Filtros</a>
            <WidgetShopFilterByPriceRange />
            <WidgetShopFilterByConditions />
            <WidgetShopByRating />
        </div>
    );
};

export default SidebarShopInteractive;

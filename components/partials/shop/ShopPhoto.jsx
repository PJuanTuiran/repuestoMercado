import React from "react";
import ModuleShopActionsInteractivo from "~/components/partials/shop/modules/ModuleShopActionsInteractivo";
import CustomPagination from "~/components/elements/basic/CustomPagination";

const ShopPhoto = ({children, classes, fullwidth = false, actions = true }) => {
     
    let actionsView;
    if (actions) {
        actionsView = (
            <div className="ps-shop__header">
                <div className="container">
                    <ModuleShopActionsInteractivo />
                </div>
            </div>
        );
    }
    if (!fullwidth) {
        return (
            <div className={`ps-shop ${classes}`}>
                {actionsView}
                <div className="ps-shop__content">{children}</div>
                <div className="ps-shop__footer">
                    <CustomPagination />
                </div>
            </div>
        );
    } else {
        return (
            <div className={`ps-shop ${classes !== undefined ? classes : ""}`}>
                {actionsView}
                <div className="ps-shop__content">
                    <div className="container">{children}</div>
                    <div className="ps-shop__footer">
                        <CustomPagination />
                    </div>
                </div>
            </div>
        );
    }
};

export default ShopPhoto;

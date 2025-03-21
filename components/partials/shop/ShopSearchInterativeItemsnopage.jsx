import React from "react";
import ModuleShopActions from "~/components/partials/shop/modules/ModuleShopActions";
import CustomPaginationSearch from "../../elements/basic/CustomPaginationSearch";

const ShopSearchInterativeItemsNoPage = ({ children, classes, fullwidth = false, actions = true }) => {
    let actionsView;
    /*
    if (actions) {
        actionsView = (
            <div className="ps-shop__header">
                <div className="container">
                    <ModuleShopActions />
                </div>
            </div>
        );
    }
    */
    if (!fullwidth) {
        return (
            <div className={`ps-shop ${classes}`}>
                {actionsView}
                <div className="ps-shop__content">{children}</div>
                <div className="ps-shop__footer">
                   
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
                      
                    </div>
                </div>
            </div>
        );
    }
};

export default ShopSearchInterativeItemsNoPage;

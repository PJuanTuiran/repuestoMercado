import React from "react";
import { Drawer } from "antd";
import { connect, useDispatch } from "react-redux";
import { toggleDrawer } from "~/store/app/action";
import EcomerceMiniCart from "~/components/ecomerce/EcomerceMiniCart";

const DrawerPrimary = ({
    children,
    placement = "right",
    title = "Drawer",
    isDrawerShow,
}) => {
    const dispatch = useDispatch();

    function handleCloseDrawer(e) {
        e.preventDefault();
        //console.log("VALOR E : ", e)
        dispatch(toggleDrawer(false));
    }

    return(
        <h1>CAMBIO DRAWER</h1>
    )

    /*
    return (
        <Drawer
            className="ps-panel--mobile"
            placement="right"
            closable={false}
            placement={placement}
            width={400}
            onClose={(e) => handleCloseDrawer(e)}
            visible={isDrawerShow}>
            <div className="ps-drawer">
                <div className="ps-drawer__header">
                    <a
                        href="#"
                        className="ps-drawer__close"
                        onClick={(e) => handleCloseDrawer(e)}>
                        <i className="icon-cross"></i>
                    </a>
                </div>
                <div className="ps-drawer__wrapper">
                    <EcomerceMiniCart />
                </div>
            </div>
        </Drawer>
    );
    */
};
export default connect((state) => state.app)(DrawerPrimary);

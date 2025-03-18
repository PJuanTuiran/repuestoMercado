import React from "react";

const ModuleHeaderNotice = ({ classes }) => {
    return (
        <div className={`ps-noti header__notice ${classes}`}>
            <div className="container">
                <p className="m-0">
                    Debido a la epidemia de <strong>COVID 19</strong> los pedidos pueden procesarse con un ligero retraso.
                </p>
            </div>
            <a className="ps-noti__close">
                <i className="icon-cross"></i>
            </a>
        </div>
    );
};

export default ModuleHeaderNotice;

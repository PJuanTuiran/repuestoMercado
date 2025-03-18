import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUserMenuPrimary } from "../../../../store/usermenuprimary/action";
import { useDispatch} from "react-redux";

const ModuleHeaderHistorial = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [classVender, setClassVender] = useState(
        "header__categories-toggle sinborder"
    );

    const onSelecciono = () => {
        setClassVender("header__categories-toggle subrayartexto sinborder");
    };

    const outSelecciono = () => {
        setClassVender("header__categories-toggle sinborder");
    };

    const IrAhistorial = () => {
        dispatch(getUserMenuPrimary(false));
        router.push("/Historial/historialProducts");
    };
 
    return (
        <div className="header__supplies ps-dropdown--fullscreen">
            <button
                className={classVender}
                onMouseOver={onSelecciono}
                onMouseOut={outSelecciono}>
                <span onClick={() => IrAhistorial()}>Historial</span>
            </button>
        </div>
    );
};

export default ModuleHeaderHistorial;
 
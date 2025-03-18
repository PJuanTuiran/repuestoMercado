import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUserMenuPrimary } from "../../../../store/usermenuprimary/action";
import { useDispatch} from "react-redux";


const ModuleHeaderAyudaPQR = () => {
    const router = useRouter();
    const dispatch = useDispatch();
  
    const [classVender, setClassVender] = useState(
        "header__categories-toggle sinborder"
    );

    const onSelecciono = () => {
        setClassVender("header__categories-toggle subrayartexto sinborder");
    };

    const outSelecciono = () => {
        setClassVender("header__categories-toggle sinborder");
    };

    const IrADudas = () => {
        dispatch(getUserMenuPrimary(false));
        router.push("/ResolverDudas");
    };

    return (
        <div className="header__supplies ps-dropdown--fullscreen">
            <button
                className={classVender}
                onMouseOver={onSelecciono}
                onMouseOut={outSelecciono}>
                <span onClick={() => IrADudas()}>Ayuda/PQR</span>
            </button>
        </div>
    );
};

export default ModuleHeaderAyudaPQR;
 
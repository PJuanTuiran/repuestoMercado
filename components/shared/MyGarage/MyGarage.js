import React, { useState } from "react";

function MyGarage(props) {
    const [classGarage, setClassGarage] = useState("header__categories-toggle");

    const onSelecciono = () =>{
        setClassGarage("header__categories-toggle subrayartexto")
    }

    const outSelecciono = () =>{
        setClassGarage("header__categories-toggle")
    }

    return (
        <div className="header__supplies ps-dropdown--fullscreen">
             <button className={classGarage}
             onMouseOver={onSelecciono}
             onMouseOut={outSelecciono}
             >
                <span >Garage </span>
            </button>
        </div>
    );
}

export default MyGarage;
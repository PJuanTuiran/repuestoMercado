import React, { useEffect, useState, useRef } from "react";
//import ModuleHeaderContactNumber from "~/components/shared/headers/modules/ModuleHeaderContactNumber";
import ModuleHeaderCategories from "~/components/shared/headers/modules/ModuleHeaderCategories";
import ModuleHeaderSupplies from "~/components/shared/headers/modules/ModuleHeaderSupplies";
import ModuleHeaderVender from "~/components/shared/headers/modules/ModuleHeaderVender";
import MainMenuRepository from "~/repositories/MainMenuRepository";
import menu from "~/public/static/data/menu.json";
import InteractiveShopping from "../InteractiveShopping/InteractiveShopping";
import { useDispatch, useSelector } from "react-redux";
//import ModuleHeaderSwichers from "~/components/shared/headers/modules/ModuleHeaderSwitcher";
import ModuleHeaderActions from "~/components/shared/headers/modules/ModuleHeaderActions";
import ModuleHeaderHistorial from "../headers/modules/ModuleHeaderHistorial";
import ModuleHeaderAyudaPQR from "../headers/modules/ModuleHeaderAyudaPQR";
import { getFilterGarage } from "../../../store/filtergarage/action";
import { getFiltroOrderByPrd } from "../../../store/filtroorderbyprd/action";

const NavigationPrimary = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    // Seteamos la variable para iniciar o reiniciar el UseEffect
    const [stateInf, setStateInf] = useState(Math.random());
    // Declaramos el Setter para los tipos de Vehiculos
    const [mainMenu, setMainMenu] = useState(menu.main_menu);
    //console.log("MAIN MENU : ",menu.main_menu)
    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    // Lee de la base de datos de los tipos de Vehiculos desde la Base de Datos

    const opencategorias = useSelector((state) => state.ctlrinput.viewcategorias);

    useEffect(() => {
        let queries;
        async function getMainMenu(dat) {
            const MenuPrincipal = await MainMenuRepository?.getMainMenu(0);
            //console.log("DATOS MENU BD : ", MenuPrincipal[0])
            //console.log("DATOS JSON : ", menu.main_menu)
            setMainMenu(MenuPrincipal[0]?.main_menu);
            setTimeout(function () {
                setLoading(false);
            }, 200);
        }
        getMainMenu(queries);
    }, [stateInf]);
    //<ModuleHeaderCategories categorias={categorias} setCategorias={setCategorias} />
    //<ModuleHeaderSupplies />

    const handleClick = (event) => {
        localStorage.setItem("ctrlposicionprd", JSON.stringify(0));
        localStorage.setItem("orderbyprd", JSON.stringify(0));
        localStorage.setItem("textoorderbyprd", JSON.stringify("Ordenar por"));
        dispatch(getFiltroOrderByPrd(0));
        dispatch(getFilterGarage(false));
    };

    return (
        <nav className="navigation--primary ">
            {
                // <div className="container ">
            }
            <div className="container" onClick={() => handleClick()}>
                <div className="navigation__left posicion">
                    <ModuleHeaderSupplies
                        opencategorias={opencategorias}
                    />
                    <InteractiveShopping />
                    <ModuleHeaderVender />
                    <ModuleHeaderHistorial />
                    <ModuleHeaderAyudaPQR />
                </div>
                <div className="navigation__right">
                    <ModuleHeaderActions />
                </div>
            </div>
        </nav>
    );
};
//  <ModuleHeaderContactNumber />
//<ModuleHeaderSwichers/>
export default NavigationPrimary;

import React, { useEffect, useState } from "react";
import MegaMenu from "~/components/elements/menu/MegaMenu_vertical";
import menu from "~/public/static/data/menu.json";
import ModuleHeaderPartners from "~/components/shared/headers/modules/ModuleHeaderPartners";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../../store/categories/action";
import CategoryRepository from "~/repositories/CategoryRepository";
import MegaMenuVert from "~/components/elements/menu/CategoryMenu";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";

const ModuleHeaderCategories = (props) => {
    const { categorias, setCategorias } = props;
    console.log("CATEGOPRIAS HEADER : ", categorias);

    const router = useRouter();
    // Inicializamos el arrego de Categorias con valores por defecto, para dejarlo en nulo
    //const [SPCategoria, setSPCategoria] = useState(menu.header_categories_menu);
    const categories = useSelector((state) => state.categories.categories);
    // Disparar procedimiento que lee Categorias
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [mostrarCategorias, setMostrarCategorias] = useState(false);

    // Lee de la base de datos la tabla categorias
    useEffect(() => {
        async function leeCategorias(dat) {
            // Lee la función creada en repositories - CategoryRepository
            const Categories = await CategoryRepository.getCategory(0);
            // Coloca los datos en state arreglo de categorias
            dispatch(getCategories(Categories));
        }
        leeCategorias(0);
    }, []);

    const verCategorias = () => {
        setMostrarCategorias(!mostrarCategorias);
        setShowModal(true);
        setCategorias(true);
        //router.push("/#punto");
    };

    return (
        <div className="header__categories ps-dropdown--fullscreen" >
            <div>
                {
                //className="ps-dropdown__content"
                }
                <button className="header__categories-toggle">
                    <i className="fa fa-bars"></i>
                    <span onClick={verCategorias}>
                        <span>Categorías</span><IoIosArrowForward />
                    </span>
                </button>
                <div className="container">
                    {mostrarCategorias ? (
                        <MegaMenuVert
                            setShowModal={setShowModal}
                            showModal={showModal}
                            showCategorias={categorias} 
                            setShowCategorias={setCategorias}
                        />
                    ) : (
                        console.log("CATEGORIAS : FALSE")
                    )}
                    {/*
                    <MegaMenu
                        source={categories[0]}
                        onlyItems={true}
                        classes="menu--mega with-6-columns"
                    />
                    <ModuleHeaderPartners /> */}
                </div>
            </div>
        </div>
    );
};

export default ModuleHeaderCategories;

import React, { useEffect, useState } from "react";
import menu from "~/public/static/data/menu.json";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getHomePages } from "../../../../store/homepages/action";
import HomePageRepository from "~/repositories/HomePageRepository";

const DemoItem = ({ source }) => (
    <div className="ps-block__item">
        <div className="ps-block__wrapper">
            <div className="ps-block__thumbnail">
                <img src={source.image} alt={source.text} />
                <Link href={source.url}>
                    <a className="ps-block__overlay" />
                </Link>
            </div>
            <Link href={source.url}>
                <a className="ps-block__text">{source.text}</a>
            </Link>
        </div>
    </div>
);

const ModuleMenuHomepages = () => {
    const [readHomePages, setReadHomePages] = useState([]);
    const [actualiza, setActualiza] = useState(false);
    // Inicializamos el arrego de Categorias con valores por defecto, para dejarlo en nullo
    const homepages = useSelector((state) => state.homepages.homepages);
    // Disparar procedimiento que lee Categorias
    const dispatch = useDispatch();
    //console.log("HOME PAGES ESATE : ", homepages)
    
    const datosgenerales = useSelector(
        (state) => state.datosgenerales.datosgenerales
    );

    const data = datosgenerales[0];
    //console.log("DATOS GENERALES : ", data && data.vgl_pagedemos);
    
    useEffect(() => {    
        //localStorage.setItem('datosgenerales', JSON.stringify(datosgenerales[0]));
        if(data && data.vgl_pagedemos){
            setReadHomePages(datosgenerales[0].vgl_pagedemos);
        }
    }, []);

    // Lee de la base de datos las paginas para navegar desde el menu inicial
    useEffect(() => {
        async function leeHomePages(dat) {
            // Lee la función creada en repositories - CategoryRepository
            const HomePages = await HomePageRepository.getHomePage(0);
            //console.log("LEE HOME PAGES : ", HomePages);

            // Coloca los datos en state arreglo de categorias
            dispatch(getHomePages(HomePages));
        }
        leeHomePages(0);
    }, []);

    //const items = homepages[0] && homepages[0].homepage_demos.map((item) => {
    const items = readHomePages && readHomePages.map((item) => {
        return <DemoItem source={item} key={item.id} />;
    });
    return <div className="ps-block--menu-demos">{items}</div>;
};

export default ModuleMenuHomepages;

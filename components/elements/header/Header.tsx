import Image from "next/image";
import { createContext, useEffect, useRef, useState, createRef } from "react";
import styled from "styled-components";
import { Filter, SavedVehicle } from "~/types/Filter";
import { Themes } from "~/utilities/StyleVariables";
import Searcher from "./modules/Searcher";
import { getAllFilters } from "./core/fetch";
import { FilterContext } from "./FilterWrapper";
import FilterWrapper from "./FilterWrapper";
import { FiltersContext } from "./contexts/FiltersSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import UpArrowIcon from "./svgs/UpArrowIcon";
import { closeWindow } from "./utils/functions";
import axios from "axios";
import { URL_BD_MR } from "../../../helpers/Constants"; //Api
import EnviarA from "./modules/EnviarA";
import { getFilterGarage } from "../../../store/filtergarage/action";
import { Carousel } from "react-bootstrap";
import { getCtlrInput } from "~/store/ctlrinput/action";

interface Props {
    slim?: boolean;
}

const Header = ({ slim }: Props) => {
    const dispatch = useDispatch();
    const searcherButton = useRef<HTMLButtonElement>(null);
    const vehicleFilter = useRef<HTMLDivElement>(null);

    const { logged: user, uid: id } = useSelector(
        (store: any) => store.userlogged.userlogged
    );
    // Función para obtener el mensaje de bienvenida
    const [mensajeBienvenida, setMensajeBienvenida] = useState([]);
    const [vehicle, setVehicle] = useState<SavedVehicle | null>(null);
    const [filters, setFilters] = useState<Filter | null>(null);
    const [hideContent, setHideContent] = useState<boolean>(true);
    const [mostrar, setMostrar] = useState<boolean>(true);

    const Header = createRef<HTMLHeadingElement>();

    const [buttonContent, setButtonContent] = useState("Agrega tu vehículo");

    const filtergarage = useSelector(
        (state: any) => state.filtergarage.filtergarage
    );
    const callFilters = async () => {
        const { data } = await getAllFilters();
        setFilters(data);
        setHideContent(false);
    };

    useEffect(() => {
        if (searcherButton.current && vehicleFilter.current && filters) {
            searcherButton.current.onclick = () => {
                vehicleFilter.current?.classList.remove("hidden");
            };

            const main = document.querySelector("main");

            if (main) {
                main.onclick = () => closeWindow();
            }
        }
    }, [filters]);

    useEffect(() => {
        let mensajesbienvenida = JSON.parse(
            localStorage.getItem("mensajesbienvenida")
        );

        let newdat = [];
        mensajesbienvenida &&
            mensajesbienvenida.map((row, index) => {
                newdat.push(row.mensaje);
            });
        setMensajeBienvenida(newdat);
    }, []);

    const iniciarInputBuscador = () => {
        let item = {
            menorprecio: 1,
            mayorprecio: 10000000,
        };

        localStorage.setItem("posicionprd", JSON.stringify(0));
        localStorage.setItem("rangoprecios", JSON.stringify(item));
        localStorage.removeItem("dataWords");
        localStorage.setItem("filtrocondicionprd", JSON.stringify(0));
        localStorage.setItem("filtrociudadprd", JSON.stringify([]));
        localStorage.setItem("filtroprecioprd", JSON.stringify([]));
        //localStorage.setItem("idvehgarage", JSON.stringify(-1));

        localStorage.setItem("ctrlposicionprd", JSON.stringify(0));
        let inicia = null;
        localStorage.setItem("inputdata", JSON.stringify(null));
        localStorage.setItem("placeholdersearch", JSON.stringify(inicia));
    };

    const reiniciarGaraje = () => {
        dispatch(getFilterGarage(true));
        setMostrar(true);
        callFilters();
    };

    useEffect(() => {
        if (!filtergarage) setFilters(null);
        callFilters();
    }, [mostrar, filtergarage]);

    const handleClick = () => {
        dispatch(getCtlrInput(false));
    };


    return (
        <CloseWindowContext.Provider value={closeWindow}>
            <div>
                <Carousel slide={false} nextLabel="" prevLabel=""
                    nextIcon=""
                    prevIcon=""
                >
                    {mensajeBienvenida.map((texto, index) => (
                        <Carousel.Item key={index} interval={3000}>
                            <p className="CarruselLetras">{texto}</p>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            <Container slim={slim} className="base-styles-provider">
                <header ref={Header}>
                    <div className="top-side"
                        onClick={() => handleClick()}
                    >
                        {!slim && (
                            <Link href="/">
                                <a className="image-container">
                                    <Image
                                        priority
                                        src="/static/img/logomr.png"
                                        alt="logo mercado repuesto"
                                        onClick={() => iniciarInputBuscador()}
                                        layout="fill"
                                        sizes="100%"
                                        objectFit="contain"
                                    />
                                </a>
                            </Link>
                        )}
                        <div onClick={() => reiniciarGaraje()}>
                            <Searcher
                                loading={!filters}
                                vehicle={vehicle}
                                content={buttonContent}
                                ref={searcherButton}
                            />
                        </div>

                        <EnviarA />
                    </div>

                    <div className="filter-container">
                        {filters ? (
                            <FiltersContext.Provider value={filters}>
                                <FilterWrapper
                                    setVehicle={setVehicle}
                                    setContent={setButtonContent}
                                    ref={vehicleFilter}
                                    setMostrar={setMostrar}
                                />
                            </FiltersContext.Provider>
                        ) : (
                            ""
                        )}
                    </div>
                </header>
            </Container>
        </CloseWindowContext.Provider>
    );
};

export default Header;

export const CloseWindowContext = createContext({} as () => void);

interface ContainerProps {
    slim?: boolean;
}

const Container = styled.div<ContainerProps>`
    width: 100%;
    z-index: 999;

    * {
        outline: none !important;
    }

    header {
        position: relative;
        margin: auto;
        max-width: ${Themes.xl};

        .top-side {
            padding: 1rem;

            @media (min-width: ${Themes.lg}) {
                align-items: center;
                display: grid;
                ${({ slim }) =>
        !slim ? "grid-template-columns: 20% 60% 20%;" : ""}
            }

            .image-container {
                position: relative;
                margin-bottom: 0.5rem;
                aspect-ratio: 3/1;
                width: 50%;

                @media (min-width: ${Themes.sm}) {
                    margin-bottom: 1rem;
                    width: 33%;
                }

                @media (min-width: ${Themes.lg}) {
                    margin: 0;
                    margin-right: 4rem;
                    width: auto;
                }
            }
        }

        .filter-container {
            position: relative;
            margin: 0 1rem;
        }
    }
`;

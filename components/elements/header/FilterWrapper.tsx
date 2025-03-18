/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    createContext,
    forwardRef,
    useContext,
    useEffect,
    useState,
} from "react";
import styled from "styled-components";
import axios from "axios";
import { CloseWindowContext } from "./Header";
import { FetchedVehicle, Filter as FilterTypes } from "~/types/Filter";
import { useSelector, useDispatch } from "react-redux";
import ConfirmationModal from "./modules/ConfirmationModal";
import ModalWarning from "./modules/ModalWarning";
import CloseIcon from "./svgs/CloseIcon";
import Filter from "./modules/Filter";
import Select from "./modules/Select";
import Deleting from "./modules/Deleting";
import Warning from "./modules/Warning";
import Edit from "./modules/Edit";
import { Themes } from "~/utilities/StyleVariables";
import { FiltersContext } from "./contexts/FiltersSlice";
import { findVehiclesByUserId } from "./core/fetch";
import UpArrowIcon from "./svgs/UpArrowIcon";
import { getFilterGarage } from "../../../store/filtergarage/action";

export enum state {
    Filter,
    Delete,
    Select,
    Warning,
    None,
    Edit,
}

export interface Vehicle {
    type: string;
    brand: string;
    body: string;
    fuel: string;
    transmision: string;
    traction: string;
    cilinder: string;
    year: string;
    model: string;
}

export interface SavedVehicle extends Vehicle {
    id?: number;
    ids: Vehicle;
}

export const DeletingContext = createContext<any>(null);
export const FilterContext = createContext<any>(null);
export const SelectedContext = createContext<any>(null);
export const EditingContext = createContext<any>(null);
export const DuplicatedContext = createContext<any>(null);

export enum keys {
    guest,
    user,
}

export let key = keys.guest.toString();

interface Props {
    setMostrar: React.Dispatch<React.SetStateAction<boolean>>;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    setVehicle: React.Dispatch<React.SetStateAction<SavedVehicle | null>>;
}

const transmisiones = [
    { id: 1, label: "Automática" },
    { id: 2, label: "Manual" },
];

const combustibles = [
    { id: 1, label: "Gasolina" },
    { id: 2, label: "Diesel" },
    { id: 3, label: "Gasolina - Gas" },
    { id: 4, label: "Gasolina - Electrico" },
];

const tracciones = [
    { id: 1, label: "Tracción Delantera" },
    { id: 2, label: "Tracción Trasera" },
    { id: 3, label: "Tracción 4x4" },
];

const VehicleWrapper = forwardRef<HTMLDivElement, Props>(
    ({ setContent, setVehicle, setMostrar }, ref) => {
        const [view, setView] = useState<state>();
        const [deleting, setDeleting] = useState<null | number>(null);
        const [editing, setEditing] = useState<null | number>(null);

        const dispatch = useDispatch();

        const [selected, setSelected] = useState<null | number>(null);
        const [vehicles, setVehicles] = useState<SavedVehicle[] | null>(null);
        const [isDuplicated, setIsDuplicated] = useState<boolean>(false);
        const [isLeaving, setIsLeaving] = useState<boolean>(false);
        const filter = useContext(FiltersContext);
        const itemselectgarage = useSelector(
            (state: any) => state.itemselectgarage.itemselectgarage
        );

        const { logged: user, uid: id } = useSelector(
            (store: any) => store.userlogged.userlogged
        );

        const onClose = async () => {
            dispatch(getFilterGarage(false));
            setMostrar(false);
            closeWindow();
        };

        const closeWindow = useContext(CloseWindowContext);

        const searchVehiclesLocal = async () => {
            if (user) {
                const { data: $vehicles }: { data: FetchedVehicle[] } =
                    await findVehiclesByUserId(id);

                const formattedVehicles: SavedVehicle[] = $vehicles.map(
                    (v) => ({
                        id: v.id,

                        type:
                            filter.vgl_tiposvehiculos.find(
                                (el) => el.id === v.tipovehiculo
                            )?.label ?? "indefinido",

                        brand:
                            filter.vgl_marcasvehiculos.find(
                                (el) => el.id === v.marca
                            )?.label ?? "indefinido",

                        body:
                            filter.vgl_carroceriasvehiculos.find(
                                (el) => el.id === v.carroceria
                            )?.label ?? "indefinido",

                        fuel:
                            combustibles.find(
                                (el) => el.id === v.tipocombustible
                            )?.label ?? "indefinido",

                        traction:
                            tracciones.find((el) => el.id === v.tipotraccion)
                                ?.label ?? "indefinido",

                        transmision:
                            transmisiones.find((el) => el.id === v.transmision)
                                ?.label ?? "indefinido",

                        cilinder:
                            filter.vgl_cilindrajesvehiculos.find(
                                (el) => el.id === v.cilindrajemotor
                            )?.label ?? "indefinido",

                        year:
                            filter.vgl_annosvehiculos.find(
                                (el) => el.id === v.anno
                            )?.label ?? "indefinido",

                        model:
                            filter.vgl_modelosvehiculos.find(
                                (el) => el.id == v.modelo
                            )?.label ?? "indefinido",
                        ids: {
                            body: v.carroceria.toString(),
                            brand: v.marca.toString(),
                            cilinder: v.cilindrajemotor.toString(),
                            fuel: v.tipocombustible.toString(),
                            model: v.modelo.toString(),
                            traction: v.tipotraccion?.toString() ?? "",
                            transmision: v.transmision?.toString() ?? "",
                            type: v.tipovehiculo.toString(),
                            year: v.anno.toString(),
                        },
                    })
                );

                setVehicles(formattedVehicles);
                if (formattedVehicles.length > 0) {
                    if (selected && selected === -1) {
                        setSelected(
                            formattedVehicles.sort((a, b) => a.id - b.id).at(-1)
                                .id
                        );
                    } else if (selected < 0) {
                        setSelected(selected * -1);
                    }
                }

                return;
            } else {
                let vehicles: string | SavedVehicle[] | null =
                    localStorage.getItem(key);
                if (vehicles) {
                    vehicles = JSON.parse(vehicles);
                    setVehicles(vehicles as SavedVehicle[]);
                    return;
                }
            }

            setVehicles([]);
        };

        useEffect(() => {
            if (!user) {
                searchVehiclesLocal();
            }

            key = user ? keys.user.toString() : keys.guest.toString();
            setView(undefined);
            setSelected(null);
            setEditing(null);
        }, [user]);

        useEffect(() => {
            view === undefined && setView(state.Select);
        }, [view]);

        useEffect(() => {
            let vehicle;
            if (user) {
                vehicle = vehicles?.find((v) => v.id === selected);
            } else {
                const string = localStorage.getItem(key);
                vehicle = string
                    ? (JSON.parse(string) as SavedVehicle[])[selected ?? 0]
                    : null;
            }

            setVehicle(selected !== null ? (vehicle as SavedVehicle) : null);

            let selectvehgarage = JSON.parse(
                localStorage.getItem("selectvehgarage")
            );
            //if (!selected || selected === 0 || !vehicle || vehicle.length == 0)
            //console.log("VEHICLE : ", selectvehgarage);
            vehicle = selectvehgarage;

            setContent(
                (selected !== null || selected === 0) && vehicle
                    ? `${vehicle.brand}, ${vehicle.model}, ${vehicle.year}, ${
                          vehicle.cilinder
                      }, ${vehicle.fuel}${
                          vehicle.traction && vehicle.traction !== "indefinido"
                              ? ", " + vehicle.traction
                              : ""
                      }${
                          vehicle.transmision &&
                          vehicle.transmision !== "indefinido"
                              ? ", " + vehicle.transmision
                              : ""
                      }`
                    : selectvehgarage
                    ? `${selectvehgarage.brand}, ${selectvehgarage.model}, ${
                          selectvehgarage.year
                      }, ${selectvehgarage.cilinder}, ${selectvehgarage.fuel}${
                          selectvehgarage.traction &&
                          selectvehgarage.traction !== "indefinido"
                              ? ", " + selectvehgarage.traction
                              : ""
                      }${
                          selectvehgarage.transmision &&
                          selectvehgarage.transmision !== "indefinido"
                              ? ", " + selectvehgarage.transmision
                              : ""
                      }`
                    : "Agrega tu vehículo"
            );
        }, [selected, itemselectgarage]);

        /*
`${selectvehgarage.brand}, ${selectvehgarage.model}, ${selectvehgarage.year}, ${
                        selectvehgarage.cilinder
                    }, ${selectvehgarage.fuel}${
                        selectvehgarage.traction && selectvehgarage.traction !== "indefinido"
                            ? ", " + selectvehgarage.traction
                            : ""
                    }${
                        selectvehgarage.transmision &&
                        selectvehgarage.transmision !== "indefinido"
                            ? ", " + selectvehgarage.transmision
                            : ""
                    }`
        */

        useEffect(() => {
            searchVehiclesLocal();
        }, [editing, view, user]);

        return (
            <>
                <FilterContext.Provider value={{ view, setView }}>
                    <DuplicatedContext.Provider value={setIsDuplicated}>
                        <Container
                            id="filter-wrapper"
                            className="hidden"
                            ref={ref}>
                            <div className="up-arrow-container">
                                <UpArrowIcon />
                            </div>
                            {isLeaving && (
                                <ConfirmationModal
                                    setIsLeaving={setIsLeaving}
                                />
                            )}
                            {isDuplicated && <ModalWarning />}
                            <div
                                onClick={onClose}
                                className="close-icon-container ">
                                <CloseIcon />
                            </div>
                            <SelectedContext.Provider
                                value={{ selected, setSelected }}>
                                <DeletingContext.Provider
                                    value={{ deleting, setDeleting }}>
                                    <EditingContext.Provider
                                        value={{ editing, setEditing }}>
                                        {vehicles &&
                                            (view === state.Filter ? (
                                                <Filter
                                                    vehicles={vehicles}
                                                    setIsLeaving={setIsLeaving}
                                                    isLeaving={isLeaving}
                                                />
                                            ) : view === state.Select ? (
                                                <Select vehicles={vehicles} />
                                            ) : view === state.Delete ? (
                                                <Deleting vehicles={vehicles} />
                                            ) : view === state.Warning ? (
                                                <Warning />
                                            ) : (
                                                <>
                                                    {editing !== null && (
                                                        <Edit
                                                            vehicles={vehicles}
                                                            setIsLeaving={
                                                                setIsLeaving
                                                            }
                                                            isLeaving={
                                                                isLeaving
                                                            }
                                                        />
                                                    )}
                                                </>
                                            ))}
                                    </EditingContext.Provider>
                                </DeletingContext.Provider>
                            </SelectedContext.Provider>
                        </Container>
                    </DuplicatedContext.Provider>
                </FilterContext.Provider>
            </>
        );
    }
);

VehicleWrapper.displayName = "VehicleFilter";

export default VehicleWrapper;

const Container = styled.div`
    background-color: ${Themes.lightMain};
    border-radius: 0.75rem;
    color: ${Themes.main};
    margin-top: 0.25rem;
    /* overflow: hidden; */
    padding: 1rem;
    position: absolute;
    transition: 0.2s;
    /* translate: 0 -1rem; */
    width: 100%;
    display: grid;
    z-index: 10;
    padding: 1rem;

    &.hidden {
        display: none;
    }

    .close-icon-container {
        cursor: pointer;
        height: 1.5rem;
        margin-right: 1rem;
        position: absolute;
        right: 0;
        width: 1.5rem;

        svg {
            fill: ${Themes.main};
            margin-top: 0.75rem;
            width: 100%;
        }
    }

    .up-arrow-container {
        position: absolute;
        bottom: 100%;
        left: 2.4rem;
        width: 2rem;
        /* aspect-ratio: 1/1; */
        /* height: 2rem; */

        svg {
            width: 100%;
            fill: ${Themes.lightMain};
            height: 100%;
            position: relative;
        }
    }

    @media screen and (min-width: ${Themes.lg}) {
        right: 0;
        /* translate: 0 -1.3rem; */
        padding: 2rem;
    }

    @media screen and (min-width: 1200px) {
        width: 60%;
        margin-right: 20%;
    }
`;

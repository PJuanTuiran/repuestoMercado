/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useMemo, useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { idText } from "typescript";
import { FormattedVehicle } from "~/types/Filter";
import { Themes } from "~/utilities/StyleVariables";
import { FiltersContext } from "../contexts/FiltersSlice";
import { submitVehicle } from "../core/fetch";
import {
    DuplicatedContext,
    FilterContext,
    key,
    SavedVehicle,
    SelectedContext,
    state,
} from "../FilterWrapper";
import { highlightEmptySelects } from "../utils/functions";
import Button from "./Button";
import CustomSelect from "./CustomSelect";
import { getSelectItem } from "../../../../store/selectitem/action";

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

interface Props {
    setIsLeaving: React.Dispatch<React.SetStateAction<boolean>>;
    vehicles: SavedVehicle[];
    isLeaving: boolean;
}

const Filter = ({ vehicles, setIsLeaving, isLeaving }: Props) => {
    const filter = useContext(FiltersContext);
    const dispatch = useDispatch();
    const { setView } = useContext(FilterContext);
    const { setSelected } = useContext(SelectedContext);
    const setDuplicate = useContext(DuplicatedContext);
    const { logged: user, uid: id } = useSelector(
        (store: any) => store.userlogged.userlogged
    );

    const [isLoading, setIsLoading] = useState(false);

    const [type, setType] = useState<string | null>(null);
    const [brand, setBrand] = useState<string | null>(null);
    const [body, setBody] = useState<string | null>(null);
    const [fuel, setFuel] = useState<string | null>(null);
    const [transmision, setTransmision] = useState<string | null>(null);
    const [traction, setTraction] = useState<string | null>(null);
    const [cilinder, setCilinder] = useState<string | null>(null);
    const [year, setYear] = useState<string | null>(null);
    const [model, setModel] = useState<string | null>(null);

    const [isValid, setIsValid] = useState<Boolean>(false);

    const motorbikeSelected = useMemo(
        () =>
            parseInt(type ?? "") ===
            filter.vgl_tiposvehiculos.find(
                (type) => type.label.toLowerCase() === "motos"
            )?.id,
        [type]
    );

    {
        console.log("TYPEXXX : ", type)
    }

    const electricSelected = useMemo(
        () =>
            parseInt(type ?? "") ===
            filter.vgl_tiposvehiculos.find(
                (type) => type.label.toLowerCase() === "eléctricos"
            )?.id,
        [type]
    );

    const truckSelected = useMemo(
        () =>
            parseInt(type ?? "") ===
            filter.vgl_tiposvehiculos.find(
                (type) => type.label.toLowerCase() === "camiones"
            )?.id,
        [type]
    );

    const vanSelected = useMemo(
        () =>
            parseInt(type ?? "") ===
            filter.vgl_tiposvehiculos.find(
                (type) => type.label.toLowerCase() === "buses y vans"
            )?.id,
        [type]
    );

    const uploadVehicle = async () => {
        
        if (!isValid && !truckSelected) {
            alert("ffff")
            alert(truckSelected)
            highlightEmptySelects(
                motorbikeSelected,
                electricSelected,
                truckSelected,
                vanSelected
            );
            return;
        }

        const saved = [...vehicles];

        const newVehicle = {
            type: filter.vgl_tiposvehiculos.find(
                (el) => el.id === parseInt(type ?? "")
            )?.label,

            brand: filter.vgl_marcasvehiculos.find(
                (el) => el.id === parseInt(brand ?? "")
            )?.label,

            body: filter.vgl_carroceriasvehiculos.find(
                (el) => el.id === parseInt(body ?? "")
            )?.label,

            fuel: combustibles.find((el) => el.id === parseInt(fuel ?? ""))
                ?.label,

            traction: tracciones.find(
                (el) => el.id === parseInt(traction ?? "")
            )?.label,

            transmision: transmisiones.find(
                (el) => el.id === parseInt(transmision ?? "")
            )?.label,

            cilinder: filter.vgl_cilindrajesvehiculos.find(
                (el) => el.id === parseInt(cilinder ?? "")
            )?.label,

            year: filter.vgl_annosvehiculos.find(
                (el) => el.id === parseInt(year ?? "")
            )?.label,

            model: filter.vgl_modelosvehiculos.find(
                (el) => el.id === parseInt(model ?? "")
            )?.label,

            ids: {
                body,
                brand,
                cilinder,
                fuel,
                model,
                traction,
                transmision,
                type,
                year,
            },
        } as SavedVehicle;

        let duplicate = false;

        vehicles.forEach((vehicle) => {
            const rotationKeys = Object.values(vehicle.ids);
            const newVehicleKeys = Object.values(newVehicle.ids);

            let equals = true;

            rotationKeys.forEach((rK, i) => {
                (rK === "" ? null : rK) != newVehicleKeys[i]
                    ? (equals = false)
                    : 0;
            });

            equals ? (duplicate = true) : 0;
        });

        if (duplicate) {
            setDuplicate(true);
            return;
        }

        setIsLoading(true);

        if (user) {
            const formattedVehicle: FormattedVehicle = {
                anno: parseInt(newVehicle.ids.year),
                carroceria: parseInt(newVehicle.ids.body),
                cilindrajemotor: newVehicle.ids.cilinder ? parseInt(newVehicle.ids.cilinder) : 0,
                comentario: "Vehículo agregado desde el filtro de busqueda",
                estado: 1,
                idusuario: id,
                marca: parseInt(newVehicle.ids.brand),
                modelo: parseInt(newVehicle.ids.model),
                tipocombustible: newVehicle.ids.fuel ? parseInt(newVehicle.ids.fuel) : 2,
                tipotraccion: ((val) => (val ? parseInt(val) : null))(
                    newVehicle.ids.traction
                ),
                tipovehiculo: parseInt(newVehicle.ids.type),
                transmision: ((val) => (val ? parseInt(val) : null))(
                    newVehicle.ids.transmision
                ),
            };
            await submitVehicle(formattedVehicle);
            localStorage.setItem("selectvehgarage", JSON.stringify(newVehicle));

            dispatch(getSelectItem(2));
            setSelected(-1);
        } else {
            saved.push(newVehicle);
            localStorage.setItem(key, JSON.stringify(saved));
            setSelected(vehicles.length);
            dispatch(getSelectItem(2));
        }
        setView(state.Select);
    };

    useEffect(() => {
        if (type == "1") {

        }
    }, [])

    useEffect(() => {
        if (isLeaving) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [isLeaving]);

    useEffect(() => {
        setBody(null);

        if (electricSelected) {
            setTransmision(null);
        } else if (motorbikeSelected || vanSelected) {
            setTraction(null);
        } else if (truckSelected) {
            setTransmision(null);
            setTraction(null);
        }
    }, [type]);

    useEffect(() => {
        setBrand(null);
    }, [body]);

    useEffect(() => {
        setModel(null);
    }, [brand]);

    useEffect(() => {
        setCilinder(null);
    }, [model]);

    useEffect(() => {
        setIsValid(() => {
            if (type && body && brand && year) {
                if (
                    traction ||
                    (!traction &&
                        (motorbikeSelected || truckSelected || vanSelected))
                ) {
                    if (model && cilinder && fuel) {
                        if (
                            transmision ||
                            (!transmision &&
                                (electricSelected || truckSelected))
                        ) {
                            return true;
                        }
                    }
                }
            }
            return false;
        });
    }, [type, brand, body, fuel, transmision, traction, cilinder, year, model]);

    return (
        <Container>
            <div className="top">
                <p>Agregar tu vehículo para filtrar tu busqueda</p>
            </div>
            <div className="filters-container">
                <div className="selects-rows row-1">
                    <CustomSelect
                        defaultValue={"Tipo vehículo"}
                        value={type}
                        setIdSelected={setType}
                        options={filter.vgl_tiposvehiculos}
                    />
                    <CustomSelect
                        disabled={!type}
                        defaultValue="Carrocería"
                        value={body}
                        setIdSelected={setBody}
                        options={
                            type
                                ? filter.vgl_carroceriasvehiculos.filter(
                                    (body) =>
                                        body.tipovehiculo === parseInt(type)
                                )
                                : []
                        }
                    />
                    <CustomSelect
                        disabled={!body}
                        defaultValue="Marca"
                        value={brand}
                        setIdSelected={setBrand}
                        options={
                            type && body
                                ? filter.vgl_marcasvehiculos.filter(
                                    (brand) =>
                                        brand.tipovehiculo ===
                                        parseInt(type) &&
                                        brand.carroceria === parseInt(body)
                                )
                                : []
                        }
                    />
                    <CustomSelect
                        defaultValue="Año"
                        disabled={!brand}
                        value={year}
                        setIdSelected={setYear}
                        options={filter.vgl_annosvehiculos}
                    />
                    <CustomSelect
                        disabled={!brand || !year}
                        defaultValue="Modelo"
                        value={model}
                        setIdSelected={setModel}
                        options={
                            brand && body
                                ? filter.vgl_modelosvehiculos.filter(
                                    (model) =>
                                        model.marca === parseInt(brand) &&
                                        model.carroceria === parseInt(body)
                                )
                                : []
                        }
                    />
                </div>
                <div className="selects-rows row-2">
                    <CustomSelect
                        disabled={!model}
                        defaultValue="Cilindraje"
                        value={cilinder}
                        setIdSelected={setCilinder}
                        options={
                            model
                                ? filter.vgl_cilindrajesvehiculos.filter(
                                    (cilinder) =>
                                        cilinder.modelo === parseInt(model)
                                )
                                : []
                        }
                    />
                    {
                        type == "3" || type == "5"?
                            null
                            :

                            <CustomSelect
                                defaultValue="Combustible"
                                disabled={!cilinder}
                                value={fuel}
                                setIdSelected={setFuel}
                                options={combustibles}
                            />
                    }
                    {
                        type == "3" || type == "5" ?
                            null
                            :
                            <CustomSelect
                                disabled={electricSelected || truckSelected || !fuel}
                                defaultValue="Transmisión"
                                value={transmision}
                                setIdSelected={setTransmision}
                                options={!electricSelected ? transmisiones : []}
                            />
                    }
                    {
                        type == "1" || type == "3" || type == "5" || type == "6" ?
                            null
                            :
                            <CustomSelect
                                disabled={
                                    (!fuel || (motorbikeSelected ||
                                        truckSelected ||
                                        vanSelected) ||
                                        (!electricSelected && !transmision))
                                }
                                defaultValue="Tracción"
                                value={traction}
                                setIdSelected={setTraction}
                                options={!motorbikeSelected ? tracciones : []}
                            />
                    }

                </div>

                <div className="buttons-container">
                    <Button
                        disabled={isLoading}
                        secondary
                        onclick={() => setIsLeaving(true)}>
                        Cancelar
                    </Button>
                    <Button disabled={isLoading} onclick={uploadVehicle}>
                        {isLoading ? "Cargando" : "Agregar"}
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default Filter;

const Container = styled.div`
    .top {
        align-items: center;
        display: flex;
        gap: 2rem;
        margin-bottom: 0.75rem;

        p {
            color: ${Themes.main};
            display: inline;
            font-weight: 500;
            font-size: 1.75rem;
            line-height: 1.75rem;
            margin-bottom: 0;
            padding: 0.5rem 0;
            padding-right: 3rem;
        }

        button {
            margin: 0;
            margin-right: 1.75rem;
        }
    }

    .filters-container {
        display: grid;

        @media screen and (min-width: ${Themes.lg}) {
            gap: 0 1rem;
        }

        .selects-rows {
            display: grid;
            grid-template-columns: 1fr 1fr;
            /* overflow: hidden; */
            background-color: ${Themes.offWhite};
            font-weight: 500;

            @media screen and (min-width: ${Themes.lg}) {
                border-radius: 9999px !important;
            }

            &.row-1 {
                border-top-left-radius: 0.5rem;
                border-top-right-radius: 0.5rem;

                @media screen and (min-width: ${Themes.lg}) {
                    grid-template-columns: repeat(5, 20%);
                }

                .select-container {
                    &:first-child {
                        grid-column: 1 / -1;

                        @media screen and (min-width: ${Themes.lg}) {
                            grid-column: auto;
                        }

                        .open-button {
                            border-top-left-radius: 0.5rem;
                            border-top-right-radius: 0.5rem;

                            @media screen and (min-width: ${Themes.lg}) {
                                border-radius: 9999px;
                                border-top-right-radius: 0;
                                border-bottom-right-radius: 0;
                            }
                        }
                    }

                    &:last-child {
                        .open-button {
                            @media screen and (min-width: ${Themes.lg}) {
                                border-radius: 9999px;
                                border-top-left-radius: 0;
                                border-bottom-left-radius: 0;
                            }
                        }
                    }
                }
            }

            &.row-2 {
                border-bottom-right-radius: 0.5rem;
                border-bottom-left-radius: 0.5rem;
                margin-bottom: 1rem;

                @media screen and (min-width: ${Themes.lg}) {
                    grid-template-columns: repeat(4, 25%);
                    margin: 1rem 0;
                }

                .select-container {
                    &:first-child {
                        .open-button {
                            @media screen and (min-width: ${Themes.lg}) {
                                border-radius: 9999px;
                                border-top-right-radius: 0;
                                border-bottom-right-radius: 0;
                            }
                        }
                    }

                    &:nth-last-child(2) {
                        .open-button {
                            border-bottom-left-radius: 0.5rem;

                            @media screen and (min-width: ${Themes.lg}) {
                                border-radius: 0;
                            }
                        }
                    }

                    &:last-child {
                        .open-button {
                            border-bottom-right-radius: 0.5rem;

                            @media screen and (min-width: ${Themes.lg}) {
                                border-radius: 9999px;
                                border-top-left-radius: 0;
                                border-bottom-left-radius: 0;
                            }
                        }
                    }
                }
            }

            select {
                appearance: none;
                background: url(./static/img/down-blue-arrow.png) white 96%
                    center / 10px auto;
                background-repeat: no-repeat;
                color: ${Themes.main};
                font-size: 1.5rem;
                font-weight: 500;
                padding: 0.75rem;
                transition: 0.2s;
                width: 100%;

                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

                &:disabled {
                    color: rgba(0, 0, 0, 0.6);
                    background-color: rgba(211, 211, 211, 0.2);
                    font-weight: 500;
                }

                &.first-select {
                    grid-column: 1 / -1;

                    @media screen and (min-width: ${Themes.lg}) {
                        grid-column: auto;
                    }
                }

                &.invalid {
                    &:disabled,
                    & {
                        color: rgba(255, 0, 0, 1);
                        background-image: url(./static/img/down-red-arrow.png);
                    }
                }
            }
        }
    }

    .buttons-container {
        display: flex;
        width: 100%;
        justify-content: end;
    }
`;

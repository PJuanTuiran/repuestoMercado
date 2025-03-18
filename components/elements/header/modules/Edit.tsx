/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FormattedVehicle } from "~/types/Filter";
import { Themes } from "~/utilities/StyleVariables";
import { FiltersContext } from "../contexts/FiltersSlice";
import {
    deleteVehicleById,
    submitVehicle,
    updateVehicleById,
    VehicleWithId,
} from "../core/fetch";
import {
    DuplicatedContext,
    EditingContext,
    FilterContext,
    key,
    SavedVehicle,
    SelectedContext,
    state,
} from "../FilterWrapper";
import { closeWindow, highlightEmptySelects } from "../utils/functions";
import Button from "./Button";
import CustomSelect from "./CustomSelect";

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

const Edit = ({ vehicles, setIsLeaving, isLeaving }: Props) => {
    const filter = useContext(FiltersContext);
    const { setView } = useContext(FilterContext);
    const { setSelected } = useContext(SelectedContext);
    const { editing: index, setEditing } = useContext(EditingContext);
    const setDuplicate = useContext(DuplicatedContext);
    const { logged: user, uid: id } = useSelector(
        (store: any) => store.userlogged.userlogged
    );

    const editingVehicle = useMemo(() => vehicles[index], []);

   useEffect(() => {
      console.log(editingVehicle)
   }, [editingVehicle])

    const [locked, setLocked] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const [type, setType] = useState<string | null>(editingVehicle.ids.type);
    const [body, setBody] = useState<string | null>(editingVehicle.ids.body);
    const [year, setYear] = useState<string | null>(editingVehicle.ids.year);
    const [brand, setBrand] = useState<string | null>(editingVehicle.ids.brand);
    const [fuel, setFuel] = useState<string | null>(editingVehicle.ids.fuel);
    const [transmision, setTransmision] = useState<string | null>(
        editingVehicle.ids.transmision
    );
    const [traction, setTraction] = useState<string | null>(
        editingVehicle.ids.traction
    );
    const [cilinder, setCilinder] = useState<string | null>(
        editingVehicle.ids.cilinder
    );
    const [model, setModel] = useState<string | null>(editingVehicle.ids.model);

    const [isValid, setIsValid] = useState<Boolean>(false);

    const motorbikeSelected = useMemo(
        () =>
            parseInt(type ?? "") ===
            filter.vgl_tiposvehiculos.find(
                (type) => type.label.toLowerCase() === "motos"
            )?.id,
        [type]
    );

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

    const editVehicle = async () => {
        if (!isValid) {
            highlightEmptySelects(motorbikeSelected, electricSelected, truckSelected, vanSelected);
            return;
        }

        let saved = [...vehicles];

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

        saved.forEach((vehicle) => {
            const rotationKeys = Object.values(vehicle.ids);
            const newVehicleKeys = Object.values(newVehicle.ids);

            let equals = true;

            rotationKeys.forEach((rK, i) => {
                (rK === "" ? null : rK) !=
                (newVehicleKeys[i] === "" ? null : newVehicleKeys[i])
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
                cilindrajemotor: parseInt(newVehicle.ids.cilinder),
                comentario: "Vehículo agregado desde el filtro de busqueda",
                estado: 1,
                marca: parseInt(newVehicle.ids.brand),
                modelo: parseInt(newVehicle.ids.model),
                tipocombustible: parseInt(newVehicle.ids.fuel),
                tipotraccion: ((val) => (val ? parseInt(val) : null))(
                    newVehicle.ids.traction
                ),
                tipovehiculo: parseInt(newVehicle.ids.type),
                transmision: ((val) => (val ? parseInt(val) : null))(
                    newVehicle.ids.transmision
                ),
                idusuario: id,
            };

            await deleteVehicleById(editingVehicle.id);
            await submitVehicle(formattedVehicle)

            setSelected(-1);
        } else {
            (saved as SavedVehicle[]).splice(index, 1, newVehicle);
            localStorage.setItem(key, JSON.stringify(saved));
            setSelected(index);
        }

        setView(state.Select);
    };

    useEffect(() => {
        const inputs = document.querySelectorAll(
            ".select-container .open-button"
        );

        const unlock = () => {
            setLocked(false);
        };

        inputs.forEach((input) => {
            input.addEventListener("click", unlock);
        });

        return () => {
            inputs.forEach((input) => {
                input.removeEventListener("click", unlock);
            });
        };
    }, []);

    useEffect(() => {
      if(isLeaving){
         setIsLoading(true);
      }else{
         setIsLoading(false);
      }
    }, [isLeaving])

    useEffect(() => {
        if (electricSelected) {
            setTransmision(null);
        } else if (motorbikeSelected || vanSelected) {
            setTraction(null);
        } else if (truckSelected) {
            setTransmision(null);
            setTraction(null);
        }

        if (locked) return;

        setBody(null);
    }, [type]);

    useEffect(() => {
        if (locked) return;

        setBrand(null);
    }, [body]);

    useEffect(() => {
        if (locked) return;

        setModel(null);
    }, [brand]);

    useEffect(() => {
        if (locked) return;

        setCilinder(null);
    }, [model]);

    useEffect(() => {
      setIsValid(() => {
          if (type && body && brand && year) {
              if (traction || (!traction && (motorbikeSelected || truckSelected || vanSelected))) {
                  if (model && cilinder && fuel) {
                      if (transmision || (!transmision && (electricSelected || truckSelected))) {
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
                <p>Edita tu vehículo</p>
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
                    <CustomSelect
                        defaultValue="Combustible"
                        value={fuel}
                        setIdSelected={setFuel}
                        options={model ? combustibles : []}
                    />
                    <CustomSelect
                        disabled={electricSelected || truckSelected}
                        defaultValue="Transmisión"
                        value={transmision}
                        setIdSelected={setTransmision}
                        options={!electricSelected ? transmisiones : []}
                    />
                    <CustomSelect
                        disabled={motorbikeSelected || truckSelected  || vanSelected}
                        defaultValue="Tracción"
                        value={traction}
                        setIdSelected={setTraction}
                        options={!motorbikeSelected ? tracciones : []}
                    />
                </div>
                <div className="buttons-container">
                    <Button disabled={isLoading} secondary onclick={() => setIsLeaving(true)}>
                        Cancelar
                    </Button>
                    <Button
                        disabled={isLoading}
                        onclick={editVehicle}
                    >
                        { isLoading ? 'Cargando' : 'Editar' }
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default Edit;

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

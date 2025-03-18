/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CloseWindowContext } from "../Header";
import {
    FilterContext,
    key,
    keys,
    SavedVehicle,
    state,
} from "../FilterWrapper";
import VehicleOverview from "./VehicleOverview";
import Button from "./Button";
import { Themes } from "~/utilities/StyleVariables";
import { useSelector, useDispatch } from "react-redux";
import { getFilterGarage } from "../../../../store/filtergarage/action";
import { getItemSelectGarage } from "../../../../store/itemselectgarage/action";
import { getDeleteItem } from "../../../../store/deleteitem/action";
import { getSelectItem } from "../../../../store/selectitem/action";
import { getVehiculosGarage } from "../../../../store/vehiculosgarage/action";
import { getCloseGarage } from "../../../../store/closegarage/action";
import { useRouter } from "next/router";
import useGetProducts from "~/hooks/useGetProducts";

interface Props {
    vehicles: SavedVehicle[];
}

let itemvehsel = [];

const Select = ({ vehicles }: Props) => {
    //console.log("vehicles : ", vehicles)
    const router = useRouter();
    const dispatch = useDispatch();
    const { setView } = useContext(FilterContext);
    const closeWindow = useContext(CloseWindowContext);
    const [itemSel, setItemSel] = useState(null);
    const [dataFind, setDataFind] = useState(null);

    const { logged: user, uid: id } = useSelector(
        (store: any) => store.userlogged.userlogged
    );

    const { loading, productItems, getProducts, dataPayload } =
        useGetProducts();

    const deleteitem = useSelector((state: any) => state.deleteitem.deleteitem);
    const selectitem = useSelector((state: any) => state.selectitem.selectitem);

    const goToCreate = () => {
        const limit = user ? 10 : 3;
        dispatch(getCloseGarage(0));
        dispatch(getDeleteItem(0));
        vehicles.length >= limit
            ? setView(state.Warning)
            : setView(state.Filter);
    };

    const onClose = async () => {
        dispatch(getFilterGarage(false));
        dispatch(getCloseGarage(1));
        dispatch(getDeleteItem(0));
        closeWindow();

        const queries = {
            name_contains: dataFind,
        };

        //getProducts(queries);
        //console.log("dataFind : ", dataFind)
        //return
        //router.push(`/search?keyword=${dataFind}`);
    };

    const selectVeh = (indice) => {
        
        let idfind = indice;
        if(!indice)
            idfind = 0;

        let datafind = null;
        vehicles &&
            vehicles.map((row, index) => {
                if (index == idfind) {
                    datafind = row.brand + " " + row.cilinder + " " + row.year + " " + row.body + " " + row.model + " " + row.model;
                }
            });
        setDataFind(datafind);

        /*
body: "SUV y camperos 5 puertas"
brand: "MAZDA"
cilinder: "2000"
fuel: "Gasolina"
id: 8
ids: {body: '26', brand: '1211', cilinder: '36782', fuel: '1', model: '9594', …}
model: "CX5 [2]"
traction: "Tracción Delantera"
transmision: "Automática"
type: "Carros y Camionetas"
year: "2018"
        */
        setItemSel(indice);

        let idvehgarage;

        idvehgarage = localStorage.getItem("idvehgarage");

        if (idvehgarage >= "0") {
            idvehgarage = JSON.parse(localStorage.getItem("idvehgarage"));
        } else {
            idvehgarage = "-1";
        }

        vehicles &&
            vehicles.map((row, index) => {
                if (index == indice) {
                    if (idvehgarage < 0) {
                        localStorage.setItem(
                            "selectvehgarage",
                            JSON.stringify(null)
                        );
                    } else {
                        if (deleteitem == 0 && selectitem == 0) {
                            localStorage.setItem(
                                "selectvehgarage",
                                JSON.stringify(row)
                            );
                        }
                    }
                    itemvehsel.push(row);
                    dispatch(getItemSelectGarage(row));
                }
            });

        if (deleteitem == 1) {
            localStorage.setItem("selectvehgarage", JSON.stringify(null));
            dispatch(getDeleteItem(0));
        }
    };

    useEffect(() => {
        selectVeh(itemSel);
        dispatch(getItemSelectGarage(itemvehsel));
        dispatch(getVehiculosGarage(vehicles));
    }, [vehicles, itemvehsel]);

    useEffect(() => {
        if (selectitem == 1) {
            localStorage.setItem("selectvehgarage", JSON.stringify(null));
            dispatch(getSelectItem(0));
        }
    }, [selectitem]);

    return (
        <Container length={vehicles.length}>
            <div className="select-container">
                <p>Agrega tu vehículo para filtrar tu busqueda</p>
                <VehicleOverview type={state.None} />

                <div className="vehicles-container">
                    {vehicles
                        .sort((a, b) => (user ? b.id - a.id : 1))
                        .map((op, i) => (
                            <div onClick={() => selectVeh(i)}>
                                <VehicleOverview
                                    type={state.Select}
                                    key={i}
                                    index={i}
                                    vehicle={op}
                                />
                            </div>
                        ))}
                </div>

                <button className="add-vehicle-button" onClick={goToCreate}>
                    Agrega tu vehículo
                </button>
            </div>
            <div className="button-container">
                <Button onclick={onClose}>Listo</Button>
            </div>
        </Container>
    );
};

export default Select;

interface ContainerProps {
    length: number;
}

const Container = styled.div<ContainerProps>`
    display: grid;

    .select-container {
        .vehicles-container {
            /* max-height: 15rem;
      overflow-y: scroll;
      overflow-x: hidden; */
            /* padding-right: 0.4rem; */

            /* scrollbar-width: none;
      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        display: none;
      } */

            & > div {
                &:first-child {
                    margin-top: 0;
                }

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }

        & > p {
            font-size: 1.75rem;
            font-weight: 500;
            line-height: 1.75rem;
            color: ${Themes.main};
            padding: 0.5rem 0;
            padding-right: 2rem;
        }

        .add-vehicle-button {
            background-color: ${Themes.offWhite};
            border-radius: 999px;
            font-size: 1.5rem;
            margin-bottom: 1rem;
            padding: 0.75rem 1.25rem;
            text-align: start;
            width: 100%;
            ${({ length }) => (length > 0 ? "margin-top: 1rem;" : "")}
        }
    }

    .button-container {
        justify-self: end;
    }
`;

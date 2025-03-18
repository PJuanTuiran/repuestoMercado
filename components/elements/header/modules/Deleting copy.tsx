/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import ExclamationIcon from "../svgs/ExclamationIcon";
import {
    DeletingContext,
    FilterContext,
    key,
    SavedVehicle,
    SelectedContext,
    state,
} from "../FilterWrapper";
import { deleteVehicleById } from "../core/fetch";
import VehicleOverview from "./VehicleOverview";
import Button from "./Button";
import { Themes } from "~/utilities/StyleVariables";
import { useSelector } from "react-redux";

interface Props {
    vehicles: SavedVehicle[];
}

const Deleting = ({ vehicles }: Props) => {
    const { deleting } = useContext(DeletingContext);
    const { setView } = useContext(FilterContext);
    const { setSelected } = useContext(SelectedContext);
    const { logged: user, uid: id } = useSelector(
        (store: any) => store.userlogged.userlogged
    );

    const [isLoading, setIsLoading] = useState(false);

    const vehicle = useMemo(() => {
        if (user) {
            const vehicle = vehicles.find((v) => v.id === parseInt(deleting));

            return vehicle;
        } else {
            const string = localStorage.getItem(key);
            const localVehicle = (
                JSON.parse(string ?? "") as SavedVehicle[]
            ).at(deleting);
            return localVehicle;
        }
    }, []);

    const accept = async () => {
        if (user) {
            setIsLoading(true);
            await deleteVehicleById(deleting);
        } else {
            const string = localStorage.getItem(key);
            const vehicles = JSON.parse(string ?? "") as SavedVehicle[];
            vehicles.splice(deleting, 1);
            localStorage.setItem(key, JSON.stringify(vehicles));
        }
        setSelected(null);
        setView(state.Select);
    };

    return (
        <Container>
            <div className="warning-container">
                <ExclamationIcon className="exclamation-icon" />
                <p>¿Estás seguro que deseas eliminar este vehículo?</p>
            </div>
            {vehicle && (
                <VehicleOverview type={state.Delete} vehicle={vehicle} />
            )}
            <div className="buttons-container">
                <Button
                    disabled={isLoading}
                    secondary
                    onclick={() => {
                        setView(state.Select);
                    }}>
                    Cancelar
                </Button>
                <Button onclick={accept} disabled={isLoading}>
                    {isLoading ? "Cargando" : "Aceptar"}
                </Button>
            </div>
        </Container>
    );
};

export default Deleting;

const Container = styled.div`
    display: grid;

    .warning-container {
        align-items: center;
        display: grid;
        gap: 1rem;
        grid-template-columns: auto 1fr;

        .exclamation-icon {
            aspect-ratio: 1/1;
            fill: ${Themes.main};
            width: 4rem;
        }

        p {
            color: ${Themes.main};
            font-size: 1.75rem;
            font-weight: 500;
            line-height: 1.75rem;
            margin-bottom: 0;
            padding-right: 1.5rem;
        }
    }

    .buttons-container {
        justify-self: end;
        display: flex;
        align-items: center;
    }
`;

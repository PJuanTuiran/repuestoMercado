/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import styled from "styled-components";
import { Themes } from "~/utilities/StyleVariables";
import { FilterContext, state } from "../FilterWrapper";
import ExclamationIcon from "../svgs/ExclamationIcon";
import Button from "./Button";

const Warning = () => {
    const { setView } = useContext(FilterContext);

    return (
        <Container>
            <div>
                <ExclamationIcon />
                <p>Has llegado al maximo de vehiculos que puedes agregar.</p>
            </div>
            <p>
                Debes eliminar por lo menos un vehiculo para agregar uno nuevo.
            </p>
            <Button
                onclick={() => {
                    setView(state.Select);
                }}>
                Aceptar
            </Button>
        </Container>
    );
};

export default Warning;

const Container = styled.div`

   display: grid;

    & > div {
        align-items: center;
        display: grid;
        gap: 1rem;
        grid-template-columns: auto 1fr;

        svg {
            aspect-ratio: 1/1;
            fill: ${Themes.main};
            width: 3rem;
        }

        p {
            color: ${Themes.main};
            font-size: 2rem;
            font-weight: 500;;
            line-height: 1.75rem;
            margin: 0;
            margin-right: 1.5rem;
        }
    }

    & > p {
        color: ${Themes.main};
        margin: 1rem;
        text-align: justify;
    }

    button {
      justify-self: end;
    }
`;

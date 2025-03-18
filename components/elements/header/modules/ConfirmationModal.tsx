import React, { useContext } from "react";
import styled from "styled-components";
import { Themes } from "~/utilities/StyleVariables";
import { FilterContext, state } from "../FilterWrapper";
import ExclamationIcon from "../svgs/ExclamationIcon";
import Button from "./Button";

interface Props {
    setIsLeaving: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmationModal = ({ setIsLeaving }: Props) => {
    const { setView } = useContext(FilterContext);

    return (
        <Container>
            <div className="title">
            <ExclamationIcon />
            <h3>Información del producto</h3>
            </div>
            <p>
                ¿Quieres cerrar el formulario? Si cierras ahora los cambios no se guardarán!
            </p>
            <div className="buttons-container">
            <Button
               secondary
               onclick={() => {
                  setIsLeaving(false);
               }}>
                    Seguir editando
                </Button>
                <Button
                    onclick={() => {
                        setView(state.Select);
                        setIsLeaving(false);
                    }}>
                    Cerrar
                </Button>
                
            </div>
        </Container>
    );
};

export default ConfirmationModal;

const Container = styled.div`
    align-self: center;
    background-color: ${Themes.offWhite};
    /* border: 1px ${Themes.main} solid; */
    border-radius: 0.5rem;
    /* box-shadow: 2px 2px 5px ${Themes.lightMain}; */
    display: flex;
   flex-direction: column;
    gap: 1.5rem;
    justify-self: center;
    margin: auto;
    padding: 2rem;
    box-sizing: content-box;
    position: absolute;
    width: 80%;
    z-index: 1;

    .title {
      display: flex;
      gap: 1rem;
      align-items: center;

      svg {
         fill: ${Themes.main};
         height: 3rem;
      }

      h3 {
         grid-column: 2 / 5;
         justify-self: start;
         font-size: 2rem;
         font-weight: 500;
         text-align: center;
         margin: 0;
      }
    }

    p {
      color: ${Themes.main};
        text-align: start;
      margin: 0;
      width: 100%;

    }

    .buttons-container {
        display: flex;
        flex-wrap: wrap;
        align-self: end;
        justify-content: center;
        gap: .5rem;

        button {
         margin: 0;
        }
    }

    @media screen and (min-width: ${Themes.sm}) {
        max-height: 90%;
    }
`;

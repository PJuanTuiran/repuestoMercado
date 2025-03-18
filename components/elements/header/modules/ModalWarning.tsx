import { useContext } from "react";
import styled from "styled-components";
import { Themes } from "~/utilities/StyleVariables";
import { DuplicatedContext } from "../FilterWrapper";
import ExclamationIcon from "../svgs/ExclamationIcon";
import Button from "./Button";

const ModalWarning = () => {
    const setDuplicate = useContext(DuplicatedContext);

    return (
        <Container>
            <div className="title">
            <ExclamationIcon />
            <h3>¡Vehiculo duplicado!</h3>
            </div>
            <p>
                No puedes tener dos vehiculos identicos en tu garaje, debes
                cambiar al menos una caracteristica para poder guardar.
            </p>
            <div className='button-container'>
            <Button onclick={() => setDuplicate(false)}>Cerrar</Button>
            </div>
        </Container>
    );
};

export default ModalWarning;

const Container = styled.div`
    align-self: center;
    background-color: ${Themes.offWhite};
    border-radius: 8px;
    justify-self: center;
    margin: auto;
    padding: 1.5rem;
    gap: 1.5rem;
    position: absolute;
    z-index: 1;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 80%;

    /* max-height: 80%; */

    .title {

      display: flex;
      align-items: center;
      gap: 1rem;

      svg {
        fill: ${Themes.main};
        height: 3rem;
      }

      h3 {
          font-size: 2rem;
          font-weight: 500;
          text-align: start;
          margin: 0;
          justify-self: start;
      }
    }

    p {
      color: ${Themes.main};
        text-align: start;
        margin: 0;
    }

    .button-container {
      align-self: end;
    }

    @media screen and (min-width: ${Themes.sm}) {
        max-height: 90%;
        gap: 0.8rem;
    }

    @media screen and (min-width: ${Themes.md}) {
        max-height: 90%;
      
    }
`;

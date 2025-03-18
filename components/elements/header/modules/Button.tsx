import styled from "styled-components";
import { Themes } from "~/utilities/StyleVariables";

interface Props {
    onclick: () => void;
    disabled?: boolean;
    children: any;
    onHover?: () => void;
    secondary?: boolean;
}

const Button = ({ secondary, onclick, disabled, children, onHover }: Props) => {
    return (
        <Container
            className={secondary ? "secondary-button" : "main-button"}
            onMouseOver={onHover}
            onClick={onclick}
            disabled={disabled}>
            {children}
        </Container>
    );
};

export default Button;

const Container = styled.button`
    background-color: ${Themes.main};
    border: 1px ${Themes.main} solid;
    border-radius: 999px;
    color: white;
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0.5rem;
    margin-top: 0;
    padding: .75rem 3rem;
    transition: 0.2s;
    height: min-content;

    &.secondary-button {
        background: white;
        border: 1px white solid;
        color: ${Themes.main};
    }

    &:disabled {
        border: 1px rgb(156 163 175) solid;
        background-color: ${Themes.lightMain};
        color: rgb(156 163 175);
        font-weight: 500;
    }
`;

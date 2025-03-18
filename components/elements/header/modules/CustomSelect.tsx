/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Themes } from "~/utilities/StyleVariables";

interface Option {
    id: number;
    label: string;
}

interface Props {
    defaultValue: string | number;
    disabled?: boolean;
    setIdSelected: React.Dispatch<React.SetStateAction<string | null>>;
    options: Option[];
    value: string | null;
}

const CustomSelect = ({
    defaultValue,
    disabled,
    setIdSelected,
    options,
    value,
}: Props) => {
    const getValue = ($value: string) => {
        return (
            options.find((option) => option.id.toString() === $value)?.label ??
            defaultValue
        );
    };

    const [valueSelected, setValueSelected] = useState<string | number>(
        value !== null ? getValue(value) : defaultValue
    );
    const [hide, setHide] = useState<boolean>(true);
    const [filter, setFilter] = useState<string | null>("");

    const selectOption = (id: number) => {
        setIdSelected(id.toString());
        setValueSelected(
            options.find((op) => op.id === id)?.label ?? defaultValue
        );
        setHide(true);
    };

    const SelectContainer = useRef<HTMLDivElement>(null);
    const OpenButton = useRef<HTMLButtonElement>(null);

    const closeSelect = useCallback(() => setHide(true), []);

    useEffect(() => {
        setFilter("");
    }, [hide]);

    useEffect(() => {
        setValueSelected(value !== null ? getValue(value) : defaultValue);
    }, [value]);

    useEffect(() => {
        const node = SelectContainer.current;

        if (!node) return;

        node.onmouseout = () => {
            document.addEventListener("click", closeSelect);
        };

        node.onmouseover = () => {
            document.removeEventListener("click", closeSelect);
        };
    }, [SelectContainer.current]);

    return (
        <Container
            disabled={disabled !== undefined && disabled}
            className="select-container"
            ref={SelectContainer}>
            <button
                className="open-button"
                data-type={defaultValue}
                data-value={value}
                ref={OpenButton}
                onClick={() => {
                    !disabled && setHide((last) => !last);
                    OpenButton.current.classList.remove("empty");
                }}>
                {valueSelected}
            </button>
            <ul className="options">
                {!hide && (
                    <>
                        <li>
                            <input
                                onChange={(e) => setFilter(e.target.value)}
                                type="text"
                                placeholder="Buscar..."
                            />
                        </li>
                        {options.map(
                            (option) =>
                                (!filter ||
                                    option.label
                                        .toLowerCase()
                                        .includes(
                                            filter.toLocaleLowerCase()
                                        )) && (
                                    <li className="option" key={option.id}>
                                        <button
                                            onClick={() =>
                                                selectOption(option.id)
                                            }>
                                            {option.label}
                                        </button>
                                    </li>
                                )
                        )}
                    </>
                )}
            </ul>
        </Container>
    );
};

export default CustomSelect;

interface ContainerProps {
    disabled: boolean;
}

const Container = styled.div<ContainerProps>`
    position: relative;
    font-size: 1.5rem;

    button,
    input {
        width: 100%;
        text-align: start;
        padding: 0.75rem;
        outline: none;
        font-weight: 500;
    }

    input {
        /* color: black; */
    }

    .open-button {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        /* transition: 0.3s; */
        /* color: ${(props) => (props.disabled ? "gray" : Themes.main)}; */
        background: url(./static/img/down-blue-arrow.png) white 96% center /
            10px auto;
        background-repeat: no-repeat;
        background-color: ${(props) => (props.disabled ? "#eee" : "white")};

        &.empty {
            color: red;
            background-image: url(./static/img/down-red-arrow.png);
        }
    }

    .options {
        background-color: white;
        border-radius: 0.5rem;
        position: absolute;
        top: 100%;
        width: 100%;
        z-index: 10;
        max-height: 20rem;
        overflow-y: scroll;
        box-shadow: 8px 8px 1rem rgba(0, 0, 0, 0.1);

        .option {
            border: 0.5px ${Themes.offWhite} solid;
            border-left: 0;
            border-right: 0;

            &:last-child {
                border-bottom: 0;
            }

            &:hover {
                color: ${Themes.main};
                background-color: ${Themes.lightBlue};
            }
        }
    }
`;

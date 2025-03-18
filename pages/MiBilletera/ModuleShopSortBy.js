import React, { useState, useEffect } from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const sortByItems = [
    {
        id: 1,
        text: "Más reciente",
    },
    {
        id: 2,
        text: "Más antiguos",
    }
];

const ModuleShopSortBy = (props) => {
    const { setOrdenarPorFecha } = props;

    const ordenar = (id) => {
        setOrdenarPorFecha(id)
    }

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"
                    sx={{ marginTop: -1 }}
                >Fecha de creación</InputLabel>
                <Select
                    label="Filtra por estado"
                    sx={{
                        marginTop: 0,
                        width: 160,
                        height: 40
                    }}
                >
                    {
                        sortByItems &&
                        sortByItems.map((row, index) => {
                            return (
                                <MenuItem value={row.id}
                                    onClick={() => ordenar(row.id)}
                                >
                                    {row.text}
                                </MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
        </div>

    )
};

export default ModuleShopSortBy;

/*

 <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Filtrar por estado</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    //value={age}
                    label="Filtrar por estado"
                    //onChange={handleChange}
                >
{


            return (
                
                listEstados.map((row, index) => {
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                
            })
        )
        }
                </Select>
            </FormControl>
   listEstados &&
        listEstados.map((row, index) => {
            return (
                <Select
                    sx={{
                        marginTop: 35,
                        width: 250,
                        height: 50,
                    }}
                >
                    <MenuItem value={1}>Red</MenuItem>
                </Select>
            )
        })
*/
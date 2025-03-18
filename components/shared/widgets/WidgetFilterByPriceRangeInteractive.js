import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { Box, Grid } from '@mui/material';
import { useRouter } from "next/router";
import { NumericFormat } from "react-number-format";

function valuetext(value) {
    return `${value}°C`;
}

const WidgetFilterByPriceRangeInteractive = () => {

    const [valueInicial, setValueInicial] = React.useState(10);
    const [valueFinal, setValueFinal] = React.useState(100);
    const [value, setValue] = React.useState([valueInicial, valueFinal]);

    const [cambio, setCambio] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValueInicial(newValue[0]);
        setValueFinal(newValue[1]);
        setValue(newValue);
    };

    const handleChangeInicial = (valor) => {
        setValueInicial(valor)
        setValue([valor, valueFinal]);

    };

    const handleChangeFinal = (valor) => {
        setValueFinal(valor)
        setValue([valueInicial, valor]);
    };

    return (
        <Box sx={{ width: 100, height: 1 }}>
            <div className="inputdatospreciofiltro">
                <h4 className="widget-title tamañotextofiltroprecio">Por Precio</h4>
                <Slider
                    className="tamanofiltroprecio"
                    getAriaLabel={() => 'Rango de precio'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                />
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} md={6} lg={4}>
                        <input
                            placeholder="Precio mínimo"
                            value={valueInicial}
                            className="form-control ps-form__input
                                       sinborder textocolorfiltroprecio"
                            //name={datosBuscar}
                            onChange={(e) => handleChangeInicial(e.target.value)}
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <input
                            placeholder="Precio máximo"
                            value={valueFinal}
                            className="form-control ps-form__input
                                       sinborder textocolorfiltroprecio"
                            //name={datosBuscar}
                            onChange={(e) => handleChangeFinal(e.target.value)}
                            type="number"
                        />
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
};

export default WidgetFilterByPriceRangeInteractive;

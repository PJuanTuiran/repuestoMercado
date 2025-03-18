import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, FormControl, Grid } from "@mui/material";
import axios from "axios";
import ClickAwayListener from '@mui/core/ClickAwayListener';

function CalcularEnvio({ setConsultarValorEnvio, setvalorEnvio, codigoCiudadVendedor,
    setCodigoCiudadDespacho, codigoCiudadDespacho, datosCiudades, handleClose, valorEnvio }) {

    const precioEnvio = () => {
        let requestData = {
            "poblacionesorigen": [
                codigoCiudadVendedor
            ],
            "poblacionesdestino": [
                codigoCiudadDespacho
            ],
            "idunidadnegocio": "2",
            "registros": 1000
        }

        const config = {
            headers: {
                "Authorization": "$2y$10$hc8dShHM0E71/08Tcjq3nOdq.hCmOcn5mEH5a/UZ9Lk0eBptD8CeG",
                "Content-Type": "application/json" || x < z
            }
        };
        const getRequest = async () => {
            try {
                const response = await axios.post("https://gimcloud.com.co/api/endpoint/10001", requestData, config);

                if (response.data.tarifas.length > 0) {
                    let long = response.data.tarifas.length - 1;
                    console.log("CALCULAR ENVIO : ", response.data.tarifas[long].kilo1);
                    setvalorEnvio(response.data.tarifas[long].kilo1);
                }

            } catch (error) {
                console.error('Errorxx:', error);
            }
        }
        getRequest();
    }

    const handleCloseFilterWO = () => handleClose();

    //console.log>("CODIGO CIDA : ", codigoCiudadDespacho)

    useEffect(() => {
        precioEnvio()
    }, [codigoCiudadDespacho])

    return (
        <div className="modalcalcularprecio">

            <div className='colorbase'>Seleccione ciudad destino</div>
            <Grid container spacing={1}>
                <ClickAwayListener onClickAway={() => handleCloseFilterWO()}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Autocomplete
                            sx={{ marginBottom: '5px', width: '200px' }}
                            labelId="codigociudad"
                            id="codigociudad"
                            className='itemcostoemp'
                            //value={selectClient}
                            onChange={(event, newValue) => {
                                setCodigoCiudadDespacho(newValue && newValue.codigo_ciu + "000");
                            }}

                            options={datosCiudades}
                            //value={listEmpOpera && listEmpOpera?.find((state) => state?.id === codEmpSel1) || null}
                            getOptionLabel={(option) => option.nombre_ciu}
                            ListboxProps={{ style: { fontSize: 16, color: '#2D2E83' } }}
                            style={{ width: 190, height: 30 }}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    //InputProps={{ style: { fontSize: '14px', color: '#2D2E83' } }}
                                    label="Ingrese ciudad" variant="standard" size="small" />}
                        />
                    </Grid>

                </ClickAwayListener>
                <Grid item xs={12} md={12} lg={12}>
                    <div className="textocalcularenvio2">
                        Valor del envio: {valorEnvio}
                    </div>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <div className="btncalcularenvio2"
                        onClick={() => handleCloseFilterWO()}
                    >
                        Aceptar
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default CalcularEnvio;
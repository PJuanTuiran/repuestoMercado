import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { Box, Grid, Button } from '@mui/material';
import { useRouter } from "next/router";
import PropTypes, { func } from "prop-types";
import NumberFormat from "react-number-format";
import { getFiltroPrd } from "../../../store/filtroprd/action";
import { useDispatch, useSelector } from "react-redux";
import { getOpenCloseCity } from "../../../store/openclosecity/action";
import { getRangosPrecio } from "../../../store/rangosprecio/action";

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix=""
        />
    );
}

function NumberFormatCelular(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            isNumericString
            prefix=""
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

NumberFormatCelular.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

function valuetext(value) {
    return `${value}°C`;
}

let valminimo = 1;
let valmaximo = 10000000;

const WidgetFilterByPriceRangeResults = (props) => {
    const dispatch = useDispatch();
    const { menorprecio, mayorprecio, setPrecioFiltroMinimo, setMenorPrecio,
        setMayorPrecio, setPrecioFiltroMaximo, setFiltroPrecio, dataPrd, productItems } = props;

    const [change, setChange] = useState(true);
    const [valueInicial, setValueInicial] = React.useState(menorprecio);
    const [valueFinal, setValueFinal] = React.useState(mayorprecio);
    const [value, setValue] = React.useState([menorprecio, mayorprecio]);

    const [preInicial, setPreInicial] = React.useState(menorprecio);
    const [preFinal, setPreFinal] = React.useState(mayorprecio);

    const [classOkPrecio, setClassOkPrecio] = useState('iconookprecio fa fa-angle-right deshabilitar')

    const [cambio, setCambio] = React.useState(0);
    const filtroprd = useSelector((state) => state.filtroprd.filtroprd);
    const filtrocondprd = useSelector((state) => state.filtrocondicionprd.filtrocondicionprd);
    const openclosecity = useSelector((state) => state.openclosecity.openclosecity);
    const rangoPrd = useSelector((state) => state.rangosprecio.rangosprecio);

    const handleChange = (event, newValue) => {
        setChange(true);
        //console.log("PRECIO : ", newValue)
        setClassOkPrecio('iconookprecio fa fa-angle-right')
        setValueInicial(newValue[0]);
        setValueFinal(newValue[1]);
        setPrecioFiltroMinimo(newValue[0]);
        setPrecioFiltroMaximo(newValue[1]);
        setValue(newValue);

        let itempre = [];
        let item = {
            preminimo: newValue[0],
            premaximo: newValue[1],
        };
        itempre.push(item);
        localStorage.setItem(
            "filtroprecioprd",
            JSON.stringify(itempre)
        );
        let rangpre = {
            menorprecio: newValue[0],
            mayorprecio: newValue[1],
        };
        localStorage.setItem("rangoprecios", JSON.stringify(rangpre));
        dispatch(getFiltroPrd(3));
    };

    const clickInicial = () => {
        setValueInicial(0)
    }

    const clickFinal = () => {
        setValueFinal(0)
    }

    const handleChangeInicial = (valor) => {
        setChange(false);
        setClassOkPrecio('iconookprecio fa fa-angle-right');
        let validarprecio;
        let prinicial = "";
        if (valor.length > 0) {
            for (var i = 0; i < valor.length; i++) {
                validarprecio = valor.substr(i, 1);
                if (
                    validarprecio == 0 ||
                    validarprecio == 1 ||
                    validarprecio == 2 ||
                    validarprecio == 3 ||
                    validarprecio == 4 ||
                    validarprecio == 5 ||
                    validarprecio == 6 ||
                    validarprecio == 7 ||
                    validarprecio == 8 ||
                    validarprecio == 9
                ) {
                    prinicial = prinicial + validarprecio;
                } else console.log("ES UN NUMERO ", i, validarprecio);
            }
        }

        setPreInicial(prinicial);

        setValueInicial(parseInt(prinicial))
        setValue([parseInt(prinicial), valueFinal]);
        let itempre = [];
        let item = {
            preminimo: prinicial,
            premaximo: valueFinal,
        };
        itempre.push(item);
        localStorage.setItem(
            "filtroprecioprd",
            JSON.stringify(itempre)
        );
        let rangpre = {
            menorprecio: prinicial,
            mayorprecio: valueFinal,
        };
        localStorage.setItem("rangoprecios", JSON.stringify(rangpre));
        dispatch(getFiltroPrd(3));
    };

    const buscarPrd = () => {
        if (!change) {
            setPrecioFiltroMinimo(parseInt(preInicial));
            setPrecioFiltroMaximo(parseInt(preFinal));
            setValue([parseInt(preInicial), parseInt(preFinal)]);
            setFiltroPrecio(true);
            //console.log("PRECIOS : ",valueFinal, " - ", valueInicial )
        } else {
            setPrecioFiltroMinimo(parseInt(valueInicial));
            setPrecioFiltroMaximo(parseInt(valueFinal));
            setValue([parseInt(valueInicial), parseInt(valueFinal)]);
            setFiltroPrecio(true);

        }
    }

    const handleChangeFinal = (valor) => {
        setChange(false);
        setClassOkPrecio('iconookprecio fa fa-angle-right');
        let validarprecio;
        let prfinal = "";
        if (valor.length > 0) {
            for (var i = 0; i < valor.length; i++) {
                validarprecio = valor.substr(i, 1);
                if (
                    validarprecio == 0 ||
                    validarprecio == 1 ||
                    validarprecio == 2 ||
                    validarprecio == 3 ||
                    validarprecio == 4 ||
                    validarprecio == 5 ||
                    validarprecio == 6 ||
                    validarprecio == 7 ||
                    validarprecio == 8 ||
                    validarprecio == 9
                ) {
                    prfinal = prfinal + validarprecio;
                } else console.log("ES UN NUMERO ", i, validarprecio);
            }
        }

        setPreFinal(prfinal);
        setValueFinal(parseInt(prfinal))
        setValue([valueInicial, parseInt(prfinal)]);
        let itempre = [];

        let item = {
            preminimo: valueInicial,
            premaximo: prfinal,
        };
        itempre.push(item);
        localStorage.setItem(
            "filtroprecioprd",
            JSON.stringify(itempre)
        );
        let rangpre = {
            menorprecio: valueInicial,
            mayorprecio: prfinal,
        };
        localStorage.setItem("rangoprecios", JSON.stringify(rangpre));
        dispatch(getFiltroPrd(3));
    };

    const limpiarFiltro = () => {
        let placeholdersearch = JSON.parse(localStorage.getItem("placeholdersearch"));
        let activafiltrociudad = JSON.parse(localStorage.getItem("activafiltrociudad"));
        let conditionselect = JSON.parse(localStorage.getItem("conditionselect"));
        let filtrocondicionprd = JSON.parse(localStorage.getItem("filtrocondicionprd"));

        let dataproducto = [];

        if (!activafiltrociudad && conditionselect == 0) {
            dataproducto = productItems;
        } else {
            dataproducto = dataPrd;
        }

        const compareAsc = (a, b) => {
            if (a.price < b.price) {
                return -1;
            }
            if (a.price > b.price) {
                return 1;
            }
            return 0;
        };

        const compareDesc = (a, b) => {
            if (b.price < a.price) {
                return -1;
            }
            if (b.price > a.price) {
                return 1;
            }
            return 0;
        };

        let rangomenor = 0;
        if (dataproducto.length > 0) dataproducto.sort(compareAsc);

        if (dataproducto?.length > 0)
            rangomenor = dataproducto[0].price;

        let rangomayor = 0;
        if (dataproducto.length > 0) dataproducto.sort(compareDesc);

        if (dataproducto?.length > 0)
            rangomayor = dataproducto[0].price;

        if (!dataproducto?.length || dataproducto?.length == 0) {
            let rangoprecios = JSON.parse(localStorage.getItem("rangoprecios"));
            rangomenor = rangoprecios.menorprecio;
            rangomayor = rangoprecios.mayorprecio;
        }

        let item = {
            menorprecio: Math.round(rangomenor),
            mayorprecio: Math.round(rangomayor),
        };

        localStorage.setItem("rangoprecios", JSON.stringify(item));
        localStorage.setItem("filtroprecioprd", JSON.stringify([]));
       
        if (!activafiltrociudad && !filtrocondicionprd) {

            let precios = [];
            productItems &&
                productItems?.map((row, index) => {
                    precios.push(row.price);
                });

            let menorAmayor = precios.sort(function (a, b) {
                return a - b;
            });
            let long = menorAmayor.length;

            setMenorPrecio(menorAmayor[0]);
            setMayorPrecio(menorAmayor[long - 1]);
            let item = {
                menorprecio: menorAmayor[0],
                mayorprecio: menorAmayor[long - 1],
            };

            rangomenor = item.menorprecio;
            rangomayor = item.mayorprecio;

            localStorage.setItem("rangoprecios", JSON.stringify(item));
        }

        setMenorPrecio(rangomenor);
        setMayorPrecio(rangomayor);
        setPrecioFiltroMinimo(rangomenor);
        setPrecioFiltroMaximo(rangomayor);
        setValueInicial(rangomenor);
        setValueFinal(rangomayor);
        setValue([rangomenor, rangomayor]);
        setFiltroPrecio(false);
        dispatch(getOpenCloseCity(1));
    }

    useEffect(() => {
        let rangoprecios = JSON.parse(localStorage.getItem("rangoprecios"));
        let filtroprecioprd = JSON.parse(localStorage.getItem("filtroprecioprd"));

        //console.log("Rangoprecios :", rangoprecios)
        if (rangoprecios && filtroprecioprd?.length > 0 && change) {
            //console.log("RANGo PRECIO : ", rangoprecios);
            setValueInicial(rangoprecios.menorprecio);
            setValueFinal(rangoprecios.mayorprecio);

            setValue([rangoprecios.menorprecio, rangoprecios.mayorprecio]);
            valminimo = rangoprecios.menorprecio;
            valmaximo = rangoprecios.mayorprecio;
        }
    }, [filtroprd, filtrocondprd]);

    useEffect(() => {
        let activafiltrociudad = JSON.parse(localStorage.getItem("activafiltrociudad"));
        let filtroprecioprd = JSON.parse(localStorage.getItem("filtroprecioprd"));
        let filtrocondicionprd = JSON.parse(localStorage.getItem("filtrocondicionprd"));

        if (!activafiltrociudad && filtroprecioprd?.length == 0 && filtrocondicionprd == 0) {
            //limpiarFiltro();
        } else
            if (rangoPrd && change) {
                setValueInicial(rangoPrd.menorprecio);
                setValueFinal(rangoPrd.mayorprecio);
                setValue([rangoPrd.menorprecio, rangoPrd.mayorprecio]);
                valminimo = rangoPrd.menorprecio;
                valmaximo = rangoPrd.mayorprecio;
            }
    }, [openclosecity, rangoPrd])

    return (
        <Box sx={{ width: 100, height: 1 }}>
            <div className="inputdatospreciofiltro">
                <div className="widget-title mlmenos9 tamañotextofiltroprecio">Por Precio</div>
                <Slider
                    className="tamanofiltroprecio"
                    getAriaLabel={() => 'Rango de precio'}
                    value={value}
                    onClick={() => buscarPrd()}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={1000}
                    max={10000000}
                />
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} md={4} lg={4}>
                        <NumberFormat
                            placeholder="Precio mínimo"
                            value={valueInicial}
                            className="mlmenos8 sinborder textocolorfiltroprecio eliminarflechas"
                            //name={datosBuscar}
                            onClick={() => clickInicial()}
                            onChange={(e) => handleChangeInicial(e.target.value)}
                            thousandSeparator={true}
                            prefix={"$ "}
                        />
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                        <NumberFormat
                            placeholder="Precio máximo"
                            value={valueFinal}
                            onClick={() => clickFinal()}
                            className="mlmenos24 sinborder textocolorfiltroprecio eliminarflechas"
                            //name={datosBuscar}
                            onChange={(e) => handleChangeFinal(e.target.value)}
                            thousandSeparator={true}
                            prefix={"$ "}
                        />
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                        <i
                            onClick={() => buscarPrd()}
                            className={classOkPrecio} aria-hidden="true"></i>
                    </Grid>

                </Grid>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} md={12} lg={12} className="mt-2">
                        <div
                            className="tamañobotonlimpiarfiltro apuntador"
                            onClick={() => limpiarFiltro()}
                        >
                            Limpiar Filtro
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
};

export default WidgetFilterByPriceRangeResults;

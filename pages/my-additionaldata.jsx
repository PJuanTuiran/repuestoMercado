import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import UserRepository from "../repositories/UsersRepository";
import PropTypes from "prop-types";
import swal from "sweetalert";
import NumberFormat from "react-number-format";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { getTypesIdentifications } from "../store/typesidentifications/action";
import TypesIdentificationsRepository from "~/repositories/TypesIdentificationsRepository";

//Firebase
import firebase from "../utilities/firebase";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { format } from "prettier";

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

const MyAccountScreen = () => {
    const [formData, setFormData] = useState(defaultValueForm());
    const [formError, setFormError] = useState({});
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(false);
    
    // Inicializamos el arrego de Tipos de Identificación
    const tiposidentificacion = useSelector(
        (state) => state.typesidentifications.typesidentifications
    );
    // Disparar procedimiento que lee los Tipos de Identificaciones
    const dispatch = useDispatch();
    //console.log("TIPOS DE IDENTIFICACIONEs : ", tiposidentificacion);

    // Lee de la base de datos los tipos de Identificación
    useEffect(() => {
        async function typesidentifications(dat) {
            // Lee la función creada en repositories - TypesIdentificationsRepository
            const TypesIdentifications =
                await TypesIdentificationsRepository.getTypesIdentifications(0);
            //console.log("TYPES IDENTIFICATIONS : ", TypesIdentifications);

            // Coloca los datos en state arreglo de categorias
            dispatch(getTypesIdentifications(TypesIdentifications));
        }
        typesidentifications(0);
    }, []);

    //Lee los datos del usuario del state
    const userlogged = useSelector((state) => state.userlogged.userlogged);
    //console.log("DATOS USUARIO LOGUEADO : ", userlogged);

    const users = async () => {
        // POST request using axios with async/await
        const usuario = {
            id: 0,
            uid: userlogged.uid,
            primernombre: formData.primernombre,
            segundonombre: formData.segundonombre,
            primerapellido: formData.primerapellido,
            segundoapellido: formData.segundoapellido,
            razonsocial: formData.razonsocial,
            tipoidentificacion: formData.tipoidentificacion,
            identificacion: formData.identificacion,
            celular: formData.celular,
            direccion: formData.direccion,
        };
        const respuesta = await UserRepository.createUser(usuario);

        if (respuesta.type === 1) {
            console.log("RESPUESTA : ", respuesta);
            swal(
                "Mercado Repuesto",
                "Datos adicionales grabados de forma correcta!",
                "success",
                { button: "Aceptar" }
            );
        }else{
            console.log("RESPUESTA : ", respuesta);
            swal(
                "Mercado Repuesto",
                "Error Grabando Datos adicionales del usuario!",
                "error",
                { button: "Aceptar" }
            );
        }
    };

    const grabardatosadicionales = async (e) => {
        e.preventDefault();
        console.log("FORM DATA : ", formData);

        setFormError({});
        let errors = {};
        let formOk = true;

        if (!formData.primernombre) {
            errors.primernombre = true;
            formOk = false;
        }

        if (!formData.segundonombre) {
            errors.segundonombre = true;
            formOk = false;
        }

        if (!formData.primerapellido) {
            errors.primerapellido = true;
            formOk = false;
        }

        if (!formData.segundoapellido) {
            errors.segundoapellido = true;
            formOk = false;
        }

        if (!formData.segundoapellido) {
            errors.segundoapellido = true;
            formOk = false;
        }

        if (!formData.razonsocial) {
            errors.razonsocial = true;
            formOk = false;
        }

        if (!formData.tipoidentificacion) {
            errors.tipoidentificacion = true;
            formOk = false;
        }

        if (!formData.identificacion) {
            errors.identificacion = true;
            formOk = false;
        }

        if (!formData.celular) {
            errors.celular = true;
            formOk = false;
        }

        if (!formData.direccion) {
            errors.direccion = true;
            formOk = false;
        }

        setFormError(errors);

        if (!formOk) {
            setLoading(true);
            console.log("FORM DATA : ", formData);
            swal(
                "Mercado Repuesto",
                "Debe Ingresar todos los datos del Usuario!",
                "error",
                { button: "Aceptar" }
            );
            return;
        }
        users();
    };

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Container title="Mi Cuenta">
            <div className="ps-page ps-page--inner ">
                <div className="container">
                    <div className="ps-page__header"></div>
                    <div className="ps-page__content ps-account">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <form onChange={onChange}>
                                    <div className="ps-form--review">
                                        <h2 className="ps-form__title">
                                            Datos Adicionales
                                        </h2>
                                        <div className="ps-form__group">
                                            <label className="ps-form__label">
                                                Primer Nombre
                                            </label>
                                            <input
                                                className="form-control ps-form__input"
                                                name="primernombre"
                                                type="text"
                                            />
                                        </div>
                                        <div className="ps-form__group">
                                            <label className="ps-form__label">
                                                Segundo Nombre
                                            </label>
                                            <input
                                                className="form-control ps-form__input"
                                                name="segundonombre"
                                                type="text"
                                            />
                                        </div>
                                        <div className="ps-form__group">
                                            <label className="ps-form__label">
                                                Primer Apelllido
                                            </label>
                                            <input
                                                className="form-control ps-form__input"
                                                name="primerapellido"
                                                type="text"
                                            />
                                        </div>
                                        <div className="ps-form__group">
                                            <label className="ps-form__label">
                                                Segundo Apelllido
                                            </label>
                                            <input
                                                className="form-control ps-form__input"
                                                name="segundoapellido"
                                                type="text"
                                            />
                                        </div>
                                        <div className="ps-form__group">
                                            <label className="ps-form__label">
                                                Razón Social
                                            </label>
                                            <input
                                                className="form-control ps-form__input"
                                                name="razonsocial"
                                                type="text"
                                            />
                                        </div>
                                        <div className="ps-form__group">
                                            <label className="ps-form__label">
                                                Tipo Identificación
                                            </label>
                                            <div className="form-control ps-form__input">
                                                <select
                                                    className="custom-select ps-form__labelselect"
                                                    name="tipoidentificacion">
                                                    <option
                                                        selected
                                                        className="select-fontsize ps-form__label">
                                                        Seleccione tipo de
                                                        identificación
                                                    </option>
                                                    {tiposidentificacion &&
                                                        tiposidentificacion.map(
                                                            (itemselect) => {
                                                                return (
                                                                    <option
                                                                        value={
                                                                            itemselect.id
                                                                        }>
                                                                        {
                                                                            itemselect.descripcion
                                                                        }
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="ps-form__group">
                                            <label className="ps-form__label">
                                                Ingrese Identificación
                                            </label>
                                            <input
                                                className="form-control ps-form__input"
                                                type="number"
                                                name="identificacion"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    inputComponent:
                                                        NumberFormatCustom,
                                                }}
                                            />
                                        </div>
                                        <div className="ps-form__group">
                                            <label className="ps-form__label">
                                                Numero Celular
                                            </label>
                                            <input
                                                className="form-control ps-form__input"
                                                name="celular"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    inputComponent:
                                                        NumberFormatCelular,
                                                }}
                                            />
                                        </div>
                                        <div className="ps-form__group">
                                            <label className="ps-form__label">
                                                Dirección
                                            </label>
                                            <input
                                                className="form-control ps-form__input"
                                                name="direccion"
                                                type="text"
                                            />
                                        </div>

                                        <div className="ps-form__submit">
                                            <div>
                                                <p className="ps-form__text">
                                                    Sugerencias: XXXXXXXX.
                                                </p>
                                            </div>
                                            <div
                                                className="ps-btn ps-btn--warning"
                                                onClick={
                                                    grabardatosadicionales
                                                }>
                                                Grabar
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};


function defaultValueForm() {
    return {
        uid: "",
        primernombre: "",
        segundonombre: "",
        primerapellido: "",
        segundoapellido: "",
        razonsocial: "",
        tipoidentificacion: "",
        identificacion: "",
        celular: "",
        direccion: "",
    };
}

export default MyAccountScreen;

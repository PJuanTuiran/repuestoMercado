import React, { useState } from "react";
import Container from "~/components/layouts/Container";
import { validateEmail } from "../utilities/Validations";
import UserRepository from "../repositories/UsersRepository";
import useGetUsers from "~/hooks/useUsers";
import swal from "sweetalert";

//Firebase
import firebase from "../utilities/firebase";
import "firebase/auth";

const MyAccountScreen = () => {
    const [formData, setFormData] = useState(defaultValueForm());
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState({});
    const [loading, setLoading] = useState(false);
    const [creaUsuario, setCreaUsuario] = useState(true);
    const { getUsers } = useGetUsers();

    const registrarse = async (e) => {
        e.preventDefault();

        setFormError({});
        let errors = {};
        let formOk = true;

        if (!validateEmail(formData.email)) {
            errors.email = true;
            formOk = false;
        }

        if (formData.password.length < 6) {
            errors.password = true;
            formOk = false;
        }

        setFormError(errors);

        if (formOk) {
            setLoading(true);
            console.log(formData.email);
            console.log(formData.password);

            const grabaUsuario = async () => {
                const result = await getUsers({
                    usr_mail: formData.email,
                    usr_password: formData.password,
                });
                console.log("RETORNA : ", result.data);

                if (result.data.type === 1) {
                    swal({
                        title: "Registro Usuarios",
                        text: "Cuenta creada de forma correcta!",
                        icon: "success",
                        button: "Aceptar",
                    });
                } else {
                    swal({
                        title: "Registro Usuarios",
                        text: "Error al crear la cuenta!",
                        icon: "error",
                        button: "Aceptar",
                    });
                }
            };
            grabaUsuario();
        }
        return;
    };

    const login = async () => {
        console.log("LOGIN");
        setFormError({});
        let errors = {};
        let formOk = true;

        if (!validateEmail(formData.email)) {
            errors.email = true;
            formOk = false;
        }
        if (formData.password.length < 6) {
            errors.password = true;
            formOk = false;
        }
        setFormError(errors);

        if (formOk) {
            setLoading(true);

            try {
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(
                        formData.email,
                        formData.password
                    )
                    .then(() => {
                        //updateUser(firebase.auth().currentUser.uid);
                        console.log("ACCESO OK")
                    })
                    .catch((error) => {
                        setLoading(false);
                        swal({
                            title: "CONTROL DE ACCESO",
                            text: "Error en Ingreso de Usuario!",
                            icon: "error",
                            button: "Aceptar",
                        });
                    });
            } catch (error) {
                setLoading(false);
                swal({
                    title: "Control de acceso",
                    text: "La contraseña ingresada no es correcta, para cambiar, dar click en olvidaste contraseña!",
                    icon: "warning",
                    button: "Aceptar",
                });
            }
        }
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
                                            iniciar sesión
                                        </h2>
                                        <div className="ps-form__group">
                                            <label className="ps-form__label">
                                                Nombre Usuario o Dirección de
                                                Correo *
                                            </label>
                                            <input
                                                className="form-control ps-form__input"
                                                name="email"
                                                type="email"
                                            />
                                        </div>
                                        <div className="ps-form__group">
                                            <label className="ps-form__label">
                                                Contraseña *
                                            </label>
                                            <div className="input-group">
                                                <input
                                                    className="form-control ps-form__input"
                                                    name="password"
                                                    type="password"
                                                />
                                                <div className="input-group-append">
                                                    <a
                                                        className="fa fa-eye-slash toogle-password"
                                                        href="#"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ps-form__submit">
                                            <div
                                                className="ps-btn ps-btn--warning"
                                                onClick={login}>
                                                Ingresar
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="remember"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="remember">
                                                    Recuérdame
                                                </label>
                                            </div>
                                        </div>
                                        <a
                                            className="ps-account__link"
                                            href="lost-password.html">
                                            Perdiste tu contraseña?
                                        </a>
                                    </div>
                                </form>
                            </div>
                            <div className="col-12 col-md-6">
                                <form onChange={onChange}>
                                    <div className="ps-form--review">
                                        <h2 className="ps-form__title">
                                            Registrarse
                                        </h2>
                                        <div className="ps-form__group">
                                            <label className="ps-form__label">
                                                Dirección de Correo *
                                            </label>
                                            <input
                                                className="form-control ps-form__input"
                                                name="email"
                                                type="email"
                                            />
                                        </div>
                                        <div className="ps-form__group">
                                            <label className="ps-form__label">
                                                Contraseña *
                                            </label>
                                            <div className="input-group">
                                                <input
                                                    className="form-control ps-form__input"
                                                    type="password"
                                                    name="password"
                                                />
                                                <div className="input-group-append">
                                                    <a
                                                        className="fa fa-eye-slash toogle-password"
                                                        href="#"></a>
                                                </div>
                                            </div>
                                            <p className="ps-form__text">
                                                Sugerencia: La contraseña debe
                                                tener doce caracteres como
                                                mínimo. Para mayor seguridad,
                                                debe incluir letras minúsculas,
                                                mayusculas, números y símbolos
                                                como ! " ? $ % ^ &amp; ).
                                            </p>
                                        </div>
                                        <div className="ps-form__submit">
                                            <div
                                                className="ps-btn ps-btn--warning "
                                                onClick={registrarse}>
                                                Registrarse
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
        email: "",
        password: "",
    };
}

export default MyAccountScreen;

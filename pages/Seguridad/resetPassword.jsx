//import MUI media
import Container from "../../components/layouts/Container";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { validateEmail } from "../../utilities/Validations";
import firebase from "../../utilities/firebase";
import ModalMensajes from "../mensajes/ModalMensajes";
import ModalResetPassword from "../mensajes/ModalResetPassword";
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";
import { Grid } from "@mui/material";

export default function resetPassword() {
    //Top screen
    const irA = useRef(null);
    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [code, setCode] = useState(null);
   
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [tituloMensajesReset, setTituloMensajesReset] = useState("");
    const [textoMensajesReset, setTextoMensajesReset] = useState("");
    const [showModalReset, setShowModalReset] = useState(false);
   
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            var url_string = window.location.href;
            var url = new URL(url_string);
            var code = url.searchParams.get("oobCode");
            setCode(code);
        }
    }, []);

    const validaContraseña = (email) => {
        let texto = null;
        if (!password && !confirmPassword) {
            texto = "Contraseña y confirmación contraseña no son validas.";
        } else if (!password) {
            texto = "Ingresa una contraseña valida.";
        } else if (!confirmPassword) {
            texto = "Confirmación contraseña no es valida.";
        } else if (password != confirmPassword) {
            texto = "Contraseña y confirmación contraseña deben ser iguales.";
        } else if (password.length < 8 || confirmPassword.length < 8) {
            texto = "La contraseña debe tener como minimo 8 caracteres.";
        }

        if (texto) {
            setTituloMensajes("Cambiar contraseña");
            setTextoMensajes(texto);
            setShowModal(true);
        } else {
            handlePasswordReset();
        }
    };

    const handlePasswordReset = () => {
        if (code) {
            firebase
                .auth()
                .confirmPasswordReset(code, password)
                .then(() => {
                    setTituloMensajesReset("Cambiar contraseña");
                    setTextoMensajesReset(
                        "La contraseña se ha cambiado correctamente."
                    );
                    setShowModalReset(true);
                })
                .catch((error) => {
                    setTituloMensajesReset("Cambiar contraseña");
                    setTextoMensajesReset(
                        "Se produjo un error al cambiar la contraseña. Por favor, inténtalo de nuevo."
                    );
                    setShowModalReset(true);
                });
        }
    };

    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalCloseReset = () => {
        setShowModalReset(false);
    };

    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <ModalMensajes
                        shown={showModal}
                        close={handleModalClose}
                        titulo={tituloMensajes}
                        mensaje={textoMensajes}
                        tipo="error"
                    />
                    <ModalResetPassword
                        shown={showModalReset}
                        close={handleModalCloseReset}
                        titulo={tituloMensajesReset}
                        mensaje={textoMensajesReset}
                        tipo="error"
                    />
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account">
                                <div className="titlesformsUsers">
                                    <p>Actualizar contraseña</p>
                                </div>

                                <Grid container>
                                    <Grid item xs={12} md={4} lg={4}></Grid>
                                    <Grid item xs={12} md={4} lg={4}>
                                        <div className="ContResetPassword">
                                            <p>Nueva contraseña</p>
                                            <Grid container>
                                                <Grid
                                                    item
                                                    xs={10}
                                                    md={10}
                                                    lg={10}>
                                                    <input
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        className="InputPasswordReset"
                                                        id="newPassword"
                                                        autoComplete="off"
                                                        placeholder="Nueva contraseña"
                                                        value={password}
                                                        onChange={(e) =>
                                                            setPassword(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item xs={2} md={2} lg={2}>
                                                    <div
                                                        className="iconmostrarclave"
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword
                                                            )
                                                        }>
                                                        {showPassword ? (
                                                            <ImEye />
                                                        ) : (
                                                            <ImEyeBlocked />
                                                        )}
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <p>Confirmar contraseña</p>
                                            <Grid container>
                                                <Grid
                                                    item
                                                    xs={10}
                                                    md={10}
                                                    lg={10}>
                                                    <input
                                                        type={
                                                            showPasswordConfirm
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        className="InputPasswordReset"
                                                        id="newPasswordDos"
                                                        autoComplete="off"
                                                        value={confirmPassword}
                                                        onChange={(e) =>
                                                            setConfirmPassword(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item xs={2} md={2} lg={2}>
                                                    <div
                                                        className="iconmostrarclave"
                                                        onClick={() =>
                                                            setShowPasswordConfirm(
                                                                !showPasswordConfirm
                                                            )
                                                        }>
                                                        {showPasswordConfirm ? (
                                                            <ImEye />
                                                        ) : (
                                                            <ImEyeBlocked />
                                                        )}
                                                    </div>
                                                </Grid>
                                            </Grid>

                                            <button
                                                onClick={validaContraseña}
                                                className="botonguararcontraseña">
                                                Guardar
                                            </button>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={3} lg={3}></Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}

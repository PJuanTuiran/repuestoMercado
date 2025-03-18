import axios from 'axios';
import React, { FC, useEffect, useState } from "react";
import { IoLocationSharp } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { URL_BD_MR } from "~/helpers/Constants";
import { useRouter } from "next/router";
import { getCambioDireccion } from "../../../../store/cambiodireccion/action";
import ModalMensajes from "../../../../pages/mensajes/ModalMensajes";
import ModalDenegarAcceso from "../../../../pages/mensajes/ModalDenegarAcceso";

const EnviarA: FC = () => {
    //Componente que le muestra al usuario enviar a la ciudad mas reciente que tiene loggeada
    const dispatch = useDispatch();

    const datosusuarios = useSelector((state: any) => state.userlogged.userlogged);
    const cambiodireccion = useSelector((state: any) => state.cambiodireccion.cambiodireccion);

    const [showModalMensaje, setShowModalMensaje] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");

    const [showModalDenegarAcceso, setShowModalDenegarAcceso] = useState(false);
    const [tituloControlAcceso, setTituloControlAcceso] = useState("");
    const [textoControlAcceso, setTextoControlAcceso] = useState("");

    const [direccion, setDireccion] = useState<any>(null);
    const router = useRouter();

    //función para obtener direccion de usuario
    useEffect(() => {
        let activacompra = JSON.parse(localStorage.getItem("activacompra"));

        if (activacompra) {
            setShowModalDenegarAcceso(true);
            setTituloControlAcceso("Compras MR");
            setTextoControlAcceso("Proceso de compra se completo de manera correcta!"
            );
            localStorage.setItem("activacompra", JSON.stringify(false));
        }

        const obtenerDireccionUsuario = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "281",
                    params,
                });
                // Ordenamos las direcciones por fecha de creación y seleccionamos la más reciente
                const direccionesOrdenadas = res.data.listardireccionesusuario.sort((a: any, b: any) => new Date(b.fechacreacion).getTime() - new Date(a.fechacreacion).getTime());
                setDireccion(direccionesOrdenadas[0])
                dispatch(getCambioDireccion(0));
            } catch (error) {
                // console.error("Error al leer la dirección del usuario", error);
            }
        };
        obtenerDireccionUsuario();
    }, [datosusuarios, cambiodireccion]);

    const cambiarDireccion = () => {
        let ruta = "/EditUsers/FormsEditUsers/FormDomicilio/";
        router.push(ruta);
    }

    return (
        <>
            <ModalMensajes
                shown={showModalMensaje}
                close={setShowModalMensaje}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="error"
            />

            <ModalDenegarAcceso
                shown={showModalDenegarAcceso}
                close={setShowModalDenegarAcceso}
                titulo={tituloControlAcceso}
                mensaje={textoControlAcceso}
                tipo="1"
            />

            {datosusuarios && datosusuarios.uid ? (
                <div className="UbicacionIzquierda apuntador"
                    onClick={() => cambiarDireccion()}
                >
                    <IoLocationSharp />
                    <div>
                        <p className='PEnviarA'>Enviar a</p>
                        {direccion && <p>{direccion.nombreciudad}</p>}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default EnviarA;
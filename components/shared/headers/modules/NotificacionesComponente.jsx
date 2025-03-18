import React from 'react';
import Popover from '@mui/material/Popover';
import { PiBasketBold } from "react-icons/pi"; //Icono para compra - como comprador 

export default function NotificacionesComponente({ anchorEl, setAnchorEl }) {
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            disableScrollLock={true}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            PaperProps={{
                style: { borderRadius: 3, boxShadow: 'none' },
            }}
        >
            <div className="MainContainerAlertas">
                <div className="subMainContainerAlertas">
                    <p>Notificaciones</p>
                </div>
                <div className="SubMainAlertasContenido">
                    
                    <div className='notifCont'>
                        <div className='notifContIcono'>
                            <PiBasketBold />
                        </div>
                        <div className='notifContenido'>
                            <p>Titulo de la notificacion</p>
                            <p>tienes una respuesta del vendedor</p>
                        </div>
                    </div>
                </div>
            </div>
        </Popover>
    );
}
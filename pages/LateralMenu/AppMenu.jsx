import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { getUserMenu } from "../../store/usermenu/action";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { getCloseMenu } from "../../store/closemenu/action";

function AppMenu(props) {
    const router = useRouter();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openPublicaciones, setOpenPublicaciones] = React.useState(false);
    const [openCompras, setOpenCompras] = React.useState(false);
    const [openVentas, setOpenVentas] = React.useState(false);
    const [openBilletera, setOpenBilletera] = React.useState(false);
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const activausermenu = useSelector((state) => state.usermenu.usermenu);

    function handleClick() {
        setOpen(!open);
    }

    function handleClickPublicaciones() {
        setOpenPublicaciones(!openPublicaciones);
    }

    function handleClickCompras() {
        setOpenCompras(!openCompras);
    }

    function handleClickVentas() {
        setOpenVentas(!openVentas);
    }

    function handleClickBilletera() {
        setOpenBilletera(!openBilletera);
    }

    const options = (id) => {
        if (id == 0) router.push("/publication");
        else if (id == 1) router.push("/EditUsers/MisDatos");
        else if (id == 2) router.push("/Seguridad/seguridadData");
        else if (id == 3) router.push("/MisCompras/misCompras");
        else if (id == 31)
            router.push("/PreguntasYrespuestas/preguntasRealizadasPorUsuario");
        else if (id == 5) router.push("/MisVentas/misVentas");
        else if (id == 51) router.push("/Facturas/facturacion");
        else if (id == 52)
            router.push("/PreguntasYrespuestas/preguntasSobreMisProductos");
        else if (id == 53) router.push("/OpinionesVendedor/opinionesVendedor");
        else if (id == 6) router.push("/MiBilletera");
    };

    const close = () => {
        if (activausermenu) dispatch(getUserMenu(false));
        else dispatch(getUserMenu(true));
    };

    const handleClickAway = () => {
        dispatch(getCloseMenu(true));
    };

    return (
        <div>
            <div className="pt-10"></div>
            <ClickAwayListener onClickAway={handleClickAway}>
                <List
                    component="nav"
                    className={classes.appMenu}
                    disablePadding>
                    {datosusuarios.tipoidentificacion === 6 ? (
                        <Grid container spacing={1}>
                            <Grid item xs={2} md={2} lg={2}>
                                <AccountCircleIcon
                                    style={{
                                        fontSize: 25,
                                        marginLeft: 15,
                                        marginBottom: 10,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <div className="nameuser">
                                    {datosusuarios.razonsocial}
                                </div>
                            </Grid>
                            <Grid item xs={2} md={2} lg={2}>
                                <CloseIcon
                                    className="apuntador"
                                    onClick={() => close()}
                                    style={{
                                        fontSize: 20,
                                        color: "#2D2E83",
                                        marginLeft: 0,
                                        marginTop: 5,
                                        marginBottom: 0,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container spacing={1}>
                            <Grid item xs={1} md={1} lg={1}>
                                <AccountCircleIcon
                                    style={{
                                        fontSize: 25,
                                        color: "#2D2E83",
                                        marginLeft: 5,
                                        marginTop: 5,
                                        marginBottom: 0,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={9} md={9} lg={9}>
                                <div className="nameuser">
                                    {" "}
                                    {datosusuarios.name}
                                </div>
                            </Grid>
                            <Grid item xs={2} md={2} lg={2}>
                                <CloseIcon
                                    onClick={() => close()}
                                    className="apuntador"
                                    style={{
                                        fontSize: 20,
                                        color: "#2D2E83",
                                        marginLeft: 0,
                                        marginTop: 5,
                                        marginBottom: 0,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    )}
                    <Divider />
                    <ListItem
                        button
                        onClick={handleClickPublicaciones}
                        className={classes.menuItem}>
                        <ListItemText primary="Publicaciones" />
                        {open ? (
                            <IconExpandLess
                                style={{
                                    fontSize: 25,
                                    color: "#2D2E83",
                                    marginLeft: 35,
                                    marginTop: -5,
                                }}
                            />
                        ) : (
                            <IconExpandMore
                                style={{
                                    fontSize: 25,
                                    color: "#2D2E83",
                                    marginLeft: 35,
                                    marginTop: -5,
                                }}
                            />
                        )}
                    </ListItem>
                    <Collapse in={openPublicaciones} timeout="auto" unmountOnExit>
                        <Divider />
                        <List component="div" disablePadding>
                            <ListItem
                                button
                                className={classes.menuItem}
                                onClick={() => options(0)}>
                                <ListItemText
                                    className={classes.alingItem}
                                    primary="Publicaciones"
                                />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem
                        button
                        onClick={handleClick}
                        className={classes.menuItem}>
                        <ListItemText primary="Cuenta" />
                        {open ? (
                            <IconExpandLess
                                style={{
                                    fontSize: 25,
                                    color: "#2D2E83",
                                    marginLeft: 35,
                                    marginTop: -5,
                                }}
                            />
                        ) : (
                            <IconExpandMore
                                style={{
                                    fontSize: 25,
                                    color: "#2D2E83",
                                    marginLeft: 35,
                                    marginTop: -5,
                                }}
                            />
                        )}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Divider />
                        <List component="div" disablePadding>
                            <ListItem
                                button
                                className={classes.menuItem}
                                onClick={() => options(1)}>
                                <ListItemText
                                    className={classes.alingItem}
                                    primary="Mis datos"
                                />
                            </ListItem>
                            <ListItem
                                button
                                className={classes.menuItem}
                                onClick={() => options(2)}>
                                <ListItemText
                                    className={classes.alingItem}
                                    primary="Seguridad"
                                />
                            </ListItem>
                        </List>
                    </Collapse>

                    <ListItem
                        button
                        onClick={handleClickCompras}
                        className={classes.menuItem}>
                        <ListItemText primary="Compras" />
                        {openCompras ? (
                            <IconExpandLess
                                style={{
                                    fontSize: 25,
                                    color: "#2D2E83",
                                    marginLeft: 35,
                                    marginTop: -5,
                                }}
                            />
                        ) : (
                            <IconExpandMore
                                style={{
                                    fontSize: 25,
                                    color: "#2D2E83",
                                    marginLeft: 35,
                                    marginTop: -5,
                                }}
                            />
                        )}
                    </ListItem>
                    <Collapse in={openCompras} timeout="auto" unmountOnExit>
                        <Divider />
                        <List component="div" disablePadding>
                            <ListItem
                                button
                                className={classes.menuItem}
                                onClick={() => options(3)}>
                                <ListItemText
                                    className={classes.alingItem}
                                    primary="Mis compras"
                                />
                            </ListItem>
                            <ListItem button className={classes.menuItem}>
                                <ListItemText
                                    onClick={() => options(31)}
                                    className={classes.alingItem}
                                    primary="Preguntas realizadas"
                                />
                            </ListItem>
                        </List>
                    </Collapse>

                    <ListItem
                        button
                        onClick={handleClickVentas}
                        className={classes.menuItem}>
                        <ListItemText primary="Ventas" />
                        {openVentas ? (
                            <IconExpandLess
                                style={{
                                    fontSize: 25,
                                    color: "#2D2E83",
                                    marginLeft: 35,
                                    marginTop: -5,
                                }}
                            />
                        ) : (
                            <IconExpandMore
                                style={{
                                    fontSize: 25,
                                    color: "#2D2E83",
                                    marginLeft: 35,
                                    marginTop: -5,
                                }}
                            />
                        )}
                    </ListItem>
                    <Collapse in={openVentas} timeout="auto" unmountOnExit>
                        <Divider />
                        <List component="div" disablePadding>
                            <ListItem
                                button
                                className={classes.menuItem}
                                onClick={() => options(5)}>
                                <ListItemText
                                    className={classes.alingItem}
                                    primary="Mis ventas"
                                />
                            </ListItem>
                            <ListItem button className={classes.menuItem}>
                                <ListItemText
                                    onClick={() => options(51)}
                                    className={classes.alingItem}
                                    primary="Facturación"
                                />
                            </ListItem>
                            <ListItem button className={classes.menuItem}>
                                <ListItemText
                                    onClick={() => options(52)}
                                    className={classes.alingItem}
                                    primary="Preguntas sobre mis productos"
                                />
                            </ListItem>
                            <ListItem button className={classes.menuItem}>
                                <ListItemText
                                    onClick={() => options(53)}
                                    className={classes.alingItem}
                                    primary="Opiniones como vendedor"
                                />
                            </ListItem>
                        </List>
                    </Collapse>

                    <ListItem
                        button
                        onClick={handleClickBilletera}
                        className={classes.menuItem}>
                        <ListItemText primary="Billetera" />
                        {openBilletera ? (
                            <IconExpandLess
                                style={{
                                    fontSize: 25,
                                    color: "#2D2E83",
                                    marginLeft: 35,
                                    marginTop: -5,
                                }}
                            />
                        ) : (
                            <IconExpandMore
                                style={{
                                    fontSize: 25,
                                    color: "#2D2E83",
                                    marginLeft: 35,
                                    marginTop: -5,
                                }}
                            />
                        )}
                    </ListItem>
                    <Collapse in={openBilletera} timeout="auto" unmountOnExit>
                        <Divider />
                        <List component="div" disablePadding>
                            <ListItem
                                button
                                className={classes.menuItem}
                                onClick={() => options(6)}>
                                <ListItemText
                                    className={classes.alingItem}
                                    primary="Mi Billetera"
                                />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </ClickAwayListener>
        </div>
    );
}

const drawerWidth = 220;

const useStyles = makeStyles((theme) =>
    createStyles({
        appMenu: {
            width: "98%",
        },
        navList: {
            width: drawerWidth,
        },
        menuItem: {
            width: drawerWidth,
        },
        menuItemIcon: {
            color: "#97c05c",
        },
        alingItem: {
            marginLeft: 20,
        },
    })
);

export default AppMenu;

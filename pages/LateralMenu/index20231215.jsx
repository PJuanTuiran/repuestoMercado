import React, { Fragment, useState } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { List, ListSubheader } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";

const useStyles = makeStyles({
    list: {
        width: 170,
    },
    fullList: {
        width: "auto",
    },
    texto: {
        fontSize: 19,
    },
});

function index(props) {
    const classes = useStyles();
    const router = useRouter();

    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === "top" || anchor === "bottom",
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}>
            
            <List className="divmenulateral">
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
                            <div className="">{datosusuarios.razonsocial}</div>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container spacing={1}>
                        <Grid item xs={3} md={3} lg={3}>
                            <AccountCircleIcon
                                style={{
                                    fontSize: 25,
                                    marginLeft: 15,
                                    marginBottom: 10,
                                }}
                            />
                        </Grid>

                        <Grid item xs={2} md={2} lg={2}>
                            <div className="">{datosusuarios.name}</div>
                        </Grid>
                    </Grid>
                )}
                {["Mi cuenta", "Compras", "Ventas"].map((text, index) => (
                    <ListItem button key={text}>
                        {/*
  <ListItemIcon>
                                {index === 0 ? 
                                <AccountCircleIcon
                                style={{
                                    fontSize: 30,
                                }}
                                />
                                :
                                null}
                            </ListItemIcon>
                                */}

                        <ListItemText
                            primary={text}
                            onClick={() => options(index)}
                        />
                    </ListItem>
                ))}
            </List>
            {/*
<List>
                    {["All mail", "Trash", "Spam"].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                    */}
            <Divider />
        </div>
    );

    const options = (id) => {
        if (id == 0) router.push("/EditUsers/MisDatos");
        else if (id == 1) router.push("/MisCompras/misCompras");
        else if (id == 2) router.push("/publication");
    };

    return (
        <div>
            <Fragment
            //key={anchor}
            >
                {!state.left ? (
                    <Button onClick={toggleDrawer("left", true)}>
                        <MenuIcon className="menulateral" />
                    </Button>
                ) : null}

                <Drawer
                    anchor="left"
                    open={state["left"]}
                    onClose={toggleDrawer("left", false)}>
                    {list("left")}
                </Drawer>
            </Fragment>
        </div>
    );
}

export default index;

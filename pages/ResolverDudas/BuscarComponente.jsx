import Container from "../../components/layouts/Container"
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, InputAdornment, TextField, InputBase, Paper } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import { Dropdown } from "react-bootstrap";
import { NextRouter } from "next/router";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AiOutlineRight } from 'react-icons/ai';
import { GrNext } from "react-icons/gr";
import { URL_BD_MR } from "../../helpers/Constants";
import { RiSettings5Fill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';
import ModalMensajesWishListControl from "../mensajes/ModalMensajesWishListControl";
import { getLeeIra } from "../../store/leeira/action";
import { useParams } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { CiSearch } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";


const BuscarComponente = () => {


    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState([]);
    const router = useRouter();


    const relatedWords = {
        'venta': ['vendedor', 'ventas', 'vender', 'vendiste', 'vendiendo', 'vendido', 'vendidos', 'vendidas', 'vendida'],
        'compra': ['comprador', 'compras', 'comprar', 'compraste', 'comprando', 'comprado', 'comprados', 'compradas', 'comprada'],
        'usuario': ['usuarios', 'user', 'users', 'cliente', 'clientes', 'consumidor', 'consumidores'],
        'producto': ['productos', 'artículo', 'artículos', 'bienes', 'mercancía', 'mercancías', 'item', 'items'],
        'envío': ['enviar', 'enviaste', 'enviando', 'enviado', 'enviados', 'enviadas', 'enviada', 'entrega', 'entregar', 'entregado', 'entregados', 'entregadas', 'entregada'],
        'seguimiento': ['rastrear', 'rastreo', 'track', 'tracking', 'seguir', 'estado', 'estatus'],
        'hablar': ['contactar', 'contacto', 'comunicar', 'comunicación', 'mensaje', 'mensajes', 'chat', 'conversar', 'conversación'],
        'calificar': ['valorar', 'valoración', 'puntuar', 'puntuación', 'review', 'reviews', 'opinar', 'opinión', 'opiniones', 'rating', 'ratings', 'estrella', 'estrellas'],
        'devolución': ['devolver', 'devuelto', 'devueltos', 'devueltas', 'devuelta', 'retorno', 'retornar', 'reembolso', 'reembolsar', 'refund'],
        'editar': ['cambiar', 'cambio', 'modificar', 'modificación', 'update', 'actualizar', 'actualización'],
        'datos': ['información', 'info', 'perfil', 'detalles', 'personal', 'personales'],
        'cuenta': ['account', 'usuario', 'perfil', 'registrarse', 'registro', 'login', 'log in', 'sign in', 'signin', 'logon', 'log on', 'signon', 'sign on', 'acceder', 'acceso', 'entrar', 'signup', 'sign up', 'register'],
        'jurídica': ['empresa', 'empresas', 'negocio', 'negocios', 'corporativo', 'corporativos', 'corporación', 'corporaciones', 'compañía', 'compañías', 'sociedad', 'sociedades'],
        'vendi': ['vendedor', 'vendes', 'vendio', 'vender'],
        'vender': ['vendedor', 'vendiste', 'venderé', 'venta', 'vender'],
        'hacer': ['crear', 'realizar', 'presentar']

        // otras palabras y sus palabras relacionadas
    };



    const levenshtein = (a, b) => {
        const an = a ? a.length : 0;
        const bn = b ? b.length : 0;
        if (an === 0) return bn;
        if (bn === 0) return an;
        const matrix = new Array(bn + 1);
        for (let i = 0; i <= bn; ++i) {
            let row = matrix[i] = new Array(an + 1);
            row[0] = i;
        }
        const firstRow = matrix[0];
        for (let j = 1; j <= an; ++j) firstRow[j] = j;
        for (let i = 1; i <= bn; ++i) {
            for (let j = 1; j <= an; ++j) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) matrix[i][j] = matrix[i - 1][j - 1];
                else matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
            }
        }
        return matrix[bn][an];
    };

    const normalize = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^\w\s]/gi, '');
    };

    // Función para consumir el endpoint 116
    const obtenerDatos = async () => {
        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "116",
            });
            return res.data.resolverdudasdos;
        } catch (error) {
            console.error("Error al leer los datos", error);
            return [];
        }
    };

    //función para obtener datos del endPoint del titulo
    const handleChange = async (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value !== '') {
            const datos = await obtenerDatos();

            const searchWords = normalize(event.target.value).split(' ');
            setOptions(datos.filter((item) => {
                const itemWords = normalize(item.nombreniveldos).split(' ');
                return searchWords.every((searchWord) =>
                    itemWords.some((itemWord) =>
                        itemWord.includes(searchWord) ||
                        levenshtein(searchWord, itemWord) < 2 ||
                        (relatedWords[searchWord] && relatedWords[searchWord].includes(itemWord))
                    )
                );
            }));
        } else {
            setOptions([]);
        }
    };



    
    return (
        <div className="contResDudasInputdiv">
            <InputBase
                placeholder="Busca en resuelve tus dudas"
                sx={{
                    borderRadius: '10px',
                    backgroundColor: '#f1f2f6',
                    padding: '8px',
                    marginRight: '8px',
                    width: '100%',
                    height: '44px',
                    padding: '10px',
                    fontSize: '16px',
                    paddingLeft: '3rem',
                    color: '#2C2E82',
                    fontWeight: '500',
                    '&::placeholder': {
                        color: '#3E4089',
                        fontWeight: '600',
                    },
                }}
                endAdornment={
                    <InputAdornment position="end">
                        <SearchIcon style={{ fontSize: 30, color: '#3E4089' }} />
                    </InputAdornment>
                }
                value={searchTerm}
                onChange={handleChange}
            />
            <Paper className="paperOpciones">
                {searchTerm && options.length === 0 ? (
                    <ListItem className="ListItempaperOpciones">
                        No se ha encontrado nada para tu búsqueda
                    </ListItem>
                ) : (
                    options.map((option, index) => (
                        <ListItem
                            className="ListItempaperOpciones"
                            key={index}
                            onClick={() => {
                                router.push({
                                    pathname: `../ResolverDudas/respuestas`,
                                    query: { dato: JSON.stringify(option) }
                                });
                                setSearchTerm(''); // Borra el contenido del campo de entrada
                                setOptions([]); // Cierra las opciones de búsqueda
                            }}
                        >
                            <IoSearch />
                            {option.nombreniveldos}
                        </ListItem>
                    ))
                )}
            </Paper>
        </div>
    );
};

export default BuscarComponente;
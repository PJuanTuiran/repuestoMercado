import React, { Fragment, useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer/lib/react-pdf.browser.cjs";
import axios from "axios";
import Layout from "./Layout";
import { useRouter, connect } from "next/router";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#FFFFFF",
        color: "black",
    },
    section: {
        margin: 10,
        marginLeft: 150,
        padding: 10,
    },
    viewer: {
        width: 800,
        height: 600, 
    },
    titulo: {
        textAlign: "center"
    },
    espacio: {
        marginTop: 40
    },
    textoinformativodos: {
        marginLeft: 40,
        marginRight: 40,
        textAlign: "center",
        marginTop: 40,
        color: "#5A4290"
    },
    textoinformativo: {
        marginLeft: 50,
        marginRight: 50,
        textAlign: "center",
        marginTop: 40
    },
    espaciotextouno: {
        marginLeft: 50,
        marginTop: 20,
        color: "#5A4290"
    },
    espaciotexto: {
        marginLeft: 20,
        marginTop: 20,
        color: "#5A4290"
    },
    espaciotextodos: {
        marginLeft: 20,
        marginTop: 10,
        color: "black"
    },
    image: {
        width: 280,
        height: 80,
    },
    imagedos: {
        width: 100,
        height: 100,
    },
});

function Transactionresponse(props) {
    const router = useRouter();
    const [listarTransaccion, setListarTransaccion] = useState([]);
    const [estadoTransaccion, setEstadoTransaccion] = useState("");
    const [valorPago, setValorPago] = useState(0);

    useEffect(() => {

        let ruta = "/";
        router.push(ruta);

        let idtransaccion = null;
        idtransaccion = JSON.parse(localStorage.getItem("idtransaccion"));


        const transaccion = async () => {

            let params = {
                reference: idtransaccion
            }
            await axios({
                method: 'post',
                url: 'https://gimcloud.com.co/mrp/api/5003', params
            }).then(rest => {
                if (rest) {
                    console.log("RETORNA : ", rest.data);
                    setListarTransaccion(rest.data);
                    if (rest.data[0].status == "APPROVED"){
                        setEstadoTransaccion("APROBADA")
                        setValorPago(Intl.NumberFormat("en-US").format(Number.parseFloat(listarTransaccion[0].amount_in_cents)) )
                    }
                        
                    else
                        setEstadoTransaccion("RECHAZADA")
                }
            }
            ).catch(function (error) {
                console.log("ERROR LEYENDO TRANSACCION");
            })
        };
        //transaccion();

    }, []);

    return (
        <Layout>
            <div className="paginapdf">
                <PDFViewer style={styles.viewer}>
                    {/* Start of the document*/}
                    <Document>
                        {/*render a single page*/}
                        <Page size="LETTER" style={styles.page}>
                            <View style={styles.section}>
                                <Image
                                    style={styles.image}
                                    src="/static/img/logomr.png"
                                />
                              
                            </View>
                            {
                                listarTransaccion.length > 0 ?
                                    (
                                        <View>
                                            <Text style={styles.titulo}  >Transacción: {estadoTransaccion} </Text>
                                            <Text style={styles.espaciotextouno}  >
                                               Mercado Repuesto tu mejor opción en repuestos.
                                            </Text>
                                            <Text style={styles.espaciotexto}  >
                                                Mercado Repuesto S.A.S.
                                            </Text>
                                            <Text style={styles.espaciotextodos}>
                                                Referencia de pago: {listarTransaccion[0].idwompi}
                                            </Text>
                                            <Text style={styles.espaciotextodos}>
                                                Id Cliente: {listarTransaccion[0].user_legal_id}
                                            </Text>
                                            <Text style={styles.espaciotextodos}>
                                                Consecutivo comercio: {listarTransaccion[0].reference}
                                            </Text>
                                            <Text style={styles.espaciotextodos}>
                                                Descripción: "Pago productos Mercado Repuesto"
                                            </Text>
                                            <Text style={styles.espacio}  >
                                            </Text>

                                            <Text style={styles.espaciotexto}>
                                                DATOS DE LA TRANSACCIÓN:
                                            </Text>
                                            <Text style={styles.espaciotextodos}>
                                                Fecha: {listarTransaccion[0].created_at}
                                            </Text>
                                            <Text style={styles.espaciotextodos}>
                                                Valor del pago: {Intl.NumberFormat("en-US").format(Number.parseFloat(listarTransaccion[0].amount_in_cents))}
                                            </Text>
                                            <Text style={styles.espaciotextodos}>
                                                Medio del pago: {listarTransaccion[0].payment_method}
                                            </Text>
                                            <Text style={styles.espaciotextodos}>
                                                Estado: {estadoTransaccion}
                                            </Text>

                                            <Text style={styles.textoinformativo}>
                                                Si deseas más información sobre el estado de la transacción
                                                comunícate con nosotros
                                            </Text>
                                            <Text style={styles.textoinformativodos}>
                                                williamcastrov@gmail.com.co
                                            </Text>

                                        </View>
                                    )
                                    :
                                    null
                            }
                        </Page>
                    </Document>
                </PDFViewer>
            </div>
        </Layout>
    );
}

export default Transactionresponse;
//Funcion para dar formato a la moneda
export const myNumber = (tipo, valor, dec = 2) => {
    return tipo === 1
        ? Intl.NumberFormat("en-US").format(Number.parseFloat(valor).toFixed(dec))
        : Intl.NumberFormat("en-US").format(Number.parseInt(valor));
};

export const nameMonth = (mes, tipo = 2) => {
    switch (mes) {
        case '01':
            return tipo === 1 ? 'Ene' : 'Enero'
        case '02':
            return tipo === 1 ? 'Feb' : 'Febrero'
        case '03':
            return tipo === 1 ? 'Mar' : 'Marzo'
        case '04':
            return tipo === 1 ? 'Abr' : 'Abril'
        case '05':
            return tipo === 1 ? 'May' : 'Mayo'
        case '06':
            return tipo === 1 ? 'Jun' : 'Junio'
        case '07':
            return tipo === 1 ? 'Jul' : 'Julio'
        case '08':
            return tipo === 1 ? 'Ago' : 'Agosto'
        case '09':
            return tipo === 1 ? 'Sep' : 'Septiembre'
        case '10':
            return tipo === 1 ? 'Oct' : 'Octubre'
        case '11':
            return tipo === 1 ? 'Nov' : 'Noviembre'
        case '12':
            return tipo === 1 ? 'Dic' : 'Diciembre'
        default:
            break;
    }
}

export const nombreMes = (tipo, num_mes = 0) => {
    const fecha = new Date();
    let mes = num_mes === 0 ? fecha.getMonth() : num_mes;
    var meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];
    let newMes = meses[Number.parseInt(mes)];
    return tipo === 1 ? newMes.toUpperCase() : newMes.substr(0, 3);
};

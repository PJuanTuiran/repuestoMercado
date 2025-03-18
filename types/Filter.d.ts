export interface Filter {
    vgl_tiposvehiculos: VglTiposvehiculo[];
    vgl_marcasvehiculos: Vgl[];
    vgl_carroceriasvehiculos: VglCarroceriasvehiculo[];
    vgl_annosvehiculos: VglAnnosvehiculo[];
    vgl_modelosvehiculos: Vgl[];
    vgl_cilindrajesvehiculos: VglCilindrajesvehiculo[];
    vgl_categorias: Vgl[];
    vgl_subcategorias: Vgl[];
}

export interface VglAnnosvehiculo {
    id: number;
    anovehiculo: string;
    value: number;
    label: string;
}

export interface VglCarroceriasvehiculo {
    id: number;
    carroceria: string;
    tipovehiculo: number;
    estado: number;
    value: number;
    label: string;
}

export interface Vgl {
    id: number;
    nombre?: string;
    descripcion?: string;
    url?: URL;
    estado: number;
    value: number;
    label: string;
    text?: string;
    tipovehiculo?: number;
    carroceria?: number;
    modelo?: string;
    marca?: number;
    id_categorias?: number;
    palabrasclaves?: string;
}

export enum URL {
    Busesvans = "busesvans",
    Camiones = "camiones",
    Carroscamionetas = "carroscamionetas",
    Electricos = "electricos",
    MercadorepuestoCoCategorias = "/mercadorepuesto.co/categorias",
    Motos = "motos",
}

export interface VglCilindrajesvehiculo {
    id: number;
    cilindraje: string;
    tipovehiculo: number;
    marca: number;
    carroceria: number;
    modelo: number;
    estado: number;
    value: number;
    label: string;
}

export interface VglTiposvehiculo {
    id: number;
    orden: number;
    text: string;
    tipo: string;
    url: string;
    estado: number;
    icon: string;
    value: number;
    label: string;
}

export interface FetchedVehicle {
    id: number;
    idusuario: string;
    tipovehiculo: number;
    carroceria: number;
    marca: number;
    anno: number;
    modelo: number;
    cilindrajemotor: number;
    tipocombustible: number;
    transmision?: number;
    tipotraccion?: number;
    estado: number;
    fecha?: Date;
    comentario: string;
}

export interface FormattedVehicle {
    anno: number;
    carroceria: number;
    cilindrajemotor: number;
    comentario: string;
    estado: number;
    idusuario: string;
    marca: number;
    modelo: number;
    tipocombustible: number;
    tipotraccion: number;
    tipovehiculo: number;
    transmision: number;
}

export interface Vehicle {
    type: string;
    brand: string;
    body: string;
    fuel: string;
    transmision: string;
    traction: string;
    cilinder: string;
    year: string;
    model: string;
}

export interface SavedVehicle extends Vehicle {
    id?: number;
    ids: Vehicle;
}

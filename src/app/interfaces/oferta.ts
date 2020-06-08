export interface Oferta {
    idOferta?: number,
    idUsuarioModificador?: number,
    idUsuario?: number,
    tituloOferta?: string,
    descripcionOferta?: string,
    salarioOferta?: string,
    ciudadOferta?: string,
    fechaPublicacionOferta?: Date,
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    estadoOferta?: number,
    vigente?: boolean,
    link?: string,
    idOfertaProveedor?: number,
    proveedorEmpleo?: string,
    sector?: string,
    tipoContrato?: string
}

export interface Sector{
    Sector?: string;
}
export interface Ciudad{
    Ciudad?: string
}
export interface Salario{
    Salario?: string
}
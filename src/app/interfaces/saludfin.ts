export interface Saludfin {
    idUsuario?: number,
    idIndicador?: number,
    jsonRespuesta?: string
}

export interface SaludIndicador{
    idSaludFinancieraTipo?: number,
    nombreSaludFinancieraTipo?: string,
    descripcion?: string,
    vigente?: boolean,
    scoreUsuario?: number,
    resolucionUsuario?: string,
    ponderacion?: number,
    ponderacionTotal?: number
}
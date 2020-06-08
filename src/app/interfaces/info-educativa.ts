export interface InfoEducativa {
    idInformacionEducativa?: number;
    idDatosPersonales?: number;
    idUsuario?: number;
    dicAreaEstudio?: number;
    dicCiudadEstudio?: number;
    dicIntensidadEstudio?: number;
    institucionEducativa?: string;
    dicNivelEducativo?: number;
    dicTipoEstudio?: number;
    tituloObtenido?: string;
    estadoEstudio?: string;
    otroEstudio?: string;
    fechaInicio?: Date;
    fechaFin?: Date;
    fechaCreacion?: Date;
    fechaActualizacion?: Date;
    esComplementario?:boolean;
    vigente?: boolean;
    dicPaisExtranjero?:number;
    descripcionEducacion?: string;
}

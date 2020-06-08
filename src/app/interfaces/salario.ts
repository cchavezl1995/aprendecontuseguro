export interface Area {
    C_SECTOR?: string,
    D_SECTOR?: string
}

export interface NivelJerarquico {
    C_CHARGE_LEVEL?: string,
    D_CHARGE_LEVEL?: string
}

export interface Cargo {
    C_CHARGE?: string,
    D_CHARGE?: string
}

export interface Region {
    C_CITY?: string,
    D_CITY?: string
}

export interface TamanoEmpresa {
    C_E_SIZE?: string,
    D_E_SIZE?: string
}

export interface Grafico1 {
    minimo?: number;
    maximo?: number;
    promedio?: number;
    consultado?: number;
}

export interface Grafico2 {
    Industria?:string;
    avance?:number;
    valor?:number;
    tipo?:string;
}

export interface Grafico3 {
    nivel?:string;
    avance?:number;
    valor?:number;
    tipo?:string;
}

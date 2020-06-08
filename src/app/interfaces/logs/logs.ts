export interface Log {
    idUsuario?: number;
    ciudad_localizacion?: string;
    fechaServidor?: string;
    horaServidor?: string;
    fechaLocal?: string;
    horaLocal?: string;
    direccion_ip?: string;
    pagina?: string;
    control?: string;
    extra?: string;
}

export interface InfoLocation {
    ip?:string;
    city?:string;
    region?:string;
    region_code?:string;
    country?:string;
    country_name?:string;
    continent_code?:string;
    in_eu?:string;
    postal?:string;
    latitude?:string;
    longitude?:string;
    timezone?:string;
    utc_offset?:string;
    country_calling_code?:string;
    currency?:string;
    languages?:string;
    asn?:string;
    org?:string;
}
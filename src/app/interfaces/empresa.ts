import { IdentidadDigital } from './identidad-digital';

export interface Empresa {
    idEmpresa?:number;
    idUsuario?:number;
    idSector?:number;
    nombreEmpresa?:string;
    descripcionEmpresa?:string;
    mailEmpresarial?:string;
    telefonoEmpresarial?:string;
    idLogo?:string;
    logoEmpresa?:string;
    paginaWeb?:string;
    fechaHoraCreacion?:Date;
    identidadDigital?:string;
    vigente?:boolean;
    nombreArchivo?:string;
    rutaImagen?:string;
    nombreSector?:string;
}

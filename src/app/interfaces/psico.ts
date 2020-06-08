export interface TypePsico{
    $id?: number;
    descripcion?: string;
    idTipoPregunta?: number;
    nombreTipoPregunta?: string;
    tipoEvaluacion?: number;
}

export interface Questions {
    $id?: number;
    IdPregunta?: number;
    glosaPregunta?: string;
    Data?: Data[];
    $values?: any[];
}

export interface Data {
    $id: number
    $values?: Data2
}

export interface Data2 {
    $id: number
    Data: Data[];
    IdPregunta: number;
    glosaPregunta: string;
}

export interface Answer {
    $id?: number;
    esCorrecta?: boolean;
    glosaPreguntaRespuesta?: string;
    idPregunta?: number;
    idPreguntaRespuesta?: number;
    orden?: number;
}

export interface FormAnswers {
    idPrueba?: number;
    idPregunta?: number;
    idPreguntaRespuesta?:number;
}

export interface FormTets {
    idUsuario?:  number;
    idTipoPregunta?:  number;
    esSimulacion?: boolean;
}



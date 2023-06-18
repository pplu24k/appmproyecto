import { coordenada } from "./coordenada";
import { Patient } from "./patient";

export interface Incidence{
    fecha_fin: string | null,
    fecha_inicio: string,
    id: number,
    patient: Patient,
    recorrido_paciente: coordenada[]

}
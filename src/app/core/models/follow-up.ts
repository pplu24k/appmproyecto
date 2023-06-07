import { Patient } from "./patient";

export interface FollowUp{
    fecha: Date,
    id: number,
    lat: number,
    lng: number,
    num_inicidencia: number,
    patient: Patient
    patient_dni: string
}
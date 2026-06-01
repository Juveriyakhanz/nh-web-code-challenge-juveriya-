import {getDistance} from "./getDistance";

export const calculateDistanceWithLab = (clinicianAddress: string, patientAddress: string, selectedLabAddress: string): number => {
    const clinicianToPatient = getDistance(clinicianAddress, patientAddress);
    const patientToLab = getDistance(patientAddress, selectedLabAddress);
    const labToClinician = getDistance(selectedLabAddress, clinicianAddress);

    return clinicianToPatient + patientToLab + labToClinician;
};
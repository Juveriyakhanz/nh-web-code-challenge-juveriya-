import { getDistance } from "./getDistance";

export const calculateDistanceWithLab = (clinicianAddress: string, patientAddress: string, selectedLabAddress: string): number => {
    if (clinicianAddress === "" || patientAddress === "" || selectedLabAddress === "") {
        alert("One or more addresses are missing. Please provide valid addresses.");
        return 0;
    }

    const clinicianToPatient = getDistance(clinicianAddress, patientAddress);
    const patientToLab = getDistance(patientAddress, selectedLabAddress);
    const labToClinician = getDistance(selectedLabAddress, clinicianAddress);

    return clinicianToPatient + patientToLab + labToClinician;
};
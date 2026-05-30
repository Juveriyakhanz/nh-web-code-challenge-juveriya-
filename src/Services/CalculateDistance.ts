import { cliniciansData } from "../Data/CliniciansData";
import { getDistance } from "./randomDistanceGenerator";
import { calculateDistanceWithLab } from "./CalculateDistancewithLab";

interface Result {
  clinician: string;
  distance: number;
}

interface Lab {
  name: string;
  address: string;
}
    
export const findOptimalClinician = (
  patientAddress: string,
  includeLab: boolean,
  selectedLab?: Lab
) => {
  const results: Result[] = cliniciansData.map((clinician) => {
    let totalDistance = 0;

    if (includeLab) {
      totalDistance =
       calculateDistanceWithLab(clinician.address, patientAddress, selectedLab?.address || "");
    } else {
      totalDistance =
        getDistance(clinician.address, patientAddress) *2; // Round trip distance
    }

    return {
      clinician: clinician.name,
      distance: totalDistance,
    };
  });

  const sorted = [...results].sort(
    (a, b) => a.distance - b.distance
  );

  return {
    bestClinician: sorted[0],
    rankings: sorted,
  };
};
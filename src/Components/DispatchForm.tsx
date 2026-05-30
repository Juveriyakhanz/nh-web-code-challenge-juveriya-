import { useState } from "react";
import { labData } from "../Data/LabData";
import { findOptimalClinician } from "../Services/CalculateDistance";

interface Lab {
  name: string;
  address: string;
}

interface Ranking {
  clinician: string;
  distance: number;
}

interface DispatchResult {
  bestClinician: Ranking;
  rankings: Ranking[];
}

export default function DispatchForm() {
  const [patientAddress, setPatientAddress] = useState("");
  const [includeLab, setIncludeLab] = useState(false);
  const [selectedLab, setSelectedLab] = useState<Lab>();
  const [result, setResult] = useState<DispatchResult | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = () => {

    if (!patientAddress.trim()) {
      setError("Patient address is required");
      return;
    }

    if (includeLab && !selectedLab) {
      setError("Please select a lab");
      return;
    }

    setError("");

    const result = findOptimalClinician(
      patientAddress,
      includeLab,
      selectedLab,
    );

    setResult(result);
  };

  return (
    <div>
      <div className="form-group">
        <label className="label">Patient Address</label>
        <input
          className="input"
          value={patientAddress}
          onChange={(e) => setPatientAddress(e.target.value)}
          placeholder="Enter Patient address"
        />
      </div>
      <div>
        <input
          type="checkbox"
          checked={includeLab}
          onChange={(e) => setIncludeLab(e.target.checked)}
        />
        <span> Lab Drop-off Required </span>
      </div>
      {includeLab && (
        <div className="form-group">
          <label className="label">Select Lab</label>
          <select
            className="select"
            onChange={(e) =>
              setSelectedLab(labData.find((lab) => lab.name === e.target.value))
            }
          >
            <option>Select Lab</option>
            {labData.map((lab) => (
              <option key={lab.name} value={lab.name}>
                {lab.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      <button
        className="button"
        onClick={handleSubmit}
        disabled={!patientAddress.trim() || (includeLab && !selectedLab)}
      >
        Find Optimal Clinician
      </button>
      {result && (
        <div>
          <h3>Best Clinician: {result.bestClinician.clinician}</h3>
          <p>Distance: {result.bestClinician.distance.toFixed(2)} miles</p>
          <h4>Clinician Rankings:</h4>
          <ul>
            {result.rankings.map((r) => (
              <li key={r.clinician}>
                {r.clinician}: {r.distance.toFixed(2)} miles
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

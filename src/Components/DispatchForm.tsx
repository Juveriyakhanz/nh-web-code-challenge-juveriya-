import { useState } from "react";
import { labData } from "../Data/LabData";
import { findOptimalClinician } from "../Services/findOptimalClinician";

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
  const [loading, setLoading] = useState(false);
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [submittedLab, setSubmittedLab] = useState<Lab>();
  const [submittedVisitType, setSubmittedVisitType] = useState(false);

  const addressRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  const handleSubmit = () => {
    if (!patientAddress.trim()) {
      setError("Patient address is required");
      return;
    }

    if (!addressRegex.test(patientAddress.trim())) {
      setError("Please enter a valid street address (e.g. 123 Main St)");
      return;
    }

    if (includeLab && !selectedLab) {
      setError("Please select a lab");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      const dispatchResult = findOptimalClinician(
        patientAddress,
        includeLab,
        selectedLab,
      );
      setResult(dispatchResult);
      setSearchCompleted(true);
      setLoading(false);
      setSubmittedLab(selectedLab);
      setSubmittedVisitType(includeLab);
    }, 800);
  };

  return (
    <div className="dashboard-card">
      <h2 className="page-title">Clinician Dispatch Dashboard</h2>

      <div className="form-group">
        <label className="label">Patient Address</label>

        <input
          className="input"
          value={patientAddress}
          onChange={(e) => {
            setPatientAddress(e.target.value);
            setSearchCompleted(false);
            setResult(null);
          }}
          placeholder="Enter patient address"
        />
      </div>

      <div className="checkbox-row">
        <input
          type="checkbox"
          checked={includeLab}
          onChange={(e) => {
            setIncludeLab(e.target.checked);
            setSearchCompleted(false);
            setResult(null);
          }}
        />

        <span>Lab Drop-off Required</span>
      </div>

      {includeLab && (
        <div className="form-group">
          <label className="label">Select Lab</label>

          <select
            className="select"
            value={selectedLab?.name || ""}
            onChange={(e) => {
              setSelectedLab(
                labData.find((lab) => lab.name === e.target.value),
              );
              setSearchCompleted(false);
              setResult(null);
            }}
          >
            <option value="">Select Lab</option>

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
        disabled={
          loading ||
          searchCompleted ||
          !patientAddress.trim() ||
          (includeLab && !selectedLab)
        }
      >
        {loading ? "Finding Optimal Clinician..." : "Find Optimal Clinician"}
      </button>

      {result && (
        <>
          <div className="winner-card">
            <h3>Recommended Clinician</h3>
            <h2>{result.bestClinician.clinician}</h2>
            <strong>
              Distance: {result.bestClinician.distance.toFixed(2)} miles
            </strong>

            {submittedVisitType && submittedLab && (
              <>
                <p>Lab: {submittedLab.name}</p>
                <p>Visit Type: Lab Visit</p>
              </>
            )}
          </div>

          <div className="rankings-section">
            <h3>Clinician Rankings</h3>

            {result.rankings.map((r, index) => (
              <div
                key={r.clinician}
                className={`ranking-card ${index < 3 ? "top-rank" : ""}`}
              >
                <span>
                  {index + 1}. {r.clinician} : {r.distance.toFixed(2)} mi
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

import { useState } from "react";
import { labData } from "../Data/LabData";
import { findOptimalClinician } from "../Services/findOptimalClinician";
import DispatchResult from "./DispatchResult";
import {
  Button,
  Input,
  Select,
  FormGroup,
  Card,
  ErrorMessage,
} from "./CommonComponents";

interface Lab {
  name: string;
  address: string;
}

interface Ranking {
  clinician: string;
  distance: number;
}

interface DispatchResultProps {
  bestClinician: Ranking;
  rankings: Ranking[];
  visitType?: boolean
  name?: string
}

export default function DispatchForm() {
  const [patientAddress, setPatientAddress] = useState("");
  const [includeLab, setIncludeLab] = useState(false);
  const [selectedLab, setSelectedLab] = useState<Lab>();
  const [result, setResult] = useState<DispatchResultProps | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const addressRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  const handleSubmit = () => {

    if (!addressRegex?.test(patientAddress?.trim())) {
      setError("Please enter a valid street address (e.g. 123 Main St)");
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

      setResult({ ...dispatchResult, ...selectedLab, visitType: includeLab });
      setLoading(false);
      setPatientAddress("");
      setIncludeLab(false);
      setSelectedLab(undefined);
    }, 800);
  };

  return (
    <Card>
      <h2 className="page-title">Clinician Dispatch Dashboard</h2>
      <FormGroup label="Patient Address">
        <Input
          value={patientAddress}
          onChange={(e) => {
            setPatientAddress(e.target.value);
            setResult(null);
          }}
          placeholder="Enter patient address"
        />
        {error && <ErrorMessage message={error} />}
      </FormGroup>
      <div className="checkbox-row">
        <input
          type="checkbox"
          checked={includeLab}
          onChange={(e) => {
            setIncludeLab(e.target.checked);
            setResult(null);
          }}
        />
        <span>Lab Drop-off Required</span>
      </div>
      {includeLab && (
        <FormGroup label="Select Lab">
          <Select
            value={selectedLab?.name || ""}
            onChange={(e) => {
              setSelectedLab(
                labData?.find((lab) => lab.name === e.target.value),
              );
              setResult(null);
            }}
          >
            <option value="">Select Lab</option>
            {labData?.map((lab) => (
              <option key={lab.name} value={lab.name}>
                {lab.name}
              </option>
            ))}
          </Select>
        </FormGroup>
      )}
      <Button
        onClick={handleSubmit}
        disabled={
          loading ||
          Boolean(error) ||
          !patientAddress.trim() ||
          (includeLab && !selectedLab)
        }
      >
        {loading ? "Finding Optimal Clinician..." : "Find Optimal Clinician"}
      </Button>
      {result && <DispatchResult result={result} />}
    </Card>
  );
}

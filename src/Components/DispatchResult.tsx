interface Ranking {
  clinician: string;
  distance: number;
}

interface DispatchResultProps {
  result: {
    bestClinician: Ranking;
    rankings: Ranking[];
    visitType?: boolean;
    name?: string;
  };
}

export default function DispatchResult({ result }: DispatchResultProps) {
  return (
    <>
      <div className="winner-card">
        <h3>Recommended Clinician</h3>
        <h2>{result.bestClinician.clinician}</h2>
        <strong>
          Distance: {result.bestClinician.distance.toFixed(2)} miles
        </strong>
        {result.visitType && result.name && (
          <>
            <p>Lab: {result.name}</p>
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
  );
}

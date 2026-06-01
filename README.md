# nh-web-code-challenge-juveriya-
NH-Web-Code-Challenge

## Production MVP Considerations

### 1. Limiting Factors & Potential Issues

#### Current Implementation Limitations:
- **Mock Distance Calculation**: Distances are randomized values (0-100 miles) rather than real geographic calculations. Real production would require integration with a mapping API (Google Maps, Mapbox) for accurate routing and travel time calculations.
- **No Real-Time Clinician Availability**: The system assumes all clinicians are available. Production needs real-time availability tracking, schedules, and calendar integration.
- **Hardcoded Data**: Clinicians and lab locations are static arrays. Production requires a live database with dynamic updates as locations change or new ones are added.
- **No Authentication/Authorization**: System lacks user authentication, role-based access control, and audit trails required for healthcare compliance.
- **Single-Metric Optimization**: Only considers distance. Real dispatch systems need multi-factor scoring algorithms.
- **No Persistence**: Results are not saved to a database. No audit trail or analytics for dispatches made.
- **Browser-Only**: No backend server. Production needs API endpoints, load balancing, and scalability.

#### Immediate User Issues:
- Users will receive random, unrealistic distance values making the recommendation unreliable
- No way to filter/update clinician availability or current location in real-time
- No confirmation of actual dispatch - just recommendations shown on screen
- No notification system to alert clinicians of new assignments

---

### 2. Additional Optimization Factors Beyond Drive Time

#### Clinical & Capability Factors:
- **Clinician Expertise/Specialization**: Match patient condition/service type with clinician qualifications (wound care, phlebotomy, general nursing, etc.)
- **Patient History**: Prioritize clinicians who have previously treated the patient for continuity of care
- **Language Capabilities**: Match clinician language skills with patient needs
- **Special Requirements**: Wheelchair accessibility, pediatric specialists, geriatric training
- **Clinician Ratings/Performance**: Route to higher-rated clinicians based on patient feedback scores

#### Operational Efficiency:
- **Current Workload**: Route to clinicians with fewer active assignments to balance load
- **Schedule Optimization**: Cluster nearby appointments to minimize travel and maximize efficiency
- **Skill Utilization**: Prefer clinicians whose skills precisely match requirements vs. over-qualified assignments
- **Availability Window**: Patient's preferred time vs. clinician's available time slots
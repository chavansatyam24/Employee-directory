
import { Users, UserRoundCheck } from "lucide-react";

function StatsCard({ totalEmployees }) {

  return (
    <div className="stats-grid">

      <div className="stat-card">

        <div className="stat-icon">
          <Users size={23} />
        </div>

        <div>
          <p>Total Employees</p>
          <h2>{totalEmployees}</h2>
        </div>

      </div>

      <div className="stat-card">

        <div className="stat-icon secondary-icon">
          <UserRoundCheck size={23} />
        </div>

        <div>
          <p>Directory Status</p>
          <h2 className="active-status">Active</h2>
        </div>

      </div>

    </div>
  );
}

export default StatsCard;

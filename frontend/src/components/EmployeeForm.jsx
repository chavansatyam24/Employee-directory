
import { UserPlus, Save, X } from "lucide-react";

function EmployeeForm({
  form,
  setForm,
  editingId,
  onSubmit,
  onCancel,
  submitting,
}) {

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  return (
    <section className="panel form-panel">

      <div className="panel-heading">

        <div>
          <span className="section-label">
            EMPLOYEE DETAILS
          </span>

          <h2>
            {editingId ? "Edit Employee" : "Add Employee"}
          </h2>

          <p>
            {editingId
              ? "Update employee information."
              : "Add a new member to your team."}
          </p>
        </div>

        <div className="heading-icon">
          <UserPlus size={21} />
        </div>

      </div>

      <form onSubmit={onSubmit}>

        <div className="form-group">
          <label htmlFor="name">Full Name</label>

          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter employee name"
            value={form.name}
            onChange={handleChange}
            maxLength={100}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>

          <input
            id="email"
            type="email"
            name="email"
            placeholder="employee@company.com"
            value={form.email}
            onChange={handleChange}
            maxLength={150}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Job Role</label>

          <input
            id="role"
            type="text"
            name="role"
            placeholder="e.g. Software Developer"
            value={form.role}
            onChange={handleChange}
            maxLength={100}
            required
          />
        </div>

        <div className="form-actions">

          <button
            type="submit"
            className="primary-btn"
            disabled={submitting}
          >
            <Save size={17} />

            {submitting
              ? "Saving..."
              : editingId
                ? "Update Employee"
                : "Add Employee"}
          </button>

          {editingId && (
            <button
              type="button"
              className="secondary-btn"
              onClick={onCancel}
            >
              <X size={17} />
              Cancel
            </button>
          )}

        </div>

      </form>

    </section>
  );
}

export default EmployeeForm;

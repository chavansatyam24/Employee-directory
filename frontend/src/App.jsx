
import { useEffect, useState } from "react";
import { Users, RefreshCw } from "lucide-react";

import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import SearchBar from "./components/SearchBar";
import StatsCard from "./components/StatsCard";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "./services/employeeService";

import "./App.css";

const initialForm = {
  name: "",
  email: "",
  role: "",
};

function App() {
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getEmployees();

      setEmployees(response.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load employees."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Reset form
  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  // Create or update employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");
      setNotice("");

      if (editingId !== null) {
        await updateEmployee(editingId, form);

        setNotice("Employee updated successfully.");
      } else {
        await createEmployee(form);

        setNotice("Employee added successfully.");
      }

      resetForm();
      await fetchEmployees();

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to save employee."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Edit employee
  const handleEdit = (employee) => {
    setForm({
      name: employee.name,
      email: employee.email,
      role: employee.role,
    });

    // MongoDB ObjectId must remain a string
    setEditingId(employee.id);

    setError("");
    setNotice("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete employee
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setNotice("");

      await deleteEmployee(id);

      setNotice("Employee deleted successfully.");

      // Compare MongoDB IDs as strings
      if (editingId === id) {
        resetForm();
      }

      await fetchEmployees();

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to delete employee."
      );
    }
  };

  // Search employees by name
  const filteredEmployees = employees.filter((employee) =>
    employee.name
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  return (
    <div className="app">

      {/* Header */}
      <header className="topbar">
        <div className="brand">
          <div className="brand-logo">
            <Users size={23} />
          </div>

          <div>
            <h2>PeopleHub</h2>
            <span>Employee Management</span>
          </div>
        </div>

        <div className="admin-label">
          Admin Dashboard
        </div>
      </header>

      <main className="main-container">

        {/* Page Heading */}
        <section className="page-heading">
          <div>
            <span className="eyebrow">
              WORKSPACE / DIRECTORY
            </span>

            <h1>Employee Directory</h1>

            <p>
              Manage your team and employee records.
            </p>
          </div>

          <button
            type="button"
            className="refresh-btn"
            onClick={fetchEmployees}
            disabled={loading}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </section>

        {/* Statistics */}
        <StatsCard
          totalEmployees={employees.length}
        />

        {/* Notifications */}
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {notice && (
          <div className="alert alert-success">
            {notice}
          </div>
        )}

        {/* Dashboard */}
        <section className="dashboard-grid">

          <EmployeeForm
            form={form}
            setForm={setForm}
            editingId={editingId}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            submitting={submitting}
          />

          <section className="panel directory-panel">

            <div className="directory-heading">
              <div>
                <h2>Team Members</h2>

                <p>
                  View and manage your employee records.
                </p>
              </div>

              <span className="record-count">
                {filteredEmployees.length} records
              </span>
            </div>

            <SearchBar
              search={search}
              setSearch={setSearch}
            />

            <EmployeeTable
              employees={filteredEmployees}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

          </section>
        </section>

        <footer className="footer">
          PeopleHub Employee Management System
          <span>Built with React, Node.js, Express and MongoDB</span>
        </footer>

      </main>
    </div>
  );
}

export default App;

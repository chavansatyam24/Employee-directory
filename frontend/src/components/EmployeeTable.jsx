
import { useEffect, useState } from "react";

import {
    Pencil,
    Trash2,
    Users,
    Mail,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

function EmployeeTable({
    employees,
    loading,
    onEdit,
    onDelete
}) {
    const [currentPage, setCurrentPage] = useState(1);

    const employeesPerPage = 5;

    const totalPages = Math.ceil(
        employees.length / employeesPerPage
    );

    // Reset to page 1 when the employee list changes
    useEffect(() => {
        setCurrentPage(1);
    }, [employees]);

    // Get employees for the current page
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

    const currentEmployees = employees.slice(
        indexOfFirstEmployee,
        indexOfLastEmployee
    );

    // Pagination navigation
    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    if (loading) {
        return (
            <div className="table-message">
                Loading employees...
            </div>
        );
    }

    if (employees.length === 0) {
        return (
            <div className="table-message empty-state">
                <Users size={35} />
                <h3>No employees found</h3>
                <p>Add your first employee to get started.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>EMPLOYEE</th>
                            <th>EMAIL ADDRESS</th>
                            <th>JOB ROLE</th>
                            <th>JOINED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentEmployees.map((employee) => (
                            <tr key={employee.id}>
                                <td>
                                    <div className="employee-cell">
                                        <div className="avatar">
                                            {employee.name.charAt(0).toUpperCase()}
                                        </div>

                                        <div>
                                            <strong>{employee.name}</strong>
                                            <span>
                                                Employee #{employee.id.slice(-6)}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div className="email-cell">
                                        <Mail size={15} />
                                        {employee.email}
                                    </div>
                                </td>

                                <td>
                                    <span className="role-badge">
                                        {employee.role}
                                    </span>
                                </td>

                                <td>
                                    {employee.created_at
                                        ? new Date(
                                            employee.created_at
                                        ).toLocaleDateString()
                                        : "—"}
                                </td>

                                <td>
                                    <div className="action-buttons">
                                        <button
                                            type="button"
                                            className="icon-btn edit-btn"
                                            onClick={() => onEdit(employee)}
                                            title="Edit employee"
                                        >
                                            <Pencil size={16} />
                                        </button>

                                        <button
                                            type="button"
                                            className="icon-btn delete-btn"
                                            onClick={() => onDelete(employee.id)}
                                            title="Delete employee"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
                <span className="pagination-info">
                    Showing {indexOfFirstEmployee + 1}–{
                        Math.min(indexOfLastEmployee, employees.length)
                    } of {employees.length} employees
                </span>

                <div className="pagination-controls">
                    <button
                        type="button"
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className="pagination-btn"
                    >
                        <ChevronLeft size={16} />
                        Previous
                    </button>

                    <span className="pagination-page">
                        {currentPage} / {totalPages}
                    </span>

                    <button
                        type="button"
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="pagination-btn"
                    >
                        Next
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EmployeeTable;

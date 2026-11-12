
import axios from "axios";

// Backend API base URL
const API_URL = "http://localhost:8000";

// Create Axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// GET: Fetch all employees
export const getEmployees = async () => {
    const response = await api.get("/employees");
    return response.data;
};

// GET: Fetch a single employee by ID
export const getEmployeeById = async (id) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
};

// POST: Create a new employee
export const createEmployee = async (employeeData) => {
    const response = await api.post("/employees", employeeData);
    return response.data;
};

// PUT: Update an existing employee
export const updateEmployee = async (id, employeeData) => {
    const response = await api.put(`/employees/${id}`, employeeData);
    return response.data;
};

// DELETE: Delete an employee
export const deleteEmployee = async (id) => {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
};

export default api;

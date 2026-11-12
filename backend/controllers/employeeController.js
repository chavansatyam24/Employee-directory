
const Employee = require("../models/Employee");

// Convert MongoDB document into frontend-friendly format
const formatEmployee = (employee) => {
    return {
        id: employee._id.toString(),
        name: employee.name,
        email: employee.email,
        role: employee.role,
        created_at: employee.created_at,
        updated_at: employee.updated_at
    };
};

// GET all employees
const getEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find().sort({ created_at: -1 });

        res.status(200).json({
            success: true,
            count: employees.length,
            data: employees.map(formatEmployee)
        });
    } catch (error) {
        next(error);
    }
};

// GET employee by ID
const getEmployeeById = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        res.status(200).json({
            success: true,
            data: formatEmployee(employee)
        });
    } catch (error) {
        next(error);
    }
};

// CREATE employee
const createEmployee = async (req, res, next) => {
    try {
        const { name, email, role } = req.body;

        if (!name || !email || !role) {
            return res.status(400).json({
                success: false,
                message: "Name, email and role are required"
            });
        }

        const employee = await Employee.create({
            name,
            email,
            role
        });

        res.status(201).json({
            success: true,
            message: "Employee created successfully",
            data: formatEmployee(employee)
        });
    } catch (error) {
        next(error);
    }
};

// UPDATE employee
const updateEmployee = async (req, res, next) => {
    try {
        const { name, email, role } = req.body;

        if (!name || !email || !role) {
            return res.status(400).json({
                success: false,
                message: "Name, email and role are required"
            });
        }

        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            { name, email, role },
            {
                new: true,
                runValidators: true
            }
        );

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            data: formatEmployee(employee)
        });
    } catch (error) {
        next(error);
    }
};

// DELETE employee
const deleteEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};

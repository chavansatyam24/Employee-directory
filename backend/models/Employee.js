
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Employee name is required"],
            trim: true,
            maxlength: 100
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            maxlength: 150,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
        },

        role: {
            type: String,
            required: [true, "Employee role is required"],
            trim: true,
            maxlength: 100
        }
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
);

module.exports = mongoose.model("Employee", employeeSchema);

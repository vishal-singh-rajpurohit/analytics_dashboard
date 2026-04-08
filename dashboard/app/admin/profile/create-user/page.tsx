'use client'
import { useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[6-9]\d{9}$/; // Indian mobile format
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

export default function CreateUserPage(){

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    role: "Supervisor",
  });

  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      name: "",
      mobile: "",
      email: "",
      password: "",
    };

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!mobileRegex.test(form.mobile)) {
      newErrors.mobile = "Enter valid 10-digit mobile number";
      valid = false;
    }

    if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter valid email address";
      valid = false;
    }

    if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "Password must be 6+ chars with letters & numbers";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("User Created:", form);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-lg border border-slate-200">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6 text-center">Create User</h2>
        <div className="mb-4">
          <label className="text-sm text-slate-600 block mb-1">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`w-full px-4 py-2 border rounded-xl ${
              errors.name ? "border-red-400" : "border-slate-300"
            }`}
            placeholder="Enter name"
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="text-sm text-slate-600 block mb-1">Mobile</label>
          <input
            type="text"
            value={form.mobile}
            onChange={(e) => handleChange("mobile", e.target.value)}
            className={`w-full px-4 py-2 border rounded-xl ${
              errors.mobile ? "border-red-400" : "border-slate-300"
            }`}
            placeholder="Enter mobile number"
          />
          {errors.mobile && (
            <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="text-sm text-slate-600 block mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={`w-full px-4 py-2 border rounded-xl ${
              errors.email ? "border-red-400" : "border-slate-300"
            }`}
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="text-sm text-slate-600 block mb-1">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className={`w-full px-4 py-2 border rounded-xl ${
              errors.password ? "border-red-400" : "border-slate-300"
            }`}
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className="text-sm text-slate-600 block mb-1">Role</label>
          <select
            value={form.role}
            onChange={(e) => handleChange("role", e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-xl"
          >
            <option value="Super">Super</option>
            <option value="Supervisor">Supervisor</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl bg-black text-white font-medium hover:bg-slate-800 transition"
        >
          Create User
        </button>

      </div>
    </div>
  );
};
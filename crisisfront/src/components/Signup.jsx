import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
      confirmPassword,
      role,
    } = formData;

    // 🔒 Frontend validation
    if (!firstName || !lastName || !email || !mobileNumber || !password) {
      return setError("All fields are required.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (password.length < 8) {
      return setError("Password must be at least 8 characters long.");
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://crisis-care.onrender.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname: firstName.trim(),
            lastname: lastName.trim(),
            email: email.trim().toLowerCase(),
            mobile_number: mobileNumber.trim(),
            role,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Signup failed");
      }

      setSuccess("Account created successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-slate-200 px-6 sm:px-10 py-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Join CrisisCare and help communities in need
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
            <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>

          <Input label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} />
          <Input label="Mobile Number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />

          <PasswordInput
            label="Password"
            value={formData.password}
            show={showPassword}
            toggle={() => setShowPassword(!showPassword)}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <PasswordInput
            label="Confirm Password"
            value={formData.confirmPassword}
            show={showConfirmPassword}
            toggle={() => setShowConfirmPassword(!showConfirmPassword)}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="user">User</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 rounded-lg bg-blue-600 py-3 text-white text-sm font-semibold
                       hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed
                       focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-7">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

/* ---------- Reusable Inputs ---------- */

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">
      {label}
    </label>
    <input
      {...props}
      required
      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-600"
    />
  </div>
);

const PasswordInput = ({ label, show, toggle, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        required
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 pr-10 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-600"
        {...props}
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  </div>
);

export default Signup;

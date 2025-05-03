// components/auth/ResetPasswordForm.js
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function ResetPasswordForm() {
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/api/auth/reset-password", {
        token,
        password,
      });
      setMessage(res.data.msg);
      setTimeout(() => router.push("/"), 3000);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Invalid or expired token");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
      <form onSubmit={handleReset}>
        <label className="block mb-2">New Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="block mb-2">Confirm Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded mb-4"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Reset Password
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-center text-gray-700">{message}</p>}
    </div>
  );
}

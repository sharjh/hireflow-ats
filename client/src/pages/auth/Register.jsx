import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../auth/AuthContext';
import api from '../../api/axios';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // optional: auto-login after register

  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'CANDIDATE',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.post('/auth/register', form);

      await login({ email: form.email, password: form.password });
      navigate('/');

    } catch (err) {
      setError(
        err.response?.data?.error || 'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="CANDIDATE">Candidate</option>
            <option value="COMPANY">Company</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-teal-600 text-white py-2 rounded-xl hover:bg-teal-700 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Register
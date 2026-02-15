import { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../../api/axios';


const createCompany = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    location: '',
    website: '',
    description: '',
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
      await api.post('/companies', form);
      navigate('/companies/me'); // redirect to profile
    } catch (err) {
      setError(
        err.response?.data?.error || 'Failed to create company'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Company Profile
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            name="name"
            placeholder="Company Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />

          <input
            type="text"
            name="website"
            placeholder="Website"
            value={form.website}
            onChange={handleChange}
            className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />

          <textarea
            name="description"
            placeholder="Company Description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Company'}
          </button>

        </form>
      </div>
    </div>
  );
}

export default createCompany;
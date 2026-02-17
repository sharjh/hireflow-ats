import { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../../api/axios';

const CreateJob = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    employment_type: 'FULL_TIME',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      await api.post('/jobs', form);
      navigate('/dashboard/company');
    } catch (err) {
      setError(
        err.response?.data?.error || 'Failed to create job'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white p-6 rounded-xl shadow-md">

        <h2 className="text-2xl font-bold mb-6">
          Create Job
        </h2>

        {error && (
          <div className="mb-4 text-red-600">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Job Title"
            required
            className="w-full border px-4 py-2 rounded-xl focus:ring-2 focus:ring-teal-500"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Job Description"
            rows={5}
            required
            className="w-full border px-4 py-2 rounded-xl focus:ring-2 focus:ring-teal-500"
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border px-4 py-2 rounded-xl focus:ring-2 focus:ring-teal-500"
          />

          <select
            name="employment_type"
            value={form.employment_type}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-xl focus:ring-2 focus:ring-teal-500"
          >
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="INTERNSHIP">Internship</option>
            <option value="CONTRACT">Contract</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700"
          >
            {loading ? 'Creating...' : 'Create Job'}
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateJob;
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import api from '../../api/axios';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    employment_type: '',
    status: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        const job = res.data.data;

        setForm({
          title: job.title || '',
          description: job.description || '',
          location: job.location || '',
          employment_type: job.employment_type || '',
          status: job.status || '',
        });
      } catch (err) {
        setError('Failed to load job');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.patch(`/jobs/${id}`, form);
      navigate('/dashboard/company');
    } catch (err) {
      setError(
        err.response?.data?.error || 'Failed to update job'
      );
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow-md">

        <h2 className="text-2xl font-bold mb-6">
          Edit Job
        </h2>

        {error && (
          <div className="mb-4 text-red-600">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-teal-500"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-teal-500"
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-teal-500"
          />

          <select
            name="employment_type"
            value={form.employment_type}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-teal-500"
          >
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="INTERNSHIP">Internship</option>
            <option value="CONTRACT">Contract</option>
          </select>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-teal-500"
          >
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
          </select>

          <button
            type="submit"
            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Save Changes
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditJob;
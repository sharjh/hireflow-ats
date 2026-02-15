import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../../api/axios';

const EditCompany = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    location: '',
    website: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await api.get('/companies/me');
        setForm(res.data.data);
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.patch('/companies/me', form);
      navigate('/companies/me');
    } catch (err) {
      console.log(err.response);
      setError(err.response?.data?.error || 'Failed to update company');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white p-6 rounded-xl shadow-md">

        <h2 className="text-2xl font-bold mb-6">
          Edit Company Profile
        </h2>

        {error && (
          <div className="mb-4 text-red-600">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full border px-4 py-2 rounded-xl focus:ring-2 focus:ring-teal-500"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={4}
            className="w-full border px-4 py-2 rounded-xl focus:ring-2 focus:ring-teal-500"
          />

          <input
            name="location"
            value={form.location || ''}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border px-4 py-2 rounded-xl focus:ring-2 focus:ring-teal-500"
          />

          <input
            name="website"
            value={form.website || ''}
            onChange={handleChange}
            placeholder="Website"
            className="w-full border px-4 py-2 rounded-xl focus:ring-2 focus:ring-teal-500"
          />

          <button
            type="submit"
            className="px-6 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700"
          >
            Save Changes
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditCompany
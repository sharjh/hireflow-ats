import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../../api/axios';

const CompanyProfile = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
        try {
            const res = await api.get('/companies/me');
            setCompany(res.data.data);
        } catch (err) {
        if (err.response?.status === 404) {
            navigate('/companies/create');
        } else {
            setError('Failed to load profile');
        }
        } finally {
            setLoading(false);
        }
    };
    fetchCompany();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white p-6 rounded-xl shadow-md">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Company Profile
          </h2>

          <button
            onClick={() => navigate('/companies/edit')}
            className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700"
          >
            Edit Profile
          </button>
        </div>

        <div className="space-y-4">

          <div>
            <label className="font-semibold">Name</label>
            <p className="text-gray-700">{company.name}</p>
          </div>

          <div>
            <label className="font-semibold">Location</label>
            <p className="text-gray-700">{company.location}</p>
          </div>

          <div>
            <label className="font-semibold">Website</label>
            <p className="text-gray-700">{company.website}</p>
          </div>

          <div>
            <label className="font-semibold">Description</label>
            <p className="text-gray-700">{company.description}</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;
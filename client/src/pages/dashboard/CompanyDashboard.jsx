import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../../api/axios';

const CompanyDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs/me');
        setJobs(res.data.data || []);
      } catch (err) {
        setError('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Company Dashboard
        </h1>

        <button
          onClick={() => navigate('/jobs/create')}
          className="px-5 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700"
        >
          + Create Job
        </button>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-600">
            No jobs posted yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">
                  {job.title}
                </h2>

                <p className="text-gray-600">
                  {job.location || 'No location specified'}
                </p>

                <span
                  className={`text-sm px-2 py-1 rounded ${
                    job.status === 'OPEN'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {job.status}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/jobs/${job.id}`)}
                  className="text-teal-600 hover:underline"
                >
                  View
                </button>

                <button
                  onClick={() => navigate(`/jobs/edit/${job.id}`)}
                  className="text-gray-600 hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => navigate(`/applications/job/${job.id}`)}
                  className="text-gray-600 hover:underline"
                >
                  Applicants
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CompanyDashboard;
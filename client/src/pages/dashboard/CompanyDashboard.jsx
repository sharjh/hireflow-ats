import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../../api/axios';

const CompanyDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const navigate = useNavigate();

  const handleToggle = async (job) => {
    try {
      const newStatus = job.status === 'OPEN' ? 'CLOSED' : 'OPEN';

      const res = await api.patch(`/jobs/${job.id}/status`, {
        status: newStatus
      });

      setJobs((prevJobs) =>
        prevJobs.map((j) =>
          j.id === job.id ? res.data.data : j
        )
      );

    } catch (err) {
      console.error('Failed to toggle status');
    }
  };

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
          className="px-5 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 cursor-pointer"
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

                <button
                  onClick={() => handleToggle(job)}
                  className={`px-3 py-1 text-sm rounded cursor-pointer ${
                    job.status === 'OPEN'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {job.status === 'OPEN' ? 'Close Job' : 'Reopen Job'}
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedJob(job)}
                  className="text-teal-600 hover:underline cursor-pointer"
                >
                  View
                </button>

                <button
                  onClick={() => navigate(`/jobs/edit/${job.id}`)}
                  className="text-gray-600 hover:underline cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => navigate(`/applications/job/${job.id}`)}
                  className="text-gray-600 hover:underline cursor-pointer"
                >
                  Applicants
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedJob && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">

          <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">

            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">
              {selectedJob.title}
            </h2>

            <p className="mb-4 text-gray-700">
              {selectedJob.description}
            </p>

            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Location:</strong> {selectedJob.location || 'N/A'}</p>
              <p><strong>Status:</strong> {selectedJob.status}</p>
              <p><strong>Type:</strong> {selectedJob.employment_type}</p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyDashboard;
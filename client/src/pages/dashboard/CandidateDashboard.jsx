import { useEffect, useState } from 'react';
import api from '../../api/axios';

const CandidateDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        const res = await api.get('/applications/me');
        setApplications(res.data.data || []);
      } catch (err) {
        setError('Failed to load applications');
      } finally {
        setLoading(false);
      }
    };

    fetchMyApplications();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow">
          You have not applied to any jobs yet.
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white p-6 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">
                  {app.title}
                </h2>

                <p className="text-gray-600">
                  {app.company_name}
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  Status: {app.status}
                </p>

                <a
                  href={app.resume_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-600 text-sm hover:underline"
                >
                  View Submitted Resume
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default CandidateDashboard;
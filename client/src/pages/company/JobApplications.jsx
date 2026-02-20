import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import api from '../../api/axios';

const JobApplications = () => {
  const { jobId } = useParams();

  const [allApplications, setAllApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [filter, setFilter] = useState('ALL');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
        try {
            const res = await api.get(`/applications/job/${jobId}`);
            setAllApplications(res.data.data || []);
            setFilteredApplications(res.data.data || []);
        } catch (err) {
            setError('Failed to load applications');
        } finally {
            setLoading(false);
        }
    };

    fetchApplications();
  }, [jobId]);

  useEffect(() => {
    if (filter === 'ALL') {
      setFilteredApplications(allApplications);
    } else {
      setFilteredApplications(
        allApplications.filter((app) => app.status === filter)
      );
    }
  }, [filter, allApplications]);

  const updateStatus = async (applicationId, newStatus) => {
    try {
      await api.patch(`/applications/${applicationId}`, {
        status: newStatus,
      });

      // Update local state safely (no backend shape mismatch)
      setAllApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId
            ? { ...app, status: newStatus }
            : app
        )
      );
    } catch (err) {
      console.error('Failed to update status');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Applications
      </h1>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-8">
        {['ALL', 'PENDING', 'REVIEWED', 'ACCEPTED', 'REJECTED'].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-xl text-sm cursor-pointer ${
                filter === status
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status}
            </button>
          )
        )}
      </div>

      {filteredApplications.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow">
          No applications found.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((app) => (
            <div
              key={app.id}
              className="bg-white p-6 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold"> {app.candidate_email} </p>
                <a
                  href={app.resume_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-600 text-sm hover:underline"
                >
                  View Resume
                </a>

                <p className="text-sm text-gray-600 mt-2"> Status: {app.status} </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => updateStatus(app.id, 'REVIEWED')}
                  className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded cursor-pointer hover:bg-yellow-200 active:bg-yellow-300"
                >
                  Review
                </button>

                <button
                  onClick={() => updateStatus(app.id, 'ACCEPTED')}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded cursor-pointer hover:bg-green-200 active:bg-green-300"
                >
                  Accept
                </button>

                <button
                  onClick={() => updateStatus(app.id, 'REJECTED')}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded cursor-pointer hover:bg-red-200 active:bg-red-300"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default JobApplications;
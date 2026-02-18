import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../../auth/AuthContext';
import api from '../../api/axios';

const JobDetails = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();

  const [job, setJob] = useState(null);
  const [resumeUrl, setResumeUrl] = useState('');
  const [hasApplied, setHasApplied] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applyMessage, setApplyMessage] = useState(null);

  const formatEmploymentType = (type) => {
    return type
      ?.toLowerCase()
      .split('_')
      .map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(' ');
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data.data);
      } catch (err) {
        setError('Failed to load job');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();

    try {
      await api.post('/applications', {
        jobId: id,
        resume_url: resumeUrl,
      });

      setHasApplied(true);
      setApplyMessage('Application submitted successfully.');
    } catch (err) {
      if (err.response?.status === 409) {
        setHasApplied(true);
        setApplyMessage('You have already applied.');
      } else {
        setApplyMessage('Failed to apply.');
      }
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!job) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">

      <div className="bg-white p-8 rounded-lg shadow-md">

        <h1 className="text-3xl font-bold mb-4">
          {job.title}
        </h1>

        <p className="text-gray-600 mb-2">
          {job.location || 'Location not specified'}
        </p>

        <p className="text-gray-500 text-sm mb-6">
          {formatEmploymentType(job.employment_type)}
        </p>

        <p className="text-gray-700 whitespace-pre-line mb-8">
          {job.description}
        </p>

        {/* Apply Section */}
        {isAuthenticated && user?.role === 'CANDIDATE' && job.status === 'OPEN' && (
          <div className="border-t border-t-gray-300 pt-6">

            <h2 className="text-xl font-semibold mb-4">
              Apply for this job
            </h2>

            {hasApplied ? (
              <div className="text-green-600">
                {applyMessage}
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">

                <input
                  type="text"
                  placeholder="Resume URL"
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                  required
                  className="w-full border px-4 py-2 rounded-xl focus:ring-2 focus:ring-teal-500"
                />

                <button
                  type="submit"
                  className="px-6 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 cursor-pointer"
                >
                  Apply
                </button>

              </form>
            )}

          </div>
        )}

        {!isAuthenticated && (
          <p className="text-sm text-gray-500 mt-6">
            Please login as a candidate to apply.
          </p>
        )}

        {job.status === 'CLOSED' && (
          <div className="text-red-600 mt-6">
            This job is no longer accepting applications.
          </div>
        )}

      </div>
    </div>
  );
}

export default JobDetails;
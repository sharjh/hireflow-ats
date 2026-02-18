import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../../api/axios';

const Jobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalPages = Math.ceil(total / limit);

  const formatEmploymentType = (type) => {
    return type
      .toLowerCase()              // full_time
      .split('_')                 // ["full", "time"]
      .map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(' ');
  };

  const fetchJobs = async (pageNumber) => {
    try {
      setLoading(true);

      const res = await api.get(
        `/jobs?page=${pageNumber}&limit=${limit}`
      );

      setJobs(res.data.data || []);
      setTotal(res.data.total || 0);
      setPage(res.data.page || pageNumber);

    } catch (err) {
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(page);
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        Available Jobs
      </h1>

      {jobs.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow">
          No jobs available.
        </div>
      ) : (
        <>
          <div className="grid gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-md transition"
                onClick={() => navigate(`/jobs/${job.id}`)}
              >
                <h2 className="text-xl font-semibold">
                  {job.title}
                </h2>

                <p className="text-gray-600">
                  {job.location || 'Location not specified'}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  {formatEmploymentType(job.employment_type)}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-10">

            <button
              disabled={page === 1}
              onClick={() => fetchJobs(page - 1)}
              className="px-4 py-2 bg-gray-200 rounded-xl disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <span className="text-sm select-none">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() => fetchJobs(page + 1)}
              className="px-4 py-2 bg-gray-200 rounded-xl disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              Next
            </button>

          </div>
        </>
      )}

    </div>
  );
}

export default Jobs;
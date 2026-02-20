import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import api from '../../api/axios';

const Jobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [typeFilter, setTypeFilter] = useState('ALL');

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

      let url = `/jobs?page=${pageNumber}&limit=${limit}`;

      if (search.trim()) {
        url += `&search=${encodeURIComponent(search)}`;
      }

      if (location.trim()) {
        url += `&location=${encodeURIComponent(location)}`;
      }

      if (typeFilter !== 'ALL') {
        url += `&type=${typeFilter}`;
      }

      const res = await api.get(url);

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
    fetchJobs(1);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(1);
  };

  const handleFilterChange = (e) => {
    setTypeFilter(e.target.value);
    fetchJobs(1);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        Available Jobs
      </h1>

      <div className="bg-white p-4 rounded-xl shadow mb-8 flex flex-col md:flex-row gap-4">

        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border px-4 py-2 rounded-xl focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 cursor-pointer"
          >
            Search
          </button>
        </form>

        <select
          value={typeFilter}
          onChange={handleFilterChange}
          className="border px-4 py-2 rounded-xl focus:ring-2 focus:ring-teal-500"
        >
          <option value="ALL">All Types</option>
          <option value="FULL_TIME">Full Time</option>
          <option value="PART_TIME">Part Time</option>
          <option value="INTERNSHIP">Internship</option>
          <option value="CONTRACT">Contract</option>
        </select>

      </div>

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
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">

              <button
                disabled={page <= 1}
                onClick={() => fetchJobs(page - 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-sm">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page >= totalPages}
                onClick={() => fetchJobs(page + 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>

            </div>
          )}
        </>
      )}

    </div>
  );
}

export default Jobs;
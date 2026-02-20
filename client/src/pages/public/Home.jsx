import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

export default function Home() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (search.trim()) params.append('search', search);
    if (location.trim()) params.append('location', location);

    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      {/* Hero Section */}
      <section className="bg-teal-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">
            Your Next Career Move Starts Here
          </h1>

          <p className="text-xl mb-8">
            Discover jobs, apply instantly, and manage applications all in one place.
          </p>

          {/* Search Inputs */}
          <form className="flex flex-col md:flex-row justify-center gap-3" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Job title or keyword"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-2/5 px-4 py-3 text-gray-400 border border-teal-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full md:w-2/5 px-4 py-3 text-gray-400 border border-teal-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
            />

            <button
              type="submit"
              className="px-6 py-3 bg-white text-teal-600 font-semibold rounded-xl hover:bg-gray-100 cursor-pointer"
            >
              Search Jobs
            </button>
          </form>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Why Choose Our Platform?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">Fast Applications</h3>
              <p>
                Apply to jobs quickly with a single click — built for speed and ease.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">Company Dashboards</h3>
              <p>
                Companies can post jobs and manage applicants without the hassle.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p>
                Candidates can monitor application status from one dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-50 inset-shadow-sm py-12 text-center">
        <h3 className="text-2xl font-bold mb-4">
          Ready to find your dream job?
        </h3>
        <Link
          to="/jobs"
          className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700"
        >
          Browse Jobs
        </Link>
      </section>
    </div>
  );
}

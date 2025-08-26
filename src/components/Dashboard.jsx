import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [searches, setSearches] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard');
        setSearches(response.data);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSearches = searches.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(searches.length / itemsPerPage);

  if (loading) return <p className="text-center mt-20 text-gray-600">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Dashboard</h2>

      <button
        onClick={() => navigate('/')}
        className="mb-6 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors cursor-pointer"
      >
        &larr; Back to Search
      </button>

      {currentSearches.length === 0 ? (
        <p className="text-center text-gray-600">No searches yet.</p>
      ) : (
        <ul className="space-y-4">
          {currentSearches.map((search) => (
            <li key={search._id} className="p-4 border border-gray-200 rounded-md bg-gray-50">
              <p className="font-medium text-gray-700"><strong>Keyword:</strong> {search.keyword}</p>
              <p className="text-gray-500 text-sm"><strong>Date:</strong> {new Date(search.createdAt).toLocaleString()}</p>
              <ul className="mt-2 ml-4 space-y-1">
                {search.results.slice(0, 5).map((repo) => (
                  <li key={repo.id}>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {repo.full_name} ⭐ {repo.stargazers_count}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-3">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          Prev
        </button>
        <span className="px-3 py-1 border border-gray-300 rounded-md text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchForm = () => {
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!keyword) return setError('Please enter a keyword');

    setLoading(true);
    setError('');

    try {
      await axios.post('https://api-backend-0bi4.onrender.com/api/search', { keyword });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to search');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-5 text-center text-gray-800">Search GitHub Repos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keyword..."
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-60 transition-colors cursor-pointer"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
};

export default SearchForm;

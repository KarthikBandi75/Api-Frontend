import { Routes, Route } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">GitHub Repo Search App</h1>
      </header>
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<SearchForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
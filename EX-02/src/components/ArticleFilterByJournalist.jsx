import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [selectedJournalist, setSelectedJournalist] = useState('');
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      const res = await axios.get('http://localhost:5000/articles');
      setArticles(res.data.data);
    } catch (err) {
      console.error('Error fetching articles:', err);
    }
  };

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    try {
      const res = await axios.get('http://localhost:5000/journalists');
      setJournalists(res.data.data);
    } catch (err) {
      console.error('Error fetching journalists:', err);
    }
  };

  // Logic to apply filters
  const handleApplyFilters = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/journalists/${selectedJournalist}/articles`);
      setArticles(res.data.data);
    } catch (err) {
      console.error('Error applying filters:', err);
    }
  }

  // Logic to reset filters
  const handleResetFilters = () => {
    setSelectedJournalist('');
    fetchArticles();
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter" value={selectedJournalist} onChange={(e) => setSelectedJournalist(e.target.value)}>
          <option value="">All Journalists</option>
          {/* Options for journalists */}
          {journalists.map(j => (
            <option key={j.id} value={j.id}>{j.name}</option>
          ))}
        </select>

        <button
          onClick={handleApplyFilters}
        >Apply Filters</button>
        <button
          onClick={handleResetFilters}
        >Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
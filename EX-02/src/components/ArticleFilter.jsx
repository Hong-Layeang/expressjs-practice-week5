import { use, useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedJournalist, setSelectedJournalist] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      const res = await axios.get('http://localhost:5000/articles');
      setArticles(res.data.data); // response returns .json({ data: articles, message: 'Success' });
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
      console.error('Error fetching Journalists:', err);
    }
  };

  const fetchCategories = async () => {
    // Fetch categories from the API
    try {
      const res = await axios.get('http://localhost:5000/categories');
      setCategories(res.data.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Logic to apply filters
  const handleApplyFilters = async () => {
    try {
      let filteredArticles = [];

      // first, filter by journalist
      if (selectedJournalist) {
        const res = await axios.get(`http://localhost:5000/journalists/${selectedJournalist}/articles`);
        filteredArticles = res.data.data;
      } else if (selectedCategory) {
        // Or filter by category
        const res = await axios.get(`http://localhost:5000/categories/${selectedCategory}/articles`);
        filteredArticles = res.data.data;
      } else {
        // No filters
        const res = await axios.get('http://localhost:5000/articles');
        filteredArticles = res.data.data;
      }

      // second, filter locally
      if (selectedCategory && selectedJournalist) {
        filteredArticles = filteredArticles.filter(
          article => article.categoryId === parseInt(selectedCategory)
        );
      }

      setArticles(filteredArticles);
    } catch (err) {
      console.error('Error applying filters:', err);
    }
  };

  // Logic to reset filters
  const handleResetFilters = () => {
    setSelectedJournalist('');
    setSelectedCategory('');
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

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {/* Options for categories */}
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
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
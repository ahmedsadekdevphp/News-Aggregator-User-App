import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const ArticleSearchService = (currentPage, keyword, selectedCategory, selectedSource, startDate, endDate) => {
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchLookups = async () => {
        try {
            const response = await axios.get(`${config.BAC_URL}${config.ENDPOINTS.ARTICLE_SEARCH_LOOCKUP}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            setCategories(response.data.data.categories);
            setSources(response.data.data.sources);
        } catch (err) {
            console.error('Error fetching lookups:', err);
        }
    };

    const fetchSearchResults = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${config.BAC_URL}${config.ENDPOINTS.ARTICLE_SEARCH}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
                params: {
                    keyword,
                    category: selectedCategory,
                    source: selectedSource,
                    start_date: startDate,
                    end_date: endDate,
                    page: currentPage,
                },
            });
            setSearchResults(response.data.news.data);
            setTotalPages(response.data.news.last_page);
        } catch (err) {
            console.error('Error fetching search results:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLookups();
    }, []);

    useEffect(() => {
        fetchSearchResults();
    }, [currentPage, keyword, selectedCategory, selectedSource, startDate, endDate]);

    return {
        categories,
        sources,
        searchResults,
        totalPages,
        loading,
    };
};

export default ArticleSearchService;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleSearchForm from '../components/ArticleSearchForm';
import PaginationComponent from '../Components/PaginationComponent';
import NewsFeedPost from '../Components/NewsFeedPost';
const ArticleSearchPage = () => {
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSource, setSelectedSource] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchLookups = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/search/lookups');
                setCategories(response.data.data.categories);
                setSources(response.data.data.sources);
            } catch (err) {
                console.error('Failed to fetch lookups:', err);
            }
        };
        fetchLookups();
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/search', {
                params: {
                    keyword,
                    category: selectedCategory,
                    source: selectedSource,
                    start_date: startDate,
                    end_date: endDate,
                    page: currentPage,
                },
            });
            setSearchResults(response.data.articles.data);
            setTotalPages(response.data.articles.last_page);
        } catch (err) {
            console.error('Search failed:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            handleSearch();
        }
    };

    return (
        <div className="container my-4">
            <h3>Search Articles</h3>
            <ArticleSearchForm
                categories={categories}
                sources={sources}
                keyword={keyword}
                setKeyword={setKeyword}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSource={selectedSource}
                setSelectedSource={setSelectedSource}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                handleSearch={handleSearch}
                loading={loading}
            />
            {searchResults.length > 0 ? (
                <div className="mt-4">
                    {searchResults.map((post) => (
                        <NewsFeedPost
                            post={post}
                            author={post.author}
                            category={post.category}
                            type={post.type}
                            source={post.source}
                        />
                    ))}
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />
                </div>
            ) : (
                <p>No articles found</p>
            )}
        </div>
    );
};

export default ArticleSearchPage;

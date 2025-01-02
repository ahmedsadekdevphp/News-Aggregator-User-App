import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import PaginationComponent from '../Components/PaginationComponent';
import NewsFeedPost from '../Components/NewsFeedPost';
import ArticleSearchForm from '../Components/ArticleSearchForm';
import config from '../config';
import Swal from 'sweetalert2';

const today = new Date().toISOString().split('T')[0];

const ArticleSearch = () => {
    const { t } = useTranslation();
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSource, setSelectedSource] = useState('');
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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
            Swal.fire({
                icon: 'warning',
                title: t('articleSearch.fetchFailed'),
                text: t('articleSearch.invalidDateMessage'),
                confirmButtonText: 'OK',
            });
        }
    };

    useEffect(() => {
        fetchLookups();
    }, []);

    const handleSearch = async () => {
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
            console.error(t('articleSearch.searchFailed'), err);
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
                        <a key={post.id} href={post.url} target="_blank" rel="noopener noreferrer">
                            <NewsFeedPost
                                post={post}
                                author={post.author}
                                category={post.category}
                                type={post.type}
                                source={post.source}
                            />
                        </a>
                    ))}
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />
                </div>
            ) : (
                <p><center>{t('articleSearch.noArticlesFound')}</center></p>
            )}
        </div>
    );
};

export default ArticleSearch;

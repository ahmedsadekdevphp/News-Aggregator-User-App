import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsFeedPost from '../Components/NewsFeedPost';
import config from '../config';
import PaginationComponent from '../Components/PaginationComponent';
import { useTranslation } from 'react-i18next'; 

const NewsFeed = () => {
    const { t } = useTranslation(); 

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const authToken = localStorage.getItem('authToken');
            const response = await axios.get(`${config.BAC_URL}${config.ENDPOINTS.NEWS_FEED}?page=${currentPage}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (response.data && response.data.news.data) {
                setPosts(response.data.news.data); 
                setTotalPages(response.data.news.last_page); 
            } else {
                setError(t('newsFeed.noPostsFound')); 
            }
            setLoading(false);
        } catch (err) {
            setError(t('newsFeed.failedToLoad')); 
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [currentPage]); 

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="container my-4">
            <h4 className="text-center mb-4">{t('newsFeed.title')}</h4> 
            {error && <div className="alert alert-danger">{error}</div>}
            {loading ? (
                <p><center>{t('newsFeed.loading')}</center></p> 
            ) : (
                posts.length > 0 ? (
                    <>
                        {posts.map((post) => (
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
                    </>
                ) : (
                    <p>{t('newsFeed.noPostsAvailable')}</p> 
                )
            )}
        </div>
    );
};

export default NewsFeed;

import axios from 'axios';
import { useEffect, useState } from 'react';
import config from '../config';

const NewsFeedService  = (currentPage) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
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
                setError('No posts found');
            }
            setLoading(false);
        } catch (err) {
            setError('Failed to load posts');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [currentPage]);

    return { posts, loading, error, totalPages };
};

export default NewsFeedService ;

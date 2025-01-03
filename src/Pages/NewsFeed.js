import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import NewsFeedPost from '../Components/NewsFeedPost';
import PaginationComponent from '../Components/PaginationComponent';
import NewsFeedService   from '../Services/NewsFeedService';

const NewsFeed = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, loading, error, totalPages } = NewsFeedService (currentPage);

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

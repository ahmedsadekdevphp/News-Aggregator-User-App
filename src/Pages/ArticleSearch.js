import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PaginationComponent from '../Components/PaginationComponent';
import NewsFeedPost from '../Components/NewsFeedPost';
import ArticleSearchForm from '../Components/ArticleSearchForm';
import ArticleSearchService from '../Services/ArticleSearchService';
const today = new Date().toISOString().split('T')[0];

const ArticleSearch = () => {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    categories,
    sources,
    searchResults,
    totalPages,
    loading,
  } = ArticleSearchService(currentPage, keyword, selectedCategory, selectedSource, startDate, endDate);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
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
      />
      {loading ? (
        <p>{t('articleSearch.loading')}</p>
      ) : searchResults.length > 0 ? (
        <>
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
        </>
      ) : (
        <p>{t('articleSearch.noArticlesFound')}</p>
      )}
    </div>
  );
};

export default ArticleSearch;

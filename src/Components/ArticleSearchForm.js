import React from 'react';

const ArticleSearchForm = ({ categories, sources, keyword, setKeyword, selectedCategory, setSelectedCategory, selectedSource, setSelectedSource, startDate, setStartDate, endDate, setEndDate, handleSearch, loading }) => {
    return (
        <div className="row mb-4">
            <div className="col-md-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
            <div className="col-md-2">
                <select
                    className="form-control"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Select Category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className="col-md-2">
                <select
                    className="form-control"
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                >
                    <option value="">Select Source</option>
                    {sources.map((source, index) => (
                        <option key={index} value={source}>
                            {source}
                        </option>
                    ))}
                </select>
            </div>
            <div className="col-md-2">
                <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div className="col-md-2">
                <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            <div className="col-md-12 mt-3">
                <button className="btn btn-primary" onClick={handleSearch} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
        </div>
    );
};

export default ArticleSearchForm;

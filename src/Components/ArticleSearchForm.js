import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const ArticleSearchForm = ({
    keyword,
    setKeyword,
    selectedCategory,
    setSelectedCategory,
    selectedSource,
    setSelectedSource,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleSearch,
    loading,
    categories,
    sources,
}) => {
    const { t } = useTranslation();

    const handleStartDateChange = (value) => {
        setStartDate(value);
        if (new Date(value) > new Date(endDate)) {
            setEndDate(value);
        }
    };

    const handleEndDateChange = (value) => {
        if (new Date(value) >= new Date(startDate)) {
            setEndDate(value);
        } else {
            Swal.fire({
                icon: 'warning',
                title: t('articleSearch.invalidDateTitle'),
                text: t('articleSearch.invalidDateMessage'),
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <Card className="mb-4 p-4 shadow-sm rounded">
            <Card.Body>
                <center>
                    <h5 className="card-title">{t('articleSearch.title')}</h5>
                </center>
                <div className="row mb-4 mt-4">
                    <div className="col-md-3 p-1">
                        <input
                            type="text"
                            className="form-control"
                            placeholder={t('articleSearch.keywordPlaceholder')}
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2 p-1">
                        <select
                            className="form-control"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">{t('articleSearch.categoryPlaceholder')}</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2 p-1">
                        <select
                            className="form-control"
                            value={selectedSource}
                            onChange={(e) => setSelectedSource(e.target.value)}
                        >
                            <option value="">{t('articleSearch.sourcePlaceholder')}</option>
                            {sources.map((source, index) => (
                                <option key={index} value={source}>
                                    {source}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3 p-1">
                        <input
                            type="date"
                            className="form-control"
                            value={startDate}
                            onChange={(e) => handleStartDateChange(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2 p-1">
                        <input
                            type="date"
                            className="form-control"
                            value={endDate}
                            onChange={(e) => handleEndDateChange(e.target.value)}
                        />
                    </div>
                    <div className="col-md-12 mt-3 d-flex justify-content-center">
                        <Button
                            variant="primary"
                            onClick={handleSearch}
                            disabled={loading}
                            className="w-50"
                        >
                            {loading ? t('articleSearch.searching') : t('articleSearch.searchButton')}
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ArticleSearchForm;

import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { useTranslation } from 'react-i18next'; 
const UserPreferencesForm = ({
  categories,
  sources,
  authors,
  selectedCategories,
  selectedSources,
  selectedAuthors,
  setSelectedCategories,
  setSelectedSources,
  setSelectedAuthors,
  handleSavePreferences,
  loading,
  successMessage,
  errorMessage,
}) => {
  const { t } = useTranslation();

  const getSelectedOption = (selected, options) => {
    return options
      .filter(option => selected.includes(option.value))
      .map(option => ({ value: option.value, label: option.label }));
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleSourceChange = (selectedOptions) => {
    setSelectedSources(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleAuthorChange = (selectedOptions) => {
    setSelectedAuthors(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="card shadow-sm p-4">
            <h5 className="text-center mb-4">{t('preferences.personalizeTitle')}</h5> 

            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <Form>
              <Form.Group controlId="categories" className="mb-3">
                <Form.Label>{t('preferences.selectCategories')}</Form.Label> 
                <Select
                  isMulti
                  options={categories.map(category => ({ value: category, label: category }))}
                  value={getSelectedOption(selectedCategories, categories.map(category => ({ value: category, label: category })))}
                  onChange={handleCategoryChange}
                  placeholder={t('preferences.selectCategoriesPlaceholder')} 
                />
              </Form.Group>

              <Form.Group controlId="sources" className="mb-3">
                <Form.Label>{t('preferences.selectSources')}</Form.Label> 
                <Select
                  isMulti
                  options={sources.map(source => ({ value: source, label: source }))}
                  value={getSelectedOption(selectedSources, sources.map(source => ({ value: source, label: source })))}
                  onChange={handleSourceChange}
                  placeholder={t('preferences.selectSourcesPlaceholder')} 
                />
              </Form.Group>

              <Form.Group controlId="authors" className="mb-3">
                <Form.Label>{t('preferences.selectAuthors')}</Form.Label> 
                <Select
                  isMulti
                  options={authors.map(author => ({ value: author, label: author }))}
                  value={getSelectedOption(selectedAuthors, authors.map(author => ({ value: author, label: author })))}
                  onChange={handleAuthorChange}
                  placeholder={t('preferences.selectAuthorsPlaceholder')} 
                />
              </Form.Group>

              <Button
                variant="primary"
                onClick={handleSavePreferences}
                disabled={loading}
                className="w-100"
              >
                {loading ? t('preferences.saving') : t('preferences.savePreferences')} 
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreferencesForm;

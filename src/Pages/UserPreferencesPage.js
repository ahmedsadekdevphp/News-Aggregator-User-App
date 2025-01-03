import React, { useState, useEffect } from 'react';
import UserPreferencesForm from '../Components/UserPreferencesForm';
import { getPreferencesData, savePreferences,getUserPreferences } from '../Services/PreferencesService';
const UserPreferencesPage = () => {
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    const [authors, setAuthors] = useState([]);
  
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSources, setSelectedSources] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
  
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const { categories, sources, authors } = await getPreferencesData();
          setCategories(categories);
          setSources(sources);
          setAuthors(authors);
  
          const userPreferences = await getUserPreferences();

          if (userPreferences) {
            setSelectedCategories(userPreferences.preferred_categories || []);
            setSelectedSources(userPreferences.preferred_sources || []);
            setSelectedAuthors(userPreferences.preferred_authors || []);
          }
          
        } catch (error) {
          setErrorMessage('Failed to load preferences data');
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    const handleSavePreferences = async () => {
      setLoading(true);
      setErrorMessage('');
      try {
        const preferences = {
          preferred_categories: selectedCategories,
          preferred_sources: selectedSources,
          preferred_authors: selectedAuthors,
        };
        await savePreferences(preferences);
        setSuccessMessage('Preferences updated successfully');
      } catch (error) {
        setErrorMessage('Failed to save preferences');
      } finally {
        setLoading(false);
      }
    };
  
    return (

      <UserPreferencesForm
        categories={categories}
        sources={sources}
        authors={authors}
        selectedCategories={selectedCategories}
        selectedSources={selectedSources}
        selectedAuthors={selectedAuthors}
        setSelectedCategories={setSelectedCategories}
        setSelectedSources={setSelectedSources}
        setSelectedAuthors={setSelectedAuthors}
        handleSavePreferences={handleSavePreferences}
        loading={loading}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    );
  };
  
  export default UserPreferencesPage;
  
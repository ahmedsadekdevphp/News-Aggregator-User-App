import axios from 'axios';
import config from '../config';

const getPreferencesData = async () => {
    try {
        const response = await axios.get(`${config.BAC_URL}${config.ENDPOINTS.PREFERENCES_LOOKUPS}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching preferences data:', error);
        throw error;
    }
};

const getUserPreferences = async () => {
    try {
        const response = await axios.get(`${config.BAC_URL}${config.ENDPOINTS.USER_PREFERENCES}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        return response.data.data; 

    } catch (error) {
        console.error('Error fetching user preferences:', error);
        throw error;
    }
};
const savePreferences = async (preferences) => {
    try {
        const response = await axios.post(
            `${config.BAC_URL}${config.ENDPOINTS.SAVE_PREFERENCES}`,
            preferences,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error saving preferences:', error);
        throw error;
    }
};

export { getPreferencesData, savePreferences,getUserPreferences };

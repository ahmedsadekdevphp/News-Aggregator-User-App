import axios from 'axios';
import config from '../config';

export const RegisterUser = async (userData) => {
    const response = await axios.post(`${config.BAC_URL}${config.ENDPOINTS.REGISTER}`, userData);
    return response.data;
};
export default  RegisterUser;
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { logout } from '../Store/authSlice';
import config from '../config';

const LogoutService = () => {
  const dispatch = useDispatch();

  const logoutUser = async () => {
    try {
      await axios.post(`${config.BAC_URL}${config.ENDPOINTS.LOGOUT}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      localStorage.removeItem('authToken');
      dispatch(logout());
      return true;
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return logoutUser;
};

export default LogoutService;

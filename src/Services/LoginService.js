import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'; 
import { login } from '../Store/authSlice'; 

const LoginService = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [generalError, setGeneralError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSubmit = async (data) => {
        setGeneralError('');
        try {
            const response = await axios.post(`${config.BAC_URL}${config.ENDPOINTS.LOGIN}`, {
                email: data.email,
                password: data.password,
            });

            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                dispatch(login());
                navigate('/news-feed');
            } else {
                setGeneralError(response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.status === config.STATUSCODES.UNPROCESSABLE_CONTENT) {
                const { errors: validationErrors } = error.response.data;
                Object.keys(validationErrors).forEach((field) => {
                    setError(field, {
                        type: 'server',
                        message: validationErrors[field][0],
                    });
                });
            } else {
                setGeneralError(error.response.data.message);
            }
        }
    };

    return {
        register,
        handleSubmit,
        setError,
        errors,
        onSubmit,
        generalError,
    };
};

export default LoginService;

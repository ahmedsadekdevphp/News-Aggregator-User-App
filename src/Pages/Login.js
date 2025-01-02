import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../Components/LoginForm';
import config from '../config';
const Login = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setGeneralError('');
    try {
      const response = await axios.post(`${config.BAC_URL}${config.ENDPOINTS.LOGIN}`, {
        email: data.email,
        password: data.password,
      });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        navigate('/dashboard');
      } else {
        setGeneralError(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const { errors: validationErrors } = error.response.data;
        Object.keys(validationErrors).forEach((field) => {
          setError(field, {
            type: 'server',
            message: validationErrors[field][0],
          });
        });

      } else {
        setGeneralError('Network error Please Try again !');
      }
    }
  };

  return (
    <div>
      <LoginForm onSubmit={onSubmit} register={register} handleSubmit={handleSubmit} errors={errors}
        generalError={generalError}
      />
    </div>
  );
};

export default Login;

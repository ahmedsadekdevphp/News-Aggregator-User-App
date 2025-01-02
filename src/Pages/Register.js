import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../Components/RegisterForm'; 

const Register = () => {
  const { register, handleSubmit, setError, getValues } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('config.BAC_URL + config.ENDPOINTS.REGISTER', {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.passwordConfirmation,
      });
      console.log(response.data);
      navigate('/login'); 
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        if (data.errors) {
          for (const [key, value] of Object.entries(data.errors)) {
            setError(key, { type: 'manual', message: value[0] });
          }
        }
      } else {
        console.error('Registration failed', error);
      }
    }
  };

  return (
    <div>
      <RegisterForm
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        getValues={getValues} 
      />
    </div>
  );
};
export default Register;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RegisterForm from '../Components/RegisterForm';
import RegisterUser from '../Services/RegisterService';
import config from '../config';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    reset
  } = useForm();
  const [generalError, setGeneralError] = useState('');
  const onSubmit = async (data) => {
    setGeneralError('');
    setLoading(true);
    try {
      const response = await RegisterUser(data);
      setSuccessMessage(response.message);
      setLoading(false);
      reset();
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
      setLoading(false);
    }
  };

  return (
    <RegisterForm
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      loading={loading}
      getValues={getValues}
      generalError={generalError}
      successMessage={successMessage}
      reset={reset}
    />
  );
};

export default Register;

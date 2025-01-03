import React from 'react';
import LoginForm from '../Components/LoginForm';
import LoginService from '../Services/LoginService';
const Login = () => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    generalError
  } = LoginService();

  return (
    <div>
      <LoginForm 
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        generalError={generalError}
      />
    </div>
  );
};

export default Login;

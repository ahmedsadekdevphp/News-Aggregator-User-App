import React from 'react';
import { Button, Form , Alert} from 'react-bootstrap';

const RegisterForm = ({ onSubmit, register, errors, loading, getValues,generalError,successMessage}) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="card shadow-sm p-4">
            <h3 className="text-center mb-4">Register</h3>
            <Form onSubmit={onSubmit}>
            {generalError && <Alert variant="danger">{generalError}</Alert>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

              <Form.Group controlId="formName" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  {...register('name', { required: 'Name is required' })}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address',
                    },
                  })}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  {...register('password_confirmation', {
                    required: 'Password confirmation is required',
                    validate: (value) =>
                      value === getValues('password') ||
                      'Passwords must match',
                  })}
                  isInvalid={!!errors.password_confirmation}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password_confirmation?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

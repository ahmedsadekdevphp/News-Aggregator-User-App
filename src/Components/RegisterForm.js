import React from 'react';
import { Button, Form } from 'react-bootstrap';

const RegisterForm = ({ onSubmit, register, handleSubmit }) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="card shadow-sm p-4">
            <h3 className="text-center mb-4">Register</h3>
            <Form>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Control type="text" placeholder="Name" />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Control type="password" placeholder="Confirm Password" />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Register
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

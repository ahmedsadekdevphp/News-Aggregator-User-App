import React from 'react';
import { Button, Form, Card, Alert } from 'react-bootstrap';

const LoginForm = ({ onSubmit, register, handleSubmit, errors, generalError }) => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <Card className="card shadow-sm login p-4">
                        <h3 className="text-center mb-6">Login</h3>
                        <Form onSubmit={handleSubmit(onSubmit)} className="form">
                            {generalError && <Alert variant="danger">{generalError}</Alert>}
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Control
                                    {...register('email', { required: 'Email is required' })}
                                    type="email"
                                    placeholder="Enter your email"
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Control
                                    {...register('password', { required: 'Password is required' })}
                                    type="password"
                                    placeholder="Enter your password"
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">
                                Login
                            </Button>

                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;

import React from 'react';
import { Button, Form, Card, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const LoginForm = ({ onSubmit, register, handleSubmit, errors, generalError }) => {
    const { t } = useTranslation();
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <Card className="card shadow-sm login p-4">
                        <h3 className="text-center mb-6">{t('login.title')}</h3>
                        <Form onSubmit={handleSubmit(onSubmit)} className="form">
                            {generalError && <Alert variant="danger">{t('login.generalError')}</Alert>}
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Control
                                    {...register('email', { required: t('login.emailRequired') })}
                                    type="email"
                                    placeholder={t('login.emailPlaceholder')}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Control
                                    {...register('password', { required: t('login.passwordRequired') })}
                                    type="password"
                                    placeholder={t('login.passwordPlaceholder')}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">
                                {t('login.button')}
                            </Button>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;

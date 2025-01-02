import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const NewsFeedPost = ({ post }) => {
    const { t } = useTranslation();

    return (
        <Card className="mb-4 shadow-sm rounded">
            <Card.Body>
                <Card.Title className="h5 post-title font-weight-bold">{post.title}</Card.Title>
                <Card.Text className="text-muted">{post.content}</Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <small className="text-muted">{t('newsFeed.postedOn')} {new Date(post.created_at).toLocaleString()}</small>
                </div>
                <div className="mt-3">
                    <Row>
                        <Col md={6}>
                            <p className="mb-1"><strong>{t('newsFeed.author')}:</strong> {post.author}</p>
                        </Col>
                        <Col md={6}>
                            <p className="mb-1"><strong>{t('newsFeed.category')}:</strong> {post.category}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <p className="mb-1"><strong>{t('newsFeed.type')}:</strong> {post.type}</p>
                        </Col>
                        <Col md={6}>
                            <p className="mb-1"><strong>{t('newsFeed.source')}:</strong> {post.source}</p>
                        </Col>
                    </Row>
                </div>
            </Card.Body>
        </Card>
    );
};

export default NewsFeedPost;

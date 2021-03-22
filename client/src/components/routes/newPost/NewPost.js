import React from 'react';
import Container from 'react-bootstrap/Container';
import PostForm from '../../postForm/PostForm';

const NewPost = () => {
  return (
    <Container>
      <h3>Create A New Listing</h3>
      <PostForm />
    </Container>
  );
};

export default NewPost;

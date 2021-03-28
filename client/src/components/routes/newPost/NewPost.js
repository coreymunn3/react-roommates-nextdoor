import React from 'react';
import Container from 'react-bootstrap/Container';
import PostForm from '../../postForm/PostForm';
// redux
import { useSelector } from 'react-redux';

const NewPost = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Container>
      <h3>{`Create A New Listing In ${user?.user?._location?.city}, ${user?.user?._location?.state}`}</h3>
      <PostForm user={user} />
    </Container>
  );
};

export default NewPost;

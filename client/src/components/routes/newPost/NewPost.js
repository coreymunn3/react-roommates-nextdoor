import React from 'react';
import Container from 'react-bootstrap/Container';
import PostForm from '../../postForm/PostForm';
import ElevatedSection from '../../layout/elevatedSection/ElevatedSection';
// redux
import { useSelector } from 'react-redux';

const NewPost = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      <h3 className='text-light'>{`Create A New Listing In ${user?.user?._location?.city}, ${user?.user?._location?.state}`}</h3>
      <ElevatedSection>
        <PostForm edit={false} />
      </ElevatedSection>
    </div>
  );
};

export default NewPost;

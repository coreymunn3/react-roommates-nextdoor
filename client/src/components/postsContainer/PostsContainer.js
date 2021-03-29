import React from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../postCard/PostCard';

const PostsContainer = () => {
  const { feedPosts, isLoading: postsLoading } = useSelector(
    (state) => state.post
  );

  return (
    <div className='my-2'>
      {feedPosts.map((post, idx) => (
        <PostCard key={idx} post={post} />
      ))}
    </div>
  );
};

export default PostsContainer;

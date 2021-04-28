import React, { useEffect } from 'react';
import CustomModal from '../customModal/CustomModal';
import SortPostsForm from './SortPostsForm';
import FilterPostsForm from './FilterPostsForm';

const FeedControlModal = ({ title, ...props }) => {
  return (
    <CustomModal title={`${title} Posts`} {...props}>
      {title === 'Sort' && <SortPostsForm />}
      {title === 'Filter' && <FilterPostsForm />}
    </CustomModal>
  );
};

export default FeedControlModal;

import React, { useEffect } from 'react';
import CustomModal from '../customModal/CustomModal';
import SortPostsForm from './SortPostsForm';
import FilterPostsForm from './FilterPostsForm';

const FeedControlModal = ({ title, ...props }) => {
  return (
    <CustomModal title={`${title} Posts`} {...props}>
      {title === 'Sort' && <SortPostsForm handleClose={props.handleClose} />}
      {title === 'Filter' && (
        <FilterPostsForm handleClose={props.handleClose} />
      )}
    </CustomModal>
  );
};

export default FeedControlModal;

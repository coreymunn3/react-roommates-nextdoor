import React, { Fragment } from 'react';
import Header from '../header/Header';
import FeedControls from '../feedControls/FeedControls';

const Feed = () => {
  return (
    <Fragment>
      <Header />
      <div>
        <FeedControls />
        {/* posts */}
        {/* footer */}
      </div>
    </Fragment>
  );
};

export default Feed;

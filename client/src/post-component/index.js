// Post Creation Component
import React, { useState } from "react";
import Create from "./create/index";

function PostCreateButton() {
  const displayPostCreation = () => {};
  return (
    <React.Fragment>
      <button className="create_post_button" onClick={displayPostCreation}>
        Create Post
      </button>
    </React.Fragment>
  );
}

export default PostCreateButton;

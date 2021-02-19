// Post Creation Component
import React, { useState } from "react";
import Create from "./create/index";
import ReactDOM from "react-dom";

function PostCreateButton() {
  const [modalOpen, setModal] = useState(false);

  const displayCreatePost = () => {
    setModal(true);
    ReactDOM.render(
      <Create active={modalOpen}> </Create>,
      document.getElementById("root")
    );
  };
  return (
    <React.Fragment>
      <button
        className="create_post_button"
        onClick={() => displayCreatePost()}
      >
        Create Post
      </button>
    </React.Fragment>
  );
}

export default PostCreateButton;

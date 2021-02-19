import React from "react";
import Modal from "react-modal";
const CreatePost = (active) => {
  return (
    <div>
      <Modal isOpen={active}>
        <h2>Create Post</h2>
        <p>Modal Body</p>
        <button onClick={}></button>
      </Modal>
    </div>
  );
};

export default CreatePost;
